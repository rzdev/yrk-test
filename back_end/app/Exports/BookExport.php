<?php

namespace App\Exports;

use App\Book;
use Maatwebsite\Excel\Concerns\FromCollection;

class BookExport implements FromCollection
{
	public function __construct($showTitle,$showAuthor)
    {
        $this->showTitle = $showTitle;
        $this->showAuthor = $showAuthor;
    }

    public function collection()
    {
    	$fields = [];

    	if($this->showTitle){
    		array_push($fields, 'title');
    	}

    	if($this->showAuthor){
    		array_push($fields, 'author');
    	}

        return Book::select($fields)->orderBy('id','asc')->get();
    }
}