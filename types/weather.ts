export interface WeatherCondition {
  id: number;
  main: string;
  description: string;
  icon: string;
}

export interface MainWeather {
  temp: number;
  feels_like: number;
  temp_min: number;
  temp_max: number;
  pressure: number;
  humidity: number;
}

export interface Wind {
  speed: number;
  deg: number;
}

export interface Clouds {
  all: number;
}

export interface CurrentWeather {
  dt: number;
  timezone: number;
  id: number;
  name: string;
  cod: number;
  coord: {
    lon: number;
    lat: number;
  };
  weather: WeatherCondition[];
  main: MainWeather;
  visibility: number;
  wind: Wind;
  clouds: Clouds;
  sys: {
    type: number;
    id: number;
    country: string;
    sunrise: number;
    sunset: number;
  };
}

export interface ForecastItem {
  dt: number;
  main: MainWeather;
  weather: WeatherCondition[];
  clouds: Clouds;
  wind: Wind;
  visibility: number;
  pop: number;
  dt_txt: string;
}

export interface ForecastData {
  cod: string;
  message: number;
  cnt: number;
  list: ForecastItem[];
  city: {
    id: number;
    name: string;
    coord: {
      lat: number;
      lon: number;
    };
    country: string;
    population: number;
    timezone: number;
    sunrise: number;
    sunset: number;
  };
}

export interface UVData {
  lat: number;
  lon: number;
  date_iso: string;
  date: number;
  value: number;
}

export interface InterpolatedWeather {
  dt: number;
  temp: number;
  feels_like: number;
  humidity: number;
  pop: number;
  weather: {
    icon: string;
    description: string;
  }[];
  wind: {
    speed: number;
  };
}
