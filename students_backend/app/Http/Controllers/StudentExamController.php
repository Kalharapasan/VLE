<?php

namespace App\Http\Controllers;


use App\Http\Requests\StudentExamRequests;
use App\Models\StudentExam;


class StudentExamController extends Controller
{
     // CREATE
     public function store(StudentExamRequests $request)
     {
         try {
             $studentExam = StudentExam::create($request->validated());

             return response()->json(['message' => 'StudentExam added successfully', 'studentExam' => $studentExam]);
         } catch (\Exception $e) {
             return response()->json(['message' => 'Error: ' . $e->getMessage()], 500);
         }
     }

     // READ ALL
     public function index()
     {
         return response()->json(StudentExam::all());
     }

     // READ ONE
     public function show($id)
     {
         $studentExam = StudentExam::findOrFail($id);
         return response()->json($studentExam);
     }

     // UPDATE
     public function update(StudentExamRequests $request, $id)
     {
         $studentExam = StudentExam::findOrFail($id);
         $studentExam->update($request->validated());

         return response()->json(['message' => 'StudentExam updated successfully', 'studentExam' => $studentExam]);
     }

     // DELETE
     public function destroy($id)
     {
         $studentExam = StudentExam::findOrFail($id);
         $studentExam->delete();

         return response()->json(['message' => 'StudentExam deleted successfully']);
     }
}
