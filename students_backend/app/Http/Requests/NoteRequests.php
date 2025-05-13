<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use App\Models\Subject;

class NoteRequests extends FormRequest
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
            'subject_id'  => 'required|exists:subjects,subject_id',
            'document'    => 'required|file|mimes:pdf,doc,docx,ppt,pptx|max:5120', // Max 5MB
            'description' => 'required|string',
        ];
    }
    public function subjects()
    {
        return $this->belongsTo(Subject::class, 'subject_id', 'subject_id');
    }
}
