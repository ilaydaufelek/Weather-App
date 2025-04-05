import { getWeatherServices } from "@/servicies/getWeather";
import { useQuery } from "@tanstack/react-query";
import {  Label,   Pie, PieChart,  ResponsiveContainer, Area, AreaChart } from "recharts";
import * as React from "react";
import {
  Card,
  CardContent,
  
} from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

interface City {
  lat: number;
  lon: number;
  name: string;
  country: string;
}

interface DataWeatherProp {
  city: City | null;
}

export default function DataVisualizer({ city }: DataWeatherProp) {
  const defaultCity: City = {
    name: "Istanbul",
    lat: 41.0082,
    lon: 28.9784,
    country: "TR",
  };

  // Polen yoğunluğu hesaplama fonksiyonu
  const calculatePollenDensity = (
    temperature: number,
    windSpeed: number,
    humidity: number,
    k1 = 0.5,
    k2 = 1.0,
    k3 = 0.2
  ): number => {
    return k1 * temperature + k2 * windSpeed + k3 * (100 - humidity);
  };

  const selectedCity = city || defaultCity;

  const { data } = useQuery({
    queryKey: ["weather", city?.lat, city?.lon],
    queryFn: () =>
      getWeatherServices.getCurrentWeather(
        selectedCity.lat,
        selectedCity.lon
      ),
    enabled: !!selectedCity,
  });

  // Sıcaklık, rüzgar hızı ve nem verilerini al
  const temperature = data?.main?.temp || 0;
  const windSpeed = data?.wind?.speed || 0;
  const humidity = data?.main?.humidity || 0;

  // Polen yoğunluğunu hesapla
  const pollenDensity = calculatePollenDensity(temperature, windSpeed, humidity);

  // Nem verisi için grafik verisi
  const chartData = [
    {
      name: "Humidity",
      value: data?.main?.humidity || 0, // Nem verisini kullanıyoruz
      fill: "#1d9bf0", // Kendi renginizi burada belirleyebilirsiniz
    },
  ];

  const totalWeather = React.useMemo(() => {
    return chartData.reduce((acc, curr) => acc + curr.value, 0);
  }, [chartData]);

  // Polen yoğunluğu verisi için grafik verisi
  const pollenChartData = [
    {
      name: "Pollen Density",
      value: pollenDensity,
      fill: "#ffea80", 
    },
  ];

  // Rüzgar hızını görselleştiren veriler
  const currentMonth = new Date().toLocaleString("en-US", { month: "short" });

  // Tüm aylar için varsayılan rüzgar hızı verileri
  const windSpeedData = [
    { month: "Jan", windSpeed: 15 },
    { month: "Feb", windSpeed: 20 },
    { month: "Mar", windSpeed: 10 },
    { month: "Apr", windSpeed: 18 },
    { month: "May", windSpeed: 16 },
    { month: "Jun", windSpeed: 14 },
    { month: "Jul", windSpeed: 13 },
    { month: "Aug", windSpeed: 17 },
    { month: "Sep", windSpeed: 19 },
    { month: "Oct", windSpeed: 22 },
    { month: "Nov", windSpeed: 25 },
    { month: "Dec", windSpeed: 23 },
  ];

  // Eğer şu anki ay ile eşleşiyorsa, veriyi güncelle
  const updatedWindSpeedData = windSpeedData.map((data) => {
    if (data.month === currentMonth) {
      return { month: currentMonth, windSpeed: windSpeed }; // Bu ay için dinamik veri
    }
    return data; // Diğer aylar için varsayılan değerler
  });
  const now =new Date()
  const hours= now.getHours()
  const minutes= now.getMinutes().toString().padStart(2,'0')

  const pressure= data?.main?.pressure

  let pressureMessage =''
  if( pressure < 1000){
    pressureMessage='You might feel a bit overwhelmed.'
  }
  else {
    pressureMessage='Ideal pressure, the air feels refreshing.'
  }

  return (
    <Card className="flex flex-col bg-black border-none  ">
      <CardContent className="flex-1 pb-0  ">
        {/* Nem ve Polen Grafikleri Yan Yana */}
        <div className="flex space-x-4 gap-3 ">

           {/* Rüzgar Hızı Grafiği */}
           <div className="w-full max-w-[400px] mx-0 h-[250px] border  border-[#333639] relative rounded-2xl">
           <ResponsiveContainer>
       <ChartContainer config={{}}>
       <AreaChart
      accessibilityLayer
      data={updatedWindSpeedData}
     
    >
      
      <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
      <defs>
        <linearGradient id="fillWindSpeed" x1="0" y1="0" x2="0" y2="1">
          <stop offset="5%" stopColor="#4584A7" stopOpacity={0.8} />
          <stop offset="95%" stopColor="#4584A7" stopOpacity={0.1} />
        </linearGradient>
      </defs>
      <Area
        dataKey="windSpeed"
        type="natural"
        fill="url(#fillWindSpeed)"
        fillOpacity={0.4}
        stroke="#4584A7"
      />
    </AreaChart>
  </ChartContainer>
</ResponsiveContainer>
<div className="absolute bottom-0 left-0 flex items-center justify-between w-full ml-2 text-white py-2">
  <div className="text-[25px]">
    {data?.wind?.speed || 0}<span className="text-[#ffffff5b] text-[15px] ml-2">km/h</span>
  </div>
  <div className="mr-4 text-[#ffffffc5] text-[16px]">{hours}:{minutes}</div>
</div>

          
        </div>
          {/* Nem verisi için grafik */}
          <ChartContainer
            config={{}}
            className="w-full max-w-[300px] mx-0 my-0 h-[250px] border border-[#333639] rounded-2xl"
          >
            <PieChart>
              <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
              <Pie
                data={chartData}
                dataKey="value"
                nameKey="name"
                innerRadius={60}
                strokeWidth={5}
              >
                <Label
                  content={({ viewBox }) => {
                    if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                      return (
                        <text
                          x={viewBox.cx}
                          y={viewBox.cy}
                          textAnchor="middle"
                          dominantBaseline="middle"
                        >
                          <tspan
                            x={viewBox.cx}
                            y={viewBox.cy}
                            className="text-3xl font-bold fill-[#ffff] bg-white"
                          >
                           %{totalWeather.toLocaleString()}
                          </tspan>
                          <tspan
                            x={viewBox.cx}
                            y={(viewBox.cy || 0) + 24}
                            className="fill-[#ffff]  "
                          >
                            Humidity
                          </tspan>
                        </text>
                      );
                    }
                  }}
                />
              </Pie>
            </PieChart>
          </ChartContainer>

          {/* Polen yoğunluğu verisi için grafik */}
          <ChartContainer
            config={{}}
            className="w-full max-w-[300px] mx-0 h-[250px] border border-[#333639] rounded-2xl"
          >
            <PieChart>
              <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
              <Pie
                data={pollenChartData}
                dataKey="value"
                nameKey="name"
                innerRadius={60}
                strokeWidth={5}
              >
                <Label
                  content={({ viewBox }) => {
                    if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                      return (
                        <text
                          x={viewBox.cx}
                          y={viewBox.cy}
                          textAnchor="middle"
                          dominantBaseline="middle"
                        >
                          <tspan
                            x={viewBox.cx}
                            y={viewBox.cy}
                            className="text-3xl font-bold fill-[#ffff]"
                          >
                            {pollenDensity.toFixed(2)} {/* Polen yoğunluğu */}
                          </tspan>
                          <tspan
                            x={viewBox.cx}
                            y={(viewBox.cy || 0) + 24}
                            className="fill-[#ffff]"
                          >
                            Pollen Density
                          </tspan>
                        </text>
                      );
                    }
                  }}
                />
              </Pie>
            </PieChart>
          </ChartContainer>
 


        </div>

      
       
      </CardContent>
      <div className="flex space-x-4  ml-5" >
      <div className="text-white border border-[#333639] w-[400px]  h-[125px] rounded-2xl  ">
        <h2 className="text-[#bebebe] font-semibold ml-2 mt-2  " >Pressure</h2>
        <div className="flex justify-between mt-6 " >
        <div className=" text-[22px] font-semibold ml-2 " >
         {pressure}
          <span className="text-[15px]  text-[#bebebe] ml-1" >hPa</span>
        </div>
        
        <p className="w-[140px] text-[14px] text-[#bebebe]  " >
          <span className="flex items-center justify-center mr-4 " >
            <svg
            width={18}
             xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
          <path
          fill="#bebebe"
           d="M288 32c0 17.7 14.3 32 32 32l32 0c17.7 0 32 14.3 32 32s-14.3 32-32 32L32 128c-17.7 0-32 14.3-32 32s14.3 32 32 32l320 0c53 0 96-43 96-96s-43-96-96-96L320 0c-17.7 0-32 14.3-32 32zm64 352c0 17.7 14.3 32 32 32l32 0c53 0 96-43 96-96s-43-96-96-96L32 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l384 0c17.7 0 32 14.3 32 32s-14.3 32-32 32l-32 0c-17.7 0-32 14.3-32 32zM128 512l32 0c53 0 96-43 96-96s-43-96-96-96L32 320c-17.7 0-32 14.3-32 32s14.3 32 32 32l128 0c17.7 0 32 14.3 32 32s-14.3 32-32 32l-32 0c-17.7 0-32 14.3-32 32s14.3 32 32 32z"/>
          </svg></span>
       
          {pressureMessage}</p>
        </div>
      </div>
      <div className="text-white border border-[#333639] w-[300px] h-[125px] rounded-2xl   ">
      <h2 className="text-[#bebebe] font-semibold ml-2 mt-2  " >Visibility</h2>
        <div className="flex justify-between mt-6 " >
        <div className=" text-[22px] font-semibold ml-2 " >
        {(data?.visibility /1000).toFixed(1).padStart(3,'0')}
          <span className="text-[15px]  text-[#bebebe] ml-1 " >km</span>
        </div>
        
        <p className="w-[120px] text-[14px] text-[#bebebe]  " >
          <span  className="flex items-center justify-center mr-4  " >
          <svg 
          width={18}
          xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512">
          <path 
          fill="#bebebe"
          d="M288 32c-80.8 0-145.5 36.8-192.6 80.6C48.6 156 17.3 208 2.5 243.7c-3.3 7.9-3.3 16.7 0 24.6C17.3 304 48.6 356 95.4 399.4C142.5 443.2 207.2 480 288 480s145.5-36.8 192.6-80.6c46.8-43.5 78.1-95.4 93-131.1c3.3-7.9 3.3-16.7 0-24.6c-14.9-35.7-46.2-87.7-93-131.1C433.5 68.8 368.8 32 288 32zM144 256a144 144 0 1 1 288 0 144 144 0 1 1 -288 0zm144-64c0 35.3-28.7 64-64 64c-7.1 0-13.9-1.2-20.3-3.3c-5.5-1.8-11.9 1.6-11.7 7.4c.3 6.9 1.3 13.8 3.2 20.7c13.7 51.2 66.4 81.6 117.6 67.9s81.6-66.4 67.9-117.6c-11.1-41.5-47.8-69.4-88.6-71.1c-5.8-.2-9.2 6.1-7.4 11.7c2.1 6.4 3.3 13.2 3.3 20.3z"/>
          </svg></span>
       
          Haze is affecting visibility</p>
        </div>
      </div>
      <div className="text-white border border-[#333639] w-[300px] h-[125px] rounded-2xl  ">
      <h2 className="text-[#bebebe] font-semibold ml-2 mt-2  " >Feels Like</h2>
    
        <div className="flex justify-between mt-6 " >
        
        <div className=" text-[24px] font-semibold ml-2 flex items-center " >
          <span className="mr-2">
          <svg 
        width={20}
        xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512">
        <path
        fill="#bebebe"
         d="M112 112c0-26.5 21.5-48 48-48s48 21.5 48 48l0 164.5c0 17.3 7.1 31.9 15.3 42.5C233.8 332.6 240 349.5 240 368c0 44.2-35.8 80-80 80s-80-35.8-80-80c0-18.5 6.2-35.4 16.7-48.9c8.2-10.6 15.3-25.2 15.3-42.5L112 112zM160 0C98.1 0 48 50.2 48 112l0 164.4c0 .1-.1 .3-.2 .6c-.2 .6-.8 1.6-1.7 2.8C27.2 304.2 16 334.8 16 368c0 79.5 64.5 144 144 144s144-64.5 144-144c0-33.2-11.2-63.8-30.1-88.1c-.9-1.2-1.5-2.2-1.7-2.8c-.1-.3-.2-.5-.2-.6L272 112C272 50.2 221.9 0 160 0zm0 416a48 48 0 1 0 0-96 48 48 0 1 0 0 96z"/>
         </svg>
          </span>
        {Math.round(data?.main?. feels_like)}
          <span className="text-[15px]  text-[#bebebe] ml-1 " >°</span>
        </div>
        
        <p className="w-[140px] text-[14px] text-[#bebebe]  " >
        
       
          Humidity is making it feel hotter</p>
        </div>
      </div>
      </div>
    </Card>
    
  );
}
