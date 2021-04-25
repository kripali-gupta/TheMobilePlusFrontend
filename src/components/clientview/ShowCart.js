import React,{useEffect,useState} from 'react';
import { fade, makeStyles } from '@material-ui/core/styles';
import {useSelector,useDispatch} from 'react-redux'
import Grid from '@material-ui/core/Grid';
import Divider from '@material-ui/core/Divider';
import Paper from '@material-ui/core/Paper';
import {getData,postData, ImageURL}  from '../FetchNodeServices'
import QtyCtrl from './QtyCtrl'
import Button from '@material-ui/core/Button';
import Header from './Header'
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import PaymentIcon from '@material-ui/icons/Payment';
import AssignmentTurnedInIcon from '@material-ui/icons/AssignmentTurnedIn';
import {blue } from '@material-ui/core/colors';
import Image from 'react-image-resizer'


const useStyles = makeStyles((theme) => ({
    paper: {
      padding:20,
     margin:20,
      backgroundColor:'#FFFFFF'
    },
    grow: {
      flexGrow: 1,
    },
    paperPayment:{
      display:'flex',flexDirection:'row',padding:5
    },
    rowStart:{
      fontSize:14,padding:5,display:'flex',justifyContent:'flex-start',width:300
    },
    rowEnd:{
      fontSize:14,padding:5,display:'flex',justifyContent:'flex-end',width:300
    } ,
    center:{
      display:'flex',justifyContent:'center',alignItems:'center'
    }
  }));
