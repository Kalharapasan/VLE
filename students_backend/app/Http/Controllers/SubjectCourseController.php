<?php

namespace App\Http\Controllers;

use App\Http\Requests\SubjectCourseRequests;
use App\Models\SubjectCourse;

class SubjectCourseController extends Controller
{
     // CREATE
     public function store(SubjectCourseRequests $request)
     {
         try {
             $sbjectCourse = SubjectCourse::create($request->validated());

             return response()->json(['message' => 'Subject Course added successfully', 'sbjectCourse' => $sbjectCourse]);
         } catch (\Exception $e) {
             return response()->json(['message' => 'Error: ' . $e->getMessage()], 500);
         }
     }

     // READ ALL
     public function index()
     {
         return response()->json(SubjectCourse::all());
     }

     // READ ONE
     public function show($id)
     {
         $sbjectCourse = SubjectCourse::findOrFail($id);
         return response()->json($sbjectCourse);
     }

     // UPDATE
     public function update(SubjectCourseRequests $request, $id)
     {
         $sbjectCourse = SubjectCourse::findOrFail($id);
         $sbjectCourse->update($request->validated());

         return response()->json(['message' => 'Subject Course updated successfully', 'sbjectCourse' => $sbjectCourse]);
     }

     // DELETE
     public function destroy($id)
     {
         $sbjectCourse = SubjectCourse::findOrFail($id);
         $sbjectCourse->delete();

         return response()->json(['message' => 'Subject Course deleted successfully']);
     }
}
