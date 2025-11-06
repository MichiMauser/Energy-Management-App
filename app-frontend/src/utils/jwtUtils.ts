import type {JwtPayload} from "../interace/jwt.ts";


export const decodeJwtPayload = (token: string): JwtPayload | null => {

    try {
        const payloadBase64 = token.split('.')[1];
        const payloadJson = window.atob(payloadBase64)
        return JSON.parse(payloadJson) as JwtPayload
    }catch (e){
        console.log(e)
        return null;
    }
}