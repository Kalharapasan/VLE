<?php

namespace App\Http\Controllers;

use App\Http\Requests\StudentSubjectRequests;
use App\Models\StudentSubject;

class StudentSubjectController extends Controller
{
     // CREATE
     public function store(StudentSubjectRequests $request)
     {
         try {
             $studentSubject = StudentSubject::create($request->validated());

             return response()->json(['message' => 'Student Subject added successfully', 'studentSubject' => $studentSubject]);
         } catch (\Exception $e) {
             return response()->json(['message' => 'Error: ' . $e->getMessage()], 500);
         }
     }

     // READ ALL
     public function index()
     {
         return response()->json(StudentSubject::all());
     }

     // READ ONE
     public function show($id)
     {
         $studentSubject = StudentSubject::findOrFail($id);
         return response()->json($studentSubject);
     }

     // UPDATE
     public function update(StudentSubjectRequests $request, $id)
     {
         $studentSubject = StudentSubject::findOrFail($id);
         $studentSubject->update($request->validated());

         return response()->json(['message' => 'Student Subject updated successfully', 'studentSubject' => $studentSubject]);
     }

     // DELETE
     public function destroy($id)
     {
         $studentSubject = StudentSubject::findOrFail($id);
         $studentSubject->delete();

         return response()->json(['message' => 'Student Subject deleted successfully']);
     }
}
