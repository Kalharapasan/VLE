<?php

namespace App\Http\Controllers;

use App\Http\Requests\SubjectRequests;
use App\Models\Subject;

class SubjectController extends Controller
{
     // CREATE
     public function store(SubjectRequests $request)
     {
         try {
             $subject = Subject::create($request->validated());

             return response()->json(['message' => 'Subject added successfully', 'subject' => $subject]);
         } catch (\Exception $e) {
             return response()->json(['message' => 'Error: ' . $e->getMessage()], 500);
         }
     }

     // READ ALL
     public function index()
     {
         return response()->json(Subject::all());
     }

     // READ ONE
     public function show($id)
     {
         $subject = Subject::findOrFail($id);
         return response()->json($subject);
     }

     // UPDATE
     public function update(SubjectRequests $request, $id)
     {
         $subject = Subject::findOrFail($id);
         $subject->update($request->validated());

         return response()->json(['message' => 'Subject updated successfully', 'subject' => $subject]);
     }

     // DELETE
     public function destroy($id)
     {
         $subject = Subject::findOrFail($id);
         $subject->delete();

         return response()->json(['message' => 'Subject deleted successfully']);
     }
      public function count()
    {
        $count = Subject::count();
        return response()->json(['subject_count' => $count]);
    }
}
