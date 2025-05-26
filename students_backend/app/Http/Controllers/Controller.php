<?php

namespace App\Http\Controllers;

use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Illuminate\Foundation\Validation\ValidatesRequests;
use Illuminate\Routing\Controller as BaseController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

class Controller extends BaseController
{
   
   
    use AuthorizesRequests, ValidatesRequests;

    public function lookup(Request $request)
    {
        $data = $request->validate([
            'table' => 'required|string',
            'mode' => 'required|string|in:get_id,get_attribute',
            'attribute' => 'required|string',
            'value' => 'required',
            'primary_key' => 'sometimes|string',
        ]);

        $table = $data['table'];
        $attribute = $data['attribute'];
        $value = $data['value'];
        $primaryKey = $data['primary_key'] ?? 'id';
        $mode = $data['mode'];

        // Check if the table exists
        if (!Schema::hasTable($table)) {
            return response()->json(['error' => 'Table not found.'], 404);
        }

        // Check if the attribute column exists
        if (!Schema::hasColumn($table, $attribute)) {
            return response()->json(['error' => 'Attribute column not found.'], 404);
        }

        // Check if the primary key column exists
        if (!Schema::hasColumn($table, $primaryKey)) {
            return response()->json(['error' => 'Primary key column not found.'], 404);
        }

        if ($mode === 'get_id') {
            // Get primary key (ID) from attribute
            $id = DB::table($table)
                ->where($attribute, $value)
                ->value($primaryKey);

            return $id
                ? response()->json([$primaryKey => $id])
                : response()->json(['error' => 'No matching record found.'], 404);

        } elseif ($mode === 'get_attribute') {
            // Get attribute value from primary key
            $attributeValue = DB::table($table)
                ->where($primaryKey, $value)
                ->value($attribute);

            return $attributeValue
                ? response()->json([$attribute => $attributeValue])
                : response()->json(['error' => 'No matching record found.'], 404);
        }

        // Invalid mode
        return response()->json(['error' => 'Invalid mode specified.'], 400);
    }

    



}