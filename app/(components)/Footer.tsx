import Image from "next/image";

export default function Footer(){
    return (
        <>
            <div className=" w-auto min-h-[200px] bg-[#D9D9D9]/30 flex flex-col md:flex-row justify-around items-center gap-y-5 py-5 mt-10 md:mt-[100px] ">

                <div className=" w-[300px]  block">
                    <text className=" text-2xl font-bold">Bunny's Bakery</text>
                    <div className=" mt-2">This is just a s a asd sad sad s ample text</div>
                    <div className=" flex gap-5 mt-5">
                        <Image src='/facebook.svg' alt="youtube" width={40} height={40} />
                        <Image src='/youtube.svg' alt="youtube" width={40} height={40} />
                        <Image src='/linkedin.svg' alt="youtube" width={40} height={40} />
                    </div>
                </div>
                <div className=" w-auto h-min flex flex-wrap justify-center mt-5 gap-5 md:flex-row ">
                    <div className=" max-w-[250px] grid grid-cols-1 gap-2 font-medium">
                        <text className="  text-2xl text-[#000000]/60 font-bold ">Company</text>
                        <div>Legal </div>
                        <div>About us</div>
                        <div>Chefs</div>
                    </div>
                    <div className=" max-w-[250px] grid grid-cols-1 gap-2 font-medium">
                        <text className="  text-2xl text-[#000000]/60 font-bold ">Services</text>
                        <div>Custom </div>
                        <div>Booking</div>
                        <div>Ready to go</div>
                    </div>
                    <div className=" max-w-[250px] grid grid-cols-1 gap-2 font-medium">
                        <text className="  text-2xl text-[#000000]/60 font-bold ">Company</text>
                        <div>Support </div>
                        <div>Online chat</div>
                        <div>24/7 phone</div>
                    </div>
                    
                </div>
            </div>
        </>
    )
}