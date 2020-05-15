import { useMutation } from '@apollo/react-hooks';
import { IconPicker, UserMessage } from 'components';
import { PrimaryButton } from 'office-ui-fabric-react/lib/Button';
import { MessageBarType } from 'office-ui-fabric-react/lib/MessageBar';
import { TextField } from 'office-ui-fabric-react/lib/TextField';
import * as React from 'react';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import format from 'string-format';
import styles from './CreateCustomerForm.module.scss';
import CREATE_CUSTOMER from './CREATE_CUSTOMER';
import { ICreateCustomerFormModel } from './ICreateCustomerFormModel';
import { ICreateCustomerFormProps } from './ICreateCustomerFormProps';
import { ICreateCustomerFormValidation } from './ICreateCustomerFormValidation';

/**
 * @category Customers
 */
export const CreateCustomerForm = ({ initialModel = { key: '', name: '', description: '', icon: 'Page' } }: ICreateCustomerFormProps) => {
    const { t } = useTranslation(['CUSTOMERS', 'COMMON']);
    const [validation, setValidation] = useState<ICreateCustomerFormValidation>({ errors: {}, invalid: true });
    const [message, setMessage] = useState<{ text: string; type: MessageBarType }>(null);
    const [model, setModel] = useState<ICreateCustomerFormModel>(initialModel);
    const [addCustomer, { loading }] = useMutation(CREATE_CUSTOMER);

    const validateForm = (): ICreateCustomerFormValidation => {
        const errors: { [key: string]: string } = {};
        if (model.name.length < 2) errors.name = t('NAME_FORM_VALIDATION');
        if (!(/(^[A-ZÆØÅ0-9]{3,8}$)/gm).test(model.key)) errors.key = t('KEY_FORM_VALIDATION');
        return { errors, invalid: Object.keys(errors).length > 0 };
    }

    const onFormSubmit = async () => {
        const _validation = validateForm();
        if (_validation.invalid) {
            setValidation(_validation);
            return;
        }
        setValidation({ errors: {}, invalid: false });
        const { data: { result } } = await addCustomer({ variables: model });
        if (result.success) {
            setMessage({ text: format(t('CREATE_SUCCESS_MESSAGE'), model.name), type: MessageBarType.success });
        } else {
            setMessage({ text: result.error.message, type: MessageBarType.error });
        }
        setModel(initialModel);
        window.setTimeout(() => setMessage(null), 5000);
    }

    return (
        <div className={styles.root}>
            {message && <UserMessage containerStyle={{ marginTop: 12, marginBottom: 12, width: 450 }} text={message.text} type={message.type} />}
            <TextField
                className={styles.inputField}
                label={t('KEY_LABEL', { ns: 'COMMON' })}
                description={t('CUSTOMER_KEY_DESCRIPTION')}
                required={true}
                errorMessage={validation.errors.key}
                onChange={(_event, key) => setModel({ ...model, key })}
                value={model.key} />
            <TextField
                className={styles.inputField}
                label={t('NAME_LABEL', { ns: 'COMMON' })}
                required={true}
                errorMessage={validation.errors.name}
                onChange={(_event, name) => setModel({ ...model, name })}
                value={model.name} />
            <TextField
                className={styles.inputField}
                label={t('DESCRIPTION_LABEL', { ns: 'COMMON' })}
                multiline={true}
                errorMessage={validation.errors.description}
                onChange={(_event, description) => setModel({ ...model, description })}
                value={model.description} />
            <IconPicker
                className={styles.iconPicker}
                options={undefined}
                onChange={(_event, opt) => setModel({ ...model, icon: opt.key as string })} />
            <PrimaryButton
                styles={{ root: { marginTop: 16 } }}
                text={t('ADD', { ns: 'COMMON' })}
                iconProps={{ iconName: 'CirclePlus' }}
                onClick={onFormSubmit}
                disabled={loading || !!message} />
        </div>
    );
}