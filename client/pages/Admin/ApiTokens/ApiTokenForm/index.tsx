import {useMutation} from '@apollo/client';
import * as security from 'config/security';
import {DateObject} from 'DateUtils';
import {
	DefaultButton,
	Dropdown,
	Panel,
	TextField,
	Toggle
} from 'office-ui-fabric-react';
import React, {useMemo, useState} from 'react';
import {useTranslation} from 'react-i18next';
import {ApiTokenInput} from 'types';
import {contains, isEmpty} from 'underscore';
import {isBlank} from 'underscore.string';
import $addApiToken from './addApiToken.gql';
import styles from './ApiTokenForm.module.scss';
import {IApiTokenFormProps} from './types';

export const ApiTokenForm = ({
	isOpen,
	onAdded,
	onDismiss
}: IApiTokenFormProps) => {
	const {t} = useTranslation();
	const [addApiToken] = useMutation($addApiToken);
	const [token, setToken] = useState<ApiTokenInput>({
		name: '',
		expires: null,
		permissions: []
	});
	const permissions = useMemo(
		() => security.permissions(t).filter(p => p.api),
		[t]
	);

	async function onAddApiToken() {
		const {data} = await addApiToken({variables: {token}});
		onAdded(data.apiKey);
	}

	function togglePermission(permissionId: string, checked: boolean) {
		const permissions = [...(token.permissions || [])];
		const index = permissions.indexOf(permissionId);
		if (checked && index === -1) {
			permissions.push(permissionId);
		} else {
			permissions.splice(index, 1);
		}

		setToken({...token, permissions});
	}

	const EXPIRY_OPTIONS = {
		'1month': t('admin.apiTokens.oneMonth'),
		'3month': t('admin.apiTokens.monthPlural', {months: 3}),
		'1year': t('admin.apiTokens.oneYear'),
		'30year': t('admin.apiTokens.neverExpiresText')
	};

	return (
		<Panel
			className={styles.root}
			headerText={t('admin.apiTokens.addNew')}
			isOpen={isOpen}
			isLightDismiss={true}
			onDismiss={onDismiss}
		>
			<div className={styles.inputContainer}>
				<TextField
					placeholder={t('admin.apiTokens.tokenNamePlaceholder')}
					required={true}
					onChange={(_e, value) => {
						setToken({...token, name: value});
					}}
				/>
			</div>
			<div className={styles.inputContainer}>
				<Dropdown
					placeholder={t('admin.apiTokens.tokenExpiryPlaceholder')}
					required={true}
					onChange={(_e, {data}) => {
						setToken({
							...token,
							expires: new DateObject().add(data).jsDate
						});
					}}
					options={Object.keys(EXPIRY_OPTIONS).map(key => ({
						key,
						data: key,
						text: EXPIRY_OPTIONS[key]
					}))}
				/>
			</div>
			<div className={styles.sectionTitle}>
				{t('admin.apiTokens.permissionsTitle')}
			</div>
			<div className={styles.permissions}>
				{permissions.map(({id, name, description}) => (
					<div key={id} className={styles.permissionItem}>
						<Toggle
							label={name}
							title={description}
							inlineLabel={true}
							styles={{root: {margin: 0}}}
							defaultChecked={contains(token.permissions, id)}
							onChange={(_event, checked) => {
								togglePermission(id, checked);
							}}
						/>
						<div hidden={!description} className={styles.inputDescription}>
							<span>{description}</span>
						</div>
					</div>
				))}
			</div>
			<DefaultButton
				text={t('common.save')}
				onClick={onAddApiToken}
				disabled={
					isBlank(token.name) || !token.expires || isEmpty(token.permissions)
				}
			/>
		</Panel>
	);
};
