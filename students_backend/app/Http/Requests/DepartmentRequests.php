<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use App\Models\Faculty;
class DepartmentRequests extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }


    public function rules(): array
    {
        return [
            'department_name' => 'required|string|max:255',
            'description'     => 'nullable|string',
            'img'             => 'nullable|image|mimes:jpeg,png,jpg,gif,svg|max:2048', // Max 2MB    
            'faculties_id'    => 'required|exists:faculties,faculties_id',
        ];
    }
    public function faculties()
    {
        return $this->belongsTo(Faculty::class, 'faculties_id', 'faculties_id');
    }
}
