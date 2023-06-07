export const revalidate=3600

import Link from "next/link";
import ProductCard from "./ProductCard";
import { client } from "@/sanity/lib/client";
import { IProduct } from "./ProductCard";

export default async function Breads({params}:{params:{categoryName:string}}){

    const {categories}=await client.fetch(`*[_type=="BunnyBakery"][0]{categories[categoryName == "${params.categoryName}"][0]{Products}}`);
    const products=categories?.Products
    //console.log(products)

    //console.log(params.categoryName)

    return(
        <>
            <div className=" h-auto flex flex-row flex-wrap p-10 gap-x-5 items-start justify-center sm:justify-evenly">
                {products?
                products.map((product:IProduct)=>(
                    <Link href={`/${params.categoryName}/${product._key}`}>
                    <ProductCard productMeta={product} key={product._key} /></Link>
                )):<div className=" text-red-500">no products yet</div>    
            }
            </div>
        </>
    )
}