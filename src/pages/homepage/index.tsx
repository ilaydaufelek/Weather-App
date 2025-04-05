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

export default function Home() {
    const [selectedCity, setSelectedCity] = useState<City | null>(null);
    return (
        <div className="min-h-screen w-full flex bg-black">
            <div className="mt-6 flex-shrink-0">
                <SideBar />
            </div>

            <div className="flex-1 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 lg:gap-4 p-4 w-full">
                <div className="flex mt-6 w-full">
                    <WeatherWidget onCitySelect={setSelectedCity} />
                </div>

                <div className="col-span-1 md:col-span-2 lg:col-span-2 mt-6 w-full lg:mr-4 ">
                    <DataVisualizer city={selectedCity} />
                </div>

                <div className="mt-4 px-4 w-full">
                    <FiveDayWeather city={selectedCity} />
                </div>

                <div className="col-span-1 md:col-span-2 lg:col-span-1 mt-4 w-full max-w-[450px]">
                    <WindyMap
                        latitude={selectedCity ? selectedCity.lat : 41.015137}
                        longitude={selectedCity ? selectedCity.lon : 28.979530}
                        zoom={8}
                    />
                </div>
            </div>
        </div>
    );
}
