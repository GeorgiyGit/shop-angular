import { ICategory } from './../../categories/models/category';
export interface ISimpleProduct {
    id:number,
    name:string,
    price:number,
    categories:ICategory[],
    files:string[]
}