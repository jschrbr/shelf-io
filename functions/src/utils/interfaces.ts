export type User = {
    id: string
    name: string
}
export type Part = {
    id: string
    name: string
    quantity: number
    created_at: Date
    updated_at: Date
}

export interface addInput {
    name: string,
    quantity: number
}

export interface editInput {
    id: string,
    quantity: number
}

export interface removeInput {
    id: string,
}
