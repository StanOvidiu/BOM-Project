import { Component } from "@angular/core";
import { Bomcomponent } from "./bomcomponent";

export interface Bom{
    _id?: any,
    selected?: boolean,
    bom_id?: string,
    project_name?: string,
    project_ds?: string,
    project_dg?: string,
    equipment_name?: string,
    variant?: string,
    sets?: number,
    created_by?: string,
    created_date?: string,
    componentIDs: Array<string>
}