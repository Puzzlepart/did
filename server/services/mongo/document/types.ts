export type FieldType = 'JSON'

export type ExtensionMetadata = {
    status: 'Available' | 'Unavailable'
    description: string
}
export type Extensions = Map<string, ExtensionMetadata>

export abstract class Extension {
    public abstract id: string
    public abstract metadata: ExtensionMetadata
}