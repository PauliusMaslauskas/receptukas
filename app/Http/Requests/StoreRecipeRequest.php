<?php

namespace App\Http\Requests;

use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class StoreRecipeRequest extends FormRequest
{
    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'name' => ['required', 'string', 'max:255'],
            'description' => ['required', 'string'],
            'image_path' => ['required', 'string'],
            'tags' => ['required', 'array'],
            'tags.*' => ['string'],
            'calories' => ['required', 'integer'],
            'time_to_complete' => ['required', 'integer'],
            'prep_time' => ['required', 'integer'],
            'difficulty' => ['required', 'string', Rule::in(['easy', 'medium', 'hard'])],
            'category' => ['required', 'string', Rule::in(['breakfast', 'lunch', 'dinner', 'dessert', 'snack'])],
            'recipe_instructions' => ['required', 'array'],
            'recipe_instructions.*' => ['string'],
        ];
    }
}
