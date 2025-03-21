<?php

namespace App\Enums;

enum RecipeCategoryEnum: string
{
    case BREAKFAST = 'breakfast';
    case LUNCH = 'lunch';
    case DINNER = 'dinner';
    case DESERT = 'dessert';
    case SNACK = 'snack';
}
