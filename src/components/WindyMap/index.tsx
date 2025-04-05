import React, { useEffect, useRef } from 'react';

// Windy API için global tanımlamalar
declare function windyInit(options: WindyOptions, callback: (api: WindyAPI) => void): void;

// Windy API için gerekli türleri tanımlayalım
interface WindyOptions {
    key: string;
    lat: number;
    lon: number;
    zoom: number;
}

interface WindyAPI {
    map: any;
    picker: any;
    utils: any;
    store: any;
    
}

interface WindyMapProps {
    latitude?: number;
    longitude?: number;
    zoom?: number;
   
}

const WindyMap: React.FC<WindyMapProps> = ({
    latitude = 41.015137, // Varsayılan İstanbul koordinatları
    longitude = 28.979530,
    zoom = 8
}) => {
    const mapContainerRef = useRef<HTMLDivElement>(null);
    

    useEffect(() => {
        const apiKey = import.meta.env.VITE_APP_API_KEY_1
        ;

        if (!apiKey) {
            console.error('Windy API anahtarı bulunamadı!');
            return;
        }

        const options: WindyOptions = {
            key: apiKey,
            lat: latitude,
            lon: longitude,
            zoom: zoom
        };

       
        windyInit(options,(windyAPI: WindyAPI) => {
            const { } = windyAPI;
            
        });
    }, [latitude, longitude, zoom]);

    return (
       
        <div 
        
        
            ref={mapContainerRef} 
            id="windy" 
           className="w-full md:w-[900px] lg:w-[1100px] h-[300px] md:h-[400px] lg:h-[420px] rounded-2xl mb-2 md:block hidden"
        />
    );
};

export default WindyMap;