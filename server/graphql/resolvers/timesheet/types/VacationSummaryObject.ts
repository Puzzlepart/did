import 'reflect-metadata'
import { Field, Float, ObjectType } from 'type-graphql'

/**
 * An Object type that describes a VacationSummary
 *
 * @category GraphQL ObjectType
 */
@ObjectType({
  description: 'An Object type that describes a VacationSummary',
  simpleResolvers: true
})
export class VacationSummary {
  @Field(() => String)
  category?: string

  @Field(() => Float)
  total?: number

  @Field(() => Float)
  used?: number

  @Field(() => Float)
  usedHours?: number

  @Field(() => Float)
  remaining?: number
}
