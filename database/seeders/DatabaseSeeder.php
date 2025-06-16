<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        User::factory()->create([
            'name' => 'John Doe',
            'email' => 'johndoe@example.com',
            'password' => 'secret',
        ]);

        User::factory()->create([
            'name' => 'Admin Example',
            'email' => 'admin@example.com',
            'password' => 'secret',
        ]);

        $this->call([
            ProductSeeder::class,
            RecipeSeeder::class,
        ]);
    }
}
