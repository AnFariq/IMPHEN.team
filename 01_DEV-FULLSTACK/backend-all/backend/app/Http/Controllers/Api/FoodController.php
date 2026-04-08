<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Food;
use Illuminate\Http\Request;

class FoodController extends Controller
{
    // List Makanan dengan Search & Pagination
    public function index(Request $request)
    {
        $search = $request->query('search');
        $foods = Food::when($search, function($query, $search) {
            return $query->where('name', 'like', "%{$search}%");
        })->paginate(10);

        return response()->json($foods);
    }

    // Simpan Makanan Baru (Admin Side)
    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string',
            'calories_per_100g' => 'required|numeric',
            'protein' => 'nullable|numeric',
            'carbs' => 'nullable|numeric',
            'fat' => 'nullable|numeric',
        ]);

        $food = Food::create($validated);
        return response()->json($food, 201);
    }

    // Detail Makanan
    public function show(Food $food)
    {
        return response()->json($food);
    }
}