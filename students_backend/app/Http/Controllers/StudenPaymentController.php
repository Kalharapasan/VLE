<?php

namespace App\Http\Controllers;


use App\Http\Requests\StudenPaymentRequests;
use App\Models\StudenPayment;


class StudenPaymentController extends Controller
{
     // CREATE
     public function store(StudenPaymentRequests $request)
     {
         try {
             $studenPayment = StudenPayment::create($request->validated());

             return response()->json(['message' => 'StudenPayment added successfully', 'studenPayment' => $studenPayment]);
         } catch (\Exception $e) {
             return response()->json(['message' => 'Error: ' . $e->getMessage()], 500);
         }
     }

     // READ ALL
     public function index()
     {
         return response()->json(StudenPayment::all());
     }

     // READ ONE
     public function show($id)
     {
         $studenPayment = StudenPayment::findOrFail($id);
         return response()->json($studenPayment);
     }

     // UPDATE
     public function update(StudenPaymentRequests $request, $id)
     {
         $studenPayment = StudenPayment::findOrFail($id);
         $studenPayment->update($request->validated());

         return response()->json(['message' => 'StudenPayment updated successfully', 'studenPayment' => $studenPayment]);
     }

     // DELETE
     public function destroy($id)
     {
         $studenPayment = StudenPayment::findOrFail($id);
         $studenPayment->delete();

         return response()->json(['message' => 'StudenPayment deleted successfully']);
     }
}
