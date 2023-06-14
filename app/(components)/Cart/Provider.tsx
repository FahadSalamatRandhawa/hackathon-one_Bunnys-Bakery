'use client'
import { Provider } from "react-redux"
import { CartStore } from "./CartStorage/Store"

const Providers=({children}:{children:React.ReactNode})=>{
    return(
        <Provider store={CartStore}>{children}</Provider>
    )
}

export default Providers;