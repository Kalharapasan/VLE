<?php

namespace App\Http\Controllers;

use App\Models\Book;
use App\Models\BookBorrow;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class BookController extends Controller
{
    // GET /api/books - List all books
    public function index()
    {
        return response()->json(Book::all());
    }

    // POST /api/books - Create new book
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'title' => 'required|string|max:255',
            'author' => 'required|string|max:255',
            'isbn' => 'required|string|unique:books,isbn',
            'publisher' => 'nullable|string|max:255',
            'publication_year' => 'nullable|integer',
            'category' => 'nullable|string|max:100',
            'total_copies' => 'integer|min:1',
            'shelf_location' => 'nullable|string|max:50',
            'description' => 'nullable|string',
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors(), 422);
        }

        $book = Book::create($validator->validated());
        return response()->json(['message' => 'Book added successfully', 'book' => $book]);
    }

    // GET /api/books/{id} - Show single book
    public function show($id)
    {
        $book = Book::with('activeBorrows')->findOrFail($id);
        return response()->json($book);
    }

    // PUT /api/books/update/{id} - Update book
    public function update(Request $request, $id)
    {
        $book = Book::findOrFail($id);
        $book->update($request->all());
        return response()->json(['message' => 'Book updated successfully', 'book' => $book]);
    }

    // DELETE /api/books/{id} - Delete book
    public function destroy($id)
    {
        $book = Book::findOrFail($id);
        $book->delete();
        return response()->json(['message' => 'Book deleted successfully']);
    }

    // GET /api/books/available - Available books
    public function available()
    {
        return response()->json(Book::where('available_copies', '>', 0)->get());
    }

    // POST /api/books/borrow - Borrow a book
    public function borrowBook(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'book_id' => 'required|exists:books,id',
            'user_id' => 'required|exists:users,id',
            'due_date' => 'required|date|after:today',
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors(), 422);
        }

        $book = Book::findOrFail($request->book_id);
        if ($book->available_copies <= 0) {
            return response()->json(['message' => 'No copies available'], 400);
        }

        $book->decrement('available_copies');

        $borrow = BookBorrow::create([
            'book_id' => $request->book_id,
            'user_id' => $request->user_id,
            'borrow_date' => now(),
            'due_date' => $request->due_date,
            'status' => 'borrowed',
        ]);

        return response()->json(['message' => 'Book borrowed successfully', 'borrow' => $borrow]);
    }

    // POST /api/books/return/{id} - Return a book
    public function returnBook($id)
    {
        $borrow = BookBorrow::where('book_id', $id)
            ->where('status', 'borrowed')
            ->firstOrFail();

        $borrow->update([
            'return_date' => now(),
            'status' => 'returned',
        ]);

        $borrow->book->increment('available_copies');

        return response()->json(['message' => 'Book returned successfully']);
    }
}
