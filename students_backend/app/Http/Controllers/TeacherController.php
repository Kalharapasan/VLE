<?php

namespace App\Http\Controllers;

use App\Http\Requests\TeacherRequests;
use App\Models\Teacher;

class TeacherController extends Controller
{
     // CREATE
     public function store(TeacherRequests $request)
     {
         try {
             $teacher = Teacher::create($request->validated());

             return response()->json(['message' => 'Teacher added successfully', 'teacher' => $teacher]);
         } catch (\Exception $e) {
             return response()->json(['message' => 'Error: ' . $e->getMessage()], 500);
         }
     }

     // READ ALL
     public function index()
     {
         return response()->json(Teacher::all());
     }

     // READ ONE
     public function show($id)
     {
         $teacher = Teacher::findOrFail($id);
         return response()->json($teacher);
     }

     // UPDATE
     public function update(TeacherRequests $request, $id)
     {
         $teacher = Teacher::findOrFail($id);
         $teacher->update($request->validated());

         return response()->json(['message' => 'Teacher updated successfully', 'studentsGPA' => $teacher]);
     }

     // DELETE
     public function destroy($id)
     {
         $teacher = Teacher::findOrFail($id);
         $teacher->delete();

         return response()->json(['message' => 'Teacher deleted successfully']);
     }
      public function count()
    {
        $count = Teacher::count();
        return response()->json(['teacher_count' => $count]);
    }
}
