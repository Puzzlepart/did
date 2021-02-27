/* eslint-disable max-classes-per-file */
import 'reflect-metadata'
import { Field, ID, ObjectType } from 'type-graphql'
import { BaseResult } from '../types'

@ObjectType({
  description: 'A type that describes a OutlookCategory',
  simpleResolvers: true
})
export class OutlookCategory {
  @Field(() => ID)
  id: string

  @Field()
  key?: string

  @Field()
  displayName: string

  @Field()
  color: string
}

@ObjectType({
  description: 'A type that describes a CreateOutlookCategoryResult'
})
export class CreateOutlookCategoryResult extends BaseResult {
  @Field({ nullable: true })
  data: OutlookCategory
}
