import { IWeather } from "./IWeather";

export interface IWeatherDayGroup {
    date: string;
    morning: IWeather | undefined;
    midday: IWeather | undefined;
    evening: IWeather | undefined;
    night: IWeather | undefined;
  }
  