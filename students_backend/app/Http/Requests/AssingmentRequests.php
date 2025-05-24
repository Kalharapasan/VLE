<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use App\Models\Teacher;
use App\Models\Subject;

class AssingmentRequests extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
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
            'assingment_name'         => 'required|string|max:255',
            'assingment_start_date'   => 'required|date',
            'assingment_end_date'     => 'required|date|after_or_equal:assingment_start_date',
            'document'                => 'required|file|mimes:pdf,doc,docx|max:5120', // Max 5MB
            'img'                    => 'nullable|image|mimes:jpg,jpeg,png|max:2048', // Max 2MB
            'description'             => 'required|string',
            'subject_id'              => 'required|exists:subjects,subject_id',
            'teacher_id'              => 'required|exists:teachers,teacher_id',
        ];
    }
    public function subjects()
    {
        return $this->belongsTo(Subject::class, 'subject_id', 'subject_id');
    }
    public function teachers()
    {
        return $this->belongsTo(Teacher::class, 'teacher_id', 'teacher_id');
    }
}

