import Points from "./components/Points";
import Locations from "./components/Locations";
import NewArrivals from "./components/NewArrivals";

 const HomePage=()=>{
    return (
        <div className=" flex flex-col w-auto gap-y-10">
            <NewArrivals/>
            <Locations/>
            <Points/>
        </div>
    )
}
export default HomePage;