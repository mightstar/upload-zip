import { CalendarToday, Moving, Thermostat } from "@mui/icons-material";
import { Box, Typography, Container, capitalize, Divider } from "@mui/material";
import { FC } from "react";

import styles from "./style.module.css";

import { ForecastData } from "~modules/main/weather/types";
import { formatDate, getWeatherIcon } from "~modules/main/weather/utils";

interface ForecastBoxProps extends ForecastData {
  date: Date;
}

export const ForecastBox: FC<ForecastBoxProps> = (props) => {
  const { temperature, wind, type, date } = props;
  const { min, max } = temperature;

  const formattedDate = formatDate(date);

  return (
    <Box className={styles.box}>
      <Container className={styles.container}>
        <CalendarToday />
        <Typography variant="body2" component="div" className={styles.bold}>
          {formattedDate}
        </Typography>
      </Container>

      <Divider className={styles.divider} />

      <Container className={styles.container}>
        <Thermostat />
        <Box className={styles.container}>
          <Typography
            variant="body2"
            className={`${styles.red} ${styles.bold}`}
          >
            {max}
          </Typography>
          <Typography variant="body2">/</Typography>
          <Typography
            variant="body2"
            className={`${styles.blue} ${styles.bold}`}
          >
            {min}
          </Typography>
          <Typography variant="body2">°С</Typography>
        </Box>
      </Container>
      <Container className={styles.container}>
        <Moving />
        &nbsp;
        <Box className={styles.container}>
          <Typography variant="body2" className={styles.bold}>
            {wind}
          </Typography>
          <Typography variant="body2">&nbsp;km/h</Typography>
        </Box>
      </Container>
      <Container className={styles.container}>
        {getWeatherIcon(type)}
        <Typography variant="body2" className={styles.bold}>
          {capitalize(type.toLowerCase())}
        </Typography>
      </Container>
    </Box>
  );
};
