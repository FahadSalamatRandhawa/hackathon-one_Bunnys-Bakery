import Image from "next/image";
import GreenPlusButton from "./GreenPlusButton";
import { client } from "@/sanity/lib/client";
import ImageUrlBuilder  from "@sanity/image-url";

export interface IProduct{
    name:string,
    stock:number,
    description:string,
    price:number,
    CoverImage:{asset:{_ref:string}},
    _key:string
}

const builder=ImageUrlBuilder(client)

export default function ProductCard({productMeta}:{productMeta:IProduct}){

    console.log()

    return(
        <div className=" h-[310px] w-[250px] p-2 leading-none bg-gradient-to-t from-[#c0bebd]/90 to-[#af714c] rounded-md mb-5">
            <Image src={(builder.image(productMeta.CoverImage.asset._ref).width(240).height(200).url()).toString()} alt="baguette" width={240} height={200}/>
                <div className=" flex">
                    <div className=" h-10 w-[200px] overflow-hidden leading-none text-xl font-semibold">{productMeta.name}</div>
                    <GreenPlusButton product={productMeta} _key={productMeta._key}/>
                </div>
                <div className=" h-9 overflow-hidden ">{productMeta.description}</div>
                <div className=" w-auto text-end text-lg font-bold ">$ {productMeta.price}</div>
        </div>
    )
}