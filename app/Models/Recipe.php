<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Notifications\Notifiable;

class Recipe extends Model
{
    use HasFactory;
    use SoftDeletes;
    use Notifiable;

    protected $guarded = ['id'];

    protected $casts = [
        'ingredients' => 'array'
    ];

    public function products()
    {
        return $this->hasMany(Product::class);
    }

    public function instructions()
    {
        return $this->hasMany(RecipeInstruction::class);
    }

    public function recipeItem()
    {
        return $this->hasMany(RecipeItem::class);
    }
}
