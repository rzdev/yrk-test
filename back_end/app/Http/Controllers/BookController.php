<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class BookController extends Controller
{
	public function addBook(Request $request)
	{
		$book = new Book;
		$book->name = $request->input('book');
		$book->author = $request->input('author');
		$book->save();

		return response()->json([
			'status' => 1
		]);
	}

	public function editBook(Request $request)
	{
		$id = $request->input('id'); 

		$book = Book::find($id);
		$book->author = $request->input('author');
		$book->save();

		return response()->json([
			'status' => 1
		]);
	}

    public function getBooks(Request $request)
    {
    	$sortBy = $request->input('sort_by');
    	$sortDir = $request->input('sort_dir');
    	$keyword = $request->input('keyword');

    	$query = Book::orderBy($sort_by,$sort_dir);

    	if(!empty($keyword)){
    		$query->where('title','like','%'.$keyword.'%')->orWhere('author','like','%'.$keyword.'%');
    	}

    	return response()->json([
    		'books' => $query->get()
    	]);
    }
}