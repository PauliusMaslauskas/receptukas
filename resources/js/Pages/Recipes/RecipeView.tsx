import PrimaryButton from '@/Components/PrimaryButton';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Recipe } from '@/types';
import { router } from '@inertiajs/react';
import { Flame, Timer } from 'lucide-react';
import { toast } from 'react-toastify';

interface RecipeProps {
    recipe: Recipe;
}

export default function RecipeComponent({ recipe }: RecipeProps): JSX.Element {
    const parsedIngredientGroups = JSON.parse(recipe.ingredient_groups);

    const addRecipeItemsToCart = (e) => {
        router.post(
            route('cart.store'),
            {
                name: recipe.name,
                recipe_id: recipe.id,
            },
            {
                onSuccess: () => {
                    toast.success('Recipe cart created');
                },
            },
        );
    };

    return (
        <AuthenticatedLayout title={''}>
            <div className={'pb-4'}>
                <div className={'h-1/3'}>
                    <img
                        className={''}
                        alt={'recipe'}
                        src={recipe.image_path}
                    />
                </div>
                <div className={'flex justify-between py-4'}>
                    <div className={'text-3xl font-bold'}>{recipe.name}</div>
                    <div>
                        <PrimaryButton onClick={(e) => addRecipeItemsToCart(e)}>
                            Create recipe cart
                        </PrimaryButton>
                    </div>
                </div>
                <div className={'pb-4'}>
                    <p>{recipe.description}</p>
                </div>
                <div>
                    <div className={'text-3xl font-bold'}>Ingredients</div>
                </div>
                <div className={'py-4'}>
                    {parsedIngredientGroups.map((group, index) => (
                        <div key={index}>
                            <div className={'text-xl'}>{group.name}:</div>
                            <ol className="ml-5 list-decimal">
                                {group.items.map((item, idx) => (
                                    <li key={idx}>{item}</li>
                                ))}
                            </ol>
                        </div>
                    ))}
                </div>
                <div className="flex items-center justify-center gap-4 py-4">
                    <div className="dark:bg-yellow-primary flex aspect-square w-24 flex-col items-center justify-center text-center">
                        <Flame />
                        <p className="pt-1 text-sm">Calories</p>
                        <p className="text-lg">{recipe.calories}</p>
                    </div>
                    <div className="dark:bg-yellow-primary flex aspect-square w-24 flex-col items-center justify-center text-center">
                        <Timer />
                        <p className="pt-1 text-sm">Cook time</p>
                        <p className="text-lg">{recipe.time_to_complete} min</p>
                    </div>
                    <div className="dark:bg-yellow-primary flex aspect-square w-24 flex-col items-center justify-center text-center">
                        <Timer />
                        <p className="pt-1 text-sm">Prep time</p>
                        <p className="text-lg">{recipe.prep_time} min</p>
                    </div>
                </div>
                <div className={'pt-2 text-3xl font-bold'}>Instructions</div>
                <div className={'pb-12 pt-2'}>
                    {recipe.instructions?.map((instruction) => (
                        <div key={instruction.id} className={'flex gap-2'}>
                            <div>
                                {instruction.step_number}
                                {'.'}
                            </div>
                            <div>{instruction.instruction}</div>
                        </div>
                    ))}
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
