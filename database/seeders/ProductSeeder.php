<?php

namespace Database\Seeders;

use App\Models\Product;
use App\Models\ProductCategory;
use Illuminate\Database\Seeder;

class ProductSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $categories = [
            'Seasoning',
            'Snacks',
            'Beverages',
            'Bakery',
            'Fruits',
            'Vegetables',
            'Dairy',
            'Grains',
            'Meat',
        ];

        $productsData = [
            'Seasoning' => [
                ['name' => 'Salt', 'price' => 99],
                ['name' => 'Pepper', 'price' => 149],
                ['name' => 'Oregano', 'price' => 199],
                ['name' => 'Paprika', 'price' => 179],
                ['name' => 'Cumin', 'price' => 189],
                ['name' => 'Chili Powder', 'price' => 169],
            ],
            'Snacks' => [
                ['name' => 'Chips', 'price' => 250],
                ['name' => 'Popcorn', 'price' => 200],
                ['name' => 'Granola Bar', 'price' => 180],
                ['name' => 'Trail Mix', 'price' => 300],
                ['name' => 'Pretzels', 'price' => 220],
            ],
            'Beverages' => [
                ['name' => 'Orange Juice', 'price' => 350],
                ['name' => 'Water Bottle', 'price' => 120],
                ['name' => 'Milk', 'price' => 240],
                ['name' => 'Coffee', 'price' => 450],
                ['name' => 'Green Tea', 'price' => 300],
            ],
            'Bakery' => [
                ['name' => 'Bread', 'price' => 180],
                ['name' => 'Croissant', 'price' => 220],
                ['name' => 'Bagel', 'price' => 200],
                ['name' => 'Muffin', 'price' => 210],
                ['name' => 'Baguette', 'price' => 230],
            ],
            'Fruits' => [
                ['name' => 'Apple', 'price' => 130],
                ['name' => 'Banana', 'price' => 90],
                ['name' => 'Grapes', 'price' => 190],
                ['name' => 'Strawberries', 'price' => 240],
                ['name' => 'Blueberries', 'price' => 260],
                ['name' => 'Lemon', 'price' => 200],
            ],
            'Vegetables' => [
                ['name' => 'Carrot', 'price' => 100],
                ['name' => 'Tomato', 'price' => 110],
                ['name' => 'Cucumber', 'price' => 120],
                ['name' => 'Broccoli', 'price' => 150],
                ['name' => 'Spinach', 'price' => 140],
                ['name' => 'Potato', 'price' => 95],
                ['name' => 'Onion', 'price' => 85],
                ['name' => 'Beetroot', 'price' => 35],
                ['name' => 'Dill', 'price' => 35],
            ],
            'Dairy' => [
                ['name' => 'Cheddar Cheese', 'price' => 350],
                ['name' => 'Yogurt', 'price' => 200],
                ['name' => 'Butter', 'price' => 250],
                ['name' => 'Cream Cheese', 'price' => 270],
                ['name' => 'Sour Cream', 'price' => 230],
                ['name' => 'Kefir Cream', 'price' => 200],
            ],
            'Grains' => [
                ['name' => 'Rice', 'price' => 300],
                ['name' => 'Quinoa', 'price' => 400],
                ['name' => 'Oats', 'price' => 320],
                ['name' => 'Pasta', 'price' => 280],
                ['name' => 'Couscous', 'price' => 330],
            ],
            'Meat' => [
                ['name' => 'Chicken Breast', 'price' => 700],
                ['name' => 'Ground Beef', 'price' => 650],
                ['name' => 'Pork Chops', 'price' => 680],
                ['name' => 'Sausages', 'price' => 620],
                ['name' => 'Bacon', 'price' => 590],
                ['name' => 'Eggs', 'price' => 900],
            ],
        ];

        foreach ($categories as $categoryName) {
            $category = ProductCategory::create(['name' => $categoryName]);

            foreach ($productsData[$categoryName] as $product) {
                Product::create([
                    'name' => $product['name'],
                    'slug' => $product['name'],
                    'category_id' => $category->id,
                    'price' => $product['price'],
                ]);
            }
        }

    }
}
