import { checkId } from "../../utils/validators.ts"


export const getPart = (parts: any) => {
    return {
        getPart: (_: any, { id }: { id: number }) => {
            return checkId(parts, id);
        }
    }
}
export const getParts = (parts: any) => {
    return {
        getParts: () => {
            return parts;
        }
    }
}
