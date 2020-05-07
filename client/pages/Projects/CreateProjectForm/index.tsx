import { useMutation } from '@apollo/react-hooks';
import { IconPicker, useMessage, UserMessage } from 'components';
import resource from 'i18n';
import { PrimaryButton } from 'office-ui-fabric-react/lib/Button';
import { Label } from 'office-ui-fabric-react/lib/Label';
import { MessageBarType } from 'office-ui-fabric-react/lib/MessageBar';
import { TextField } from 'office-ui-fabric-react/lib/TextField';
import * as React from 'react';
import format from 'string-format';
import styles from './CreateProjectForm.module.scss';
import CREATE_PROJECT from './CREATE_PROJECT';
import { ICreateProjectFormModel } from './ICreateProjectFormModel';
import { ICreateProjectFormValidation } from './ICreateProjectFormValidation';
import { SearchCustomer } from './SearchCustomer';

const initialModel = { customerKey: '', projectKey: '', name: '', description: '', icon: 'Page' };

/**
 * @category Projects
 */
export const CreateProjectForm = () => {
    const [validation, setValidation] = React.useState<ICreateProjectFormValidation>({ errors: {}, invalid: true });
    const [message, setMessage] = useMessage();
    const [model, setModel] = React.useState<ICreateProjectFormModel>(initialModel);
    const [addProject, { loading }] = useMutation<any, ICreateProjectFormModel>(CREATE_PROJECT);

    const validateForm = (): ICreateProjectFormValidation => {
        const errors: { [key: string]: string } = {};
        if (!model.customerKey) errors.customerKey = '';
        if (model.name.length < 2) errors.name = resource('PROJECTS.NAME_FORM_VALIDATION')
        if (!(/(^[A-ZÆØÅ0-9]{3,8}$)/gm).test(model.projectKey)) errors.projectKey = resource('PROJECTS.KEY_FORM_VALIDATION');
        return { errors, invalid: Object.keys(errors).length > 0 };
    }

    const onFormSubmit = async () => {
        const _validation = validateForm();
        if (_validation.invalid) {
            setValidation(_validation);
            return;
        }
        setValidation({ errors: {}, invalid: false });
        const { data: { result } } = await addProject({ variables: model });
        if (result.success) {
            setMessage({ text: format(resource('PROJECTS.CREATE_SUCCESS_MESSAGE'), model.name), type: MessageBarType.success })
        } else {
            setMessage({ text: result.error.message, type: MessageBarType.error });
        }
        setModel(initialModel);
    }

    return (
        <div className={styles.root}>
            {message && <UserMessage {...message} containerStyle={{ marginTop: 12, marginBottom: 12, width: 450 }} />}
            <Label>{resource('COMMON.CUSTOMER')}</Label>
            <SearchCustomer
                required={true}
                className={styles.inputField}
                placeholder={resource('COMMON.SEARCH_PLACEHOLDER')}
                onSelected={customer => setModel({ ...model, customerKey: customer && customer.id })} />
            <TextField
                className={styles.inputField}
                label={resource('COMMON.KEY_LABEL')}
                description={resource('PROJECTS.PROJECT_KEY_DESCRIPTION')}
                title={resource('PROJECTS.PROJECT_KEY_DESCRIPTION')}
                required={true}
                errorMessage={validation.errors.projectKey}
                onChange={(_event, projectKey) => setModel({ ...model, projectKey })}
                value={model.projectKey} />
            <TextField
                className={styles.inputField}
                label={resource('COMMON.NAME_LABEL')}
                required={true}
                errorMessage={validation.errors.name}
                onChange={(_event, name) => setModel({ ...model, name })}
                value={model.name} />
            <TextField
                className={styles.inputField}
                label={resource('COMMON.DESCRIPTION_LABEL')}
                multiline={true}
                errorMessage={validation.errors.description}
                onChange={(_event, description) => setModel({ ...model, description })}
                value={model.description} />
            <IconPicker
                className={styles.iconPicker}
                options={undefined}
                defaultSelectedKey={initialModel.icon}
                onChange={(_event, opt) => setModel({ ...model, icon: opt.key as string })} />
            <PrimaryButton
                styles={{ root: { marginTop: 16 } }}
                text={resource('COMMON.ADD')}
                iconProps={{ iconName: 'CirclePlus' }}
                onClick={onFormSubmit}
                disabled={loading || !!message} />
            {JSON.stringify(model)}
        </div>
    );
}