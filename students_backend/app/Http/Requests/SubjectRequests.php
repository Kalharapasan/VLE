<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class SubjectRequests extends FormRequest
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
            'subject_name' => 'required|string|max:255|unique:subjects,subject_name',
            'credite'=> 'required|integer|min:1|max:10', // Assuming credit range is 1-10
            'description'  => 'required|string',
            'img'          => 'nullable|image|mimes:jpg,jpeg,png|max:2048', // Max 2MB
        ];
    }
}
