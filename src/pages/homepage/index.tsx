import { useState } from "react";
import FiveDayWeather from "../../components/five-day-weather";
import SideBar from "../../components/sidebar";
import WeatherWidget from "../../components/WeatherWidget";
import DataVisualizer from "../../components/DataVisualizer";
import WindyMap from "../../components/WindyMap";




interface City {
    name: string;
    lat: number;
    lon: number;
    country: string;
  }
export default function Home (){
    const [selectedCity, setSelectedCity] = useState<City | null>(null);
    return(
        <div className=" h-[946px] flex bg-black " >
            <div className="mt-6" >
                <SideBar/>
            </div>
       <div className="grid grid-cols-3 gap-4" >
       <div className="flex mt-6  " >
          <WeatherWidget onCitySelect={setSelectedCity} />
          
          </div>
          <div className="col-span-2 mt-6   " >
          <DataVisualizer city={selectedCity}/>

          </div>
         <div className=" mt-4 px-4  " >
        

         <FiveDayWeather city={selectedCity} />
         </div>
         <div className="col-span-2 mt-4 w-[450px]" >
        

          <WindyMap
         latitude={selectedCity ? selectedCity.lat : 41.015137}
        longitude={selectedCity ? selectedCity.lon : 28.979530}
       zoom={8}
/>

         </div>
       </div>

        </div>
    )
}