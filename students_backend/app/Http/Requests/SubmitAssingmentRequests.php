<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use App\Models\Assingment;
use App\Models\Subject;
use App\Models\Student;

class SubmitAssingmentRequests extends FormRequest
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
            'assingment_id' => 'required|exists:assingments,assingment_id',
            'subject_id'    => 'required|exists:subjects,subject_id',
            'student_id'    => 'required|exists:students,student_id',
            'document'      => 'required|file|mimes:pdf,doc,docx|max:5120', // Max 5MB
            'description'   => 'required|string',
        ];
    }
    public function subjects()
    {
        return $this->belongsTo(Subject::class, 'subject_id', 'subject_id');
    }
    public function students()
    {
        return $this->belongsTo(Student::class, 'student_id', 'student_id');
    }
    public function assingments()
    {
        return $this->belongsTo(Assingment::class, 'assingment_id', 'assingment_id');
    }

}
