import Image from 'next/image'
import cart from '/public/cart.svg'

export default function Header(){
    return(
        <>
             <div className=' w-auto h-[90px] flex flex-row items-center justify-around bg-gradient-to-b from-[#c6430bea] via-[#c03b02d8] via-60% to-[#b73f0bb0]'>
                <div className=' flex gap-[10px] font-medium'>
                    <div className=' w-[151px] h-[39px] text-center italic text-white text-3xl font-[jsMath-cmmi10]'>Bread</div>
                    <div className=' w-[151px] h-[39px] text-center italic text-white text-3xl font-[jsMath-cmmi10]'>Sweet</div>
                    <div className=' w-[151px] h-[39px] text-center italic text-white text-3xl font-[jsMath-cmmi10]'>Salted</div>
                    <div className=' w-[151px] h-[39px] text-center italic text-white text-3xl font-[jsMath-cmmi10]'>Drinks</div>
                </div>
                <input className=" w-[374px] h-[41px] bg-no-repeat bg-gradient-to-r from-[#c03b02d8] from-10% to-orange-500/50 rounded-sm pl-5 text-white placeholder: font-medium placeholder:text-white placeholder:text-xl " placeholder=' Search item' />
                <div className=' flex flex-col place-items-start'>
                    <div className=' bg-green-500/70 px-2 text-center absolute ml-3 text-black/70 rounded-full text-xl font-semibold z-10'>0</div>
                    <Image className='' src={cart} width={100} height={100} alt='cart'/>
                </div>
            </div>
        </>
    )
}