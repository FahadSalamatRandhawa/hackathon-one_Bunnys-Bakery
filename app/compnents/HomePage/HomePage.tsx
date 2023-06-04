import Locations from "./compnents/Locations";
import NewArrivals from "./compnents/NewArrivals";

export default function HomePage(){
    return (
        <div className=" flex flex-col w-auto">
            <NewArrivals/>
            <Locations/>
        </div>
    )
}