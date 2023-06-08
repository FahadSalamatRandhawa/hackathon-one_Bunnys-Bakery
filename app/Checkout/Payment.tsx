"use client"
import './globals.css'
import { useEffect,useState } from "react"
import {loadStripe} from '@stripe/stripe-js'
import {Elements} from '@stripe/react-stripe-js'
import CheckoutForm from './CheckoutForm'


//type stripeType=typeof Stripe;
export default function Payment(){
    const [stripePromise,setStripePromise]=useState<any>();
    const [clientSecret,setClientSecret]=useState();
    const [error,setError]=useState(false);
    
    
    useEffect(()=>{
        try{
            fetch('/api/Stripe').then(async(r)=>{
                const {publishkey}=await r.json()
                console.log('publush key',publishkey)
                setStripePromise(loadStripe(publishkey))
                console.log(stripePromise)
            })
        }catch(err){
            console.log('could get publish key',err);
        }

    },[])
    useEffect(()=>{
        try{
            fetch('/api/Stripe',{
                cache:'no-cache',
                method:'POST',
                body:JSON.stringify({message:'none'})
            }).then(async(r)=>{
                const {clientSecret} =await r.json()
                console.log('client secret fetched')
                if(!r.ok){setError(true);console.log('eror in client secret')}
                setClientSecret(clientSecret);
            }).catch((err)=>{
                console.log('stripe api side issue')
            })
        }catch(err){
            console.log('erro in stripePromise')
        }
    },[])

   
    return(
        <div>
            {stripePromise && clientSecret && (
                <Elements stripe={stripePromise} options={{clientSecret,appearance:{theme:'night'}}}>
                    <CheckoutForm/>
                </Elements>
            )}
        </div>
    )
}