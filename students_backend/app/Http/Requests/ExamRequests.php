<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use App\Models\Faculty;
use App\Models\Department;

class ExamRequests extends FormRequest
{

    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'exam_name'        => 'required|string|max:255',
            'exam_start_date'  => 'required|date',
            'exam_end_date'    => 'required|date|after_or_equal:exam_start_date',
            'faculties_id'     => 'required|exists:faculties,faculties_id',
            'department_id'    => 'required|exists:departments,department_id',
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
