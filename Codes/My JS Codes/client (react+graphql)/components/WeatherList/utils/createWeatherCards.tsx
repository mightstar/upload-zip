import { JSX } from 'react';

import { WeatherCard } from '../components/WeatherCard';

import { City } from '~modules/main/types';

export const createWeatherCards = (cities: City[]): JSX.Element[] => {
  return cities.map((city, index) => {
    return <WeatherCard key={`WeatherCard_${index}`} city={city} />;
  });
};
