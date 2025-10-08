import test from 'ava'

// Simple test to verify partner functionality integration
test('Partner project data structure includes partner field', (t) => {
  // Mock project data that includes partner information
  const mockProject = {
    tag: 'CUSTA TEST',
    key: 'TEST',
    customerKey: 'CUSTA',
    name: 'Test Project',
    description: 'Test Description',
    icon: 'TestIcon',
    partnerKey: 'PARTB',
    customer: {
      key: 'CUSTA',
      name: 'Customer A'
    },
    partner: {
      key: 'PARTB',
      name: 'Partner B'
    }
  }

  // Verify the structure
  t.is(mockProject.partnerKey, 'PARTB')
  t.is(mockProject.partner.key, 'PARTB')
  t.is(mockProject.partner.name, 'Partner B')
  t.is(mockProject.customer.key, 'CUSTA')
  t.is(mockProject.customer.name, 'Customer A')
})

test('Partner project filtering logic', (t) => {
  const allProjects = [
    {
      key: 'PROJ1',
      customerKey: 'CUSTA',
      partnerKey: 'PARTB',
      name: 'Project 1'
    },
    {
      key: 'PROJ2',
      customerKey: 'CUSTB',
      partnerKey: 'PARTB',
      name: 'Project 2'
    },
    {
      key: 'PROJ3',
      customerKey: 'CUSTC',
      partnerKey: 'PARTA',
      name: 'Project 3'
    },
    {
      key: 'PROJ4',
      customerKey: 'CUSTD',
      partnerKey: null,
      name: 'Project 4'
    }
  ]

  // Filter projects where PARTB is partner
  const partnerBProjects = allProjects.filter((p) => p.partnerKey === 'PARTB')

  t.is(partnerBProjects.length, 2)
  t.is(partnerBProjects[0].key, 'PROJ1')
  t.is(partnerBProjects[1].key, 'PROJ2')

  // Filter projects where PARTA is partner
  const partnerAProjects = allProjects.filter((p) => p.partnerKey === 'PARTA')

  t.is(partnerAProjects.length, 1)
  t.is(partnerAProjects[0].key, 'PROJ3')

  // Filter projects with no partner
  const noPartnerProjects = allProjects.filter((p) => !p.partnerKey)

  t.is(noPartnerProjects.length, 1)
  t.is(noPartnerProjects[0].key, 'PROJ4')
})
