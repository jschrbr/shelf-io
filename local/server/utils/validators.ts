import { Part } from "../models/models.ts"

export const checkName = (parts: any, name: string) => {
    const part = parts.find((part: Part) => part.name.includes(name));
    return checkPart(part, name)
}

export const checkId = (parts: any, id: number) => {
    const part = parts.find((part: Part) => part.id === Number(id));
    return checkPart(part, id)
}


const checkPart = (part: Part, cred: number | string) => {
    if (!part) {
        throw new Error(`No part name includes ${cred}`);
    }
    return part

}