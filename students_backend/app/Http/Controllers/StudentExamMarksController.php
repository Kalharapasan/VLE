<?php

namespace App\Http\Controllers;


use App\Http\Requests\StudentExamMarksRequests;
use App\Models\StudentExamMarks;


class StudentExamMarksController extends Controller
{
     // CREATE
     public function store(StudentExamMarksRequests $request)
     {
         try {
             $studentExamMarks = StudentExamMarks::create($request->validated());

             return response()->json(['message' => 'StudentExamMarks added successfully', 'studentExamMarks' => $studentExamMarks]);
         } catch (\Exception $e) {
             return response()->json(['message' => 'Error: ' . $e->getMessage()], 500);
         }
     }

     // READ ALL
     public function index()
     {
         return response()->json(StudentExamMarks::all());
     }

     // READ ONE
     public function show($id)
     {
         $studentExamMarks = StudentExamMarks::findOrFail($id);
         return response()->json($studentExamMarks);
     }

     // UPDATE
     public function update(StudentExamMarksRequests $request, $id)
     {
         $studentExamMarks = StudentExamMarks::findOrFail($id);
         $studentExamMarks->update($request->validated());

         return response()->json(['message' => 'StudentExamMarks updated successfully', 'studentExamMarks' => $studentExamMarks]);
     }

     // DELETE
     public function destroy($id)
     {
         $studentExamMarks = StudentExamMarks::findOrFail($id);
         $studentExamMarks->delete();

         return response()->json(['message' => 'StudentExamMarks deleted successfully']);
     }
}
