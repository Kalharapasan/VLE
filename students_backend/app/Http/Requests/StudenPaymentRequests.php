<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use App\Models\Student;

class StudenPaymentRequests extends FormRequest
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
            'student_id'      => 'required|exists:students,student_id',
            'payment_reason'  => 'required|string|max:255',
            'description'     => 'required|string',
        ];

    }
    public function students()
    {
        return $this->belongsTo(Student::class, 'student_id', 'student_id');
    }
}
