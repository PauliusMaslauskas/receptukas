import FieldGroup from '@/Components/Form/FieldGroup';
import SelectInput from '@/Components/Form/SelectInput';
import TextInput from '@/Components/Form/TextInput';
import { Button } from '@headlessui/react';

export default function SearchSection() {
    return (
        <div className="mb-8 text-center">
            <h1 className="text-2xl font-bold text-primary-green dark:bg-gray-800"></h1>

            <div className="rounded-lg bg-white p-6 shadow dark:bg-gray-800">
                <div>
                    <FieldGroup label="Search" name="search">
                        <TextInput
                            placeholder={'Sreach...'}
                            className={'w-full'}
                        ></TextInput>
                    </FieldGroup>
                    <div className="grid grid-cols-2 gap-4 rounded-none pt-2">
                        <FieldGroup name="role">
                            <SelectInput
                                className={'bg-dark-bg'}
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
                                className={'bg-dark-bg'}
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
                                className={'bg-dark-bg'}
                                name={'test'}
                                options={[
                                    {
                                        value: 'categories',
                                        label: 'Categories',
                                    },
                                ]}
                            ></SelectInput>
                        </FieldGroup>
                        <Button className={'border border-gray-600'}>
                            Clear filters
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
}
