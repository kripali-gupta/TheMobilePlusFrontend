import React, { Component, useEffect, useState } from 'react';
import { Button, Typography } from '@material-ui/core';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import { useSelector, useDispatch } from 'react-redux'
import { blue } from '@material-ui/core/colors';
import { postData, ImageURL, getData } from '../FetchNodeServices';
import Footer from './Footer'
import Header from './Header'
import Divider from '@material-ui/core/Divider';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import PaymentIcon from '@material-ui/icons/Payment';
import AssignmentTurnedInIcon from '@material-ui/icons/AssignmentTurnedIn';
import Image from 'react-image-resizer'
import Radio from '@material-ui/core/Radio';

const styles = theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing.unit * 3,
    overflowX: 'auto',
    backgroundColor: '#f3f3f3',
  },
  table: {
    minWidth: 700,
  },
  icon: {
    margin: theme.spacing.unit,
    fontSize: 32,
  },
  margin: {
    marginRight: '80%',
    paddingLeft: ''
  },
  button: {
    margin: theme.spacing.unit,
  },

  rightIcon: {
    marginLeft: theme.spacing.unit,
  },
});


const useStyles = makeStyles((theme) => ({
  paper: {
    padding: 20,
    margin: 20,
    backgroundColor: '#FFFFFF'
  },
  grow: {
    flexGrow: 1,
  },
  paperPayment: {
    display: 'flex', flexDirection: 'row', padding: 5
  },
  rowStart: {
    fontSize: 14, padding: 5, display: 'flex', justifyContent: 'flex-start', width: 300
  },
  rowEnd: {
    fontSize: 14, padding: 5, display: 'flex', justifyContent: 'flex-end', width: 300
  },
}));
const PaymentGateway = (props) => {
  var cart = useSelector(state => state.cart)
  var length = Object.keys(cart).length
  var cartItems = Object.values(cart)
  var total = cartItems.reduce(calculate, 0)
  var totalsavings = cartItems.reduce(calculatesavings, 0)
  const [delivery,setDelivery]=useState(0)

  function calculate(a, b) {
    var price = a + ((b.offerprice != 0 ? b.offerprice : b.price) * b.qtydemand)
    return price
  }
  function calculatesavings(a, b) {
    var saveprice = a + ((b.price - b.offerprice) * b.qtydemand)
    return saveprice
  }
 
  var user = useSelector(state => state.user)
  var userdetails = Object.values(user)
  const [getStatus, setStatus] = useState(true)
  const [getMsg, setMsg] = useState('')
  const [getCart, setCart] = useState([])
  const [getUser, setUser] = useState([])
  const [getTotal, setTotal] = useState(total)
  const [getSavings, setSavings] = useState(totalsavings)
  const [getPayment, setPayment] = useState('')
  const [getdis, setdis] = useState(false)
  const dispatch = useDispatch()

  const numberFormat = (value) =>
    new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR'
    }).format(value);

    useEffect(function(){
      fetchdelivery()
      window.scrollTo(0,0)
      },[getTotal])

    const fetchdelivery=async()=>{
   
      var result=await getData('deliverycharge/filter/'+total)
       if(result.status){
          
    if(result.result.length!=0)
    { setDelivery(result.result[0].charge)
    }
       }
       
     }
  // const handleRazorpay=async(id)=>{
  //     let body={name:getName,
  //     email:getEmail,
  //     mobile:getMobile,
  //     amount: props.invoice_total/100,
  //     razorpayid:id
  //     }
  //     let result=await postData('userpayment/addnew',body)
  //     alert(result)
  // }
  const AddPurchaseDetails = async (transactionid) => {
    var paymentstatus=''
    if(getPayment=='Online'){
      paymentstatus='Online Paid'
    }
    else{
      paymentstatus='Cash On Delivery'
    }
    var date = new Date()
    let d = date.getFullYear() + '/' + (date.getMonth() + 1) + '/' + date.getDate()
    var t = date.getHours() + ':' + date.getMinutes()
    var data = await getData('users/generateorderno')
    if (data) {
      var ord;
      if (data[0].orderno == null) {
        ord = 'TMP1';
      } else {
        let sn = data[0].orderno + 1;
        ord = 'TMP' + sn;
      }
      var body = []
      cartItems.map(function (item, key) {
        var arr = {
          orderno: ord, orderdate: d, price: item.price, quantity: item.qtydemand, amount: item.price, discount: item.offerprice,
          emailaddress: userdetails[0].emailaddress, mobileno: userdetails[0].mobileno, ordertime: t, productid: item.productid,
          outletid: 5, tid: transactionid, amountpaid: total, deliverycharges: delivery,covername:item.cover,
          deliveryaddress: props.location.state.userdetails.address1 + "," + props.location.state.userdetails.address2 + "," + props.location.state.userdetails.city + "," + props.location.state.userdetails.state + "," + props.location.state.userdetails.zipcode
          , orderstatus: "Home Delivery", deliverystatus: 'Not Delivered', itc: '', notes: paymentstatus, lp: 0, newloyaltypoints: 0, status: 'Active'
        }
        body.push(arr)
      })
      var result = await postData('users/purchase', body)
      if (!result.RESULT) {
        setMsg("Your Order has not been Placed , Please try again")
      }
      else {
        let add = { orderno: ord, address: props.location.state.userdetails.address1 + "," + props.location.state.userdetails.address2 + "," + props.location.state.userdetails.city + "," + props.location.state.userdetails.state + "," + props.location.state.userdetails.zipcode };
        var resultadd = await postData('users/orderAddress', add);
        if (resultadd.RESULT) {
          setCart(cartItems)
          setTotal(total)
          setSavings(totalsavings)
          dispatch({ type: "REMOVE_ALL_CART" })
          setMsg("Your Order has been Placed")
          setdis(true)
        }
        else {
          setMsg("Your Order has not been Placed , Please try again")
        }
      }
    }
    else {
      setMsg("Your Order has not been Placed , Please try again")
    }
  }

  const options = {
    // key: 'rzp_test_1DP5mmOlF5G5ag',
    key: 'rzp_live_VVbS3j85r2umPo',
    amount: total * 100, //  = INR 1
    name: 'THE MOBILE PLUS.',
    // description: 'some description',
    image: '/images/mpicon.png',
    handler: function (response) {
      // handleRazorpay(response.razorpay_payment_id)
      // props.addnewrecord()
      //alert(response.razorpay_payment_id);
      AddPurchaseDetails(response.razorpay_payment_id)
      setStatus(true)
    },
    notes: {
      address: 'some address'
    },
    theme: {
      color: '#de011b',
      hide_topbar: false
    }
  };

  const openPayModal = () => {
    var rzp1 = new window.Razorpay(options);
    rzp1.open();
  };

  useEffect(() => {
    if (props.location.state == null || length == 0) {
      props.history.replace({ pathname: `/ShowCartWithAddress` })
    }
    setCart(cartItems)
  /*  */
  }, []);


  const ShowCartItems = () => {
    return getCart.map(function (item, key) {
      var save = item.price - item.offerprice
      return (
        <div>
          <Grid container spacing={3} style={{ padding: '10px 5px 10px 10px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <Grid item xs={12} sm={4} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              <div><Image src={`${ImageURL}/images/${item.picture}`} width={120} height={120} /></div>
            </Grid>
            <Grid item xs={12} sm={8} style={{ padding: '30px 15px', }}>
              <div style={{ fontSize: 18, padding: 7 }} ><b>{item.productname}</b></div>
              <div style={{ fontSize: 16, padding: 7 }} ><b> {numberFormat(item.offerprice)}</b>
               &nbsp;&nbsp;<small><s> {numberFormat(item.price)}</s> &nbsp; &nbsp;
               <b><font color="green" >You Save {numberFormat(save)}</font></b></small></div>
              <div style={{ fontSize: 15, padding: 7 }}>Qty : {item.qtydemand}</div>
            </Grid>
          </Grid>
          { getCart.length != key + 1 ? <Divider /> : <div></div>}
        </div>
      )
    })
  }


  const ShowCoupon = () => {
    return (
      <div>
        <Paper elevation={0} className={classes.paper}>
          <div style={{ fontSize: 18, padding: 5 }}><b>Payment Details</b></div>
          <div className={classes.paperPayment} >
            <div className={classes.rowStart} >M.R.P</div>
            <div className={classes.rowEnd} ><b>{numberFormat(getTotal + getSavings)}</b></div>
          </div>
          <Divider />
          <div className={classes.paperPayment}   >
            <div className={classes.rowStart}  >Product Discount</div>
            <div className={classes.rowEnd} ><b>- {numberFormat(getSavings)}</b></div>
          </div>
          <Divider />
           <div className={classes.paperPayment}   >
            <div className={classes.rowStart}  >Delivery Charges</div>
            <div className={classes.rowEnd} ><b>+ {numberFormat(delivery)}</b></div>
          </div>
          <Divider />
          <div className={classes.paperPayment}   >
            <div className={classes.rowStart} >{getMsg==''? <></> :getMsg == 'Your Order has been Placed' ? <><Image src="/images/check.png" width={20} height={20} />&nbsp;&nbsp;<b>Total Amount Paid</b></> :
              <><Image src="/images/wrong.png" width={20} height={20} />&nbsp;&nbsp;<b>Total Amount</b></>}</div>
            <div className={classes.rowEnd} ><b>{numberFormat(parseInt(getTotal)+parseInt(delivery))}</b></div>
          </div>
          <div style={{ display: 'flex', justifyContent: 'flex-end', fontSize: 14, paddingRight: 10 }} >
            <b><font color="green" >You Save {numberFormat(getSavings)}</font></b></div>
        </Paper>
      </div>
    )
  }


  //const { classes } = props;
  const classes = useStyles();

 
  const OnlineMethod=()=>{
    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.async = true;
    document.body.appendChild(script);
    setTimeout(() => {
      openPayModal()
    }, 1500)
  }

 const handleChange = (event) => {
  setPayment(event.target.value);
};

 const confirmOrder=()=>{
  if(getPayment=='Online'){
    setStatus(false)
     OnlineMethod()
  }
  else{
    AddPurchaseDetails('')
  }
 }

const ChooseMethod=()=>{
  return(
    <div>
     <Paper elevation={0} >
     <Grid container spacing={1}>
     <Grid item xs={12} sm={12} >
      <div>
     <Radio
        checked={getPayment === 'Offline'}
        onChange={handleChange}
        value="Offline"
        inputProps={{ 'aria-label': 'Offline' }}
        style={{color:'#de011b'}}
        disabled={getdis}
      />
     <span > Cash on Delivery</span>
      </div>
      <div>
     
      <Radio
        checked={getPayment=== 'Online'}
        onChange={handleChange}
        value="Online"
        inputProps={{ 'aria-label': 'Online' }}
        style={{color:'#de011b'}}
        disabled={getdis}
      />
      <span> Online Payment</span>
      </div>
       </Grid>
       <Grid item xs={12} sm={12} style={{display:'flex',justifyContent:'flex-end'}} >
        {getPayment!=''? <div>
         <Button  variant="contained"   style={{height:40,padding:10,backgroundColor:'#de011b', color:'#ffffff',}} onClick={()=>confirmOrder()}>
           Confirm Order
      </Button> 
         </div>:<></>}
       </Grid>
     </Grid>
     </Paper>
    </div>
  )
}
    

const Order=()=>{
  return(
    <>
      <Grid item xs={12} md={6}>
     <div><h3>Your Order ({getCart.length} items)</h3></div>
    <Paper elevation={0} className={classes.paper}>
      <Grid container spacing={1} >
        <Grid item xs={12} sm={12}>{ShowCartItems()}</Grid>
        <Grid item xs={12} sm={12} style={{ display: 'flex', justifycontent: 'center', alignItems: 'center', flexDirection: 'row' }} >
          <div>{getMsg==''? <></> : getMsg == 'Your Order has been Placed' ? <Image src="/images/check.png" width={30} height={30} /> :
          <Image src="/images/wrong.png" width={30} height={30} />}</div><div><b>{getMsg}</b></div></Grid>
      </Grid>
    </Paper>
    </Grid>
     <Grid item xs={12} md={6}>
    <Grid container spacing={1}>
      <Grid item xs={12} sm={12}>
        <div style={{ display: 'flex', flexDirection: 'row', paddingTop: 30, justifyContent: 'center' }}>
          <ShoppingCartIcon style={{ color: '#de011b' }} />&nbsp;<font size='2'>Your cart</font>&nbsp;
           <Divider style={{ width: 56, marginTop: 12 }} />&nbsp;<AssignmentTurnedInIcon style={{ color: '#de011b' }} />&nbsp;<font size='2'>Order Summary</font>&nbsp;
         <Divider style={{ width: 56, marginTop: 12 }} />&nbsp;<PaymentIcon style={{ color: '#de011b' }} />&nbsp;<font size='2'>Payment</font>
        </div>
      </Grid>
      <Grid item xs={12} sm={12}>
        {ShowCoupon()}
      </Grid>
    </Grid>
      {getMsg==''?  <Paper  elevation={0} className={classes.paper}>
        <div style={{marginTop:30}} ><h4>Choose Payment Method</h4></div>
          <Grid container spacing={1} >
            <Grid item xs={12} sm={12}>{ChooseMethod()}</Grid>
          </Grid>
        </Paper>:<></>}
    </Grid>
    </>
  )
}

  return (
    <div className={classes.root}>
      <Header history={props.history} />
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      {!getStatus ? <center style={{ marginTop: 100 }}>
    <h1>Transferring to Razorpay...</h1>
     </center> :<div style={{ width: '90%'}} >
        <Grid container spacing={1}>
        {Order()}
          </Grid>
        </div>}
        </div>
      <Footer history={props.history} />
    </div>
  );
};

export default withStyles(styles)(PaymentGateway);
