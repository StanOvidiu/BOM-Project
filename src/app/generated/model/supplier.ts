export interface Supplier{
    _id?: string,
    name?: string,
    ceos_catalog?: boolean,
    contact_person?: string,
    phone_number?: Array<string>,
    mail?: Array<string>,
    details?: string,
    web_page?: string,
    ranking_details?: string,
    projects?: Array<string>,
    address?: string
}