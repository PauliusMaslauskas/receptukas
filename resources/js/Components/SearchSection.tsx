import FieldGroup from '@/Components/Form/FieldGroup';
import SelectInput from '@/Components/Form/SelectInput';
import TextInput from '@/Components/Form/TextInput';
import { Button } from '@headlessui/react';

export default function SearchSection() {
    return (
        <div className="mb-6 text-center">
            <h1 className="dark:bg-yellow-primary text-2xl font-bold text-primary-green"></h1>

            <div className="dark:bg-yellow-primary rounded-lg bg-white p-6 shadow">
                <div>
                    <FieldGroup label="" name="search">
                        <TextInput
                            placeholder={'Search...'}
                            className={'bg-yellow-primary w-full'}
                        ></TextInput>
                    </FieldGroup>
                    <div className="grid grid-cols-2 gap-4 rounded-none pt-2">
                        <FieldGroup name="role">
                            <SelectInput
                                className={'bg-yellow-secondary'}
                                name={'test'}
                                options={[
                                    {
                                        value: 'difficulty',
                                        label: 'Difficulty',
                                    },
                                ]}
                            ></SelectInput>
                        </FieldGroup>
                        <FieldGroup name="role">
                            <SelectInput
                                className={'bg-yellow-secondary'}
                                name={'test'}
                                options={[
                                    {
                                        value: 'time',
                                        label: 'Time',
                                    },
                                ]}
                            ></SelectInput>
                        </FieldGroup>
                        <FieldGroup name="role">
                            <SelectInput
                                className={'bg-yellow-secondary'}
                                name={'test'}
                                options={[
                                    {
                                        value: 'categories',
                                        label: 'Categories',
                                    },
                                ]}
                            ></SelectInput>
                        </FieldGroup>
                        <Button
                            className={
                                'border-yellow-secondary h-[85%] w-[85%] place-self-center rounded-md border text-white'
                            }
                        >
                            Clear filters
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
}
