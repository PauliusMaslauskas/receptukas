import { Link } from '@inertiajs/react';
import { Timer } from 'lucide-react';

export interface RecipeCardProps {
    recipe: [];
}

export default function RecipeCard({ recipe }: RecipeCardProps) {
    return (
        <Link href={route('recipe.show', recipe.id)}>
            <div className="mb-4 rounded-lg bg-white p-6 shadow dark:bg-gray-800">
                <div
                    className={
                        'flex h-[300px] flex-col overflow-hidden rounded-xl'
                    }
                >
                    <div className={'h-1/3'}>
                        <img
                            className={
                                'h-full w-full rounded-t-2xl object-cover'
                            }
                            alt={'recipe'}
                            src={recipe.image_path}
                        />
                    </div>
                    <div className={'h-2/3'}>
                        <div className={'pt-4'}>
                            <div className="text-xl font-bold">
                                {recipe.name}
                            </div>
                        </div>
                        <div className={'flex gap-4 py-2'}>
                            {/*<div className="text-md font-mediums">{}</div>*/}
                            <div className="text-md flex gap-2">
                                <Timer size={20} /> {recipe.time_to_complete}{' '}
                                {'min'}
                            </div>
                        </div>
                        <div className="text-sm">{recipe.description}</div>
                    </div>
                </div>
            </div>
        </Link>
    );
}
