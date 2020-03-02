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
import { ICreateCustomerFormValidation } from './ICreateCustomerFormValidation';

/**
 * @component CreateCustomerForm
 * @description Form for creating a new Custoner
 */
export const CreateCustomerForm = ({ initialModel = { key: '', name: '', description: '', icon: 'Page' } }: ICreateCustomerFormProps) => {
    let [validation, setValidation] = useState<ICreateCustomerFormValidation>({ errors: {}, invalid: true });
    let [message, setMessage] = useState<{ text: string, type: MessageBarType }>(null);
    let [model, setModel] = useState<ICreateCustomerFormModel>(initialModel);
    let [addCustomer, { loading }] = useMutation(CREATE_CUSTOMER);

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
        let { data: { result } } = await addCustomer({ variables: model });
        if (result.success) {
            setMessage({ text: `The customer ${model.name} was succesfully created.`, type: MessageBarType.success });
        } else {
            setMessage({ text: result.error, type: MessageBarType.error });
        }
        setModel(initialModel);
        window.setTimeout(() => setMessage(null), 5000);
    }

    /**
     * Validate form
     */
    const validateForm = (): ICreateCustomerFormValidation => {
        let errors: { [key: string]: string } = {};
        if (model.name.length < 2) errors.name = 'Name should be at least 2 characters long.';
        if (!(/(^[A-ZÆØÅ0-9]{3,8}$)/gm).test(model.key)) errors.key = 'Customer key should be between 3 and 8 characters long, and all uppercase.';
        return { errors, invalid: Object.keys(errors).length > 0 };
    }

    return (
        <div>
            <TextField
                styles={{ root: { marginTop: 12, width: 300 } }}
                label='Key'
                description='Customer key. Between 3 and 8 characters long, and all uppercase.'
                errorMessage={validation.errors.key}
                onChange={(_event, key) => setModel({ ...model, key })}
                value={model.key} />
            <TextField
                styles={{ root: { marginTop: 12, width: 300 } }}
                label='Name'
                description='Name of the customer.'
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