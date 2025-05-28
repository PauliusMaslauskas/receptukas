<?php

namespace App\Http\Controllers;

use App\Models\Cart;
use App\Services\CartService;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class CartController extends Controller
{
    public function __construct(public CartService $cartService)
    {
    }

    public function index()
    {
        $user = Auth::user();

        $carts = Cart::with('items')->where('user_id', $user->id)->get();

        return Inertia::render('Carts/CartList', ['carts' => $carts]);
    }

    public function show($id)
    {
        $cart = Cart::with('items.product')->findOrFail($id);

        return Inertia::render('Carts/CartView', [
            'cart' => $cart,
        ]);
    }

    public function store(Request $request): void
    {
        $request->validate([
            'name' => 'required|string',
            'recipe_id' => 'nullable|int'
        ]);

        $user = auth()->user();

        $this->cartService->createCart($user->id, $request->name, $request->recipe_id);
    }

    public function destroy(Request $request): void
    {
        $request->validate([
            'cart_id' => 'required|exists:carts,id',
        ]);

        $user = auth()->user();

        $this->cartService->destroyCart($user->id, $request->cart_id);

    }

    public function removeCartItem(Request $request): RedirectResponse
    {
        $request->validate([
            'cart_id' => 'required|exists:carts,id',
            'cart_item_id' => 'required|exists:cart_items,id',
        ]);
        $this->cartService->removeCartItem($request->cart_id, $request->cart_item_id);

        return redirect()->route('cart.show', $request->input('cart_id'));
    }
}
