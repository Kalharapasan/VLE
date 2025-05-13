<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use App\Models\Assingment;
use App\Models\Subject;
use App\Models\Student;

class AssingmentMarkRequests extends FormRequest
{

    public function authorize(): bool
    {
        return true;
    }


    public function rules(): array
    {
        return [
            'assingment_id' => 'required|exists:assingments,assingment_id',
            'subject_id'    => 'required|exists:subjects,subject_id',
            'student_id'    => 'required|exists:students,student_id',
            'mark'          => 'required|integer|min:0|max:100',
            'garde'         => 'required|string|max:5',
        ];
    }
    public function assingments()
    {
        return $this->belongsTo(Assingment::class, 'assingment_id', 'assingment_id');
    }

    public function subjects()
    {
        return $this->belongsTo(Subject::class, 'subject_id', 'subject_id');
    }
    public function students()
    {
        return $this->belongsTo(Student::class, 'student_id', 'student_id');
    }
}
