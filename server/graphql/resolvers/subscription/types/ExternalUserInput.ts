import 'reflect-metadata'
import { Field, InputType } from 'type-graphql'
import { User } from '../../types'

/**
 * @category GraphQL InputType
 */
@InputType({
    description: 'Input object for External User'
})
export class ExternalUserInput {
    @Field({ nullable: true })
    mail?: string

    @Field({ nullable: true })
    role?: string

    @Field(() => User, { nullable: true })
    manager?: User

    @Field({ nullable: true })
    provider?: string
}