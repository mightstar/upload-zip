import React from "react";
import { Close } from "@mui/icons-material";
import {
  Box,
  Card,
  CardContent,
  CardHeader,
  CircularProgress,
  Container,
  Dialog,
  DialogTitle,
  DialogActions,
  Button,
  IconButton,
} from "@mui/material";

import styles from "./styles.module.css";

interface WeatherCardViewProps {
  name: string;
  country: string;
  latitude: number;
  longitude: number;
  cards: React.JSX.Element[];
  backgroundImage: string;
  getForecastLoading: boolean;
  openDialog: boolean;
  handleOpenDialog: () => void;
  handleCloseDialog: () => void;
  handleConfirmAndCloseDialog: () => void;
}

export const WeatherCardView = ({
  name,
  country,
  latitude,
  longitude,
  backgroundImage,
  cards,
  getForecastLoading,
  openDialog,
  handleOpenDialog,
  handleCloseDialog,
  handleConfirmAndCloseDialog,
}: WeatherCardViewProps) => {
  return (
    <Card className={styles.card}>
      <CardHeader
        action={
          <IconButton className={styles.close} onClick={handleOpenDialog}>
            <Close />
          </IconButton>
        }
        title={`${name}, ${country}`}
        subheader={`${latitude}°, ${longitude}°`}
        className={styles.header}
        sx={{
          "&::before": {
            backgroundImage,
          },
        }}
      />
      <CardContent className={styles.cardContent}>
        <Container className={styles.container}>
          {getForecastLoading && (
            <Box className={styles.loader}>
              <CircularProgress />
            </Box>
          )}
          {cards}
        </Container>
      </CardContent>
      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>Confirm action</DialogTitle>
        <DialogActions>
          <Button autoFocus onClick={handleCloseDialog}>
            Cancel
          </Button>
          <Button onClick={handleConfirmAndCloseDialog}>Confirm</Button>
        </DialogActions>
      </Dialog>
    </Card>
  );
};
