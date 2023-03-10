/* eslint-disable max-classes-per-file */
import 'reflect-metadata'
import { Field, InputType, ObjectType } from 'type-graphql'

/**
 * Input object for ReportLink used in GraphQL mutation `addOrUpdateReportLink`
 *
 * @category GraphQL InputType
 */
@InputType({
  description:
    'Input object for ReportLink used in GraphQL mutation addOrUpdateReportLink'
})
export class ReportLinkInput {
  @Field()
  name: string

  @Field({ nullable: true, defaultValue: '' })
  description: string

  @Field({ nullable: true, defaultValue: 'ExcelDocument' })
  icon: string

  @Field({ nullable: true, defaultValue: '#008000' })
  iconColor: string

  /**
   * External URL to the report (e.g. Google Drive, Sharepoint, etc.)
   */
  @Field()
  externalUrl: string

  /**
   * Year number for the report in format `YYYY`
   */
  @Field({ nullable: true, defaultValue: null })
  year: number

  /**
   * Zero-indexed month number
   */
  @Field({ nullable: true, defaultValue: null })
  month: number

  /**
   * Whether the report is published or not (`true` or `false`).
   */
  @Field({ nullable: true, defaultValue: null })
  published?: boolean

  /**
   * Whether the report is promoted or not (`true` or `false`). If the
   * report is promoted, it will be shown on the Reports front page.
   */
  @Field({ nullable: true, defaultValue: null })
  promoted?: boolean
}

/**
 * @category GraphQL InputType
 */
@InputType({ description: 'Input object for ReportLink query' })
export class ReportLinkQuery {
  @Field({ nullable: true })
  published?: boolean

  @Field({ nullable: true })
  promoted?: boolean
}

/**
 * A type that describes a ReportLink
 *
 * @category GraphQL ObjectType
 */
@ObjectType({
  description: 'A type that describes a ReportLink',
  simpleResolvers: true
})
export class ReportLink {
  _id: string

  @Field()
  name: string

  @Field({ nullable: true, defaultValue: '' })
  description: string

  @Field({ nullable: true, defaultValue: 'ExcelDocument' })
  icon: string

  @Field({ nullable: true, defaultValue: '#008000' })
  iconColor: string

  /**
   * External URL to the report (e.g. Google Drive, Sharepoint, etc.)
   */
  @Field()
  externalUrl: string

  /**
   * Date when the report was created
   */
  @Field()
  createdAt: Date

  /**
   * Date when the report was last updated
   */
  @Field()
  updatedAt: Date

  /**
   * User display name for the user who created the report
   */
  @Field({ nullable: true, defaultValue: null })
  createdBy: string

  /**
   * User display name for the user who last updated the report
   */
  @Field({ nullable: true, defaultValue: null })
  updatedBy: string

  /**
   * Year number for the report in format `YYYY`
   */
  @Field({ nullable: true, defaultValue: null })
  year: number

  /**
   * Zero-indexed month number
   */
  @Field({ nullable: true, defaultValue: null })
  month: number

  /**
   * Link reference. The format is `YYYY_MM` where January is `1` (not zero-indexed).
   * If the report is not associated with a month (but with the year as a whole), the format is `YYYY`.
   */
  @Field({ nullable: true, defaultValue: null })
  get linkRef(): string {
    return [this.year, this.month && (this.month + 1)].filter(Boolean).join('_')
  }

  /**
   * Whether the report is published or not (`true` or `false`)
   */
  @Field({ nullable: true, defaultValue: null })
  published?: boolean

  /**
   * Whether the report is promoted or not (`true` or `false`). If the
   * report is promoted, it will be shown on the Reports front page.
   */
  @Field({ nullable: true, defaultValue: null })
  promoted?: boolean

  /**
   * Constructs a new ReportLink
   *
   * @param input - Input
   */
  constructor(input?: ReportLinkInput) {
    Object.assign(this, input || {})
  }
}
