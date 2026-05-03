<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class AdminRequests extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'admin_fname'    => 'required|string|max:255',
            'admin_lname'    => 'required|string|max:255',
            'admin_birthday' => 'required|date',
            'admin_email'    => 'required|email',
            'admin_nic'      => 'required|string|max:20',
            'admin_gender'   => 'required|in:male,female,other',
            'admin_address'  => 'required|string|max:255',
            'admin_img'      => 'nullable|image|mimes:jpg,jpeg,png|max:2048',
        ];
    }
}
