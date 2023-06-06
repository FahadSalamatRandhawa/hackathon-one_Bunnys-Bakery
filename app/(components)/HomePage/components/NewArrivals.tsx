import Image from "next/image"

export default function NewArrivals(){
    return (
        <div className="  w-auto h-[700px] flex flex-col md:flex-row justify-around items-center">

            {/* Left Side  */}
            <div className=" md:w-[800px] h-[600px] flex flex-col items-center bg-gradient-to-br from-orange-100/20 via-orange-200/20 to-orange-400/40 ">

                {/* Baegles Section  */}
                <div className=" flex justify-between items-center px-5 h-1/2 ">
                    <Image src={'/baegle-removebg-preview.png'} width={300} height={200} alt='baegles' />
                    <div className=" md:w-[300px] h-[200px] font-italiana text-4xl md:text-6xl">
                        Our new items
                    </div>
                </div>

                {/* Coffee Section  */}
                <div className=" w-4/5 h-1/2 flex justify-between items-center ">
                    <div className=" w-[150px] md:w-[300px] h-[200px] break-words font-italiana text-lg md:text-2xl">
                        Enjoy the 2 new items that taste even better than they look
                    </div>
                    <Image src={'/coffee-removebg-preview.png'} width={300} height={200} alt='baegles' />
                </div>
            </div>

            {/* Right Side  */}
            <div className=" md:w-[400px] leading-normal text-5xl md:text-7xl font-bold opacity-60 place-self-center">Food that fills your soul</div>
        </div>
    )
}