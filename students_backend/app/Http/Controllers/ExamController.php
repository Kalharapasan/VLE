<?php

namespace App\Http\Controllers;

use App\Http\Requests\ExamRequests;
use App\Models\Exam;

class ExamController extends Controller
{
     // CREATE
     public function store(ExamRequests $request)
     {
         try {
             $exam = Exam::create($request->validated());

             return response()->json(['message' => 'Exam added successfully', 'exam' => $exam]);
         } catch (\Exception $e) {
             return response()->json(['message' => 'Error: ' . $e->getMessage()], 500);
         }
     }

     // READ ALL
     public function index()
     {
         return response()->json(Exam::all());
     }

     // READ ONE
     public function show($id)
     {
         $exam = Exam::findOrFail($id);
         return response()->json($exam);
     }

     // UPDATE
     public function update(ExamRequests $request, $id)
     {
         $exam = Exam::findOrFail($id);
         $exam->update($request->validated());

         return response()->json(['message' => 'Exam updated successfully', 'faculty' => $exam]);
     }

     // DELETE
     public function destroy($id)
     {
         $exam = Exam::findOrFail($id);
         $exam->delete();

         return response()->json(['message' => 'Exam deleted successfully']);
     }
}
