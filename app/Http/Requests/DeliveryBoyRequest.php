<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class DeliveryBoyRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
            'first_name'     => ['required', 'string', 'max:60'],
            'last_name'      => ['required', 'string', 'max:60'],
            'email'          => ['required','email', 'string', Rule::unique("users", "email")->ignore($this->delivery_boy), 'email', 'max:100'],
            'username'       => request('username') ? ['required', 'string', Rule::unique("users", "username")->ignore($this->delivery_boy), 'max:60'] : ['nullable'],
            'password'       => [$this->delivery_boy ? 'nullable' : 'required'],
            'phone'          => ['required','numeric'],
            'address'        => ['nullable', 'max:200'],
            'status'         => ['required', 'numeric'],
            'image'          => 'nullable|mimes:jpeg,jpg,png,gif|max:3096',
            'deposit_amount' => 'nullable|numeric',
            'limit_amount'   => 'nullable|numeric',
        ];
    }

}
