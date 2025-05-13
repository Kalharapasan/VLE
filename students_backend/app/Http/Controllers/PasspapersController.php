<?php

namespace App\Http\Controllers;

use App\Http\Requests\PasspapersRequests;
use App\Models\Passpapers;

class PasspapersController extends Controller
{
     // CREATE
     public function store(PasspapersRequests $request)
     {
         try {
             $passpapers = Passpapers::create($request->validated());

             return response()->json(['message' => 'Passpapers added successfully', 'passpapers' => $passpapers]);
         } catch (\Exception $e) {
             return response()->json(['message' => 'Error: ' . $e->getMessage()], 500);
         }
     }

     // READ ALL
     public function index()
     {
         return response()->json(Passpapers::all());
     }

     // READ ONE
     public function show($id)
     {
         $passpapers = Passpapers::findOrFail($id);
         return response()->json($passpapers);
     }

     // UPDATE
     public function update(PasspapersRequests $request, $id)
     {
         $passpapers = Passpapers::findOrFail($id);
         $passpapers->update($request->validated());

         return response()->json(['message' => 'Passpapers updated successfully', 'passpapers' => $passpapers]);
     }

     // DELETE
     public function destroy($id)
     {
         $passpapers = Passpapers::findOrFail($id);
         $passpapers->delete();

         return response()->json(['message' => 'Passpapers deleted successfully']);
     }
}
