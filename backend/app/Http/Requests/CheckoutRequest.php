<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class CheckoutRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'meetup_schedule' => ['required', 'date', 'after:now'],
        ];
    }

    public function messages(): array
    {
        return [
            'meetup_schedule.after' => 'The meetup schedule must be a future date and time.',
        ];
    }
}
