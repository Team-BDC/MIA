import React,{useEffect} from "react";
import clsx from "clsx";
import { makeStyles, useTheme, withTheme } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import Toolbar from "@material-ui/core/Toolbar";
import CssBaseline from "@material-ui/core/CssBaseline";
import List from "@material-ui/core/List";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import { Link } from "react-router-dom";

import { Mouse } from "../shared/Mouse/Mouse";

const drawerWidth = 380; //사이드바 ~

const LOGON = [
  // { title: "Gallery", to: "/gallery" },
  { title: "사진찍기", to: "/camera" },
  { title: "파일업로드", to: "/upload" },
  { title: "갤러리", to: "/test" },
];
const LOGOFF = [
  { title: "로그인", to: "/auth/login" },
  { title: "사진찍기", to: "/camera" },
  { title: "파일업로드", to: "/upload" },
];

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  appBar: {
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginRight: drawerWidth,
  },
  title: {
    flexGrow: 1,
  },
  hide: {
    display: "none",
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
    backgroundColor: "black",
  },
  drawerHeader: {
    display: "flex",
    alignItems: "center",
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: "flex-start",
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginRight: -drawerWidth,
  },
  contentShift: {
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginRight: 0,
  },
  customHoverFocus: {
    color: "white",
    "&:hover, &.Mui-focusVisible": {
      backgroundColor: "white",
      color: "black",
    },
  },
  customList: {
    color: "white",
  },
  listItemText: {
    fontSize: "2em",
  },
  listHeader: {
    fontSize: "2.5em",
    padding: theme.spacing(0, 2),
  },
}));

export default function PersistentDrawerRight({ setUserTemp, logged, onLogout, logout }) {
  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);

  
  useEffect(() => {
    const localStorageInfo = localStorage.getItem("userInfo");

    if (localStorageInfo) {
      const parsedUserInfo = JSON.parse(localStorageInfo);
      setUserTemp({
        id: parsedUserInfo.id,
        username: parsedUserInfo.username,
        token: parsedUserInfo.token,
      });
    }
  }, []);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <div className={classes.root}>
      <CssBaseline />
      {/* <AppBar
        position="fixed"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open,
        })}
      > */}
      <Toolbar>
        <Typography variant="h6" noWrap className={classes.title}></Typography>
        <Link to="/" className="text-5xl font justify-start">
          MIA
        </Link>
        <IconButton
          // className="justify-end"
          color="inherit"
          aria-label="open drawer"
          edge="end"
          onClick={handleDrawerOpen}
          className={clsx(open && classes.hide)}
        >
          <MenuIcon />
        </IconButton>
      </Toolbar>
      {/* </AppBar> */}
      <main
        className={clsx(classes.content, {
          [classes.contentShift]: open,
        })}
      >
        <div className={classes.drawerHeader} />
      </main>
      <Drawer
        className={classes.drawer}
        variant="persistent"
        anchor="right"
        open={open}
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <Mouse />
        <div className={classes.drawerHeader}>
          <IconButton
            className={classes.customHoverFocus}
            onClick={handleDrawerClose}
          >
            {theme.direction === "rtl" ? (
              <ChevronLeftIcon />
            ) : (
              <ChevronRightIcon />
            )}
          </IconButton>
        </div>
        <Divider />
        <List className={classes.customList}>
          <ListItemText
            classes={{ primary: classes.listHeader }}
            primary="어서오세요!"
          />
        </List>
        <br></br>
        <br></br>
        <br></br>
        <List className={classes.customList}>
          {logged ? (
            <>
              {LOGON.map((text, index) => (
                <Link to={text.to}>
                  <ListItem button key={index} color="white">
                    {/* <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <InboxIcon />}</ListItemIcon> */}
                    <ListItemText
                      classes={{ primary: classes.listItemText }}
                      primary={text.title}
                    />
                  </ListItem>
                </Link>
              ))}
              <List className={classes.customList}>
                <Link to="/home">
                  <ListItem button>
                    <ListItemText
                      classes={{ primary: classes.listItemText }}
                      primary="로그아웃"
                      onClick={logout}
                    />
                  </ListItem>
                </Link>
              </List>
            </>
          ) : (
            <>
              {LOGOFF.map((text, index) => (
                <Link to={text.to}>
                  <ListItem button key={index} color="white">
                    {/* <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <InboxIcon />}</ListItemIcon> */}
                    <ListItemText
                      classes={{ primary: classes.listItemText }}
                      primary={text.title}
                    />
                  </ListItem>
                </Link>
              ))}
            </>
          )}
        </List>
        <Divider />
      </Drawer>
    </div>
  );
}
