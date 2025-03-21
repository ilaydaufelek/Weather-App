import api from "../api"

export const getWeatherServices= {
   getCurrentWeather: async(lat:number,lon:number)=>{
    const response =await api.get('/data/2.5/weather',{
        params:{
            lat,
            lon
        }
    })
    return response.data
   

   },
   directGeocoding :async (cityName:string)=>{
    const response= await api.get('/geo/1.0/direct',{
        params:{
            q:cityName,
            limit:5
        }
    })
    return response.data
   }
}