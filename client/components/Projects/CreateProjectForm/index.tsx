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

/**
 * @component CreateProjectForm
 * @description Form for creating a new Project
 */
export const CreateProjectForm = ({ initialModel = { customerKey: '', projectKey: '', name: '', description: '', icon: 'Page' } }: ICreateProjectFormProps) => {
    let [message, setMessage] = useState<{ text: string, type: MessageBarType }>(null);
    let [model, setModel] = useState<ICreateProjectFormModel>(initialModel);
    let [addProject, { loading }] = useMutation(CREATE_PROJECT);

    const onFormSubmit = async () => {
        let { data: { result } } = await addProject({ variables: model });
        if (result.success) {
            setMessage({ text: `The project ${model.name} was succesfully created.`, type: MessageBarType.success })
        } else {
            setMessage({ text: result.error.message, type: MessageBarType.error });
        }
        setModel(initialModel);
        window.setTimeout(() => {
            setMessage(null);
        }, 5000);
    }

    /**
     * Validate model
     * 
     * @description Temp validation of model
     */
    const validateModel = (): boolean => {
        return model.name.length > 2 && model.projectKey.length > 2 && model.name.length > 2;
    }

    return (
        <div>
            <Label>Customer</Label>
            <SearchCustomer onSelected={({ key }) => setModel({ ...model, customerKey: key as string })} />
            <TextField
                styles={{ root: { marginTop: 12, width: 300 } }}
                minLength={4}
                label='Key'
                description='Key for the project. Use one word (no spaces).'
                onChange={(_event, projectKey) => setModel({ ...model, projectKey })}
                value={model.projectKey} />
            <TextField
                styles={{ root: { marginTop: 12, width: 300 } }}
                minLength={4}
                label='Name'
                description='Name of the project.'
                onChange={(_event, name) => setModel({ ...model, name })}
                value={model.name} />
            <TextField
                styles={{ root: { marginTop: 12, width: 300 } }}
                label='Description'
                multiline={true}
                onChange={(_event, description) => setModel({ ...model, description })}
                value={model.description} />
            <TextField
                styles={{ root: { marginTop: 12, width: 300 } }}
                minLength={4}
                label='Icon'
                onChange={(_event, icon) => setModel({ ...model, icon })}
                iconProps={{ iconName: model.icon }}
                value={model.icon} />
            <PrimaryButton
                styles={{ root: { marginTop: 16 } }}
                text='Add'
                iconProps={{ iconName: 'CirclePlus' }}
                onClick={onFormSubmit}
                disabled={loading || !validateModel()} />
            {message && <UserMessage style={{ marginTop: 10 }} text={message.text} type={message.type} />}
        </div>
    );
}