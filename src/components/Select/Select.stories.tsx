import React, { FC, useState, useRef } from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { IconName } from '../Icon';
import { Select } from './';
import { SelectOption, SelectProps } from './Select.types';
import { Stories } from '@storybook/addon-docs';

const defaultOptions: SelectOption[] = [
    {
        iconProps: { path: IconName.mdiSchool },
        text: 'School',
        value: 'school',
    },
    {
        iconProps: { path: IconName.mdiCalendar },
        text: 'Date',
        value: 'date',
    },
    {
        iconProps: { path: IconName.mdiFlagVariant },
        text: 'Supercalifragilisticexpialidocious',
        value: 'verylarge',
    },
    {
        iconProps: { path: IconName.mdiAccount },
        text: 'Account',
        value: 'account',
    },
    {
        iconProps: { path: IconName.mdiAccountHardHat },
        text: 'Hat',
        value: 'hat',
    },
    {
        iconProps: { path: IconName.mdiAccountTie },
        text: 'Tie',
        value: 'tie',
    },
    {
        iconProps: { path: IconName.mdiCalendarAlert },
        text: 'Date alert',
        value: 'datealert',
    },
    {
        iconProps: { path: IconName.mdiBell },
        text: 'Bell',
        value: 'bell',
    },
];

export default {
    title: 'Select',
    parameters: {
        docs: {
            page: (): JSX.Element => (
                <main>
                    <article>
                        <section>
                            <h1>Select</h1>
                            <p>
                                Basic select component which supports searching,
                                multi select
                            </p>
                        </section>
                        <section>
                            <Stories includePrimary title="" />
                        </section>
                    </article>
                </main>
            ),
        },
    },
    argTypes: {
        filterable: {
            defaultValue: false,
            control: { type: 'boolean' },
        },
        multiple: {
            defaultValue: false,
            control: { type: 'boolean' },
        },
        onOptionsChange: {
            action: 'click',
        },
    },
} as ComponentMeta<typeof Select>;

const Wrapper: FC<SelectProps> = ({ children }) => {
    return (
        <div
            style={{
                width: '200px',
            }}
        >
            {children}
        </div>
    );
};

const DynamicSelect: FC<SelectProps> = () => {
    const timer = useRef<ReturnType<typeof setTimeout>>(null);
    const [options, setOptions] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const loadOptions = (searchString: string) => {
        setIsLoading(true);
        if (timer.current) {
            clearTimeout(timer.current);
        }
        timer.current = setTimeout(() => {
            const filtered = defaultOptions.filter((option) =>
                option.text.toLowerCase().includes(searchString.toLowerCase())
            );
            const options: SelectOption[] = filtered;
            setOptions(options);
            setIsLoading(false);
        }, 2000);
    };
    return (
        <Select
            filterable={true}
            isLoading={isLoading}
            loadOptions={loadOptions}
            options={options}
        ></Select>
    );
};

const Basic_Story: ComponentStory<typeof Select> = (args) => (
    <>
        <Wrapper>
            <Select {...args}></Select>
        </Wrapper>
    </>
);

const Dynamic_Story: ComponentStory<typeof Select> = (args) => (
    <Wrapper>
        <DynamicSelect {...args}></DynamicSelect>
    </Wrapper>
);

export type SelectStory = ComponentStory<React.FC<SelectProps>>;
export const Basic: SelectStory = Basic_Story.bind({});
export const With_DefaultValue: SelectStory = Basic_Story.bind({});
export const Disabled: SelectStory = Basic_Story.bind({});
export const Options_Disabled: SelectStory = Basic_Story.bind({});
export const With_Clear: SelectStory = Basic_Story.bind({});
export const Filterable: SelectStory = Basic_Story.bind({});
export const Multiple: SelectStory = Basic_Story.bind({});
export const Multiple_With_NoFilter: SelectStory = Basic_Story.bind({});
export const Dynamic: SelectStory = Dynamic_Story.bind({});

const SelectArgs: SelectProps = {
    classNames: 'octuple-select-class',
    'data-test-id': 'octuple-select-test-id',
    style: {},
    options: defaultOptions,
};

Basic.args = {
    ...SelectArgs,
};

With_DefaultValue.args = {
    ...Basic.args,
    defaultValue: 'hat',
};

Disabled.args = {
    ...With_DefaultValue.args,
    textInputProps: {
        ...With_DefaultValue.args.textInputProps,
        disabled: true,
    },
};

Options_Disabled.args = {
    ...Basic.args,
    options: [
        {
            iconProps: { path: IconName.mdiShare },
            text: 'option taken',
            value: 'option1',
            disabled: true,
        },
        ...defaultOptions,
    ],
};

With_Clear.args = {
    ...With_DefaultValue.args,
    textInputProps: {
        ...With_DefaultValue.args.textInputProps,
        clearable: true,
    },
};

Filterable.args = {
    ...Basic.args,
    filterable: true,
    textInputProps: {
        ...Basic.args.textInputProps,
        clearable: true,
    },
};

Multiple.args = {
    ...Basic.args,
    filterable: true,
    multiple: true,
    textInputProps: {
        ...Basic.args.textInputProps,
        clearable: true,
    },
};

Multiple_With_NoFilter.args = {
    ...Basic.args,
    filterable: false,
    multiple: true,
    textInputProps: {
        ...Basic.args.textInputProps,
        clearable: true,
    },
};

Dynamic.args = {
    ...Basic.args,
    textInputProps: {
        ...Basic.args.textInputProps,
        clearable: true,
    },
};
