<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use App\Models\Faculty;
use App\Models\Department;

class CourseRequests extends FormRequest
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
            'course_name' => 'required|string|max:255',
            'description' => 'required|string',
            'faculties_id' => 'required|exists:faculties,faculties_id',
            'department_id' => 'required|exists:departments,department_id',
        ];
    }
    public function faculties()
    {
        return $this->belongsTo(Faculty::class, 'faculties_id', 'faculties_id');
    }

    public function departments()
    {
        return $this->belongsTo(Department::class, 'department_id', 'department_id');
    }
}
