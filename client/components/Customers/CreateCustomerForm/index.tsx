import { useMutation } from '@apollo/react-hooks';
import { UserMessage } from 'components/UserMessage';
import { PrimaryButton } from 'office-ui-fabric-react/lib/Button';
import { MessageBarType } from 'office-ui-fabric-react/lib/MessageBar';
import { TextField } from 'office-ui-fabric-react/lib/TextField';
import * as React from 'react';
import { useState } from 'react';
import CREATE_CUSTOMER from './CREATE_CUSTOMER';
import { ICreateCustomerFormModel } from './ICreateCustomerFormModel';
import { ICreateCustomerFormProps } from './ICreateCustomerFormProps';

/**
 * @component CreateCustomerForm
 * @description Form for creating a new Custoner
 */
export const CreateCustomerForm = ({ initialModel = { key: '', name: '', description: '', icon: 'Page' } }: ICreateCustomerFormProps) => {
    let [message, setMessage] = useState<{ text: string, type: MessageBarType }>(null);
    let [model, setModel] = useState<ICreateCustomerFormModel>(initialModel);
    let [addCustomer, { loading }] = useMutation(CREATE_CUSTOMER);

    const onFormSubmit = async () => {
        let { data: { result } } = await addCustomer({ variables: model });
        if (result.success) {
            setMessage({ text: `The customer ${model.name} was succesfully created.`, type: MessageBarType.success });
        } else {
            setMessage({ text: result.error.message, type: MessageBarType.error });
        }
        setModel(initialModel);
        window.setTimeout(() => setMessage(null), 5000);
    }

    /**
     * Validate model
     * 
     * @description Temp validation of model
     */
    const validateModel = (): boolean => {
        return model.name.length > 2 && model.key.length > 2;
    }


    return (
        <div>
            <TextField
                styles={{ root: { marginTop: 12, width: 300 } }}
                minLength={4}
                label='Key'
                description='Key for the customer. Use one word (no spaces).'
                onChange={(_event, key) => setModel({ ...model, key })}
                value={model.key} />
            <TextField
                styles={{ root: { marginTop: 12, width: 300 } }}
                minLength={4}
                label='Name'
                description='Name of the customer.'
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
                disabled={!validateModel() || loading || !!message} />
            {message && <UserMessage style={{ marginTop: 10 }} text={message.text} type={message.type} />}
        </div>
    );
}