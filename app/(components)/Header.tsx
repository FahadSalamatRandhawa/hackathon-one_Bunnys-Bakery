import Image from 'next/image'
import cart from '/public/cart.svg'
import Link from 'next/link'
import CartCount from './Cart/components/cartCount'
import { CartProvider } from './Cart/cartContext'

interface InterfaceCategory{
    _type:'string',
    _key:'string',
    categoryName:'string',
    Products:object
}

export default function Header({categories}:{categories:InterfaceCategory[]}){
    //console.log(categories)
    return(
        <>
             <div className=' w-auto md:h-[80px] gap-y-10 py-2 flex flex-col md:flex-row items-center justify-around mb-[50px] bg-gradient-to-b from-[#c74e1aea] via-[#b56746d8] via-60% to-[#7e3719d1]'>
                <div className=' flex flex-col md:flex-row gap-[10px] font-medium'>
                   {categories.map(({categoryName,_key})=>(
                     <Link href={`/${categoryName}`}><div key={_key} className=' w-[151px] h-[39px] text-center italic text-white text-3xl font-[jsMath-cmmi10]'>{categoryName}</div></Link>
                   ))}
                    
                </div>
                {/**<input className=" md:w-[300px] h-[35px] bg-no-repeat bg-gradient-to-r from-[#c03b02d8] from-10% to-orange-500/50 rounded-sm pl-5 text-white placeholder: font-medium placeholder:text-white placeholder:text-xl " placeholder=' Search item' /> */}
                <div className=' flex flex-col place-items-start'>
                    <CartProvider>
                        <CartCount/>
                    </CartProvider>
                    <Link href='/Cart/'><Image className='' src={'/cart.svg'} width={100} height={100} alt='cart'/></Link>
                </div>
            </div>
        </>
    )
}