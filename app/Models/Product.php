<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;

class Product extends Authenticatable
{
    use HasFactory, Notifiable, SoftDeletes;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'name',
        'description',
        'price',
        'quantity',
        'category',
    ];

    /**
     * The attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function cast(): array
    {
        return [
            'price' => 'integer',
            'quantity' => 'integer',
        ];
    }

    public function category()
    {
        return $this->belongsTo(ProductCategory::class);
    }

    public function recipe()
    {
        return $this->belongsTo(Recipe::class);
    }
}
