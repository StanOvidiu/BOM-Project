import { Routes } from '@angular/router';
import { BindingsocketComponent } from './BindingSocketFolder/bindingsocket/bindingsocket.component';
import { CreatebindingsocketComponent } from './BindingSocketFolder/createbindingsocket/createbindingsocket.component';
import { EditbindingsocketComponent } from './BindingSocketFolder/editbindingsocket/editbindingsocket.component';
import { CategoriesComponent } from './Catalogue/categories/categories.component';
import { SubcategoriesComponent } from './Catalogue/subcategories/subcategories.component';
import { LoginComponent } from './LogIn/login/login.component';
import { BomspageComponent } from './BOMS/bomspage/bomspage.component';
import { BomdetailsComponent } from './BOMDetails/bomdetails/bomdetails.component';
import { SuppliersContactComponent } from './suppliers-contact/suppliers-contact.component';
import { HomepageComponent } from './homepage/homepage.component';

export const routes: Routes = [
    {
        path: 'bindingSocket',
        component: BindingsocketComponent,
        title: 'Binding Socket'
    },
    {
        path: 'createBindingSocket',
        component: CreatebindingsocketComponent,
        title: 'Create Binding Socket'
    },
    {
        path: 'editBindingSocket',
        component: EditbindingsocketComponent,
        title: 'Edit Binding Socket'
    },
    {
        path: 'categories',
        component: CategoriesComponent,
        title: 'Categories'
    },
    {
        path: '',
        component: HomepageComponent,
        title: 'Home Page'
    },
    {
        path: 'subcategories',
        component: SubcategoriesComponent,
        title: 'Subcategories'
    },
    {
        path: 'login',
        component: LoginComponent,
        title: 'Login'
    },
    {
        path: 'boms',
        component: BomspageComponent,
        title: 'BOMS'
    },
    {
        path: 'bomDetails',
        component: BomdetailsComponent,
        title: 'BOM Details'
    },
    {
        path: 'Contact',
        component: SuppliersContactComponent,
        title: 'Supplier Contacts'
    }
];