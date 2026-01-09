import test, { ExecutionContext } from 'ava'
import { ProjectRoleEventExtension, TimeEntryExtensionContext } from './extensions'
import { ClientEventInput, EventObject, Project } from '../../graphql'
import { ITimesheetPeriodData } from './types'

const createMockContext = (
  overrides: Partial<{
    projectId: string
    userId: string
    projectExtensions: any
  }> = {}
): TimeEntryExtensionContext => {
  const {
    projectId = 'project-123',
    userId = 'user-123',
    projectExtensions = {}
  } = overrides

  const project: Project = {
    _id: projectId,
    extensions: JSON.stringify(projectExtensions)
  } as Project

  const period: ITimesheetPeriodData = {
    userId
  } as ITimesheetPeriodData

  const matchedEvent: ClientEventInput = {
    projectId
  } as ClientEventInput

  const originalEvent: EventObject = {} as EventObject

  return {
    period,
    matchedEvent,
    originalEvent,
    projects: [project]
  }
}

test('ProjectRoleEventExtension: returns role from resource with hourlyRate', (t: ExecutionContext) => {
  const context = createMockContext({
    projectExtensions: {
      '2dfbce96-947f-4c26-95b4-5eda10616074': {
        properties: {
          resources: [
            {
              id: 'user-123',
              projectRole: 'Developer',
              hourlyRate: 1200
            }
          ]
        }
      },
      '3f04bf7b-2a80-4e28-843d-64d1bd622ea7': {
        properties: {
          roleDefinitions: [
            {
              name: 'Developer',
              hourlyRate: 1000,
              isDefault: false
            }
          ]
        }
      }
    }
  })

  const result = ProjectRoleEventExtension.apply({} as any, context)

  t.deepEqual(result, {
    role: {
      name: 'Developer',
      hourlyRate: 1200
    }
  })
})

test('ProjectRoleEventExtension: falls back to role definition when resource hourlyRate is null', (t: ExecutionContext) => {
  const context = createMockContext({
    projectExtensions: {
      '2dfbce96-947f-4c26-95b4-5eda10616074': {
        properties: {
          resources: [
            {
              id: 'user-123',
              projectRole: 'Prosjektleder',
              hourlyRate: null
            }
          ]
        }
      },
      '3f04bf7b-2a80-4e28-843d-64d1bd622ea7': {
        properties: {
          roleDefinitions: [
            {
              name: 'Prosjektleder',
              hourlyRate: 1500,
              isDefault: false
            }
          ]
        }
      }
    }
  })

  const result = ProjectRoleEventExtension.apply({} as any, context)

  t.deepEqual(result, {
    role: {
      name: 'Prosjektleder',
      hourlyRate: 1500
    }
  })
})

test('ProjectRoleEventExtension: falls back to role definition when resource hourlyRate is undefined', (t: ExecutionContext) => {
  const context = createMockContext({
    projectExtensions: {
      '2dfbce96-947f-4c26-95b4-5eda10616074': {
        properties: {
          resources: [
            {
              id: 'user-123',
              projectRole: 'Consultant'
            }
          ]
        }
      },
      '3f04bf7b-2a80-4e28-843d-64d1bd622ea7': {
        properties: {
          roleDefinitions: [
            {
              name: 'Consultant',
              hourlyRate: 1800,
              isDefault: false
            }
          ]
        }
      }
    }
  })

  const result = ProjectRoleEventExtension.apply({} as any, context)

  t.deepEqual(result, {
    role: {
      name: 'Consultant',
      hourlyRate: 1800
    }
  })
})

test('ProjectRoleEventExtension: handles zero hourlyRate on resource (zero is valid)', (t: ExecutionContext) => {
  const context = createMockContext({
    projectExtensions: {
      '2dfbce96-947f-4c26-95b4-5eda10616074': {
        properties: {
          resources: [
            {
              id: 'user-123',
              projectRole: 'Intern',
              hourlyRate: 0
            }
          ]
        }
      },
      '3f04bf7b-2a80-4e28-843d-64d1bd622ea7': {
        properties: {
          roleDefinitions: [
            {
              name: 'Intern',
              hourlyRate: 500,
              isDefault: false
            }
          ]
        }
      }
    }
  })

  const result = ProjectRoleEventExtension.apply({} as any, context)

  t.deepEqual(result, {
    role: {
      name: 'Intern',
      hourlyRate: 0
    }
  })
})

test('ProjectRoleEventExtension: returns undefined hourlyRate when role definition not found', (t: ExecutionContext) => {
  const context = createMockContext({
    projectExtensions: {
      '2dfbce96-947f-4c26-95b4-5eda10616074': {
        properties: {
          resources: [
            {
              id: 'user-123',
              projectRole: 'NonExistentRole',
              hourlyRate: null
            }
          ]
        }
      },
      '3f04bf7b-2a80-4e28-843d-64d1bd622ea7': {
        properties: {
          roleDefinitions: [
            {
              name: 'Developer',
              hourlyRate: 1000,
              isDefault: false
            }
          ]
        }
      }
    }
  })

  const result = ProjectRoleEventExtension.apply({} as any, context)

  t.deepEqual(result, {
    role: {
      name: 'NonExistentRole',
      hourlyRate: undefined
    }
  })
})

