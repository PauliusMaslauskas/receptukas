<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Notifications\Notifiable;

class Cart extends Model
{
    use HasFactory, Notifiable, SoftDeletes;

    protected $fillable = ['user_id', 'name'];

    public function items(): HasMany
    {
        return $this->hasMany(CartItem::class);
    }
}
