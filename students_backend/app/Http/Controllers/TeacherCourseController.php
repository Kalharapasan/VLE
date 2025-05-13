<?php

namespace App\Http\Controllers;

use App\Http\Requests\TeacherCourseRequests;
use App\Models\TeacherCourse;

class TeacherCourseController extends Controller
{
     // CREATE
     public function store(TeacherCourseRequests $request)
     {
         try {
             $teacherCourse = TeacherCourse::create($request->validated());

             return response()->json(['message' => 'Teacher Course added successfully', 'teacherCourse' => $teacherCourse]);
         } catch (\Exception $e) {
             return response()->json(['message' => 'Error: ' . $e->getMessage()], 500);
         }
     }

     // READ ALL
     public function index()
     {
         return response()->json(TeacherCourse::all());
     }

     // READ ONE
     public function show($id)
     {
         $teacherCourse = TeacherCourse::findOrFail($id);
         return response()->json($teacherCourse);
     }

     // UPDATE
     public function update(TeacherCourseRequests $request, $id)
     {
         $teacherCourse = TeacherCourse::findOrFail($id);
         $teacherCourse->update($request->validated());

         return response()->json(['message' => 'Teacher Course updated successfully', 'teacherCourse' => $teacherCourse]);
     }

     // DELETE
     public function destroy($id)
     {
         $teacherCourse = TeacherCourse::findOrFail($id);
         $teacherCourse->delete();

         return response()->json(['message' => 'Teacher Course deleted successfully']);
     }
}
