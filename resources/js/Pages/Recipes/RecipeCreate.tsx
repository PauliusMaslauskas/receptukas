import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import ProductSelect from '@/Pages/Recipes/Components/ProductSelect';
import { Head, router } from '@inertiajs/react';
import { useState } from 'react';
import { toast } from 'react-toastify';

export default function RecipeCreate() {
    const [values, setValues] = useState({
        name: '',
        description: '',
        image_path: null,
        tags: [],
        calories: '',
        time_to_complete: '',
        prep_time: '',
        difficulty: '',
        category: '',
        recipe_instructions: [],
        ingredients: [],
        ingredient_groups: [
            {
                name: '',
                items: [],
            },
        ],
    });

    const [tagInput, setTagInput] = useState('');
    const [stepInput, setStepInput] = useState('');
    const [ingredientInput, setIngredientInput] = useState('');
    const [newGroupName, setNewGroupName] = useState('');
    const [activeGroupIndex, setActiveGroupIndex] = useState(0);
    const [errors, setErrors] = useState({});

    const difficultyOptions = ['easy', 'medium', 'hard'];
    const categoryOptions = [
        'breakfast',
        'lunch',
        'dinner',
        'dessert',
        'snack',
    ];

    const handleChange = (e) => {
        const key = e.target.id;
        const value = e.target.value;

        setValues((values) => ({
            ...values,
            [key]: value,
        }));
    };

    const handleTagInput = (e) => {
        setTagInput(e.target.value);
    };

    const handleStepInput = (e) => {
        setStepInput(e.target.value);
    };

    const handleIngredientInput = (e) => {
        setIngredientInput(e.target.value);
    };

    const addTag = () => {
        if (tagInput.trim() !== '' && !values.tags.includes(tagInput.trim())) {
            setValues((values) => ({
                ...values,
                tags: [...values.tags, tagInput.trim()],
            }));
            setTagInput('');
        }
    };

    const removeTag = (tagToRemove) => {
        setValues((values) => ({
            ...values,
            tags: values.tags.filter((tag) => tag !== tagToRemove),
        }));
    };

    const addStep = () => {
        if (stepInput.trim() !== '') {
            setValues((values) => ({
                ...values,
                recipe_instructions: [
                    ...values.recipe_instructions,
                    stepInput.trim(),
                ],
            }));
            setStepInput('');
        }
    };

    const removeStep = (index) => {
        setValues((values) => ({
            ...values,
            recipe_instructions: values.recipe_instructions.filter(
                (_, i) => i !== index,
            ),
        }));
    };

    const addIngredientGroup = () => {
        if (newGroupName.trim() !== '') {
            setValues((values) => ({
                ...values,
                ingredient_groups: [
                    ...values.ingredient_groups,
                    {
                        name: newGroupName.trim(),
                        items: [],
                    },
                ],
            }));
            setNewGroupName('');
            setActiveGroupIndex(values.ingredient_groups.length);
        }
    };

    const removeIngredientGroup = (index) => {
        if (values.ingredient_groups.length <= 1) return;

        setValues((values) => {
            const newGroups = values.ingredient_groups.filter(
                (_, i) => i !== index,
            );

            if (activeGroupIndex === index) {
                setActiveGroupIndex(0);
            } else if (activeGroupIndex > index) {
                setActiveGroupIndex(activeGroupIndex - 1);
            }

            return {
                ...values,
                ingredient_groups: newGroups,
            };
        });
    };

    const renameIngredientGroup = (index, newName) => {
        if (newName.trim() === '') return;

        setValues((values) => {
            const newGroups = [...values.ingredient_groups];
            newGroups[index] = {
                ...newGroups[index],
                name: newName.trim(),
            };

            return {
                ...values,
                ingredient_groups: newGroups,
            };
        });
    };

    const removeIngredient = (groupIndex, itemIndex) => {
        setValues((values) => {
            const newGroups = [...values.ingredient_groups];

            newGroups[groupIndex] = {
                ...newGroups[groupIndex],
                items: newGroups[groupIndex].items.filter(
                    (_, i) => i !== itemIndex,
                ),
            };

            const allIngredients = newGroups.flatMap((group) => group.items);

            return {
                ...values,
                ingredients: allIngredients,
                ingredient_groups: newGroups,
            };
        });
    };

    const moveIngredientUp = (groupIndex, itemIndex) => {
        if (itemIndex === 0) return;

        setValues((values) => {
            const newGroups = [...values.ingredient_groups];
            const groupItems = [...newGroups[groupIndex].items];

            const temp = groupItems[itemIndex];
            groupItems[itemIndex] = groupItems[itemIndex - 1];
            groupItems[itemIndex - 1] = temp;

            newGroups[groupIndex] = {
                ...newGroups[groupIndex],
                items: groupItems,
            };

            const allIngredients = newGroups.flatMap((group) => group.items);

            return {
                ...values,
                ingredients: allIngredients,
                ingredient_groups: newGroups,
            };
        });
    };

    const moveIngredientDown = (groupIndex, itemIndex) => {
        const groupItems = values.ingredient_groups[groupIndex].items;
        if (itemIndex === groupItems.length - 1) return;

        setValues((values) => {
            const newGroups = [...values.ingredient_groups];
            const groupItems = [...newGroups[groupIndex].items];

            const temp = groupItems[itemIndex];
            groupItems[itemIndex] = groupItems[itemIndex + 1];
            groupItems[itemIndex + 1] = temp;

            newGroups[groupIndex] = {
                ...newGroups[groupIndex],
                items: groupItems,
            };

            const allIngredients = newGroups.flatMap((group) => group.items);

            return {
                ...values,
                ingredients: allIngredients,
                ingredient_groups: newGroups,
            };
        });
    };

    const moveStepUp = (index) => {
        if (index === 0) return;

        const newrecipe_instructions = [...values.recipe_instructions];
        const temp = newrecipe_instructions[index];
        newrecipe_instructions[index] = newrecipe_instructions[index - 1];
        newrecipe_instructions[index - 1] = temp;

        setValues((values) => ({
            ...values,
            recipe_instructions: newrecipe_instructions,
        }));
    };

    const moveStepDown = (index) => {
        if (index === values.recipe_instructions.length - 1) return;

        const newrecipe_instructions = [...values.recipe_instructions];
        const temp = newrecipe_instructions[index];
        newrecipe_instructions[index] = newrecipe_instructions[index + 1];
        newrecipe_instructions[index + 1] = temp;

        setValues((values) => ({
            ...values,
            recipe_instructions: newrecipe_instructions,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        router.post(route('recipe.store'), values, {
            onError: (errors) => {
                setErrors(errors);
            },
            onSuccess: () => {
                toast('Recipe created');
            },
        });
    };

    return (
        <AuthenticatedLayout title={'Create Recipe'}>
            <Head title="Create Recipe" />

            <div className="py-6">
                <div className="mx-auto max-w-3xl sm:px-6 lg:px-8">
                    <div className="rounded-lg bg-gray-800 p-6 shadow">
                        <h2 className="mb-6 text-xl font-semibold text-white">
                            Create New Recipe
                        </h2>

                        <form onSubmit={handleSubmit}>
                            <div className="space-y-6">
                                <div>
                                    <label
                                        htmlFor="name"
                                        className="block text-sm font-medium text-gray-300"
                                    >
                                        Recipe Name
                                    </label>
                                    <input
                                        type="text"
                                        id="name"
                                        value={values.name}
                                        onChange={handleChange}
                                        className="mt-1 block w-full rounded-md border-gray-600 bg-gray-700 text-white shadow-sm focus:border-green-500 focus:ring focus:ring-green-500 focus:ring-opacity-50"
                                        required
                                    />
                                    {errors.name && (
                                        <div className="mt-1 text-sm text-red-500">
                                            {errors.name}
                                        </div>
                                    )}
                                </div>

                                <div>
                                    <label
                                        htmlFor="description"
                                        className="block text-sm font-medium text-gray-300"
                                    >
                                        Description
                                    </label>
                                    <textarea
                                        id="description"
                                        value={values.description}
                                        onChange={handleChange}
                                        rows="3"
                                        className="mt-1 block w-full rounded-md border-gray-600 bg-gray-700 text-white shadow-sm focus:border-green-500 focus:ring focus:ring-green-500 focus:ring-opacity-50"
                                        required
                                    />
                                    {errors.description && (
                                        <div className="mt-1 text-sm text-red-500">
                                            {errors.description}
                                        </div>
                                    )}
                                </div>

                                <div>
                                    <label
                                        htmlFor="image_path"
                                        className="block text-sm font-medium text-gray-300"
                                    >
                                        Recipe Image
                                    </label>
                                    <input
                                        type="file"
                                        id="image_path"
                                        onChange={(e) => {
                                            setValues({
                                                ...values,
                                                image_path: e.target.files[0],
                                            });
                                        }}
                                        className="mt-1 block w-full rounded-md border-gray-600 bg-gray-700 text-white shadow-sm focus:border-green-500 focus:ring focus:ring-green-500 focus:ring-opacity-50"
                                    />
                                </div>

                                <div>
                                    <label className="mb-2 block text-sm font-medium text-gray-300">
                                        Tags
                                    </label>
                                    <div className="flex">
                                        <input
                                            type="text"
                                            value={tagInput}
                                            onChange={handleTagInput}
                                            className="flex-grow rounded-l-md border-gray-600 bg-gray-700 text-white shadow-sm focus:border-green-500 focus:ring focus:ring-green-500 focus:ring-opacity-50"
                                            placeholder="Add a tag (e.g. 'vegan', 'spicy')"
                                        />
                                        <button
                                            type="button"
                                            onClick={addTag}
                                            className="rounded-r-md border border-gray-600 px-4 py-2 text-white hover:bg-green-700"
                                        >
                                            Add
                                        </button>
                                    </div>

                                    <div className="mt-2 flex flex-wrap gap-2">
                                        {values.tags.map((tag, index) => (
                                            <div
                                                key={index}
                                                className="flex items-center rounded-full bg-gray-700 px-3 py-1 text-gray-200"
                                            >
                                                {tag}
                                                <button
                                                    type="button"
                                                    onClick={() =>
                                                        removeTag(tag)
                                                    }
                                                    className="ml-2 text-gray-400 hover:text-white"
                                                >
                                                    ×
                                                </button>
                                            </div>
                                        ))}
                                    </div>
                                    {errors.tags && (
                                        <div className="mt-1 text-sm text-red-500">
                                            {errors.tags}
                                        </div>
                                    )}
                                </div>

                                <div>
                                    <div className="mb-2 flex items-center justify-between">
                                        <label className="block text-sm font-medium text-gray-300">
                                            Ingredients
                                        </label>
                                        <div className="flex items-center space-x-2">
                                            <input
                                                type="text"
                                                value={newGroupName}
                                                onChange={(e) =>
                                                    setNewGroupName(
                                                        e.target.value,
                                                    )
                                                }
                                                placeholder="New group name"
                                                className="rounded-md border-gray-600 bg-gray-700 px-2 py-1 text-sm text-white shadow-sm focus:border-green-500 focus:ring focus:ring-green-500 focus:ring-opacity-50"
                                            />
                                            <button
                                                type="button"
                                                onClick={addIngredientGroup}
                                                className="rounded-md border border-gray-600 px-2 py-1 text-sm text-white hover:bg-green-700"
                                            >
                                                Add Group
                                            </button>
                                        </div>
                                    </div>

                                    <div className="mb-4 flex flex-wrap gap-2">
                                        {values.ingredient_groups.map(
                                            (group, index) => (
                                                <button
                                                    key={index}
                                                    type="button"
                                                    onClick={() =>
                                                        setActiveGroupIndex(
                                                            index,
                                                        )
                                                    }
                                                    className={`rounded-md px-3 py-1 text-sm ${
                                                        activeGroupIndex ===
                                                        index
                                                            ? 'bg-green-700 text-white'
                                                            : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                                                    }`}
                                                >
                                                    {group.name} (
                                                    {group.items.length})
                                                </button>
                                            ),
                                        )}
                                    </div>

                                    <div className="rounded-md border border-gray-700 bg-gray-900 p-3">
                                        <div className="mb-4 flex items-center justify-between">
                                            <div className="flex items-center space-x-2">
                                                <h4 className="font-medium text-gray-300">
                                                    {
                                                        values
                                                            .ingredient_groups[
                                                            activeGroupIndex
                                                        ].name
                                                    }
                                                </h4>
                                                <button
                                                    type="button"
                                                    onClick={() => {
                                                        const newName = prompt(
                                                            'Enter new name for this group:',
                                                            values
                                                                .ingredient_groups[
                                                                activeGroupIndex
                                                            ].name,
                                                        );
                                                        if (newName) {
                                                            renameIngredientGroup(
                                                                activeGroupIndex,
                                                                newName,
                                                            );
                                                        }
                                                    }}
                                                    className="rounded-md border border-gray-600 px-2 py-1 text-xs text-gray-400 hover:text-white"
                                                >
                                                    Rename
                                                </button>
                                            </div>
                                            {values.ingredient_groups.length >
                                                1 && (
                                                <button
                                                    type="button"
                                                    onClick={() =>
                                                        removeIngredientGroup(
                                                            activeGroupIndex,
                                                        )
                                                    }
                                                    className="rounded-md border border-gray-600 px-2 py-1 text-xs text-red-400 hover:text-red-500"
                                                >
                                                    Remove Group
                                                </button>
                                            )}
                                        </div>

                                        <div className="mb-4">
                                            <ProductSelect
                                                onAddIngredient={(
                                                    ingredient,
                                                ) => {
                                                    const newValues = {
                                                        ...values,
                                                    };
                                                    newValues.ingredient_groups[
                                                        activeGroupIndex
                                                    ].items.push(
                                                        ingredient.trim(),
                                                    );

                                                    setValues(newValues);
                                                }}
                                            />
                                        </div>

                                        {values.ingredient_groups[
                                            activeGroupIndex
                                        ].items.length > 0 && (
                                            <div className="mt-4">
                                                <ol className="ml-4 list-decimal space-y-2">
                                                    {values.ingredient_groups[
                                                        activeGroupIndex
                                                    ].items.map(
                                                        (
                                                            ingredient,
                                                            itemIndex,
                                                        ) => (
                                                            <li
                                                                key={itemIndex}
                                                                className="text-gray-200"
                                                            >
                                                                <div className="flex items-start justify-between">
                                                                    <div className="flex-grow pr-2">
                                                                        {
                                                                            ingredient
                                                                        }
                                                                    </div>
                                                                    <div className="flex space-x-2">
                                                                        <button
                                                                            type="button"
                                                                            onClick={() =>
                                                                                moveIngredientUp(
                                                                                    activeGroupIndex,
                                                                                    itemIndex,
                                                                                )
                                                                            }
                                                                            disabled={
                                                                                itemIndex ===
                                                                                0
                                                                            }
                                                                            className={`px-2 py-1 text-xs text-gray-300 ${
                                                                                itemIndex ===
                                                                                0
                                                                                    ? 'cursor-not-allowed opacity-50'
                                                                                    : 'hover:text-white'
                                                                            }`}
                                                                        >
                                                                            ↑
                                                                        </button>
                                                                        <button
                                                                            type="button"
                                                                            onClick={() =>
                                                                                moveIngredientDown(
                                                                                    activeGroupIndex,
                                                                                    itemIndex,
                                                                                )
                                                                            }
                                                                            disabled={
                                                                                itemIndex ===
                                                                                values
                                                                                    .ingredient_groups[
                                                                                    activeGroupIndex
                                                                                ]
                                                                                    .items
                                                                                    .length -
                                                                                    1
                                                                            }
                                                                            className={`px-2 py-1 text-xs text-gray-300 ${
                                                                                itemIndex ===
                                                                                values
                                                                                    .ingredient_groups[
                                                                                    activeGroupIndex
                                                                                ]
                                                                                    .items
                                                                                    .length -
                                                                                    1
                                                                                    ? 'cursor-not-allowed opacity-50'
                                                                                    : 'hover:text-white'
                                                                            }`}
                                                                        >
                                                                            ↓
                                                                        </button>
                                                                        <button
                                                                            type="button"
                                                                            onClick={() =>
                                                                                removeIngredient(
                                                                                    activeGroupIndex,
                                                                                    itemIndex,
                                                                                )
                                                                            }
                                                                            className="px-2 py-1 text-xs text-red-400 hover:text-red-500"
                                                                        >
                                                                            ×
                                                                        </button>
                                                                    </div>
                                                                </div>
                                                            </li>
                                                        ),
                                                    )}
                                                </ol>
                                            </div>
                                        )}
                                    </div>
                                    {errors.ingredients && (
                                        <div className="mt-1 text-sm text-red-500">
                                            {errors.ingredients}
                                        </div>
                                    )}

                                    <div>
                                        <label className="mb-2 block text-sm font-medium text-gray-300">
                                            Instructions
                                        </label>
                                        <div className="flex">
                                            <textarea
                                                value={stepInput}
                                                onChange={handleStepInput}
                                                rows="2"
                                                className="flex-grow rounded-l-md border-gray-600 bg-gray-700 text-white shadow-sm focus:border-green-500 focus:ring focus:ring-green-500 focus:ring-opacity-50"
                                                placeholder="Add a cooking instruction step"
                                            />
                                            <button
                                                type="button"
                                                onClick={addStep}
                                                className="rounded-r-md border border-gray-600 px-4 py-2 text-white hover:bg-green-700"
                                            >
                                                Add
                                            </button>
                                        </div>

                                        {values.recipe_instructions.length >
                                            0 && (
                                            <div className="mt-4 rounded-md border border-gray-700 bg-gray-900 p-2">
                                                <h4 className="mb-2 text-gray-300">
                                                    Recipe Instructions:
                                                </h4>
                                                <ol className="ml-4 list-decimal space-y-2">
                                                    {values.recipe_instructions.map(
                                                        (step, index) => (
                                                            <li
                                                                key={index}
                                                                className="text-gray-200"
                                                            >
                                                                <div className="flex items-start justify-between">
                                                                    <div className="flex-grow pr-2">
                                                                        {step}
                                                                    </div>
                                                                    <div className="flex space-x-2">
                                                                        <button
                                                                            type="button"
                                                                            onClick={() =>
                                                                                moveStepUp(
                                                                                    index,
                                                                                )
                                                                            }
                                                                            disabled={
                                                                                index ===
                                                                                0
                                                                            }
                                                                            className={`px-2 py-1 text-xs text-gray-300 ${
                                                                                index ===
                                                                                0
                                                                                    ? 'cursor-not-allowed opacity-50'
                                                                                    : 'hover:text-white'
                                                                            }`}
                                                                        >
                                                                            ↑
                                                                        </button>
                                                                        <button
                                                                            type="button"
                                                                            onClick={() =>
                                                                                moveStepDown(
                                                                                    index,
                                                                                )
                                                                            }
                                                                            disabled={
                                                                                index ===
                                                                                values
                                                                                    .recipe_instructions
                                                                                    .length -
                                                                                    1
                                                                            }
                                                                            className={`px-2 py-1 text-xs text-gray-300 ${
                                                                                index ===
                                                                                values
                                                                                    .recipe_instructions
                                                                                    .length -
                                                                                    1
                                                                                    ? 'cursor-not-allowed opacity-50'
                                                                                    : 'hover:text-white'
                                                                            }`}
                                                                        >
                                                                            ↓
                                                                        </button>
                                                                        <button
                                                                            type="button"
                                                                            onClick={() =>
                                                                                removeStep(
                                                                                    index,
                                                                                )
                                                                            }
                                                                            className="px-2 py-1 text-xs text-red-400 hover:text-red-500"
                                                                        >
                                                                            ×
                                                                        </button>
                                                                    </div>
                                                                </div>
                                                            </li>
                                                        ),
                                                    )}
                                                </ol>
                                            </div>
                                        )}
                                        {errors.recipe_instructions && (
                                            <div className="mt-1 text-sm text-red-500">
                                                {errors.recipe_instructions}
                                            </div>
                                        )}
                                    </div>

                                    <div>
                                        <label
                                            htmlFor="difficulty"
                                            className="block text-sm font-medium text-gray-300"
                                        >
                                            Difficulty
                                        </label>
                                        <select
                                            id="difficulty"
                                            value={values.difficulty}
                                            onChange={handleChange}
                                            className="mt-1 block w-full rounded-md border-gray-600 bg-gray-700 text-white shadow-sm focus:border-green-500 focus:ring focus:ring-green-500 focus:ring-opacity-50"
                                        >
                                            <option value="">
                                                Select difficulty
                                            </option>
                                            {difficultyOptions.map((option) => (
                                                <option
                                                    key={option}
                                                    value={option}
                                                >
                                                    {option
                                                        .charAt(0)
                                                        .toUpperCase() +
                                                        option.slice(1)}
                                                </option>
                                            ))}
                                        </select>
                                        {errors.difficulty && (
                                            <div className="mt-1 text-sm text-red-500">
                                                {errors.difficulty}
                                            </div>
                                        )}
                                    </div>

                                    <div>
                                        <label
                                            htmlFor="category"
                                            className="block text-sm font-medium text-gray-300"
                                        >
                                            Category
                                        </label>
                                        <select
                                            id="category"
                                            value={values.category}
                                            onChange={handleChange}
                                            className="mt-1 block w-full rounded-md border-gray-600 bg-gray-700 text-white shadow-sm focus:border-green-500 focus:ring focus:ring-green-500 focus:ring-opacity-50"
                                        >
                                            <option value="">
                                                Select category
                                            </option>
                                            {categoryOptions.map((option) => (
                                                <option
                                                    key={option}
                                                    value={option}
                                                >
                                                    {option
                                                        .charAt(0)
                                                        .toUpperCase() +
                                                        option.slice(1)}
                                                </option>
                                            ))}
                                        </select>
                                        {errors.category && (
                                            <div className="mt-1 text-sm text-red-500">
                                                {errors.category}
                                            </div>
                                        )}
                                    </div>

                                    <div>
                                        <label
                                            htmlFor="calories"
                                            className="block text-sm font-medium text-gray-300"
                                        >
                                            Calories
                                        </label>
                                        <input
                                            type="number"
                                            id="calories"
                                            value={values.calories}
                                            onChange={handleChange}
                                            className="mt-1 block w-full rounded-md border-gray-600 bg-gray-700 text-white shadow-sm focus:border-green-500 focus:ring focus:ring-green-500 focus:ring-opacity-50"
                                        />
                                        {errors.calories && (
                                            <div className="mt-1 text-sm text-red-500">
                                                {errors.calories}
                                            </div>
                                        )}
                                    </div>

                                    <div className={'flex-col-2 flex gap-4'}>
                                        <div>
                                            <label
                                                htmlFor="prep_time"
                                                className="block text-sm font-medium text-gray-300"
                                            >
                                                Prep Time (min)
                                            </label>
                                            <input
                                                type="number"
                                                id="prep_time"
                                                value={values.prep_time}
                                                onChange={handleChange}
                                                className="mt-1 block w-full rounded-md border-gray-600 bg-gray-700 text-white shadow-sm focus:border-green-500 focus:ring focus:ring-green-500 focus:ring-opacity-50"
                                            />
                                            {errors.prep_time && (
                                                <div className="mt-1 text-sm text-red-500">
                                                    {errors.prep_time}
                                                </div>
                                            )}
                                        </div>

                                        <div>
                                            <label
                                                htmlFor="time_to_complete"
                                                className="block text-sm font-medium text-gray-300"
                                            >
                                                Total Time (min)
                                            </label>
                                            <input
                                                type="number"
                                                id="time_to_complete"
                                                value={values.time_to_complete}
                                                onChange={handleChange}
                                                className="mt-1 block w-full rounded-md border-gray-600 bg-gray-700 text-white shadow-sm focus:border-green-500 focus:ring focus:ring-green-500 focus:ring-opacity-50"
                                            />
                                            {errors.time_to_complete && (
                                                <div className="mt-1 text-sm text-red-500">
                                                    {errors.time_to_complete}
                                                </div>
                                            )}
                                        </div>
                                    </div>

                                    <div className="flex items-center justify-end">
                                        <button
                                            type="submit"
                                            className="rounded-md border border-gray-600 px-4 py-2 text-white hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
                                        >
                                            Create Recipe
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
