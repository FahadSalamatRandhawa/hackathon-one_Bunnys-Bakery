//import BlockContent from '@sanity/block-content-to-react'

export type Details={
    detailTitle: 'string',
    _key: 'string',
    detailDescription:string[] ,
    _type: 'string'
  }

export default function Description({details}:{details:Details[]}){
    //console.log(details[0].detailDescription)
    return (
        <>
            <div className=" w-11/12 flex flex-col justify-self-center self-center my-10 p-8 md:p-16 gap-5 bg-[#D9D9D9]/30">
                <div className=" flex items-center align-middle ">
                    <div className=" absolute text-6xl md:text-7xl font-extrabold text-[#000000]/10">Overview</div>
                    <div className=" pl-2 text-lg font-semibold">Nutrition Information</div>
                </div>
                <div className=" block border-y-[1px] border-solid border-[#B73E0B] w-10/12 mt-3"></div>
                <div className=" grid grid-cols-3 gap-10 md:gap-0 mt-5 font-semibold text-xl text-[#090808]/60">
                    {details?(details.map(({detailTitle,detailDescription})=>(<>
                        <div>{detailTitle}</div>
                        <div className=" col-span-2 font-light">{}</div></>))):null}
                        
                </div>
                
            </div>
        </>
    )
}