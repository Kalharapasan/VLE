<?php

namespace App\Http\Controllers;


use App\Http\Requests\StudentCourseRequests;
use App\Models\StudentCourse;


class StudentCourseController extends Controller
{
     // CREATE
     public function store(StudentCourseRequests $request)
     {
         try {
             $studentCourse = StudentCourse::create($request->validated());

             return response()->json(['message' => 'StudentCourse added successfully', 'studentCourse' => $studentCourse]);
         } catch (\Exception $e) {
             return response()->json(['message' => 'Error: ' . $e->getMessage()], 500);
         }
     }

     // READ ALL
     public function index()
     {
         return response()->json(StudentCourse::all());
     }

     // READ ONE
     public function show($id)
     {
         $studentCourse = StudentCourse::findOrFail($id);
         return response()->json($studentCourse);
     }

     // UPDATE
     public function update(StudentCourseRequests $request, $id)
     {
         $studentCourse = StudentCourse::findOrFail($id);
         $studentCourse->update($request->validated());

         return response()->json(['message' => 'StudentCourse updated successfully', 'studentCourse' => $studentCourse]);
     }

     // DELETE
     public function destroy($id)
     {
         $studentCourse = StudentCourse::findOrFail($id);
         $studentCourse->delete();

         return response()->json(['message' => 'StudentCourse deleted successfully']);
     }
}
