<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Book;

class BookController extends Controller
{
	public function addBook(Request $request)
	{
		$book = new Book;
		$book->title = $request->input('title');
		$book->author = $request->input('author');
		$book->save();

		return response()->json([
			'status' => 1
		]);
	}

	public function editBook(Request $request,$id)
	{
		$author = $request->input('author');

		$book = Book::find($id);

		return response()->json([
			'book' => $book
		]);
	}

	public function doEditBook(Request $request)
	{
		$id = $request->input('id');
		$author = $request->input('author');

		$book = Book::find($id);
		$book->author = $author;
		$book->save();

		return response()->json([
			'status' => 1
		]);
	}

	public function deleteBook(Request $request)
	{
		$id = $request->input('id'); 

		$book = Book::find($id);
		$book->delete();

		return response()->json([
			'status' => 1
		]);
	}

    public function getBooks(Request $request)
    {
    	$sortBy = $request->input('sort_by');
    	$sortDir = $request->input('sort_dir');
    	$keyword = $request->input('keyword');

    	$query = Book::orderBy($sortBy,$sortDir);

    	if(!empty($keyword)){
    		$query->where('title','like','%'.$keyword.'%')->orWhere('author','like','%'.$keyword.'%');
    	}

    	return response()->json([
    		'books' => $query->get()
    	]);
    }

    public function doExport(Request $request){
    	$fields = $request->input('fields');
    	$type = $request->input('type');

    	$showTitle = false;
    	$showAuthor = false;

    	if(in_array('title', $fields)){
    		$showTitle = true;
    	}

    	if(in_array('author', $fields)){
    		$showAuthor = true;
    	}

    	if($type == 'csv'){
    		return \Maatwebsite\Excel\Facades\Excel::download(new \App\Exports\BookExport($showTitle,$showAuthor), 'users.csv', \Maatwebsite\Excel\Excel::CSV);
    	} else {

	        $books = Book::orderBy('id','asc')->get();

	        $array = [];

	        foreach($books as $row){

	        	$fields_array = [];

	        	if($showTitle){
		    		$fields_array['title'] = $row->title;
		    	}

		    	if($showAuthor){
		    		$fields_array['author'] = $row->author;
		    	}

	        	$array['book_'.$row->id] = $fields_array;
	        }

	        $xml = \Spatie\ArrayToXml\ArrayToXml::convert($array);

	        return \Response::make($xml, 200, [
		        'Content-type'        => 'text/xml',
		        'Content-Disposition' => 'attachment; filename="book.xml"',
		    ]);
    	}    	
    }
}