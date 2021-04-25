import React, { useEffect, useState } from "react";
import { fade, makeStyles } from "@material-ui/core/styles";
import IconButton from "@material-ui/core/IconButton";
import {
  getData,
  ServerURL,
  postData,
  postDataAndImage,
} from "../FetchNodeServices";
import Avatar from "@material-ui/core/Avatar";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Divider from "@material-ui/core/Divider";
import { useDispatch, useSelector } from "react-redux";
import Header from "./Header";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import { checkRequire, checkEmail } from "../Checks";
import { blue } from "@material-ui/core/colors";

const useStyles = makeStyles((theme) => ({
  maindiv: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
  },

  list: {
    cursor: "pointer",
    padding: "15px 30px 15px",
    fontSize: 15,
    borderBottom: "1px solid #dcdde1",
  },
  hover: {
    "&:hover": {
      background: "#f1f2f6",
      transition: "all 0.5s ease 0s",
    },
  },
  container: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },

  gridStyle: { display: "flex", flexDirection: "row" },

  error: {
    color: "red",
    position: "absolute",
    fontSize: 12,
    margin: "2px 4px",
  },
  textfieldStyle: {
    margin: "8px 4px",
    // height:'30px'
  },
}));

export default function MyAccount(props) {
  const classes = useStyles();
  const [getFirstName, setFirstName] = useState("");
  const [getLastName, setLastName] = useState("");
  const [getEmail, setEmail] = useState("");
  const [getMobile, setMobile] = useState("");
  const [getErrFirst, setErrFirst] = useState("");
  const [getErrLast, setErrLast] = useState("");
  const [getErrEmail, setErrEmail] = useState("");
  const [getMsg, setMsg] = useState("");
  const [getFormFirstName, setFormFirstName] = useState("");
  const [getFormLastName, setFormLastName] = useState("");
  const [getFormEmail, setFormEmail] = useState("");
  const dispatch = useDispatch();

  const CheckSession = async () => {
    if (localStorage.getItem("user")) {
      var user = JSON.parse(localStorage.getItem("user"));
      var name = user.username.split(" ");
      setFirstName(name[0]);
      setLastName(name[1]);
      setEmail(user.emailaddress);
      setMobile(user.mobileno);
      setFormFirstName(name[0]);
      setFormLastName(name[1]);
      setFormEmail(user.emailaddress);
      return;
      ////console.log(props.history.location.vendor)
    } else {
      props.history.replace({ pathname: `/UserLogin` });
    }
  };

  useEffect(function () {
    CheckSession();
    window.scrollTo(0, 0);
  }, []);

  const userLogout = async () => {
    dispatch({ type: "REMOVE_ALL_CART_AND_USER" });
    props.history.replace({ pathname: `/UserLogin` });
  };
  ///Order History///

  const handleOrderHistory = () => {
    props.history.push({ pathname: `/OrderHistory` });
  };
  ////MyList/////
  const handleMyList = () => {
    props.history.push({ pathname: `/ShowCart` });
  };

  /////HandleFAQ/////

  const handleFAQ = () => {
    props.history.push({ pathname: `/NeedHelp` });
  };
  //Contact us///
  const handleContactUs = () => {
    props.history.push({ pathname: `/ContactUs` });
  };
  //////About us///
  const handleAboutUs = () => {
    props.history.push({ pathname: `/AboutUs` });
  };

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleEdit = async () => {
    var err = false;
    if (!checkRequire(getFormFirstName)) {
      err = true;
      setErrFirst("Please enter Your first name");
    } else {
      setErrFirst("");
    }

    if (!checkRequire(getFormLastName)) {
      err = true;
      setErrLast("Please enter your last name");
    } else {
      setErrLast("");
    }

    if (!checkRequire(getFormEmail)) {
      err = true;
      setErrEmail("Please enter your email address");
    }
    if (checkRequire(getFormEmail)) {
      if (!checkEmail(getFormEmail)) {
        err = true;
        setErrEmail("Please enter valid email address");
      } else {
        setErrEmail("");
      }
    }

    if (!err) {
      let body = {
        mobileno: getMobile,
        username: getFormFirstName + " " + getFormLastName,
        emailaddress: getFormEmail,
      };

      var result = await postData("users/updateprofile", body);

      if (result.RESULT) {
        var res = await postData("users/checkUser", { mobileno: getMobile });
        if (res.RESULT) {
          localStorage.setItem("user", JSON.stringify(res.data));
          CheckSession();
        }
        setFirstName(getFormFirstName);
        setLastName(getFormLastName);
        setEmail(getFormEmail);
        handleClose();
      } else {
        handleClose();
      }
    }
  };

  const showEditDialog = () => {
    return (
      <div>
        <Dialog open={open} onClose={handleClose}>
          <DialogTitle id="alert-dialog-title">
            <div style={{ color: "#de011b", fontSize: 16 }}>Edit Profile</div>
          </DialogTitle>
          <div style={{ padding: 20 }}>
            <Paper elevation={0}>
              <Grid container spacing={1}>
                <Grid item xs={12} sm={12}>
                  <TextField
                    className={classes.textfieldStyle}
                    fullWidth
                    value={getFormFirstName}
                    id="outlined-size-small"
                    variant="standard"
                    size="small"
                    label="First Name"
                    onChange={(event) => setFormFirstName(event.target.value)}
                  />
                  <div className={classes.error}>
                    <small>{getErrFirst}</small>
                  </div>
                </Grid>
                <Grid item xs={12} sm={12}>
                  <TextField
                    className={classes.textfieldStyle}
                    fullWidth
                    value={getFormLastName}
                    id="standard-size-small"
                    variant="standard"
                    size="small"
                    label="Last Name"
                    onChange={(event) => setFormLastName(event.target.value)}
                  />
                  <div className={classes.error}>
                    <small>{getErrLast}</small>
                  </div>
                </Grid>
                <Grid item xs={12} sm={12}>
                  <TextField
                    className={classes.textfieldStyle}
                    fullWidth
                    value={getFormEmail}
                    id="standard-size-small"
                    variant="standard"
                    size="small"
                    label="Email-id"
                    onChange={(event) => setFormEmail(event.target.value)}
                  />
                  <div className={classes.error}>
                    <small>{getErrEmail}</small>
                  </div>
                </Grid>
                <Grid item xs={12} sm={12}>
                  <TextField
                    className={classes.textfieldStyle}
                    fullWidth
                    value={getMobile}
                    id="standard-size-small"
                    variant="standard"
                    size="small"
                    label="Mobile No"
                  />
                </Grid>
                <Grid item xs={12} sm={12} className={classes.container}>
                  <Button
                    variant="contained"
                    style={{ backgroundColor: "#de011b", color: "#FFFFFF" }}
                    fullWidth
                    onClick={() => handleEdit()}
                  >
                    Save Changes
                  </Button>
                </Grid>

                <Grid item xs={12}>
                  <b>&nbsp;&nbsp;{getMsg}</b>
                </Grid>
              </Grid>
            </Paper>
          </div>
          <DialogActions>
            <Button onClick={handleClose} style={{ color: "#de011b" }}>
              CANCEL
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  };

  const AccountInformation = () => {
    return (
      <div>
        <Paper elevation={0} style={{ padding: "5px 20px 20px" }}>
          <Grid container spacing={0}>
            <Grid item xs={12} sm={12}>
              <div style={{ display: "flex", flexDirection: "row" }}>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "flex-start",
                    width: "100%",
                  }}
                >
                  <h4>Account Information</h4>
                </div>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "flex-end",
                    width: "100%",
                  }}
                >
                  {" "}
                  <h4
                    style={{ color: "#de011b", cursor: "pointer" }}
                    onClick={() => handleClickOpen()}
                  >
                    Edit
                  </h4>
                </div>
              </div>
            </Grid>
            <Grid
              item
              xs={12}
              sm={4}
              style={{ display: "flex", justifyContent: "flex-end" }}
            ></Grid>
            <Grid item xs={12} sm={12} style={{ padding: 5 }}>
              <div style={{ fontSize: 15 }}>
                User Name
                <br />
                <b>
                  {getFirstName} {getLastName}
                </b>
              </div>
            </Grid>

            <Grid item xs={12} sm={6} style={{ padding: 5 }}>
              <div style={{ fontSize: 15 }}>
                Mobile No
                <br />
                <b>+91-{getMobile}</b>
              </div>
            </Grid>

            <Grid item xs={12} sm={6} style={{ padding: 5 }}>
              <div style={{ fontSize: 15 }}>
                Email ID
                <br />
                <b>{getEmail}</b>
              </div>
            </Grid>
          </Grid>
        </Paper>
      </div>
    );
  };

  const MyAccount = () => {
    return (
      <div>
        <Paper
          elevation={0}
          style={{
            padding: "0px 20px 20px",
            backgroundColor: "#de011b",
            borderRadius: 5,
          }}
        >
          <div className={classes.gridStyle}>
            <div className={classes.container} style={{ padding:'10px' }}>
              <AccountCircleIcon style={{ color: "#FFF", fontSize: 50 }} />
            </div>
            <div
              style={{
                display: "flex",
                padding: "25px 20px 20px",
                fontSize: 16,
                color: "#FFF",
                justifyContent: "flex-start",
                flexDirection: "column",
              }}
            >
              <big>
                {getFirstName} {getLastName}
              </big>
             
              <small style={{ fontSize: 14 }}>
                {getEmail}
                <br />
                +91 {getMobile}
              </small>
            </div>
          </div>
        </Paper>
      </div>
    );
  };

  const MyList = () => {
    return (
      <div>
        <Paper elevation={0}>
          <Grid container spacing={0}>
            <Grid
              item
              xs={12}
              sm={12}
              className={[classes.list, classes.hover]}
              onClick={() => handleOrderHistory()}
            >
              Order History
            </Grid>
            <Grid
              item
              xs={12}
              sm={12}
              className={[classes.list, classes.hover]}
              onClick={() => handleMyList()}
            >
              My List
            </Grid>
            <Grid
              item
              xs={12}
              sm={12}
              className={[classes.list, classes.hover]}
              onClick={() => handleAboutUs()}
            >
              About Us
            </Grid>
            <Grid
              item
              xs={12}
              sm={12}
              className={[classes.list, classes.hover]}
              onClick={() => handleFAQ()}
            >
              Need Help
            </Grid>
            <Grid
              item
              xs={12}
              sm={12}
              className={[classes.list, classes.hover]}
              onClick={() => handleContactUs()}
            >
              Contact Us
            </Grid>
            <Grid
              item
              xs={12}
              sm={12}
              className={[classes.list, classes.hover]}
              onClick={() => userLogout()}
            >
              Log out
            </Grid>
          </Grid>
        </Paper>
        <div>
          {" "}
          <div style={{ marginTop: 30 }}>
            <font size="2">
              For any queries,
              <br />
              Call us : <font color="#de011b">0751-4001543</font>
            </font>
          </div>
          <div style={{ marginTop: 10 }}>
            <font size="2">
              Due to current situation we are witnessing a huge surge in calls/
              e-mails. There may be a delay in response from our side.Kindly
              bear with us.
            </font>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div style={{ backgroundColor: "#f3f3f3" }}>
      <Header history={props.history} />
      <div className={classes.container}>
        <div style={{ width: "80%", padding: 10 }}>
          <h2>My Account</h2>
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <div>{MyAccount()} </div>
            </Grid>
            <Grid item xs={12} md={6}>
              <div> {AccountInformation()}</div>
            </Grid>
            <Grid item xs={12} md={6}>
              <div> {MyList()}</div>
            </Grid>
          </Grid>

          {showEditDialog()}
        </div>
      </div>
    </div>
  );
}