export default  function ShowCart(props){
       var cart=useSelector(state=>state.cart)
       var length=Object.keys(cart).length
       var cartItems=Object.values(cart)
       const [getCount,setCount]=useState(false)
       const dispatch=useDispatch()
       const classes = useStyles();
       var total=cartItems.reduce(calculate,0)
       var totalsavings=cartItems.reduce(calculatesavings,0)
       const [delivery,setDelivery]=useState(0)
       function calculate(a,b){
         ////console.log("calculate-",a,b)
         var price=a+((b.offerprice!=0 ? b.offerprice : b.price)*b.qtydemand)
          return price
       }
       function calculatesavings(a,b){
       // //console.log("calculatesavings-",a,b)
        var saveprice=a+((b.price-b.offerprice)*b.qtydemand)
         return saveprice
      }
   

 useEffect(function(){
 fetchdelivery()
 window.scrollTo(0,0)
 },[total])

 const fetchdelivery=async()=>{
   
  var result=await getData('deliverycharge/filter/'+total)
   if(result.status){
    
    if(result.result.length!=0)
    { setDelivery(result.result[0].charge)
    }
   }
   
 }
     const numberFormat = (value) =>
     new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR'
  }).format(value);
 

      //Count Cart Items//
   const handleQtyChange=(value,item,key)=>{
      if(value>=1 && value<=item.stock) {
      item['qtydemand']=value
      dispatch({type:"ADD_CART",payload:[item.productid,item]})
      setCount(!getCount) 
   }
      else if(value==0){
        item['qtydemand']=value
        //var list=cartItems
        //list[key]['cartstatus']=0
        dispatch({type:"REMOVE_CART",payload:[item.productid,item]})
        setCount(!getCount) 
      }
      else{
        
      }
       } 


       const ShowCartItems=()=>{
       return cartItems.map(function(item,key){
         // //console.log("show item",item)
         var save=item.price-item.offerprice
         
           return(
              <div>
              <Grid container spacing={3}style={{padding:'10px 5px 10px 10px',display:'flex',justifyContent:'center',alignItems:'center'}}>
                <Grid item xs={12} sm={4} className={classes.center} >
                  <div style={{width:120,height:120}}> <Image src={`${ImageURL}/images/${item.picture}`} width={120} height={120} /></div>
                  </Grid>
               <Grid item xs={12} sm={8}  style={{padding:'30px 15px',}}>
                <div style={{fontSize:17,padding:7}} ><b>{item.productname}</b></div>      
                <div style={{fontSize:16,padding:7}} ><b>{numberFormat(item.offerprice)}</b>
                &nbsp;&nbsp;<small><s> {numberFormat(item.price)}</s> &nbsp; &nbsp;<br/>
                <b><font color="green" >You Save {numberFormat(save)}</font></b></small></div> 
             </Grid>
              <Grid item xs={12}  sm={12} style={{display:'flex',justifyContent:'flex-end',padding:'5px 0px 5px 5px',}}>
                { item.cartstatus==1 ?(<QtyCtrl value={item.qtydemand}  onChange={(value)=>handleQtyChange(value,item,key)} />):<div></div> }
              </Grid>
            </Grid>
             { length != key+1 ? <Divider />:<div></div>}
            </div>
                  )
            })
       }
    
  const ShowCoupon=()=>{
    //fetchdelivery()
    return(
     <div>
      <Paper elevation={0} className={classes.paper}>
      <div style={{fontSize:18,padding:5}}><b>Apply Coupon</b></div>
      <div style={{fontSize:14,padding:5}}>
      <a href='#'>Log in</a> to see best offers and cashback deals
    </div>
    <div style={{fontSize:14,padding:5}}><b>Currently this feature is not available</b></div>
       </Paper>
      <Paper elevation={0}  className={classes.paper}>
      <div style={{fontSize:18,padding:5}}><b>Payment Details</b></div> 
       <div className={classes.paperPayment} >
      <div className={classes.rowStart} >M.R.P</div> 
      <div className={classes.rowEnd} >{numberFormat(total+totalsavings)}</div>   
       </div> 
       <Divider />
       <div className={classes.paperPayment}   >
      <div className={classes.rowStart}  >Product Discount</div> 
      <div className={classes.rowEnd} ><b>- {numberFormat(totalsavings)}</b></div>   
       </div> 
       <Divider />
       <div className={classes.paperPayment}   >
      <div className={classes.rowStart}  >Delivery Charges</div>
      <div className={classes.rowEnd} ><b>+ {numberFormat(delivery)}</b></div>   
       </div> 
       <Divider />
       <div className={classes.paperPayment}   >
      <div className={classes.rowStart} ><b>Total Amount</b></div> 
      <div className={classes.rowEnd} ><b>{numberFormat(total+parseInt(delivery))}</b></div>   
       </div> 
      <div style={{display:'flex',justifyContent:'flex-end',fontSize:14,paddingRight:10}} >
         <b><font color="green" >You Save {numberFormat(totalsavings)}</font></b></div>   
       </Paper>
       <div style={{display:'flex',justifyContent:'flex-end',padding:20}} item xs={12}>
       <Button variant="contained"  style={{width:200,backgroundColor:'#de011b',color:'#FFFF'}} onClick={()=>handleUserLogin()}>Place Order</Button>
       </div>
     </div>
    )
  }  
  const handleUserLogin=()=>{
    if(!localStorage.getItem('user'))
   { props.history.push({pathname:'\UserLogin'}) }
   else{
     var user=JSON.parse(localStorage.getItem('user'))
    props.history.push({pathname:'\ShowCartWithAddress'},{mobileno:user.mobileno,data:user})
   }
  }
  const handleProducts=()=>{
    props.history.push({pathname:"/" })
  
   }
   
    return(
        <div style={{backgroundColor: '#f3f3f3',}}>
          <Header history={props.history} />
          {  length!=0 ?
          <div className={classes.center} >
          <div style={{width:'92%',margin:'20px 5px'}}>
        <Grid container spacing={0}>
        <Grid item xs={12} md={6}>
          <div  style={{paddingTop:20,fontSize:25,display:'flex',paddingLeft:24}}><b>MY CART({length})</b></div>
         <Paper elevation={0} className={classes.paper}>
         <Grid container spacing={1} >
         <Grid item xs={12} sm={6}>
        <div style={{fontSize:17,position:'sticky'}} ><b>ORDER SUMMARY </b><small>({length} items)</small></div> 
         </Grid>
        <Grid item xs={12} sm={6} >
         <div style={{fontSize:20,textAlign:'right',position:'sticky'}}><b>{numberFormat(total)}</b></div>
       </Grid>
       <Grid item xs={12} sm={12} >{ShowCartItems()}</Grid>
         </Grid>
         </Paper>
        </Grid>
        <Grid item xs={12} md={6}>
          <Grid container spacing={1}>
        <Grid item xs={12}sm={12}>
         <div style={{display:'flex',flexDirection:'row',paddingTop:30,justifyContent:'center'}}>
         <ShoppingCartIcon style={{color:'#de011b'}}/>&nbsp;<font size='2'>Your cart</font>&nbsp;   
      <Divider style={{width:56,marginTop:12}}/>&nbsp;<AssignmentTurnedInIcon/>&nbsp;<font size='2'>Order Summary</font>&nbsp;
          <Divider style={{width:56,marginTop:12}}/>&nbsp;<PaymentIcon/>&nbsp;<font size='2'>Payment</font> 
       </div>
       </Grid>
        <Grid item xs={12}sm={12}>
        {ShowCoupon()}
        </Grid>
        </Grid>
        </Grid>
        </Grid>
        </div>
        </div>
       : <div className={classes.center} style={{margin:'50px 0px 0px',flexDirection:'column'}}>
         <div><img src='/images/empty.png' /></div>
          <div style={{textAlign:'center'}}>Your Cart is empty!<br/>
       You have no items added in the cart.</div> 
        <div style={{margin:10}}><Button variant="contained"  style={{width:300,backgroundColor:'#de011b',color:'#FFFFFF'}} onClick={()=>handleProducts()}>Add Products</Button></div>
         </div>}
     
             </div>
    )
}
/* */