import { VariantComponent } from "./variantComponent";

export interface Variant{
    _id?: string,
    name: string,
    parent_id: string,
    components: Array<VariantComponent>
}