test('ProjectRoleEventExtension: uses default role when no resource found', (t: ExecutionContext) => {
  const context = createMockContext({
    userId: 'user-999',
    projectExtensions: {
      '2dfbce96-947f-4c26-95b4-5eda10616074': {
        properties: {
          resources: [
            {
              id: 'user-123',
              projectRole: 'Developer',
              hourlyRate: 1200
            }
          ]
        }
      },
      '3f04bf7b-2a80-4e28-843d-64d1bd622ea7': {
        properties: {
          roleDefinitions: [
            {
              name: 'Standard',
              hourlyRate: 1100,
              isDefault: true
            }
          ]
        }
      }
    }
  })

  const result = ProjectRoleEventExtension.apply({} as any, context)

  t.deepEqual(result, {
    role: {
      name: 'Standard',
      hourlyRate: 1100
    }
  })
})

test('ProjectRoleEventExtension: returns empty when no resource and no default role', (t: ExecutionContext) => {
  const context = createMockContext({
    userId: 'user-999',
    projectExtensions: {
      '2dfbce96-947f-4c26-95b4-5eda10616074': {
        properties: {
          resources: []
        }
      },
      '3f04bf7b-2a80-4e28-843d-64d1bd622ea7': {
        properties: {
          roleDefinitions: []
        }
      }
    }
  })

  const result = ProjectRoleEventExtension.apply({} as any, context)

  t.deepEqual(result, {})
})

test('ProjectRoleEventExtension: returns empty when no projectId', (t: ExecutionContext) => {
  const context = createMockContext()
  ;(context.matchedEvent as any).projectId = undefined

  const result = ProjectRoleEventExtension.apply({} as any, context)

  t.deepEqual(result, {})
})

test('ProjectRoleEventExtension: returns empty when project not found', (t: ExecutionContext) => {
  const context = createMockContext({ projectId: 'non-existent' })
  context.projects = []

  const result = ProjectRoleEventExtension.apply({} as any, context)

  t.deepEqual(result, {})
})

test('ProjectRoleEventExtension: handles invalid JSON extensions', (t: ExecutionContext) => {
  const context = createMockContext()
  ;(context.projects[0] as any).extensions = 'invalid-json'

  const result = ProjectRoleEventExtension.apply({} as any, context)

  t.deepEqual(result, {})
})

test('ProjectRoleEventExtension: handles empty roleDefinitions array', (t: ExecutionContext) => {
  const context = createMockContext({
    projectExtensions: {
      '2dfbce96-947f-4c26-95b4-5eda10616074': {
        properties: {
          resources: [
            {
              id: 'user-123',
              projectRole: 'Developer',
              hourlyRate: null
            }
          ]
        }
      },
      '3f04bf7b-2a80-4e28-843d-64d1bd622ea7': {
        properties: {
          roleDefinitions: []
        }
      }
    }
  })

  const result = ProjectRoleEventExtension.apply({} as any, context)

  t.deepEqual(result, {
    role: {
      name: 'Developer',
      hourlyRate: undefined
    }
  })
})

test('ProjectRoleEventExtension: handles empty resources array', (t: ExecutionContext) => {
  const context = createMockContext({
    projectExtensions: {
      '2dfbce96-947f-4c26-95b4-5eda10616074': {
        properties: {
          resources: []
        }
      },
      '3f04bf7b-2a80-4e28-843d-64d1bd622ea7': {
        properties: {
          roleDefinitions: [
            {
              name: 'Default',
              hourlyRate: 1000,
              isDefault: true
            }
          ]
        }
      }
    }
  })

  const result = ProjectRoleEventExtension.apply({} as any, context)

  t.deepEqual(result, {
    role: {
      name: 'Default',
      hourlyRate: 1000
    }
  })
})

test('ProjectRoleEventExtension: case sensitive role name matching', (t: ExecutionContext) => {
  const context = createMockContext({
    projectExtensions: {
      '2dfbce96-947f-4c26-95b4-5eda10616074': {
        properties: {
          resources: [
            {
              id: 'user-123',
              projectRole: 'developer',
              hourlyRate: null
            }
          ]
        }
      },
      '3f04bf7b-2a80-4e28-843d-64d1bd622ea7': {
        properties: {
          roleDefinitions: [
            {
              name: 'Developer',
              hourlyRate: 1000,
              isDefault: false
            }
          ]
        }
      }
    }
  })

  const result = ProjectRoleEventExtension.apply({} as any, context)

  // Should not find the role due to case mismatch
  t.deepEqual(result, {
    role: {
      name: 'developer',
      hourlyRate: undefined
    }
  })
})
