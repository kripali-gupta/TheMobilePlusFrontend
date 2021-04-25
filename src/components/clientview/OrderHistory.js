import React,{useEffect,useState} from 'react';
import { fade, makeStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import { getData,ImageURL, postData,postDataAndImage } from '../FetchNodeServices';
import Avatar from '@material-ui/core/Avatar';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Divider from '@material-ui/core/Divider';
import {useDispatch,useSelector} from 'react-redux'; 
import Header from './Header';
import Footer from './Footer';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Image from 'react-image-resizer'



const useStyles = makeStyles((theme) => ({
  center:{
    display:'flex',justifyContent:'center',alignItems:'center'
  }  
   ,

   button:{
    borderRadius:20,
    padding:'5px 10px',
    backgroundColor:'#de011b',
    color:'#fff',
    "&:hover": {
      background: "#de011b",
      transition: 'all 0.5s ease 0s',
    },
   
   },
  
}));

export default function OrderHistory(props) {
    const classes = useStyles();
    const [getOrderHistory,setOrderHistory]=useState([])
    const [getProduct,setProduct]=useState([])
    const [getUser,setUser]=useState([])
    const [getStatus,setStatus]=useState(false)
    const [getAmount,setAmount]=useState(0)
    const [open, setOpen] = React.useState(false);
    const [order, setOrder] = React.useState('');





    const numberFormat = (value) =>
    new Intl.NumberFormat('en-IN', {
   style: 'currency',
   currency: 'INR'
 }).format(value);

    const CheckSession=async()=>{
      if(!localStorage.getItem('user')){
        props.history.replace({pathname:`/UserLogin`})
        }
}

const fetchProducts=async(orderno)=>{
  var result=await postData('purchase/orderdetailsbyorderno',{'orderno':orderno})
  if(result.length!=0){
    setProduct(result)
    setStatus(true)
    setAmount(result[0].amountpaid)
    setOrder(result[0].orderno)
  }
}

 const fetchOrderHistory=async()=>{
  var user=JSON.parse(localStorage.getItem('user'))
    setUser(user)
   var body={mobileno:user.mobileno}
   var list=await postData('purchase/orderdisplaybymobileno',body)
   //console.log("list",list)
   setOrderHistory(list)
 }  
 
 const CancelOrder=async(orderno)=>{
  var result =await postData('purchase/cancelorder',{'orderno':orderno})
  if(result.result){
    fetchProducts(orderno)
  }
 setOpen(false)
}

useEffect(function(){
  CheckSession()
  window.scrollTo(0,0)
  fetchOrderHistory()
},[setStatus])
    
 const OrderDetails=()=>{
return(
    getOrderHistory.map(function(item,key){
      let date=new Date(item.orderdate)
      let d = date.getFullYear() + '/' + (date.getMonth() + 1) + '/' + date.getDate()
      var t = date.getHours() + ':' + date.getMinutes()
      //console.log('time')
      return(
        <div>
       <div style={{fontSize:13}}>
             <Grid  container spacing={1} style={{padding:5}}>
             <Grid item xs={12} sm={3} >
             <div><b>Order Placed at</b></div>
             <div>{d} at {item.ordertime}</div>
             </Grid>

             <Grid  item xs={12} sm={3}>
             <div><b>Total Amount Paid</b></div>
             <div><span>&#8377;</span> {item.amountpaid}</div>
             </Grid>
             
             <Grid  item xs={12} sm={3} s>
             <div><b>Order No</b></div>
             <div>{item.orderno}</div>
             </Grid>
             <Grid item xs={12} sm={3}>
               <Button variant='contained' className={classes.button}  onClick={()=>fetchProducts(item.orderno)} >
                   Show Bill 
               </Button>
             </Grid>
             </Grid>
             <Divider style={{marginBottom:10}}/>
        </div>
      </div>

      )

    })

)

 }

 


 const showProducts=()=>{

   return(
  getProduct.map(function(item,key){
   return(
     <>
   <Grid item xs={12} sm={12} style={{ borderBottom: '1px solid #dcdde1'}} >
      <Grid container spacing={1}>
      <Grid item xs={12} sm={4} className={classes.center}  >
       <div style={{width:120,height:120}}> <Image src={`${ImageURL}/images/${item.picture}`} width={120} height={120} /></div>
      </Grid>
      <Grid item xs={12} sm={8}  style={{padding:'30px 15px',}}> 
      <div style={{fontSize:17,padding:'2px 7px'}} ><b>{item.productname+" "+item.covername}</b></div>  
      <div style={{fontSize:15,padding:'2px 7px'}} ><b>Price</b>&nbsp;{numberFormat(item.discount)}
       &nbsp;&nbsp;<small><s> {numberFormat(item.price)}</s> &nbsp; &nbsp;<br/>
       <b><font color="green" >You Saved {numberFormat(item.price-item.discount)}</font></b></small></div> 
      < div style={{fontSize:15,padding:'2px 7px'}} ><small><b>Quantity &nbsp;</b> {item.quantity}</small></div>  
      < div style={{fontSize:15,padding:'2px 7px'}} ><small><b>{item.notesforitem}</b></small></div>    
      < div style={{fontSize:15,padding:'2px 7px'}} ><small><b>Delivery Charge&nbsp;</b>{numberFormat(item.deliverycharges)}</small></div>    
      < div style={{fontSize:15,padding:'2px 7px'}} ><small><b>Status&nbsp; </b>{item.status}</small></div>     
       </Grid>
     </Grid>
     </Grid>
     <Divider />
     <Grid item xs={12} sm={12}  > 
       {getProduct.length == key+1 ?  <div style={{width:'100%',display:'flex',justifyContent:'flex-end'}}>
     {item.status!='Cancel Order'?<Button variant="contained" className={classes.button} onClick={()=>setOpen(true)} >Cancel Order </Button>:<></>}
     </div> :<></>}
      </Grid>
   </>
   )
  })

   )
}

const handleClose = () => {
  setOpen(false);
};

  const CancelOrderConfirm=(orderno)=>{
    return(
      <div>
          <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">Cancel Order </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure you want to cancel this order ?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} style={{color:'#de011b'}}>
            No
          </Button>
          <Button onClick={()=>CancelOrder(orderno)} style={{color:'#de011b'}}autoFocus>
            Yes
          </Button>
        </DialogActions>
      </Dialog>
      </div>
    )
  }

    return (
        <div>
            <Header history={props.history}/>
            <div style={{display:'flex',justifyContent:'center',alignItems:'center'}}>
            <Paper elevation={0} style={{width:window.innerWidth*0.6,margin:20,padding:30}}>
            <div>
            {getOrderHistory.length && !getStatus ?  <> <div >
            <h2>My Orders</h2> 
             </div>
             <div>
               <h4><font color='#deo11b'> {getOrderHistory.length} order had placed  from your account</font></h4> 
             </div>
             <div>{OrderDetails()}</div></>: getStatus ? <div>
               <Button variant="contained"  className={classes.button} style={{marginBottom:5}} onClick={()=>setStatus(false)}>Show All Orders</Button>
               <div style={{display:'flex',flexDirection:'row'}}>
               <div style={{fontWeight:'bold',width:'100%'}}>All Bill Products</div>
               <div style={{display:'flex',justifyContent:'flex-end',width:'100%'}}><b>Total Amount Paid<br/>{numberFormat(getAmount)}</b></div>
               </div>   
               <Grid container spacing={1}>
                  {showProducts()}
                </Grid>
             </div> :<div><h2>No Order has Placed from your Account</h2></div>}
             </div>
            </Paper>
             </div>
             {CancelOrderConfirm(order)}
            <Footer history={props.history}/>
        </div>

  
  );
}