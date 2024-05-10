import { FC, useEffect, useMemo, useState } from 'react';

import { createWeatherCards } from './utils';
import { WeatherListView } from './view';

import { City } from '~modules/main/types';
import {
  useCityChangedSubscription,
  useGetUserCities,
} from '~modules/main/weather/hooks';

export const WeatherList: FC = () => {
  const { getUserCities } = useGetUserCities();

  const [cities, setCities] = useState<City[]>([]);

  const cards = useMemo(() => createWeatherCards(cities), [cities]);

  useEffect(() => {
    if (getUserCities.data) {
      setCities(getUserCities.data);
    }
  }, [JSON.stringify(getUserCities.data)]);

  useCityChangedSubscription(cities, setCities);

  return <WeatherListView createdCards={cards} />;
};
