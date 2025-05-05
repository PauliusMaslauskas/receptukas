<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\Product;
use App\Models\ProductCategory;
use Illuminate\Http\Request;

class ProductController extends Controller
{

    public function __construct()
    {

    }

    public function index(Request $request): mixed
    {
        $query = Product::query();

        if ($request->has('search')) {
            $query->where('name', 'like', '%'.$request->get('search').'%');
        }
        return $query->select('id', 'name')->get();
    }

    public function getProductsWithCategories()
    {
        return response()->json(ProductCategory::with('products')->get());
    }

}
