import ClearDay from "../icons/clearDay"
import ClearNight from "../icons/clearNight"
import CloudyDay from "../icons/cloudyDay"
import CloudyNight from "../icons/cloudyNightDay"
import FewCloudsDay from "../icons/few-clouds-day"
import FewCloudsNight from "../icons/few-clouds-night"
import RainNightDay from "../icons/rain-night-day"
import RainDay from "../icons/rainDay"
import Snow from "../icons/snow"
import StormNightDay from "../icons/storm-night"
import StormDay from "../icons/stormDay"

interface AutoIconOptions{
    path?:string,
    sunset:number,
    sunrise:number,
   
 
}

const AutoIcon= (weatherCondition:AutoIconOptions )=>{
  const {path, sunset, sunrise} =weatherCondition
  const currentTime = new Date().getTime() / 1000
  const isDayTime = currentTime > sunrise &&  currentTime <sunset
  let icon

  if(isDayTime || sunrise=== undefined || sunset ===undefined){
    switch(path){
        case 'Clear':
            icon=<ClearDay/>
            break
            case 'Clouds':
                icon=<FewCloudsDay/>
            break
            case 'Mist':
              icon=<CloudyDay/>
              break
              case 'Drizzle':
            icon=<CloudyDay/>
            break
            case 'Rain':
            icon=<RainDay/>
            break
            case 'Thunderstorm':
            icon=<StormDay/>
            break
            case 'Snow':
             icon=<Snow/> 
             break
            case 'Smoke':
             icon=<CloudyDay/>
             break
             case 'Haze':
             icon=<CloudyDay/>
             break
             case 'Fog':
            icon= <CloudyDay/>
            break
            case 'Squall':
            icon = <StormDay/>
            break
            default:
              icon=<FewCloudsDay/>

    }
  }
  else {
    switch(path){
      case 'Clear':
        icon=<ClearNight/>
        break
        case 'Clouds':
            icon=<FewCloudsNight/>
        break
        case 'Mist':
          icon=<CloudyNight/>
          break
          case 'Drizzle':
        icon=<CloudyNight/>
        break
        case 'Rain':
        icon=<RainNightDay/>
        break
        case 'Thunderstorm':
        icon=<StormNightDay/>
        break
        case 'Snow':
         icon=<Snow/> 
         break
        case 'Smoke':
         icon=<CloudyNight/>
         break
         case 'Haze':
         icon=<CloudyNight/>
         break
         case 'Fog':
        icon= <CloudyNight/>
        break
        case 'Squall':
        icon = <StormNightDay/>
        break
        default:
          icon=<FewCloudsNight/>
    }
  }
return icon
}
export default AutoIcon