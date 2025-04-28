<?php

namespace Database\Seeders;

use App\Models\Recipe;
use App\Models\RecipeInstruction;
use Illuminate\Database\Seeder;

class RecipeSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {

        $recipe = Recipe::create([
            'author_id' => 1,
            'name' => 'Cold Beet Soup | Šaltibarščiai',
            'description' => 'Growing up I was never a big fan of beetroot. I think this was due to the highly acidic pickled stuff you get in jars, which was pretty much the only type of beetroot available back then. My grandmother used it on all her salads and everything else on the plate would be tinted purple and tainted with its earthy, sour taste.',
            'ingredient_groups' => json_encode([
                [
                    "name" => "For the soup",
                    "items" => [
                        "200 g | 7 oz boiled & cooled beetroot",
                        "100 g | 3.5 oz cucumber",
                        "2 hard-boiled eggs",
                        "1.5 litres | 3 pints kefir",
                        "Bunch fresh dill",
                        "Juice of ½ a lemon (optional)",
                        "Salt to taste",
                    ],
                ],
                [
                    "name" => "For the side dish",
                    "items" => [
                        "200 g | 7 oz potatoes",
                    ],
                ]
            ]),
            'image_path' => '/images/recipe_image_2.png',
            'tags' => json_encode(["cold", "soup", "beats", "red", "summer", "refreshing"]),
            'calories' => '1000',
            'time_to_complete' => '20',
            'prep_time' => '5',
            'category' => 'lunch',
            'difficulty' => 'easy',
        ]);

        $recipeInstructions = [
            'Peel the potatoes and chop into bite-sized pieces. Place in a saucepan of boiling water, add a good pinch of salt and boil until a knife can easily pierce the flesh.',
            'While the potatoes are boiling, assemble the soup.',
            'Slice the beetroot & gherkins into fine julienne.',
            'Chop the eggs into small dice.',
            'Chop the scallions or onions leaves into 1 cm (½ inch) pieces.',
            'Finely chop the dill.',
            'Pour the kefir into a large bowl or saucepan and add the chopped ingredients and half of the lemon juice, holding back some of the dill for garnish.',
            'Taste and season salt and additional lemon juice as required.',
            'Ladle the soup into bowls and sprinkle with the remaining dill.',
            'Serve the potatoes on a side plate so that they do not heat the soup.',
        ];

        $stepNumber = 1;

        foreach ($recipeInstructions as $instructions) {
            RecipeInstruction::create([
                'recipe_id' => $recipe->id,
                'step_number' => $stepNumber,
                'instruction' => $instructions,
            ]);

            $stepNumber++;
        }
    }
}
