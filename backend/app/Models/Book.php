<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Book extends Model
{
    protected $fillable = [
        'title', 'author', 'isbn', 'publisher', 'publication_year',
        'category', 'total_copies', 'available_copies', 'shelf_location',
        'description', 'cover_image',
    ];

    public function borrows(): HasMany
    {
        return $this->hasMany(BookBorrow::class, 'book_id');
    }

    public function activeBorrows(): HasMany
    {
        return $this->hasMany(BookBorrow::class, 'book_id')->where('status', 'borrowed');
    }
}
