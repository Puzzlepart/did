import React, { useState, useCallback, useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import {
  Button,
  DataGrid,
  DataGridBody,
  DataGridCell,
  DataGridHeader,
  DataGridHeaderCell,
  DataGridRow,
  Dialog,
  DialogActions,
  DialogBody,
  DialogContent,
  DialogSurface,
  DialogTitle,
  DialogTrigger,
  Field,
  Input,
  Checkbox,
  Textarea,
  makeStyles,
  tokens,
  Dropdown,
  Option,
  Label
} from '@fluentui/react-components'
import {
  Add20Regular,
  Delete20Regular,
  Edit20Regular,
  Warning20Regular
} from '@fluentui/react-icons'
import { $dayjs } from 'DateUtils'
import {
  validateHolidayDate,
  validateHolidayName,
  validateHoursOff,
  HolidayValidationError,
  isWeekend,
  findDuplicateHolidays,
  NORWAY_HOLIDAYS,
  generateMovableHolidays
} from '../../../../../../shared/utils/holidayUtils'
import { StyledComponent } from 'types'
import styles from './HolidaysField.module.scss'
import { Holiday, IHolidaysFieldProps } from './types'

const useStyles = makeStyles({
  root: {
    display: 'flex',
    flexDirection: 'column',
    gap: tokens.spacingVerticalM
  },
  table: {
    marginTop: tokens.spacingVerticalM
  },
  actions: {
    display: 'flex',
    gap: tokens.spacingHorizontalS
  },
  warningText: {
    color: tokens.colorPaletteYellowForeground1,
    display: 'flex',
    alignItems: 'center',
    gap: tokens.spacingHorizontalXS,
    fontSize: tokens.fontSizeBase200
  },
  errorText: {
    color: tokens.colorPaletteRedForeground1,
    fontSize: tokens.fontSizeBase200
  },
  emptyState: {
    padding: tokens.spacingVerticalL,
    textAlign: 'center',
    color: tokens.colorNeutralForeground3
  },
  dialogContent: {
    display: 'flex',
    flexDirection: 'column',
    gap: tokens.spacingVerticalM
  }
})

interface HolidayFormData {
  date: string
  name: string
  hoursOff: number
  recurring: boolean
  notes?: string
}

/**
 * HolidaysField component for managing holidays in subscription settings.
 * Provides full CRUD operations, validation, and country preset imports.
 *
 * @category SubscriptionSettings
 */
export const HolidaysField: StyledComponent<IHolidaysFieldProps> = (props) => {
  const { value, onChange } = props
  const { t } = useTranslation()
  const classes = useStyles()

  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [editingIndex, setEditingIndex] = useState<number | null>(null)
  const [deleteIndex, setDeleteIndex] = useState<number | null>(null)
  const [validationErrors, setValidationErrors] = useState<string[]>([])
  const [isImporting, setIsImporting] = useState(false)

  const currentYear = new Date().getFullYear()

  const [formData, setFormData] = useState<HolidayFormData>({
    date: $dayjs().format('YYYY-MM-DD'),
    name: '',
    hoursOff: 8,
    recurring: true,
    notes: ''
  })

  const holidays = value?.holidays || []
  const duplicates = useMemo(() => findDuplicateHolidays(holidays), [holidays])

  const handleOpenDialog = useCallback((holiday?: Holiday, index?: number) => {
    if (holiday && index !== undefined) {
      setEditingIndex(index)
      setFormData({
        date: holiday.date,
        name: holiday.name,
        hoursOff: holiday.hoursOff,
        recurring: holiday.recurring ?? true,
        notes: holiday.notes || ''
      })
    } else {
      setEditingIndex(null)
      setFormData({
        date: $dayjs().format('YYYY-MM-DD'),
        name: '',
        hoursOff: 8,
        recurring: true,
        notes: ''
      })
    }
    setValidationErrors([])
    setIsDialogOpen(true)
  }, [])

  const handleCloseDialog = useCallback(() => {
    setIsDialogOpen(false)
    setEditingIndex(null)
    setValidationErrors([])
  }, [])

  const validateForm = useCallback((): boolean => {
    const errors: string[] = []

    try {
      validateHolidayDate(formData.date)
    } catch (error) {
      if (error instanceof HolidayValidationError) {
        errors.push(error.message)
      }
    }

    try {
      validateHolidayName(formData.name)
    } catch (error) {
      if (error instanceof HolidayValidationError) {
        errors.push(error.message)
      }
    }

    try {
      validateHoursOff(formData.hoursOff)
    } catch (error) {
      if (error instanceof HolidayValidationError) {
        errors.push(error.message)
      }
    }

    setValidationErrors(errors)
    return errors.length === 0
  }, [formData])

  const handleSave = useCallback(() => {
    if (!validateForm()) {
      return
    }

    const newHoliday: Holiday = {
      date: formData.date,
      name: formData.name,
      hoursOff: formData.hoursOff,
      recurring: formData.recurring,
      notes: formData.notes
    }

    const updatedHolidays = [...holidays]

    if (editingIndex === null) {
      updatedHolidays.push(newHoliday)
    } else {
      updatedHolidays[editingIndex] = newHoliday
    }

    // Sort by date
    updatedHolidays.sort((a, b) => a.date.localeCompare(b.date))

    onChange?.({
      ...value,
      holidays: updatedHolidays
    })

    handleCloseDialog()
  }, [formData, holidays, value, onChange, validateForm, editingIndex, handleCloseDialog])

  const handleDelete = useCallback(
    (index: number) => {
      const updatedHolidays = holidays.filter((_, i) => i !== index)
      onChange?.({
        ...value,
        holidays: updatedHolidays
      })
      setDeleteIndex(null)
    },
    [holidays, value, onChange]
  )

  const handleImportPreset = useCallback(
    (countryCode: string) => {
      if (isImporting) return

      setIsImporting(true)
      try {
        if (countryCode === 'NO') {
          // Import Norway holidays - filter out entries with missing required fields
          const fixedHolidays = NORWAY_HOLIDAYS.filter(
            (h) => h.recurring !== false && h.name && h.hoursOff !== undefined && h.date
          ).map((h) => ({
            date: $dayjs(h.date!).format('YYYY-MM-DD'),
            name: h.name!,
            hoursOff: h.hoursOff!,
            recurring: h.recurring ?? true,
            notes: h.notes
          }))

          // Generate movable holidays for current year - filter out entries with missing required fields
          const movableHolidays = generateMovableHolidays(currentYear)
            .filter((h) => h.name && h.hoursOff !== undefined && h.date)
            .map((h) => ({
              date: $dayjs(h.date!).format('YYYY-MM-DD'),
              name: h.name!,
              hoursOff: h.hoursOff!,
              recurring: h.recurring ?? false,
              notes: h.notes
            }))

          const importedHolidays = [...fixedHolidays, ...movableHolidays]

          // Merge with existing, avoiding duplicates
          const existingDates = new Set(holidays.map((h) => h.date))
          const newHolidays = importedHolidays.filter((h) => !existingDates.has(h.date))

          const updatedHolidays = [...holidays, ...newHolidays]
          updatedHolidays.sort((a, b) => a.date.localeCompare(b.date))

          onChange?.({
            ...value,
            holidays: updatedHolidays,
            countryCode: 'NO'
          })
        }
      } finally {
        setIsImporting(false)
      }
    },
    [isImporting, holidays, value, onChange, currentYear]
  )

  const getWarningsForHoliday = useCallback((holiday: Holiday): string[] => {
    const warnings: string[] = []

    if (isWeekend(holiday.date)) {
      warnings.push('Falls on weekend')
    }

    if (duplicates.includes(holiday.date)) {
      warnings.push('Duplicate date')
    }

    if ($dayjs(holiday.date).month() === 1 && $dayjs(holiday.date).date() === 29) {
      warnings.push('Feb 29 - skipped in non-leap years')
    }

    return warnings
  }, [duplicates])

  return (
    <div className={HolidaysField.className}>
      <div className={classes.root}>
        <p>{t('admin.holidaysDescription')}</p>

        <div className={classes.actions}>
          <Button
            appearance='primary'
            icon={<Add20Regular />}
            onClick={() => handleOpenDialog()}
          >
            {t('admin.addHolidayButton')}
          </Button>

          <Dropdown
            placeholder={t('admin.importHolidaysButton')}
            onOptionSelect={(_, data) => handleImportPreset(data.optionValue as string)}
            disabled={isImporting}
          >
            <Option key='NO' value='NO'>
              Norway (Norge)
            </Option>
          </Dropdown>
        </div>

        {holidays.length === 0 ? (
          <div className={classes.emptyState}>
            <p>{t('admin.noHolidaysConfigured')}</p>
          </div>
        ) : (
          <DataGrid
            items={holidays}
            columns={[
              { columnId: 'date', renderHeaderCell: () => t('admin.holidayDateLabel') },
              { columnId: 'name', renderHeaderCell: () => t('admin.holidayNameLabel') },
              {
                columnId: 'hoursOff',
                renderHeaderCell: () => t('admin.holidayHoursOffLabel')
              },
              {
                columnId: 'recurring',
                renderHeaderCell: () => t('admin.holidayRecurringLabel')
              },
              { columnId: 'actions', renderHeaderCell: () => '' }
            ]}
            sortable
            className={classes.table}
          >
            <DataGridHeader>
              <DataGridRow>
                {({ renderHeaderCell }) => (
                  <DataGridHeaderCell>{renderHeaderCell()}</DataGridHeaderCell>
                )}
              </DataGridRow>
            </DataGridHeader>
            <DataGridBody<Holiday>>
              {({ item, rowId }) => {
                const index = holidays.indexOf(item)
                const warnings = getWarningsForHoliday(item)

                return (
                  <DataGridRow<Holiday> key={rowId}>
                    <DataGridCell>
                      {$dayjs(item.date).format('YYYY-MM-DD')}
                      {warnings.length > 0 && (
                        <div className={classes.warningText}>
                          <Warning20Regular />
                          {warnings.join(', ')}
                        </div>
                      )}
                    </DataGridCell>
                    <DataGridCell>{item.name}</DataGridCell>
                    <DataGridCell>{item.hoursOff}h</DataGridCell>
                    <DataGridCell>
                      {item.recurring ? t('common.yes') : t('common.no')}
                    </DataGridCell>
                    <DataGridCell>
                      <div className={classes.actions}>
                        <Button
                          size='small'
                          icon={<Edit20Regular />}
                          onClick={() => handleOpenDialog(item, index)}
                        >
                          {t('admin.editHolidayButton')}
                        </Button>
                        <Button
                          size='small'
                          appearance='subtle'
                          icon={<Delete20Regular />}
                          onClick={() => setDeleteIndex(index)}
                        >
                          {t('admin.deleteHolidayButton')}
                        </Button>
                      </div>
                    </DataGridCell>
                  </DataGridRow>
                )
              }}
            </DataGridBody>
          </DataGrid>
        )}

        {/* Add/Edit Dialog */}
        <Dialog open={isDialogOpen} onOpenChange={(_, data) => data.open || handleCloseDialog()}>
          <DialogSurface>
            <DialogBody>
              <DialogTitle>
                {editingIndex === null ? t('admin.addHolidayButton') : t('admin.editHolidayButton')}
              </DialogTitle>
              <DialogContent className={classes.dialogContent}>
                {validationErrors.length > 0 && (
                  <div className={classes.errorText}>
                    {validationErrors.map((err, i) => (
                      <div key={i}>{err}</div>
                    ))}
                  </div>
                )}

                <Field label={t('admin.holidayDateLabel')} required>
                  <Input
                    type='date'
                    value={formData.date}
                    onChange={(_, data) => setFormData({ ...formData, date: data.value })}
                  />
                </Field>

                <Field label={t('admin.holidayNameLabel')} required>
                  <Input
                    value={formData.name}
                    onChange={(_, data) => setFormData({ ...formData, name: data.value })}
                    placeholder="Christmas Day, New Year's Eve, etc."
                  />
                </Field>

                <Field
                  label={t('admin.holidayHoursOffLabel')}
                  hint={t('admin.holidayHoursOffDescription')}
                  required
                >
                  <Input
                    type='number'
                    value={String(formData.hoursOff)}
                    onChange={(_, data) =>
                      setFormData({ ...formData, hoursOff: Number.parseFloat(data.value) || 0 })
                    }
                    min={0}
                    max={8}
                    step={0.25}
                  />
                </Field>

                <Field>
                  <Checkbox
                    checked={formData.recurring}
                    onChange={(_, data) =>
                      setFormData({ ...formData, recurring: data.checked as boolean })
                    }
                    label={t('admin.holidayRecurringLabel')}
                  />
                  <Label size='small'>{t('admin.holidayRecurringDescription')}</Label>
                </Field>

                <Field label={t('admin.holidayNotesLabel')}>
                  <Textarea
                    value={formData.notes}
                    onChange={(_, data) => setFormData({ ...formData, notes: data.value })}
                    placeholder='Optional notes about company-specific rules...'
                    rows={3}
                  />
                </Field>
              </DialogContent>
              <DialogActions>
                <DialogTrigger disableButtonEnhancement>
                  <Button appearance='secondary'>{t('common.cancel')}</Button>
                </DialogTrigger>
                <Button appearance='primary' onClick={handleSave}>
                  {t('common.save')}
                </Button>
              </DialogActions>
            </DialogBody>
          </DialogSurface>
        </Dialog>

        {/* Delete Confirmation Dialog */}
        <Dialog
          open={deleteIndex !== null}
          onOpenChange={(_, data) => !data.open && setDeleteIndex(null)}
        >
          <DialogSurface>
            <DialogBody>
              <DialogTitle>{t('admin.holidayDeleteConfirmTitle')}</DialogTitle>
              <DialogContent>
                {deleteIndex !== null && (
                  <p>
                    {t('admin.holidayDeleteConfirmMessage', {
                      name: holidays[deleteIndex]?.name
                    })}
                  </p>
                )}
              </DialogContent>
              <DialogActions>
                <DialogTrigger disableButtonEnhancement>
                  <Button appearance='secondary'>{t('common.cancel')}</Button>
                </DialogTrigger>
                <Button
                  appearance='primary'
                  onClick={() => deleteIndex !== null && handleDelete(deleteIndex)}
                >
                  {t('common.delete')}
                </Button>
              </DialogActions>
            </DialogBody>
          </DialogSurface>
        </Dialog>
      </div>
    </div>
  )
}

HolidaysField.displayName = 'HolidaysField'
HolidaysField.className = styles.holidaysField
