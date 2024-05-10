import { FC, useEffect, useMemo, useState } from 'react';

import { createFlagUrl, createWeatherCard } from './utils';
import { WeatherCardView } from './view';

import { City } from '~modules/main/types';
import { useGetForecast, useRemoveCity } from '~modules/main/weather/hooks';
import { ForecastData } from '~modules/main/weather/types';

interface WeatherCardProps {
  city: City;
}

export const WeatherCard: FC<WeatherCardProps> = ({ city }) => {
  const { country_code } = city;

  const [openDialog, setOpenDialog] = useState(false);
  const [forecast, setForecast] = useState<ForecastData[]>([]);

  const { removeCity } = useRemoveCity(city);
  const { getForecast } = useGetForecast(city);

  const handleOpenDialog = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const handleConfirmAndCloseDialog = () => {
    removeCity.fetch();
    setOpenDialog(false);
  };

  useEffect(() => {
    getForecast.fetch();
  }, []);

  // Transform data to common array format
  useEffect(() => {
    if (getForecast.data) {
      setForecast(getForecast.data);
    }
  }, [JSON.stringify(getForecast.data)]);

  const backgroundImage = useMemo(
    () => `url(${createFlagUrl(country_code.toLowerCase())})`,
    [country_code]
  );

  const cards = useMemo(() => {
    return forecast.map(createWeatherCard);
  }, [forecast]);

  return (
    <WeatherCardView
      {...city}
      cards={cards}
      backgroundImage={backgroundImage}
      getForecastLoading={getForecast.loading}
      openDialog={openDialog}
      handleCloseDialog={handleCloseDialog}
      handleOpenDialog={handleOpenDialog}
      handleConfirmAndCloseDialog={handleConfirmAndCloseDialog}
    />
  );
};
