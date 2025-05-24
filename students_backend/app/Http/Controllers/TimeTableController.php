<?php

namespace App\Http\Controllers;

use App\Http\Requests\TimeTableRequests;
use App\Models\TimeTable;

class TimeTableController extends Controller
{
     // CREATE
     public function store(TimeTableRequests $request)
     {
         try {
             $timeTable = TimeTable::create($request->validated());

             return response()->json(['message' => 'TimeTable added successfully', 'timeTable' => $timeTable]);
         } catch (\Exception $e) {
             return response()->json(['message' => 'Error: ' . $e->getMessage()], 500);
         }
     }

     // READ ALL
     public function index()
     {
         return response()->json(TimeTable::all());
     }

     // READ ONE
     public function show($id)
     {
         $timeTable = TimeTable::findOrFail($id);
         return response()->json($timeTable);
     }

     // UPDATE
     public function update(TimeTableRequests $request, $id)
     {
         $timeTable = TimeTable::findOrFail($id);
         $timeTable->update($request->validated());

         return response()->json(['message' => 'TimeTable updated successfully', 'timeTable' => $timeTable]);
     }

     // DELETE
     public function destroy($id)
     {
         $timeTable = TimeTable::findOrFail($id);
         $timeTable->delete();

         return response()->json(['message' => 'TimeTable deleted successfully']);
     }
     public function count()
    {
        $count = TimeTable::count();
        return response()->json(['timeTable_count' => $count]);
    }
}
