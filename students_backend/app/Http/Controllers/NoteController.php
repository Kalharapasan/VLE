<?php

namespace App\Http\Controllers;

use App\Http\Requests\NoteRequests;
use App\Models\Note;

class NoteController extends Controller
{
     // CREATE
     public function store(NoteRequests $request)
     {
         try {
             $note = Note::create($request->validated());

             return response()->json(['message' => 'Note added successfully', 'note' => $note]);
         } catch (\Exception $e) {
             return response()->json(['message' => 'Error: ' . $e->getMessage()], 500);
         }
     }

     // READ ALL
     public function index()
     {
         return response()->json(Note::all());
     }

     // READ ONE
     public function show($id)
     {
         $note = Note::findOrFail($id);
         return response()->json($note);
     }

     // UPDATE
     public function update(NoteRequests $request, $id)
     {
         $note = Note::findOrFail($id);
         $note->update($request->validated());

         return response()->json(['message' => 'Note updated successfully', 'faculty' => $note]);
     }

     // DELETE
     public function destroy($id)
     {
         $note = Note::findOrFail($id);
         $note->delete();

         return response()->json(['message' => 'Note deleted successfully']);
     }
}
