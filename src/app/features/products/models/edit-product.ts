import { ICategory } from './../../categories/models/category';
export interface IEditProduct {
    id:number,
    name:string,
    price:string,
    description:string,
    categories:number[],
    files:File[]
    removeFiles:string[]
}