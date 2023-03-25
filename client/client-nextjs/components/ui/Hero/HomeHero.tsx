import React from "react";
import { makeStyles, Theme } from "@material-ui/core/styles";
import { Button, Typography, Grid } from "@material-ui/core";

const useStyles = makeStyles((theme: Theme) => ({
  heroContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding:'25px',
    marginTop: theme.spacing(4),
    marginBottom: theme.spacing(4),
    [theme.breakpoints.down("sm")]: {
      flexDirection: "column-reverse",
      alignItems: "center",
      marginTop: theme.spacing(2),
      marginBottom: theme.spacing(2),
    },
  },
  heroImage: {
    width: "100%",
    height: "auto",
    [theme.breakpoints.down("sm")]: {
      maxWidth: "90%",
    },
  },
  heroText: {
    maxWidth: "1000px",
    [theme.breakpoints.down("sm")]: {
      maxWidth: "100%",
      textAlign: "center",
    },
  },
  heroTitle: {
    fontWeight: "bold",
    marginBottom: theme.spacing(3),
    [theme.breakpoints.down("sm")]: {
      marginBottom: theme.spacing(2),
    },
  },
  heroButton: {
    marginTop: theme.spacing(3),
  },
}));

interface HeroProps {
  imageUrl: string;
  title: string;
  subtitle: string;
  buttonText: string;
  onButtonClick: () => void;
}

const Hero: React.FC<HeroProps> = ({
  imageUrl,
  title,
  subtitle,
  buttonText,
  onButtonClick,
}) => {
  const classes = useStyles();

  return (
    <div style={{margin:'0 auto'}}>
    <Grid container className={classes.heroContainer}>
      <Grid item xs={12} md={12} className={classes.heroText}>
        <Typography variant="h2"  className={classes.heroTitle}>
          {title}
        </Typography>
        <Typography variant="subtitle1" color="textSecondary">
          {subtitle}
        </Typography>
        <Button
          variant="outlined"
          color="primary"
          className={classes.heroButton}
          onClick={onButtonClick}
        >
          {buttonText}
        </Button>
      </Grid>
      {/* <Grid item xs={12} md={6}>
      <video autoPlay loop style={{ width: '800px', height: '500px' }}>
        <source src="/logos/home.mp4" />
      </video>
      </Grid> */}
    </Grid>
    </div>

  );
};

export default Hero;