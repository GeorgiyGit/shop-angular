import { ICategory } from './../../categories/models/category';
export interface IFullProduct {
    id:number,
    name:string,
    price:number,
    description:string,
    categories:ICategory[],
    images:string[]
}