<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreRecipeRequest;
use App\Models\Recipe;
use App\Services\RecipeService;
use Illuminate\Http\RedirectResponse;
use Inertia\Inertia;

class RecipeController extends Controller
{
    public function __construct(public RecipeService $recipeService) {}

    public function index()
    {
        $recipes = Recipe::all();

        return Inertia::render('Welcome', [
            'recipes' => $recipes ?? [],
        ]);
    }

    public function show($id)
    {
        $recipe = Recipe::with('instructions')->find($id);

        return Inertia::render('Recipes/RecipeView', [
            'recipe' => $recipe,
        ]);
    }

    public function create()
    {
        return Inertia::render('Recipes/RecipeCreate');
    }

    public function store(StoreRecipeRequest $request): RedirectResponse
    {
        return $this->recipeService->createRecipe($request->validated());
    }
}
