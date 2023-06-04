export const revalidate=3600

import Image from "next/image"
import Description from "../../Product/components/Description"
import { client } from "@/sanity/lib/client"



import '../../p.css'

import { IProduct } from "../ProductCard"
import { Details } from "../../Product/components/Description"
import Filter from "../../Product/components/Filters"
import ImageUrlBuilder  from "@sanity/image-url";

export interface IFullProduct extends IProduct{
    details:Details[],
    extraImages:{asset:{_ref:string}}[],
    variants:string[]|null,
}

const builder=ImageUrlBuilder(client)

export default async function({params}:{params:{categoryName:string,Product:string}}){
    const {categories}=await client.fetch(`*[_type=="BunnyBakery"][0]{categories[categoryName == "${params.categoryName}"][0]{Products[_key=="${params.Product}"][0]}}`);
    
    const product:IFullProduct=categories?.Products
    //console.log(builder.image(product.extraImages[0].asset._ref).toString())
    //console.log(product.variants?.length);
    //console.log(params.categoryName);


    return (
        <>
            <div className=" flex flex-col my-10 gap-y-[100px]">
                <div className="  w-full md:h-[500px] flex flex-col md:flex-row  px-5 gap-10 justify-center place-self-center">
                    <div className=" scrl scroll-m-6 pr-5 h-[150px] md:h-auto gap-3 overflow-scroll scroll-smooth flex flex-col flex-wrap lg:mr-10 will-change-scroll">
                       {
                        product.extraImages.map((image)=>(
                              <div className=" relative w-[150px] h-[150px]">
                                    <Image src={builder.image(image.asset._ref).toString()} fill className=" object-cover" alt="bread" />
                              </div>
                        ))
                       }
                       
                    </div>
                    <div className=" flex relative md:w-[400px] h-[500px]">
                        <Image src='/baguettes.jpg'  fill className=" place-self-center " alt="bread" />
                    </div>


                    {/** Details */}
                    <Filter categoryName={params.categoryName} Product={product} />
                    
                </div>
                <Description details={product.details} />
            </div>
        </>
    )
}