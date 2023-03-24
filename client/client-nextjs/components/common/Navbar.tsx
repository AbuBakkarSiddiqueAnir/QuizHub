import React from "react";
import Link from "next/link";
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  InputBase,
  Button,
} from "@material-ui/core";
import { makeStyles, alpha } from "@material-ui/core/styles";
import { Search as SearchIcon, Person as PersonIcon } from "@material-ui/icons";

interface NavbarProps {
  logoSrc: string;
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
    display: "flex",
    alignItems: "center",
  },
  logo: {
    height: "30px",
    marginRight: theme.spacing(1),
  },
  search: {
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(1),
      width: "auto",
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  inputRoot: {
    color: "inherit",
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },
  button: {
    marginLeft: theme.spacing(1),
  },
}));

const Navbar: React.FC<NavbarProps> = ({ logoSrc }) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar  color="#fff"  position="static">
        <Toolbar>
          {/* <img src={logoSrc} alt="Website logo" className={classes.logo} /> */}
          <Typography variant="h6" className={classes.title}>
            <Link href="/">
              Byte Trivia
            </Link>
          </Typography>
          <div className={classes.search}>
            <div className={classes.searchIcon}>
              <SearchIcon />
            </div>
            <InputBase
              placeholder="Search…"
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
              inputProps={{ "aria-label": "search" }}
            />
          </div>
          <Button
            variant="contained"
            color="primary"
            className={classes.button}
            startIcon={<PersonIcon />}
          >
            Sign In
          </Button>
          <Button
            variant="contained"
            color="secondary"
            className={classes.button}
          >
            Register
          </Button>
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default Navbar;