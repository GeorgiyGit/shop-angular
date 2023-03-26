import { ICategory } from './../../categories/models/category';
export interface ICreateProduct {
    id?:number,
    name:string,
    price:string,
    description:string,
    categories:number[],
    files:File[]
}