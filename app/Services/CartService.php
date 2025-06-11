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

        $cart = Cart::create([
            'user_id' => $userId,
            'name' => $name,
        ]);

        if ($recipeId) {
            $recipe = Recipe::findOrFail($recipeId);

            foreach ($recipe->recipeItem as $item) {
                $this->addCartItem($cart,
                    [
                        'product_id' => $item->product_id,
                        'quantity' => $item->quantity
                    ]);
            }
        }
        return redirect('/cart');
    }

    public function addOrUpdateCartItem(Cart $cart, array $item)
    {
        $itemInCart = $cart->items()->where('product_id', $item['product_id'])->first();

        if ($itemInCart) {
            $itemInCart->increment('quantity', $item['quantity']);
            return $itemInCart;
        }

        return $cart->items()->create([
                'product_id' => $item['product_id'],
                'quantity' => $item['quantity']
            ]
        );
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
