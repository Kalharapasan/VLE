<?php

namespace App\Http\Controllers;

use App\Http\Requests\AssingmentRequests;
use App\Models\Assingment;

class AssingmentController extends Controller
{
    // CREATE
    public function store(AssingmentRequests $request)
    {
        try {
            $assingment = Assingment::create($request->validated());

            return response()->json(['message' => 'Assingment added successfully', 'department' => $assingment]);
        } catch (\Exception $e) {
            return response()->json(['message' => 'Error: ' . $e->getMessage()], 500);
        }
    }

    // READ ALL
    public function index()
    {
        return response()->json(Assingment::all());
    }

    // READ ONE
    public function show($id)
    {
        $assingment = Assingment::findOrFail($id);
        return response()->json($assingment);
    }

    // UPDATE
    public function update(AssingmentRequests $request, $id)
    {
        $assingment = Assingment::findOrFail($id);
        $assingment->update($request->validated());

        return response()->json(['message' => 'Assingment updated successfully', 'faculty' => $assingment]);
    }

    // DELETE
    public function destroy($id)
    {
        $assingment = Assingment::findOrFail($id);
        $assingment->delete();

        return response()->json(['message' => 'Assingment deleted successfully']);
    }
}
