import { BindingSocketProducerInner } from "./bindingSocketProducerInner"

export interface Bomcomponent{
    componentId?: string,
    image?: string,
    name?: string,
    quantity?: number
    selectedSupplier?: string
    suppliers: Array<BindingSocketProducerInner>
}