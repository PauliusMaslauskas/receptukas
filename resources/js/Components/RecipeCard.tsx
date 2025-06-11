import { Link } from '@inertiajs/react';
import { Timer } from 'lucide-react';

export interface RecipeCardProps {
    recipe: [];
}

export default function RecipeCard({ recipe }: RecipeCardProps) {
    return (
        <Link href={route('recipe.show', recipe.id)}>
            <div className="mb-4 rounded-lg bg-white p-6 shadow dark:bg-yellow-primary">
                <div className={'flex flex-col overflow-hidden rounded-xl'}>
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
                        <div className="line-clamp-3 text-sm text-black">
                            {recipe.description}
                        </div>
                        <div className="flex flex-wrap gap-2 pt-2.5 text-sm">
                            {JSON.parse(recipe.tags)
                                .flat()
                                .slice(0, 4)
                                .map((tag, index) => (
                                    <div
                                        key={index}
                                        className="flex items-center rounded-[8px] bg-red-primary px-3 py-1 text-white"
                                    >
                                        {tag}
                                    </div>
                                ))}
                            {JSON.parse(recipe.tags).length >= 6 && (
                                <div className="flex items-center gap-1 rounded-[8px] bg-red-primary px-3 py-1 text-gray-200">
                                    {'+'}
                                    {JSON.parse(recipe.tags).length - 4}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </Link>
    );
}
