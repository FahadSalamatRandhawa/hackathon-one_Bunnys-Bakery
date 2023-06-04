import Image from "next/image";

export default function Locations(){
    return (
        
        <div className=" w-auto flex flex-col items-center">
            <text className=" text-4xl mb-5 font-semibold opacity-70">Locations</text>

            {/** Locations */}
            <div className=" w-auto  h-auto flex flex-col gap-y-[30px] items-center p-5 bg-[#B14F25]/5 ">

                <div className=" flex flex-wrap justify-around gap-y-[50px] gap-x-[300px]">
                    <div className=" w-[100px] m-3">
                        <Image src={'/bakery.svg'} alt=" bakery" width={100} height={100} />
                        <text>Austin, TX 34th street</text>
                    </div>
                    <div className=" w-[100px] m-3">
                        <Image src={'/bakery.svg'} alt=" bakery" width={100} height={100} />
                        <text>Austin, TX 34th street</text>
                    </div>
                    <div className=" w-[100px] m-3">
                        <Image src={'/bakery.svg'} alt=" bakery" width={100} height={100} />
                        <text>Austin, TX 34th street</text>
                    </div>
                    <div className=" w-[100px] m-3">
                        <Image src={'/bakery.svg'} alt=" bakery" width={100} height={100} />
                        <text>Austin, TX 34th street</text>
                    </div>
                    <div className=" w-[100px] m-3">
                        <Image src={'/bakery.svg'} alt=" bakery" width={100} height={100} />
                        <text>Austin, TX 34th street</text>
                    </div>
                </div>

                <text className=" text-2xl text-orange-500">More coming soon .....</text>
            </div>
        </div>
    )
}