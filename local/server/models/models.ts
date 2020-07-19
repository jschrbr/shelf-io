import {
    BaseModel,
    Field,
    FieldType,
    Model,
} from "https://deno.land/x/dso@v1.0.0/mod.ts";

import dso from "../config/configDB.ts"

export interface Part {
    id: number,
    updated_at: Date,
    created_at: Date,
    name: string,
    quantity: number,
}

export interface addInput {
    name: string,
    quantity: number
}

export interface editInput {
    id: number,
    quantity: number
}

export interface removeInput {
    id: number,
}

@Model("parts")
class PartModel extends BaseModel {
    // The ! operator is needed for primary key since it's never null 
    @Field({
        type: FieldType.INT,
        primary: true,
        length: 11,
        autoIncrement: true
    })
    id!: number;
    @Field({ type: FieldType.STRING, length: 30, notNull: true })
    name!: string;
    @Field({ type: FieldType.INT, length: 11, notNull: true })
    quantity!: number;
}

export const partModel = await dso.define(PartModel)

await dso.sync(false);
