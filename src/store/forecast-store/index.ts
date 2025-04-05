import { create } from "zustand"

interface ForecastStore {
  forecast: any
  setForecast: (by: any) => void
}

export const useForecastStore = create<ForecastStore>()((set) => ({
  forecast: [],
  setForecast: (by) => set((state) => ({ ...state, forecast: by })),
}))