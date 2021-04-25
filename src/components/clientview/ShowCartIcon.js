import React,{useEffect,useState} from 'react';
import { fade, makeStyles } from '@material-ui/core/styles';
import {useSelector,useDispatch} from 'react-redux'
import ShoppingCart from '@material-ui/icons/ShoppingCart';
import Badge from '@material-ui/core/Badge';
import IconButton from '@material-ui/core/IconButton';
import Popover from '@material-ui/core/Popover';
import Grid from '@material-ui/core/Grid';
import { Typography } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import {blue } from '@material-ui/core/colors';

const useStyles = makeStyles((theme) => ({
    popover: {
      pointerEvents: 'none',
      
    },
    paper: {
      padding:12,
      width:280,
    },
  }));
export default  function ShowCartIcon(props){
       var cart=useSelector(state=>state.cart)
       var length=Object.keys(cart).length
       var cartItems=Object.values(cart)
       const classes = useStyles();
       const [anchorEl, setAnchorEl] = React.useState(null);
       var total=cartItems.reduce(calculate,0)
       var totalsavings=cartItems.reduce(calculatesavings,0)
      
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
        
      const numberFormat = (value) =>
  new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR'
  }).format(value);
 
       const handlePopoverOpen = (event) => {
         setAnchorEl(event.currentTarget)
       };
     
       const handlePopoverClose = () => {
         setAnchorEl(null) 
       };

       const handleClick=()=>{
        props.history.push({pathname:`/ShowCart`})
       }
       const showCartItems=()=>{
       return cartItems.map(function(item,key){
           return(
              <Grid container spacing={1}style={{padding:5}}>
                <Grid item xs={8} >
                   <div style={{fontSize:12,}} >{item.productname.length>=35 ?(item.productname).toString().substring(0,21)+"...":item.productname}</div> 
                  </Grid>
               <Grid item xs={4} >
                   <div style={{fontSize:12,textAlign:'right'}} ><span>&#8377;</span> {item.offerprice!=0 ? item.offerprice : item.price} x {item.qtydemand}</div> 
            </Grid>
             { key==cartItems.length-1 ?
              <Grid container spacing={1}style={{padding:5}}>
               <Grid item xs={12} sm={6} >
                  <div style={{fontSize:14,fontWeight:'bold'}}>{numberFormat(total)}</div>
                </Grid>
               <Grid item xs={12} sm={6} style={{display:'flex',justifyContent:'flex-end'}}> 
               <div style={{color:'green',fontSize:12,fontWeight:'bold'}} >
                 You Save {numberFormat(totalsavings)}</div> </Grid>
                </Grid> : false}
                </Grid>
               
              )
            })
       }
    
       const open = Boolean(anchorEl);
     
    return(
        <div>
         <div>
         <IconButton aria-label="show 4 new mails" color="inherit"
          aria-owns={open ? 'mouse-over-popover' : undefined}
          aria-haspopup="true"
          onMouseEnter={handlePopoverOpen}
          onClick={()=>handleClick()}
         onMouseLeave={handlePopoverClose}
          >
              <Badge badgeContent={length} color="secondary">
                <ShoppingCart />
              </Badge>
           { length !=0 ? <Popover
        id="mouse-over-popover"
        className={classes.popover}
        classes={{
          paper: classes.paper,
        }}
        open={open}
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        onClose={handlePopoverClose}
        disableRestoreFocus
      >
        <Grid container spacing={1} >
         <Grid item xs={6} >
         <div style={{fontSize:13,fontWeight:'bold'}} >ORDER SUMMARY</div> 
         </Grid>
         <Grid item xs={6}>
             <div style={{fontSize:11,fontWeight:'bold',textAlign:'right'}}>{length} item(s)</div>
         </Grid>
         {showCartItems()}
       </Grid>
        
       </Popover> : false}
        </IconButton>
           </div>
        </div>
    )

}