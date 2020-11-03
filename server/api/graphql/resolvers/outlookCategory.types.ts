/* eslint-disable max-classes-per-file */
import 'reflect-metadata'
import { Field, ID, ObjectType } from 'type-graphql'

@ObjectType({ description: 'A type that describes a OutlookCategory' })
export class OutlookCategory {
  @Field(() => ID)
  id: string

  @Field()
  key: string

  @Field()
  displayName: string

  @Field()
  color: string
}
