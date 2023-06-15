import Image from 'next/image'
import Link from 'next/link'
import CartCount from './Cart/components/cartCount'
import { cookies } from 'next/headers'
import { decode } from 'jsonwebtoken'
import User from './User/page'

interface InterfaceCategory{
    _type:'string',
    _key:'string',
    categoryName:'string',
    Products:object
}

export function getUser(){
    const accessToken=cookies().get('accessToken')?.value;
    if(accessToken){
        const decodedToken:any=decode(accessToken);
        const payload=decodedToken?.payload
        return payload;
    }
    return;
}

export default function Header({categories}:{categories:InterfaceCategory[]}){
    const user= getUser()
    console.log(user)
    return(
        <>
             <div className=' w-auto md:h-[80px] gap-y-10 py-2 flex flex-col md:flex-row items-center justify-between md:px-10 mb-[50px] bg-gradient-to-b from-[#c74e1aea] via-[#b56746d8] via-60% to-[#7e3719d1]'>
                
                <div>
                    Home
                </div>
                
                <div className=' flex flex-col md:flex-row gap-[10px] font-medium'>
                   {categories.map(({categoryName,_key})=>(
                     <Link href={`/${categoryName}`}><div key={_key} className=' w-[151px] h-[39px] text-center italic text-white text-3xl font-[jsMath-cmmi10]'>{categoryName}</div></Link>
                   ))}
                    
                </div>
                {/**<input className=" md:w-[300px] h-[35px] bg-no-repeat bg-gradient-to-r from-[#c03b02d8] from-10% to-orange-500/50 rounded-sm pl-5 text-white placeholder: font-medium placeholder:text-white placeholder:text-xl " placeholder=' Search item' /> */}
                <div className=' flex md:w-[200px] justify-between'>
                    <div className=' flex flex-col place-items-start'> 
                                <CartCount/>
                            <Link href='/Cart/'><Image className='' src={'/cart.svg'} width={100} height={100} alt='cart'/></Link>
                    </div>
                    <User user={user} />
                </div>
            </div>
        </>
    )
}