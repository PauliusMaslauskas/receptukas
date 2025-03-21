import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Recipe } from '@/types';
import { Flame, Timer } from 'lucide-react';

interface RecipeProps {
    recipe: Recipe;
}

export default function RecipeComponent({ recipe }: RecipeProps): JSX.Element {
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
                <div className={'py-4'}>
                    <div className={'text-3xl font-bold'}>{recipe.name}</div>
                </div>
                <div className={'pb-4'}>
                    <p>{recipe.description}</p>
                </div>
                <div className="flex items-center justify-center gap-4 py-4">
                    <div className="flex aspect-square w-24 flex-col items-center justify-center text-center dark:bg-gray-800">
                        <Flame />
                        <p className="pt-1 text-sm">Calories</p>
                        <p className="text-lg">{recipe.calories}</p>
                    </div>
                    <div className="flex aspect-square w-24 flex-col items-center justify-center text-center dark:bg-gray-800">
                        <Timer />
                        <p className="pt-1 text-sm">Cook time</p>
                        <p className="text-lg">{recipe.time_to_complete} min</p>
                    </div>
                    <div className="flex aspect-square w-24 flex-col items-center justify-center text-center dark:bg-gray-800">
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
