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
  city: City | null;
}

export default function FiveDayWeather({ city }: FiveDayWeatherProps) {
  const defaultCity: City = {
    name: "Istanbul",
    lat: 41.0082,
    lon: 28.9784,
    country: "TR",
  };

  const selectedCity = city || defaultCity;

  const { data: fiveDayData } = useQuery({
    queryKey: ["forecast", selectedCity?.lat, selectedCity?.lon],
    queryFn: () => getWeatherServices.fiveDayWeather(selectedCity.lat, selectedCity.lon),
    enabled: !!selectedCity,
  });

  const today = new Date().getDate();
  const dailyData = fiveDayData?.list
    .filter((item: any) => new Date(item.dt * 1000).getDate() > today)
    .filter((item: any) => item.dt_txt.includes("06:00:00"))
    .slice(0, 5);

  const monthNames = [
    "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
  ];

  const now = new Date();
  const month = monthNames[now.getMonth()];

  return (
    <div className="text-white w-full max-w-[480px] min-h-[400px] h-auto border border-[#333639] ml-0 md:ml-4 mb-2 rounded-2xl p-4">
      <div className="flex flex-col gap-4">
        {dailyData?.map((weatherData: any, index: number) => (
          <div
            className="flex items-center justify-between w-full flex-wrap gap-2"
            key={index}
          >
            <div className="flex items-center gap-2 min-w-0">
              <div className="w-12 h-12 md:w-16 md:h-16 flex-shrink-0">
                <AutoIcon
                  sunrise={fiveDayData?.city?.sunrise}
                  sunset={fiveDayData?.city?.sunset}
                  path={weatherData.weather[0].main}
                />
              </div>
              <div className="flex items-center gap-2 ">
                <span className="text-lg md:text-[20px] font-medium whitespace-nowrap">
                  +{Math.round(weatherData.main.temp_max)}°C /
                </span>
                <span className="text-[#ffffff5b] mt-1 inline-block w-12">
                  +{Math.round(weatherData.main.temp_min)}°C
                </span>
              </div>
            </div>
            <div className="flex items-center lg:gap-2 text-[#ffffffab] text-left text-sm md:text-base">
              <span>{new Date(weatherData.dt * 1000).getDate()}</span>
              <span>{month}</span>
            </div>
            <div className="text-[#ffffffab] text-sm md:text-base text-right min-w-[80px]">
              {new Date(weatherData.dt * 1000).toLocaleDateString("en-EN", { weekday: "long" })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}