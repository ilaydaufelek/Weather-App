// FiveDayWeather.tsx
import { useQuery } from "@tanstack/react-query";
import { getWeatherServices } from "../../servicies/getWeather";
import AutoIcon from "../../uilts/weather-icons";

interface City {
  name: string;
  lat: number;
  lon: number;
  country: string;
}


interface FiveDayWeatherProps {
  city: City | null; // WeatherWidget’tan gelen şehir
}

export default function FiveDayWeather({ city }: FiveDayWeatherProps) {
  const defaultCity: City = {
    name: "Istanbul",
    lat: 41.0082,
    lon: 28.9784,
    country: "TR",
  };
const selectedCity= city ||defaultCity
  // 5 günlük hava durumu sorgusu
  const { data: fiveDayData } = useQuery({
    queryKey: ["forecast", selectedCity?.lat, selectedCity?.lon],
    queryFn: () => getWeatherServices.fiveDayWeather(selectedCity.lat, selectedCity.lon),
    enabled: !!selectedCity,
  });
 
  
const today= new Date().getDate()
  // 5 günlük veriyi filtrele (her günün öğlen saatini al)
  const dailyData = fiveDayData?.list
  .filter((item: any) => new Date(item.dt * 1000).getDate() > today) 
    ?.filter((item: any) => item.dt_txt.includes("06:00:00")).slice(0,5)
    

    const monthNames = [
     "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
    ];
    
    const now =new Date()
    const month=monthNames[now.getMonth()]
   
  return (
    <div className="text-white w-[480px] h-[430px] border border-[#333639] ml-4 mb-2  rounded-2xl  ">
    
      <div className="flex flex-col  gap-2 ml-4  relative">
        {dailyData?.map((weatherData: any, index: number) => (
          <div className="flex items-center " key={index}>
             <div className="w-[90px] h-[80px]">
           <AutoIcon
              sunrise={fiveDayData?.city?.sunrise}
              sunset={fiveDayData?.city?.sunset}
              path={weatherData.weather[0].main}
            />
           </div>
           <span className="text-[20px] inline-block w-18  " >+{Math.round(weatherData.main.temp_max)}°C /</span>
           <span className="text-[#ffffff5b] mt-1 inline-block w-12  " >+{Math.round(weatherData.main.temp_min)}°C</span>
           <div className="flex items-center  w-14 text-left ml-12 gap-2 text-[#ffffffab]" >
           <div className=" " >{new Date(weatherData.dt * 1000).getDate()}</div>
           <div className="" >{month}</div>
           </div>
            <div className=" w-22 absolute right-0 text-left text-[#ffffffab]  " >{new Date(weatherData.dt * 1000).toLocaleDateString("en-EN", { weekday: "long" })}</div>
            </div>
        
        ))}
      </div>
    </div>
  );
}