import React from 'react';

import { ForecastBox } from '../components';

import { ForecastData } from '~modules/main/weather/types';

export const createWeatherCard = (
  dayForecast: ForecastData,
  index: number
): React.JSX.Element => {
  const currentDate = new Date();
  currentDate.setDate(currentDate.getDate() + index);

  return (
    <ForecastBox
      {...dayForecast}
      date={currentDate}
      key={`Forecast_${index}`}
    />
  );
};
