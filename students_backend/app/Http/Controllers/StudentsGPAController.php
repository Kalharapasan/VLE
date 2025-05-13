<?php

namespace App\Http\Controllers;


use App\Http\Requests\StudentsGPARequests;
use App\Models\StudentsGPA;


class StudentsGPAController extends Controller
{
     // CREATE
     public function store(StudentsGPARequests $request)
     {
         try {
             $studentsGPA = StudentsGPA::create($request->validated());

             return response()->json(['message' => 'Students GPA added successfully', 'studentsGPA' => $studentsGPA]);
         } catch (\Exception $e) {
             return response()->json(['message' => 'Error: ' . $e->getMessage()], 500);
         }
     }

     // READ ALL
     public function index()
     {
         return response()->json(StudentsGPA::all());
     }

     // READ ONE
     public function show($id)
     {
         $studentsGPA = StudentsGPA::findOrFail($id);
         return response()->json($studentsGPA);
     }

     // UPDATE
     public function update(StudentsGPARequests $request, $id)
     {
         $studentsGPA = StudentsGPA::findOrFail($id);
         $studentsGPA->update($request->validated());

         return response()->json(['message' => 'Students GPA updated successfully', 'studentsGPA' => $studentsGPA]);
     }

     // DELETE
     public function destroy($id)
     {
         $studentsGPA = StudentsGPA::findOrFail($id);
         $studentsGPA->delete();

         return response()->json(['message' => 'Students GPA deleted successfully']);
     }
}
