<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class RegisterRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'first_name' => ['required', 'string', 'max:255'],
            'last_name' => ['required', 'string', 'max:255'],
            'email' => [
                'required', 
                'string', 
                'email', 
                'unique:users,email',
                'regex:/^.+@(student\.apc\.edu\.ph|apc\.edu\.ph)$/'
            ],
            'password' => ['required', 'string', 'min:6'],
            'student_id' => ['required', 'string', 'unique:users,student_id'],
            'phone' => ['nullable', 'string'],
        ];
    }

    public function messages(): array
    {
        return [
            'email.regex' => 'The email must be a valid APC student or faculty email (@student.apc.edu.ph or @apc.edu.ph).',
            'student_id.unique' => 'This student ID is already registered.',
        ];
    }
}
