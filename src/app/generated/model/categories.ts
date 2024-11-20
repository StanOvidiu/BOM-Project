import { Subcategories } from "./subcategories";

export interface Categories{
    _id?: any,
    image?: string,
    name?: string;
    subcategories: Array<Subcategories>
}