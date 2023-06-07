'use client'
import {useStripe,useElements,PaymentElement,LinkAuthenticationElement,AddressElement} from '@stripe/react-stripe-js'
import { useState,useEffect, SetStateAction } from 'react'

export default function CheckoutForm(){
    const stripe=useStripe()
    const elements=useElements()
    const [isProcessing,setIsProcessing]=useState(false)
    const [message,setMessage]=useState<any>()
    const [email,setEmail]=useState()
    const [address,setAddress]=useState<any>()

    useEffect(()=>{
        if(!stripe){
            return;
        }
    const clientSecret = new URLSearchParams(window.location.search).get(
        "payment_intent_client_secret"
      );
  
      if (!clientSecret) {
        return;
      }
  
      stripe.retrievePaymentIntent(clientSecret).then(({ paymentIntent }) => {
        switch (paymentIntent?.status) {
          case "succeeded":
            setMessage("Payment succeeded!");
            break;
          case "processing":
            setMessage("Your payment is processing.");
            break;
          case "requires_payment_method":
            setMessage("Your payment was not successful, please try again.");
            break;
          default:
            setMessage("Something went wrong.");
            break;
        }
      });
    }, [stripe]);

    const handleSubmit=async(e:any)=>{
        e.preventDefault()
        if(!stripe || !elements){
            return;
        }

        setIsProcessing(true)
        const {error}=await stripe.confirmPayment({
            elements,
            confirmParams:{return_url:`${window.location.origin}/Checkout/verified`}
        })
        if(error){
            setMessage(error.message)
            if (error.type === "card_error" || error.type === "validation_error") {
                setMessage(error.message);
              } else {
                setMessage("An unexpected error occurred.");
              }
        }
        
    }
    return(
        <>
            <form id='payment-process' onSubmit={handleSubmit}>
                <LinkAuthenticationElement
                    id="link-authentication-element"
                    onChange={(e:any) => setEmail(e.target.value)}
                />
                <AddressElement onChange={(event)=>{event.complete?(setAddress(event.value.address)):null}} options={{mode:'shipping'}}/>
                        <PaymentElement id='payment-element' options={{layout:"tabs",fields:address}} />
                        <button id='submit' disabled={isProcessing||!address} className=" bg-slate-400/60 p-2 rounded-md min-w-[100px]">{isProcessing?'processing payment':'Pay'}</button>
                        {message&&<div>{message}</div>}
            </form>
        </>
    )

}