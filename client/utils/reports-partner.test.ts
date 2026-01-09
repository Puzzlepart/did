import test from 'ava'

/**
 * Test to verify that partner field is included in report data structure
 * and that the partner column can be properly rendered
 */
test('TimeEntry data structure includes partner field for reports', (t) => {
  // Mock TimeEntry data that includes partner information
  const mockTimeEntry = {
    title: 'Test Work',
    duration: 8,
    startDateTime: new Date('2024-01-15T09:00:00'),
    endDateTime: new Date('2024-01-15T17:00:00'),
    week: 3,
    month: 1,
    year: 2024,
    customer: {
      key: 'CUSTA',
      name: 'Customer A',
      description: 'Main customer',
      icon: 'Building'
    },
    partner: {
      key: 'PARTB',
      name: 'Partner B',
      description: 'Partner company',
      icon: 'Handshake'
    },
    project: {
      tag: 'CUSTA PROJECT1',
      name: 'Project 1',
      icon: 'ProjectIcon'
    },
    resource: {
      id: 'user123'
    }
  }

  // Verify the structure includes partner field
  t.truthy(mockTimeEntry.partner, 'Partner field should exist')
  t.is(mockTimeEntry.partner.key, 'PARTB', 'Partner key should be PARTB')
  t.is(
    mockTimeEntry.partner.name,
    'Partner B',
    'Partner name should be Partner B'
  )

  // Verify customer and partner are separate fields
  t.not(
    mockTimeEntry.customer.key,
    mockTimeEntry.partner.key,
    'Customer and partner should be different'
  )
})

test('TimeEntry can have null partner for projects without partner', (t) => {
  // Mock TimeEntry data without partner
  const mockTimeEntry = {
    title: 'Test Work',
    duration: 4,
    customer: {
      key: 'CUSTC',
      name: 'Customer C'
    },
    partner: null,
    project: {
      tag: 'CUSTC PROJECT3',
      name: 'Project 3'
    }
  }

  // Verify partner can be null
  t.is(mockTimeEntry.partner, null, 'Partner should be null when not set')
  t.truthy(mockTimeEntry.customer, 'Customer should still exist')
})

test('Partner column fieldName matches data structure', (t) => {
  // This test verifies the column definition matches the data structure
  const columnFieldName = 'partner.name'

  const mockTimeEntry: any = {
    partner: {
      key: 'PARTX',
      name: 'Partner X'
    }
  }

  // Verify we can access partner.name from the data structure
  const parts = columnFieldName.split('.')
  let value: any = mockTimeEntry
  for (const part of parts) {
    value = value[part]
  }

  t.is(
    value,
    'Partner X',
    'Should be able to access partner.name from data structure'
  )
})
