import { useQuery } from "@tanstack/react-query"
import { useEffect, useState } from "react"
import { getWeatherServices } from "../../servicies/getWeather"
import AutoIcon from "../../uilts/weather-icons"

interface City {
    name: string,
    lat: number,
    lon: number,
    country: string,
}

interface WeatherWidgetProps {
    onCitySelect: (city: City | null) => void;
}

export default function WeatherWidget({ onCitySelect }: WeatherWidgetProps) {
    const [isOpen, setIsOpen] = useState(false)
    const [value, setValue] = useState('')
    const [city, setCity] = useState<City | null>({
        name: "Istanbul",
        lat: 41.0082,
        lon: 28.9784,
        country: "TR",
    })
    const [showInput, setShowInput] = useState(false)

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setValue(e.target.value)
        setShowInput(true)
    }

    const handleChangeCity = (city: City) => {
        setCity(city)
        onCitySelect(city)
        setShowInput(false)
        setValue('')
        setIsOpen(false)
    }

    const { data, refetch } = useQuery<City[]>({
        queryFn: () => getWeatherServices.directGeocoding(value),
        queryKey: ["geocoding", value],
        enabled: false,
    })

    useEffect(() => {
        if (value) {
            refetch()
        }
    }, [value, refetch])

    const { data: currentData } = useQuery({
        queryKey: ["weather", city?.lat, city?.lon],
        queryFn: () => getWeatherServices.getCurrentWeather(city!.lat, city!.lon),
        enabled: !!city
    })

    const monthNames = [
        "January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];
    const now = new Date()
    const day = now.getDate()
    const month = monthNames[now.getMonth()]
    const year = now.getFullYear()
    const hours = now.getHours()
    const minutes = now.getMinutes()

    return (
        <div className="text-white w-full lg:ml-6 h-auto min-h-[400px] border border-[#333639] rounded-2xl relative p-4 mx-auto  lg:w-[480px] lg:h-[400px]">
            <div className="absolute right-4 top-4 w-full max-w-[250px] lg:max-w-[200px]">
                <div className="flex items-center justify-end gap-2">
                    {isOpen && (
                        <input
                            className="w-full max-w-[200px] lg:w-[200px] lg:mt-4 h-9 rounded-full border border-[#333639] bg-transparent outline-none p-2 transition-all duration-300 text-sm"
                            value={value}
                            type="text"
                            onChange={handleChange}
                        />
                    )}
                    <button
                        onClick={() => {
                            setIsOpen(!isOpen)
                            setShowInput(false)
                        }}
                        className="rounded-full bg-[#181818] h-10 w-10 lg:mt-4 flex items-center justify-center flex-shrink-0"
                    >
                        <svg width={20} height={20} className="text-white" viewBox="0 0 24 24">
                            <path
                                fill="currentColor"
                                d="M10.25 3.75c-3.59 0-6.5 2.91-6.5 6.5s2.91 6.5 6.5 6.5c1.795 0 3.419-.726 4.596-1.904 1.178-1.177 1.904-2.801 1.904-4.596 0-3.59-2.91-6.5-6.5-6.5zm-8.5 6.5c0-4.694 3.806-8.5 8.5-8.5s8.5 3.806 8.5 8.5c0 1.986-.682 3.815-1.824 5.262l4.781 4.781-1.414 1.414-4.781-4.781c-1.447 1.142-3.276 1.824-5.262 1.824-4.694 0-8.5-3.806-8.5-8.5z"
                            />
                        </svg>
                    </button>
                </div>
                {showInput && value && data && Array.isArray(data) && (
                    <div className="mt-2 w-full max-w-[200px] absolute z-20">
                        {data.map((city, id) => (
                            <button
                                key={id}
                                type="button"
                                className="w-full border border-[#181818] rounded-xl h-8 text-left mt-1 bg-black hover:bg-[#1b1b1b] text-sm px-2"
                                onClick={() => handleChangeCity(city)}
                            >
                                {city.name} - {city.country}
                            </button>
                        ))}
                    </div>
                )}
            </div>

            <div className="flex flex-col items-start pt-12 lg:pt-0">
                <div className="w-full max-w-[200px] h-[150px] m-2">
                    <AutoIcon
                        sunrise={currentData?.sys?.sunrise}
                        sunset={currentData?.sys?.sunset}
                        path={currentData?.weather[0].main}
                    />
                </div>
                <div className="text-4xl px-4 flex items-center font-medium">
                    {Math.round(currentData?.main?.temp) || 0}
                    <span className="text-2xl font-medium">°C</span>
                </div>
                <div className="px-4 text-sm">
                    {currentData?.weather?.[0]?.description
                        ?.split(" ")
                        .map((word: string) => word.charAt(0).toUpperCase() + word.slice(1))
                        .join(" ")}
                </div>
                <div className="w-[12.5rem] lg:w-[25rem] h-[1px] mx-4 my-4 bg-[#ffffff5e]" />
                <div className="flex flex-col w-full px-4 gap-3 lg:mt-4 ">
                    <div className="flex items-center">
                        <svg className="w-5 h-5 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                            <path fill="#ffffff" d="M320 64A64 64 0 1 0 192 64a64 64 0 1 0 128 0zm-96 96c-35.3 0-64 28.7-64 64l0 48c0 17.7 14.3 32 32 32l1.8 0 11.1 99.5c1.8 16.2 15.5 28.5 31.8 28.5l38.7 0c16.3 0 30-12.3 31.8-28.5L318.2 304l1.8 0c17.7 0 32-14.3 32-32l0-48c0-35.3-28.7-64-64-64l-64 0zM132.3 394.2c13-2.4 21.7-14.9 19.3-27.9s-14.9-21.7-27.9-19.3c-32.4 5.9-60.9 14.2-82 24.8c-10.5 5.3-20.3 11.7-27.8 19.6C6.4 399.5 0 410.5 0 424c0 21.4 15.5 36.1 29.1 45c14.7 9.6 34.3 17.3 56.4 23.4C130.2 504.7 190.4 512 256 512s125.8-7.3 170.4-19.6c22.1-6.1 41.8-13.8 56.4-23.4c13.7-8.9 29.1-23.6 29.1-45c0-13.5-6.4-24.5-14-32.6c-7.5-7.9-17.3-14.3-27.8-19.6c-21-10.6-49.5-18.9-82-24.8c-13-2.4-25.5 6.3-27.9 19.3s6.3 25.5 19.3 27.9c30.2 5.5 53.7 12.8 69 20.5c3.2 1.6 5.8 3.1 7.9 4.5c3.6 2.4 3.6 7.2 0 9.6c-8.8 5.7-23.1 11.8-43 17.3C374.3 457 318.5 464 256 464s-118.3-7-157.7-17.9c-19.9-5.5-34.2-11.6-43-17.3c-3.6-2.4-3.6-7.2 0-9.6c2.1-1.4 4.8-2.9 7.9-4.5c15.3-7.7 38.8-14.9 69-20.5z"/>
                        </svg>
                        <span className="text-sm">{currentData?.name}, {currentData?.sys?.country}</span>
                    </div>
                    <div className="flex items-center">
                        <svg className="w-5 h-5 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                            <path fill="#ffffff" d="M152 24c0-13.3-10.7-24-24-24s-24 10.7-24 24l0 40L64 64C28.7 64 0 92.7 0 128l0 16 0 48L0 448c0 35.3 28.7 64 64 64l320 0c35.3 0 64-28.7 64-64l0-256 0-48 0-16c0-35.3-28.7-64-64-64l-40 0 0-40c0-13.3-10.7-24-24-24s-24 10.7-24 24l0 40L152 64l0-40zM48 192l80 0 0 56-80 0 0-56zm0 104l80 0 0 64-80 0 0-64zm128 0l96 0 0 64-96 0 0-64zm144 0l80 0 0 64-80 0 0-64zm80-48l-80 0 0-56 80 0 0 56zm0 160l0 40c0 8.8-7.2 16-16 16l-64 0 0-56 80 0zm-128 0l0 56-96 0 0-56 96 0zm-144 0l0 56-64 0c-8.8 0-16-7.2-16-16l0-40 80 0zM272 248l-96 0 0-56 96 0 0 56z"/>
                        </svg>
                        <span className="text-sm">{day} {month}, {year} {hours}:{minutes < 10 ? `0${minutes}` : minutes}</span>
                    </div>
                </div>
            </div>
        </div>
    )
}