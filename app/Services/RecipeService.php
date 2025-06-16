<?php

namespace App\Services;

use App\Models\Recipe;
use App\Models\RecipeInstruction;
use Illuminate\Http\RedirectResponse;

class RecipeService
{
    public function createRecipe(array $data): RedirectResponse
    {
        $user = auth()->user();
        $filePath = null;
        if (request()->hasFile('image_path')) {
            $filePath = request()->file('image_path')->store('recipes', 'public');
            $filePath = request()->getSchemeAndHttpHost().'/storage/'.$filePath;
        }

        // TODO REFACTOR INGREDIENT GROUPING TO SEPARATE TABLE

        $recipe = Recipe::create([
            'author_id' => $user->id,
            'name' => $data['name'],
            'description' => $data['description'],
            'ingredient_groups' => json_encode($data['ingredient_groups']),
            'image_path' => $filePath,
            'tags' => json_encode($data['tags']),
            'calories' => $data['calories'],
            'time_to_complete' => $data['time_to_complete'],
            'prep_time' => $data['prep_time'],
            'category' => $data['category'],
            'difficulty' => $data['difficulty'],
        ]);

        $recipeInstructions = $data['recipe_instructions'];
        $stepNumber = 1;

        foreach ($recipeInstructions as $instructions) {

            RecipeInstruction::create([
                'recipe_id' => $recipe->id,
                'step_number' => $stepNumber,
                'instruction' => $instructions,
            ]);

            $stepNumber++;
        }

        return redirect()->route('recipe.show', $recipe->id);

    }
}
