<?php

namespace App\Http\Controllers;

use App\Http\Requests\TeacherSubjectRequests;
use App\Models\TeacherSubject;

class TeacherSubjectController extends Controller
{
     // CREATE
     public function store(TeacherSubjectRequests $request)
     {
         try {
             $teacherSubject = TeacherSubject::create($request->validated());

             return response()->json(['message' => 'Teacher Subject added successfully', 'teacherSubject' => $teacherSubject]);
         } catch (\Exception $e) {
             return response()->json(['message' => 'Error: ' . $e->getMessage()], 500);
         }
     }

     // READ ALL
     public function index()
     {
         return response()->json(TeacherSubject::all());
     }

     // READ ONE
     public function show($id)
     {
         $teacherSubject = TeacherSubject::findOrFail($id);
         return response()->json($teacherSubject);
     }

     // UPDATE
     public function update(TeacherSubjectRequests $request, $id)
     {
         $teacherSubject = TeacherSubject::findOrFail($id);
         $teacherSubject->update($request->validated());

         return response()->json(['message' => 'Teacher Subject updated successfully', 'teacherSubject' => $teacherSubject]);
     }

     // DELETE
     public function destroy($id)
     {
         $teacherSubject = TeacherSubject::findOrFail($id);
         $teacherSubject->delete();

         return response()->json(['message' => 'Teacher Subject deleted successfully']);
     }
}
