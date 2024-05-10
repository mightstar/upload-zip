import { Box } from '@mui/material';
import { FC } from 'react';

import styles from './styles.module.css';

interface WeatherListViewProps {
  createdCards: React.JSX.Element[];
}

export const WeatherListView: FC<WeatherListViewProps> = ({ createdCards }) => {
  return (
    <Box className={styles.weatherList}>
      <>{createdCards}</>
    </Box>
  );
};
