import React, { useEffect, useState } from "react";
import { fade, makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import InputBase from "@material-ui/core/InputBase";
import Badge from "@material-ui/core/Badge";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import MenuIcon from "@material-ui/icons/Menu";
import SearchIcon from "@material-ui/icons/Search";
import AccountCircle from "@material-ui/icons/AccountCircle";
import { getData, postData, ImageURL } from "../FetchNodeServices";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import { useSelector, useDispatch } from "react-redux";
import ShowCartIcon from "./ShowCartIcon";
import FirstPage from "./FirstPage";
import ViewListofProducts from "./ViewListofProducts";
import SwipeableDrawer from "@material-ui/core/SwipeableDrawer";
import Divider from "@material-ui/core/Divider";
import Avatar from "@material-ui/core/Avatar";
import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";
import Hidden from "@material-ui/core/Hidden";
import Autocomplete, {
  createFilterOptions,
} from "@material-ui/lab/Autocomplete";
import TextField from "@material-ui/core/TextField";
import InputAdornment from "@material-ui/core/InputAdornment";
//import Image from 'react-image-resizer'

const useStyles = makeStyles((theme) => ({
  mainmenu: {
    display: "flex",
    flexDirection: "row",
  },

  grow: {
    width: "100%",
    position: "fixed",
    //top: 0,
    bottom: "auto",
    zIndex: 1,
    border: "1px solid",
    //display:'flex',
    //justifyContent:'flex-end',
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },

  list: {
    width: 300,
  },
  title: {
    display: "block",
    //paddingTop: 13,
    //width:'auto',
    //border:'1px solid',
    // width:300
  },
  search: {
    position: "relative",
    borderRadius: 30,
    //width:500,
    padding: "5px 15px",
    border: "1px solid #dcdde1",
    width: window.innerWidth * 0.3,
    //width:'100%'
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    //height: "100%",
    position: "absolute",
    display: "flex",
    //alignItems: "center",
    justifyContent: "flex-end",
    color: "",
    cursor: "pointer",
    //width:'100%',
    border: "1px solid",
  },
  inputRoot: {
    color: "",
  },
  inputInput: {
    // padding: theme.spacing(1, 1, 1, 1),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    marginTop: 7,
    transition: theme.transitions.create("width"),
    // width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "25ch",
    },
  },
  sectionDesktop: {
    display: "none",
    [theme.breakpoints.up("md")]: {
      display: "flex",
    },
  },
  sectionMobile: {
    display: "flex",
    [theme.breakpoints.up("md")]: {
      display: "none",
    },
  },

  center: {
    display: "flex",
    justifyContent: "flex-start",
    fontSize: 14,
    borderBottom: "1px solid #dcdde1",
  },
  drawerContent: {
    fontSize: 13,
    borderBottom: "1px solid #dcdde1",
    cursor: "pointer",
  },
  hover: {
    "&:hover": {
      background: "#f1f2f6",
      transition: "all 0.5s ease 0s",
    },
  },
}));

