export interface ISigninError {
    code: string
    name: string
    message: string
    icon: string
    redirectDelayMs: number
    authProvider: string
}