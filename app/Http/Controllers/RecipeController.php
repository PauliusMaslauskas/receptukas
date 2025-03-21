<?php

namespace App\Http\Controllers;

use App\Models\Recipe;
use Illuminate\Http\Request;
use Inertia\Inertia;

class RecipeController extends Controller
{
    public function index()
    {
        $recipes = Recipe::all();
        return Inertia::render('Welcome', [
            'recipes' => $recipes ?? []
        ]);
    }

    public function show($id)
    {
        $recipe = Recipe::with('instructions')->find($id);
        return Inertia::render('Recipes/RecipeView', [
            'recipe' => $recipe
        ]);
    }

    public function create()
    {
        return Inertia::render('Recipes/RecipeCreate');
    }

    public function store(Request $request)
    {
        dd($request->all());


    }
}
