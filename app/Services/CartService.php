<?php

namespace App\Services;

use App\Models\Cart;
use App\Models\CartItem;
use App\Models\Recipe;
use Illuminate\Http\RedirectResponse;

class CartService
{
    public function createCart($userId, string $name, int $recipeId = null): RedirectResponse
    {

        Cart::create([
            'user_id' => $userId,
            'name' => $name,
        ]);

        if ($recipeId) {
            $recipe = Recipe::findorfail($recipeId);

        }

        return redirect('/cart');
    }

    public function destroyCart($userId, $cartId): RedirectResponse
    {
        $cart = Cart::where('user_id', $userId)->where('id', $cartId)->first();

        if ($cart) {
            $cart->items()->delete();
            $cart->delete();
        }

        return redirect('/cart');
    }

    public function removeCartItem($cartId, $cartItemId)
    {

        $cartItem = CartItem::where('id', $cartItemId)
            ->where('cart_id', $cartId)->first();

        if ($cartItem) {
            $cartItem->delete();
        }
    }
}
