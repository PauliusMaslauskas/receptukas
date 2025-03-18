export interface RecipeCardProps {
    recipe: [];
}

export default function RecipeCard({ recipe }: RecipeCardProps) {
    return (
        <div className={'flex h-[300px] flex-col overflow-hidden rounded-xl'}>
            <div className={'h-1/3'}>
                <img
                    className={'h-full w-full rounded-t-2xl object-cover'}
                    alt={'recipe'}
                    src={recipe.image_path}
                />
            </div>
            <div className={'h-2/3'}>
                <div className={'pt-4'}>
                    <div className="text-xl font-bold">{recipe.name}</div>
                </div>
                <div className={'flex gap-4 py-2'}>
                    {/*<div className="text-md font-mediums">{}</div>*/}
                    <div className="text-md">
                        {recipe.time_to_complete} {'min'}
                    </div>
                </div>
                <div className="text-sm">{recipe.description}</div>
            </div>
        </div>
    );
}
