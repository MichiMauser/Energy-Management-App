

export interface JwtPayload{
    role: string,
    authId: number,
    mail: string,
    exp: number
}