export default function Header(props) {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = useState(null);
  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  ///Main Menu Items Implementation////
  const [anchorMM, setAnchorMM] = React.useState(null);
  const [getCategoryList, setCategoryList] = useState([]);
  const [getBrandList, setBrandList] = useState([]);
  const [getModelList, setModelList] = useState([]);
  const [value, setValue] = useState(null);
  const [getUserName, setUserName] = useState("SignIn/SignUp");
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const [getFilter, setFilter] = useState([]);
  const [getModelId, setModelId] = useState("");
  const [getSrch, setSrch] = useState("");

  //const cartItems=useSelector(state=>state.cart)
  //const [getCount,setCount]=useState(cartItems.length)
  const changeView = (value, parameter) => {
    if (value == 1) {
      setContainer(<ViewListofProducts categoryid={parameter.categoryid} />);
    }
  };
  const filter = createFilterOptions();
  ////console.log(user)
  const [getContainer, setContainer] = useState(
    <FirstPage changeView={changeView} />
  );
  const handleClick = (event) => {
    setAnchorMM(event.currentTarget);
    fetchBrand(event.currentTarget.value);
  };

  const handleClose = () => {
    // alert("Hello")
    setAnchorMM(null);
  };

  const CheckSession = async () => {
    if (localStorage.getItem("user")) {
      var user = JSON.parse(localStorage.getItem("user"));
      var name = user.username.split(" ");
      setUserName(name[0]);
      dispatch({ type: "ADD_USER", userdata: [user.mobileno, user] });
    }
  };

  const CheckCart = async () => {
    if (localStorage.getItem("cart")) {
      var cart = JSON.parse(localStorage.getItem("cart"));
      dispatch({ type: "SET_ALL_CART", cartItems: cart });
    }
  };

  useEffect(function () {
    fetchCategory();
    //fetchModels();
    CheckSession();
    CheckCart();
  }, []);

  const fetchCategory = async () => {
    var list = await getData("pack/category");
    setCategoryList(list);
  };

  const fetchBrand = async (categoryid) => {
    var list = await postData("brand/brandfill", { categoryid: categoryid });
    setBrandList(list);
  };

  const fetchModels = async () => {
    var list = await getData("models/models");
    setModelList(list);
    setFilter(list);
  };

  const DisplayMainMenu = () => {
    return (
      <div className="container">
        <center>
          <div className="col-md-12">
            {getCategoryList.map((item, key) => {
              return (
                <Button
                  style={{
                    margin: "0px 10px",
                    padding: "5px 20px",
                    fontSize: 12,
                    color: "#FFFFFF",
                  }}
                  aria-controls="simple-menu"
                  value={item.id}
                  onClick={(event) => handleClick(event)}
                >
                  {item.categoryname} <KeyboardArrowDownIcon />
                </Button>
              );
            })}{" "}
          </div>{" "}
        </center>{" "}
      </div>
    );
  };

  const handleProductBrand = (brandid) => {
    props.history.push({ pathname: `/ViewListofBrandProducts/${brandid}` });
  };

  const DisplayBrandMenu = () => {
    return (
      <div style={{ width: 350, outline: "none" }}>
        <Grid container spacing={1} style={{ cursor: "pointer" }}>
          {getBrandList.map((item, key) => {
            return (
              <>
                {getBrandList.length > 5 ? (
                  <Grid
                    className={[classes.center, classes.hover]}
                    style={{ padding: "5px 20px" }}
                    item
                    xs={12}
                    sm={6}
                    onClick={() => handleProductBrand(item.brandid)}
                  >
                    <Avatar
                      alt={item.brandname}
                      src={`${ImageURL}/images/${item.picture}`}
                    />{" "}
                    <span style={{ margin: 8 }}>{item.brandname}</span>
                  </Grid>
                ) : (
                  <Grid
                    className={[classes.center, classes.hover]}
                    style={{ padding: "5px 20px" }}
                    item
                    xs={12}
                    sm={12}
                    onClick={() => handleProductBrand(item.brandid)}
                  >
                    <Avatar
                      alt={item.brandname}
                      src={`${ImageURL}/images/${item.picture}`}
                    />{" "}
                    <span style={{ margin: 8 }}>{item.brandname}</span>
                  </Grid>
                )}
              </>
            );
          })}{" "}
        </Grid>
      </div>
    );
  };

  /////HamBurger/////

  const [state, setState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });

  // const [anchorEl, setAnchorEl] = React.useState(null);

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event &&
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const list = (anchor) => (
    <div fullList style={{ padding: 0 }}>
      <div style={{ padding: 0 }}>
        <Grid
          container
          spacing={0}
          className={classes.list}
          style={{ padding: 0 }}
        >
          <Grid item xs={12} sm={12} style={{ padding: 0 }}>
            <div
              style={{
                backgroundColor: "#de011b",
                cursor: "pointer",
                width: "100%",
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "flex-end",
                  paddingRight: 2,
                }}
              >
                <span
                  style={{ fontSize: 15, color: "#fff" }}
                  onClick={(event) => setState(false)}
                >
                  <b>x</b>
                </span>
              </div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  padding: "1px 10px",
                }}
                onClick={() => handleAccount()}
              >
                <div style={{ margin: "2px 10px 5px 3px" }}>
                  <AccountCircle style={{ fontSize: 28, color: "white" }} />
                </div>
                <div style={{ margin: "3px 4px 5px 5px" }}>
                  <font size="4" color="white">
                    {" "}
                    <b>
                      Hello{" "}
                      {getUserName != "SignIn/SignUp" ? getUserName : <></>}{" "}
                    </b>
                  </font>
                </div>
              </div>
            </div>
          </Grid>
          <Grid
            item
            xs={12}
            sm={12}
            className={[classes.hover, classes.drawerContent]}
            style={{ padding: 15 }}
            onClick={() => handleHome()}
          >
            Home
          </Grid>
          <Grid
            item
            xs={12}
            sm={12}
            className={[classes.hover, classes.drawerContent]}
            style={{ padding: 15 }}
            onClick={() => handleShopByCategory()}
          >
            Shop By Category
          </Grid>
          <Grid
            item
            xs={12}
            sm={12}
            className={[classes.hover, classes.drawerContent]}
            style={{ padding: 15, borderWidth: 5 }}
            onClick={() => handleMyList()}
          >
            My List
          </Grid>
          <Grid
            item
            xs={12}
            sm={12}
            className={[classes.hover, classes.drawerContent]}
            style={{ padding: 15 }}
            onClick={() => handleAccount()}
          >
            My Account
          </Grid>
          <Grid
            item
            xs={12}
            sm={12}
            className={[classes.hover, classes.drawerContent]}
            style={{ padding: 15 }}
            onClick={() => handleAboutUs()}
          >
            Terms & Condition
          </Grid>
          <Grid
            item
            xs={12}
            sm={12}
            className={[classes.hover, classes.drawerContent]}
            style={{ padding: 15, borderWidth: 5 }}
            onClick={() => handleFAQ()}
          >
            Need & Help
          </Grid>
          <Grid item xs={12} sm={12}>
            <div>
              <div style={{ marginTop: 10, marginLeft: 10, cursor: "pointer" }}>
                <font size="3">
                  <b> Feel Free to Contact Us</b>
                </font>
              </div>
              <div style={{ margin: 10, cursor: "pointer", fontSize: 14 }}>
                <b>
                  Contact us : <font color="#de011b">0751-4001453</font>
                </b>
              </div>

              <div
                style={{
                  marginTop: 10,
                  marginLeft: 10,
                  cursor: "pointer",
                  fontSize: 14,
                }}
              >
                <small>
                  The Mobile Plus <br />
                  Rajeev Plaza ,Jayendra Ganj Lashkar,
                  <br />
                  Gwalior , M.P India
                </small>
              </div>

              <div style={{ marginTop: 10, marginLeft: 10, fontSize: 14 }}>
                <small>
                  Should you encounter any bugs,glitches, billing errors or
                  other problems on the website,please email us on{" "}
                  <font color="#0abde3">
                    <b>
                      <a
                        style={{ color: "#de011b" }}
                        href="mailto:themobileplus08@gmail.com"
                        target="_blank"
                      >
                        themobileplus08@gmail.com
                      </a>
                    </b>
                  </font>
                </small>
              </div>

              <div style={{ marginLeft: 10, cursor: "pointer" }}>
                <h5>DOWNLOAD APP</h5>
                <a
                  href="https://play.google.com/store/apps/details?id=com.mobileplusapp"
                  target="_blank"
                >
                  <img src="/images/play_store.png" alt="Play store" />
                </a>{" "}
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <a
                  href="https://play.google.com/store/apps/details?id=com.mobileplusapp"
                  target="_blank"
                >
                  <img src="/images/ios_store.png" alt="IOS Store" />
                </a>
              </div>
            </div>
          </Grid>
        </Grid>
      </div>
    </div>
  );

  ///Handle Account////

  const handleAccount = () => {
    props.history.push({ pathname: `/MyAccount` });
  };

  ////HandleMyList////
  const handleMyList = () => {
    props.history.push({ pathname: `/ShowCart` });
  };
  ////Handle About us///
  const handleAboutUs = () => {
    props.history.push({ pathname: `/AboutUs` });
  };
  // Shop By Category////

  const handleShopByCategory = () => {
    props.history.push({ pathname: `/ShopByCategory` });
  };

  /////HandleFAQ/////

  const handleFAQ = () => {
    props.history.push({ pathname: `/NeedHelp` });
  };

  ////HnadleHome////
  const handleHome = () => {
    props.history.push({ pathname: `/` });
  };

  const handleLogin = () => {
    props.history.push({ pathname: `/UserLogin` });
  };
  //////////////////////////////////////////////////////

  const FilterModel = (name) => {
    getModelList.map((item) => {
      if (item.modelname == name) {
        setModelId(item.modelid);
      }
    });
  };

  const handleProductModel = () => {
    props.history.push({ pathname: `/ViewListofModelProducts/${getModelId}` });
  };

  const handleSearchProduct = () => {
    props.history.push({ pathname: `/ViewListofSearchProducts/${getSrch}` });
  };

  return (
    <AppBar
      position="sticky"
      style={{ backgroundColor: "#fff", color: "#de011b" }}
    >
      <Toolbar style={{ marginLeft: 20 }}>
        <IconButton
          edge="start"
          className={classes.menuButton}
          color="inherit"
          aria-label="open drawer"
          onClick={toggleDrawer("left", true)}
        >
          <MenuIcon />
        </IconButton>
        <div className={classes.title}>
          <img
            src="/images/mobile.png"
            style={{ width: "100%" }}
            onClick={() => handleHome()}
          />
        </div>
        <div
          className={classes.sectionDesktop}
          style={{
            display: "flex",
            justifyContent: "flex-end",
            width: "100%",
            marginLeft: 5,
          }}
        >
          <Hidden mdDown>
            <div className={classes.search}>
              <InputBase
                fullWidth
                placeholder="Find Products here.."
                endAdornment={
                  <InputAdornment
                    position="end"
                    style={{
                      color: "#de011b",
                      pointerEvents: getSrch != "" ? "visible" : "none",
                      cursor:'pointer'
                    }}
                    onClick={()=>handleSearchProduct()}
                  >
                    {" "}
                    <SearchIcon />
                  </InputAdornment>
                }
                onChange={(event) => setSrch(event.target.value)}
              />
              {/*<Autocomplete
                id="free-solo-demo"
                freeSolo
                options={getModelList.map((option) => option.modelname)}
                //getOptionSelected={(option, value) => FilterModel(value)}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    fullWidth
                    variant="outlined"
                    size="small"
                    focused={false}
                    placeholder="Find Products or Models here..."
                  />
                )}
                onChange={(event, value) => FilterModel(value)}
               
                />*/}
            </div>
          </Hidden>
          {/* <Hidden mdDown>
            <div
              style={{
                cursor: "pointer",
                padding: "8px 5px 5px",
                pointerEvents:
                  getModelId != "" && getModelId != null ? "visible" : "none",
              }}
              onClick={() => handleProductModel()}
            >
              <SearchIcon />
            </div>
            </Hidden>*/}
          <ShowCartIcon history={props.history} style={{ margingTop: 2 }} />
          <span style={{ fontSize: 14, marginTop: 13 }}>Cart</span>
          <IconButton
            aria-label="account of current user"
            aria-controls="menu-appbar"
            aria-haspopup="true"
            onClick={() => handleAccount()}
            color="inherit"
          >
            <AccountCircle />
          </IconButton>
          <span style={{ fontSize: 14, marginTop: 13 }}>{getUserName}</span>
        </div>
      </Toolbar>
      <Hidden mdDown>
        {/* </AppBar> */}
        <AppBar
          position="static"
          style={{
            minHeight: 32,
            padding: 0,
            backgroundColor: "#de011b",
          }}
        >
          <Toolbar style={{ minHeight: 32 }}>
            <div style={{ minHeight: 32, fontSize: 12 }} className="col-md-12">
              {DisplayMainMenu()}
              <Menu
                id="simple-menu"
                anchorEl={anchorMM}
                getContentAnchorEl={null}
                keepMounted
                open={Boolean(anchorMM)}
                onMouseDown={handleClose}
                anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
                transformOrigin={{ vertical: "top", horizontal: "left" }}
                //style={{width:300}}
              >
                <div style={{ display: "flex", flexDirection: "row" }}>
                  <div>{DisplayBrandMenu()}</div>
                </div>
              </Menu>
            </div>
          </Toolbar>
        </AppBar>
      </Hidden>
      <React.Fragment key={"left"}>
        <SwipeableDrawer
          anchor={"left"}
          open={state["left"]}
          onClose={toggleDrawer("left", false)}
          onOpen={toggleDrawer("left", true)}
        >
          {list("left")}
        </SwipeableDrawer>
      </React.Fragment>
    </AppBar>
  );
}
