import * as React from 'react'
import { Link } from 'react-router-dom'
import { IProjectLinkProps } from './types'

export const ProjectLink = ({ project }: IProjectLinkProps) => (
  <Link to={`/projects/search/${project?.id}`}>{project?.name}</Link>
)
