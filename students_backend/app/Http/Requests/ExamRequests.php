<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class ExamRequests extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

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
}
