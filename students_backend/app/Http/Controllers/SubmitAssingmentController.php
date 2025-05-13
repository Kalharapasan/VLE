<?php

namespace App\Http\Controllers;

use App\Http\Requests\SubmitAssingmentRequests;
use App\Models\SubmitAssingment;

class SubmitAssingmentController extends Controller
{
     // CREATE
     public function store(SubmitAssingmentRequests $request)
     {
         try {
             $submitAssingment = SubmitAssingment::create($request->validated());

             return response()->json(['message' => ' Assingment Submit successfully', 'submitAssingment' => $submitAssingment]);
         } catch (\Exception $e) {
             return response()->json(['message' => 'Error: ' . $e->getMessage()], 500);
         }
     }

     // READ ALL
     public function index()
     {
         return response()->json(SubmitAssingment::all());
     }

     // READ ONE
     public function show($id)
     {
         $submitAssingment = SubmitAssingment::findOrFail($id);
         return response()->json($submitAssingment);
     }

     // UPDATE
     public function update(SubmitAssingmentRequests $request, $id)
     {
         $submitAssingment = SubmitAssingment::findOrFail($id);
         $submitAssingment->update($request->validated());

         return response()->json(['message' => 'Submit Assingment updated successfully', 'submitAssingment' => $submitAssingment]);
     }

     // DELETE
     public function destroy($id)
     {
         $submitAssingment = SubmitAssingment::findOrFail($id);
         $submitAssingment->delete();

         return response()->json(['message' => 'Submit Assingment deleted successfully']);
     }
}
