import 'reflect-metadata'
import { Field, InputType } from 'type-graphql'

@InputType({ description: 'Input object for Event used in Mutation submitPeriod' })
export class EventInput {
  @Field()
  id: string;

  @Field()
  projectId: string;

  @Field({ nullable: true })
  manualMatch: boolean;
}
