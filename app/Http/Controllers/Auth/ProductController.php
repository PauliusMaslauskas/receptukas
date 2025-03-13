<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\ProductCategory;

class ProductController extends Controller
{

    public function getProductsWithCategories()
    {
        return response()->json(ProductCategory::with('products')->get());
    }

}
