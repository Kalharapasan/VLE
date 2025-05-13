<?php

namespace App\Http\Controllers;


use App\Http\Requests\StudentAttendanceRequests;
use App\Models\StudentAttendance;


class StudentAttendanceController extends Controller
{
     // CREATE
     public function store(StudentAttendanceRequests $request)
     {
         try {
             $studentAttendance = StudentAttendance::create($request->validated());

             return response()->json(['message' => 'StudentAttendance added successfully', 'studentAttendance' => $studentAttendance]);
         } catch (\Exception $e) {
             return response()->json(['message' => 'Error: ' . $e->getMessage()], 500);
         }
     }

     // READ ALL
     public function index()
     {
         return response()->json(StudentAttendance::all());
     }

     // READ ONE
     public function show($id)
     {
         $studentAttendance = StudentAttendance::findOrFail($id);
         return response()->json($studentAttendance);
     }

     // UPDATE
     public function update(StudentAttendanceRequests $request, $id)
     {
         $studentAttendance = StudentAttendance::findOrFail($id);
         $studentAttendance->update($request->validated());

         return response()->json(['message' => 'StudentAttendance updated successfully', 'studentAttendance' => $studentAttendance]);
     }

     // DELETE
     public function destroy($id)
     {
         $studentAttendance = StudentAttendance::findOrFail($id);
         $studentAttendance->delete();

         return response()->json(['message' => 'StudentAttendance deleted successfully']);
     }
}
