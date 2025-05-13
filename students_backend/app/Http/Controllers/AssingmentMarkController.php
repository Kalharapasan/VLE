<?php

namespace App\Http\Controllers;

use App\Http\Requests\AssingmentMarkRequests;
use App\Models\AssingmentMarks;

class AssingmentMarkController extends Controller
{
     // CREATE
     public function store(AssingmentMarkRequests $request)
     {
         try {
             $assingmentMarks = AssingmentMarks::create($request->validated());

             return response()->json(['message' => 'AssingmentMarks added successfully', 'assingmentMarks' => $assingmentMarks]);
         } catch (\Exception $e) {
             return response()->json(['message' => 'Error: ' . $e->getMessage()], 500);
         }
     }

     // READ ALL
     public function index()
     {
         return response()->json(AssingmentMarks::all());
     }

     // READ ONE
     public function show($id)
     {
         $assingmentMarks = AssingmentMarks::findOrFail($id);
         return response()->json($assingmentMarks);
     }

     // UPDATE
     public function update(AssingmentMarkRequests $request, $id)
     {
         $assingmentMarks = AssingmentMarks::findOrFail($id);
         $assingmentMarks->update($request->validated());

         return response()->json(['message' => 'AssingmentMarks updated successfully', 'faculty' => $assingmentMarks]);
     }

     // DELETE
     public function destroy($id)
     {
         $assingmentMarks = AssingmentMarks::findOrFail($id);
         $assingmentMarks->delete();

         return response()->json(['message' => 'AssingmentMarks deleted successfully']);
     }
}
