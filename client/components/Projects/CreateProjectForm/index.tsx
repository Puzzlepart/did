import { useMutation } from '@apollo/react-hooks';
import { UserMessage, IconPicker } from 'common/components';
import { PrimaryButton } from 'office-ui-fabric-react/lib/Button';
import { MessageBarType } from 'office-ui-fabric-react/lib/MessageBar';
import { TextField } from 'office-ui-fabric-react/lib/TextField';
import * as React from 'react';
import { useState } from 'react';
import CREATE_PROJECT from './CREATE_PROJECT';
import { ICreateProjectFormModel } from './ICreateProjectFormModel';
import { ICreateProjectFormProps } from './ICreateProjectFormProps';
import { ICreateProjectFormValidation } from './ICreateProjectFormValidation';
import { SearchCustomer } from './SearchCustomer';

/**
 * @category Projects
 */
export const CreateProjectForm = ({ initialModel = { customerKey: '', projectKey: '', name: '', description: '', icon: 'Page' } }: ICreateProjectFormProps) => {
    let [validation, setValidation] = useState<ICreateProjectFormValidation>({ errors: {}, invalid: true });
    let [message, setMessage] = useState<{ text: string, type: MessageBarType }>(null);
    let [model, setModel] = useState<ICreateProjectFormModel>(initialModel);
    let [addProject, { loading }] = useMutation(CREATE_PROJECT);

    /**
     * On form submit
     */
    const onFormSubmit = async () => {
        let _validation = validateForm();
        if (_validation.invalid) {
            setValidation(_validation);
            return;
        }
        setValidation({ errors: {}, invalid: false });
        let { data: { result } } = await addProject({ variables: model });
        if (result.success) {
            setMessage({ text: `The project **${model.name}** was succesfully created.`, type: MessageBarType.success })
        } else {
            setMessage({ text: result.error.message, type: MessageBarType.error });
        }
        setModel(initialModel);
        window.setTimeout(() => setMessage(null), 5000);
    }

    /**
     * Validate form
     */
    const validateForm = (): ICreateProjectFormValidation => {
        let errors: { [key: string]: string } = {};
        if (!model.customerKey) errors.customerKey = '';
        if (model.name.length < 2) errors.name = 'Name should be at least 2 characters long.';
        if (!(/(^[A-ZÆØÅ0-9]{3,8}$)/gm).test(model.projectKey)) errors.projectKey = 'Project key should be between 3 and 8 characters long, and all uppercase.';
        return { errors, invalid: Object.keys(errors).length > 0 };
    }

    return (
        <>
            {message && <UserMessage style={{ marginTop: 12, marginBottom: 12, width: 450 }} text={message.text} type={message.type} />}
            <SearchCustomer
                label='Customer'
                placeholder='Search customer...'
                title='Customer'
                required={true}
                styles={{ root: { marginTop: 12, width: 450 } }}
                style={{ width: 450 }}
                onSelected={({ key }) => setModel({ ...model, customerKey: key as string })} />
            <TextField
                styles={{ root: { marginTop: 12, width: 450 } }}
                label='Key'
                description='Project key. 3-8 characters, all uppercase.'
                title='Project key. 3-8 characters, all uppercase.'
                required={true}
                errorMessage={validation.errors.projectKey}
                onChange={(_event, projectKey) => setModel({ ...model, projectKey })}
                value={model.projectKey} />
            <TextField
                styles={{ root: { marginTop: 12, width: 450 } }}
                label='Name'
                description='Name of the project.'
                title='Name of the project.'
                required={true}
                errorMessage={validation.errors.name}
                onChange={(_event, name) => setModel({ ...model, name })}
                value={model.name} />
            <TextField
                styles={{ root: { marginTop: 12, width: 450 }, field: { height: 180 } }}
                label='Description'
                title='Description'
                multiline={true}
                errorMessage={validation.errors.description}
                onChange={(_event, description) => setModel({ ...model, description })}
                value={model.description} />
            <IconPicker
                styles={{ root: { marginTop: 12, width: 300 } }}
                options={undefined}
                onChange={(_event, opt) => setModel({ ...model, icon: opt.key as string })} />
            <PrimaryButton
                styles={{ root: { marginTop: 16 } }}
                text='Add'
                iconProps={{ iconName: 'CirclePlus' }}
                onClick={onFormSubmit}
                disabled={loading || !!message} />
        </>
    );
}