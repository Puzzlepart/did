import { useMutation } from '@apollo/react-hooks';
import { UserMessage } from 'components/UserMessage';
import { PrimaryButton } from 'office-ui-fabric-react/lib/Button';
import { Label } from 'office-ui-fabric-react/lib/Label';
import { MessageBarType } from 'office-ui-fabric-react/lib/MessageBar';
import { TextField } from 'office-ui-fabric-react/lib/TextField';
import * as React from 'react';
import { useState } from 'react';
import CREATE_PROJECT from './CREATE_PROJECT';
import { ICreateProjectFormModel } from './ICreateProjectFormModel';
import { SearchCustomer } from './SearchCustomer';
import { ICreateProjectFormProps } from './ICreateProjectFormProps';
import { ICreateProjectFormValidation } from './ICreateProjectFormValidation';

/**
 * @component CreateProjectForm
 * @description Form for creating a new Project
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
            setMessage({ text: `The project ${model.name} was succesfully created.`, type: MessageBarType.success })
        } else {
            setMessage({ text: result.error, type: MessageBarType.error });
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
        if (!(/(^[A-ZÆØÅ]{3,8}$)/gm).test(model.projectKey)) errors.projectKey = 'Project key should be between 3 and 8 characters long, and all uppercase.';
        return { errors, invalid: Object.keys(errors).length > 0 };
    }

    return (
        <div>
            <Label>Customer</Label>
            <SearchCustomer onSelected={({ key }) => setModel({ ...model, customerKey: key as string })} />
            <TextField
                styles={{ root: { marginTop: 12, width: 300 } }}
                label='Key'
                description='Project key. Between 3 and 8 characters long, and all uppercase.'
                errorMessage={validation.errors.projectKey}
                onChange={(_event, projectKey) => setModel({ ...model, projectKey })}
                value={model.projectKey} />
            <TextField
                styles={{ root: { marginTop: 12, width: 300 } }}
                label='Name'
                description='Name of the project.'
                errorMessage={validation.errors.name}
                onChange={(_event, name) => setModel({ ...model, name })}
                value={model.name} />
            <TextField
                styles={{ root: { marginTop: 12, width: 300 } }}
                label='Description'
                multiline={true}
                errorMessage={validation.errors.description}
                onChange={(_event, description) => setModel({ ...model, description })}
                value={model.description} />
            <TextField
                styles={{ root: { marginTop: 12, width: 300 } }}
                label='Icon'
                errorMessage={validation.errors.icon}
                onChange={(_event, icon) => setModel({ ...model, icon })}
                iconProps={{ iconName: model.icon }}
                value={model.icon} />
            <PrimaryButton
                styles={{ root: { marginTop: 16 } }}
                text='Add'
                iconProps={{ iconName: 'CirclePlus' }}
                onClick={onFormSubmit}
                disabled={loading || !!message} />
            {message && <UserMessage style={{ marginTop: 10 }} text={message.text} type={message.type} />}
        </div>
    );
}