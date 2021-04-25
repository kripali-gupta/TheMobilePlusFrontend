import React,{useEffect,useState} from 'react';
import { fade, makeStyles } from '@material-ui/core/styles';
import {useSelector,useDispatch} from 'react-redux'
import Grid from '@material-ui/core/Grid';
import Divider from '@material-ui/core/Divider';
import Paper from '@material-ui/core/Paper';
import {getData,postData, ImageURL}  from '../FetchNodeServices'
import Button from '@material-ui/core/Button';
import Header from './Header'
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import { checkRequire,checkMobile,checkPin} from '../Checks';
import PaymentIcon from '@material-ui/icons/Payment';
import WhatsAppIcon from '@material-ui/icons/WhatsApp'; 
import Checkbox from '@material-ui/core/Checkbox';
import InputAdornment from '@material-ui/core/InputAdornment';
import AddIcon from '@material-ui/icons/Add';
import Radio from '@material-ui/core/Radio';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import AssignmentTurnedInIcon from '@material-ui/icons/AssignmentTurnedIn';
import List from '@material-ui/core/List';
import clsx from 'clsx';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Image from 'react-image-resizer'
import { statecity } from  '../statecity/StateCity';



const useStyles = makeStyles((theme) => ({
    paper: {
      padding:20,
     margin:20,
      backgroundColor:'#FFFFFF'
    },
    grow: {
      flexGrow: 1,
      backgroundColor: '#f3f3f3',
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
      display:'flex',justifyContent:'center',alignItems:'center',
    
    },
    divRow:{
        display:'flex',flexDirection:'row',
         fontSize:12,
         margin:'25px 5px 10px'
      },
     list: {
        width: 300,
      },
    subGrid:{
        padding:5,
        margin:'10px 5px'
    },
    error:{
      color:'red',
      position:"absolute",
      fontSize:12,
      margin:'0px 4px'
    }
  }));
export default  function ShowCartWithAddress(props){
       var cart=useSelector(state=>state.cart)
       //console.log(cart)
       //console.log(Object.keys(cart).length)
       var length=Object.keys(cart).length
       var cartItems=Object.values(cart)
       const [checked, setChecked] = React.useState(false);
       const dispatch=useDispatch()
       const classes = useStyles();
       var total=cartItems.reduce(calculate,0)
       var totalsavings=cartItems.reduce(calculatesavings,0)
       const [getZipcode,setZipcode]=useState('')
       const [getMobile,setMobile]=useState('')
       const [getName,setName]=useState('')
       const [getCity,setCity]=useState('')
       const [getStates,setStates]=useState('')
       const [getAddress1,setAddress1]=useState('')
       const [getAddress2,setAddress2]=useState('')
       const [getZipcodeMsg,setZipcodeMsg]=useState('')
       const [getCityMsg,setCityMsg]=useState('')
       const [getStateMsg,setStateMsg]=useState('')
       const [getAddress1Msg,setAddress1Msg]=useState('')
       const [getAddress2Msg,setAddress2Msg]=useState('')
       const [getAddressState,setAddressState]=useState(false)
       const [getStateList,setStateList]=useState([])
       const [getCityList,setCityList]=useState([]) 
       const [getEmail,setEmail]=useState([])
       const [delivery,setDelivery]=useState(0)
       const [state, setState] = React.useState({
        right: false,
      });
      ////console.log('UserDAta',props.location.state.data)
      const [getUserData,setUserData]=useState([])
       
      const numberFormat = (value) =>
      new Intl.NumberFormat('en-IN', {
        style: 'currency',
        currency: 'INR'
      }).format(value);
     
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
      const checkAddress=async()=>{
        var user=JSON.parse(localStorage.getItem('user'))
        var result=await postData('users/userdatadisplaybyid',{mobileno:user.mobileno})
         if(result.RESULT){
          fetchCity(result.data[0].state)
          setZipcode(result.data[0].zipcode)
          setAddress1(result.data[0].address1)
          setAddress2(result.data[0].address2)
          setCity(result.data[0].city)
          setStates(result.data[0].state)
          setName(result.data[0].username)
          setMobile(result.data[0].mobileno)
          setEmail(result.data[0].emailaddress)
          setAddressState(true) }
       else{
        setName(user.username)
        setMobile(user.mobileno)
        setEmail(user.emailaddress)
          }
      }

      const CheckSession=async()=>{
      if(!localStorage.getItem('user')){
        props.history.replace({pathname:`/UserLogin`})
     }
     else{
      if(localStorage.getItem('cart')){
        var cart=JSON.parse(localStorage.getItem('cart'))
        dispatch({type:'SET_ALL_CART',cartItems:cart})
       }
      else{
        props.history.replace({pathname:`/ShowCart`})    
      }
     }
    }
       useEffect(function(){
        CheckSession()
        checkAddress()
        fetchStates()
       },[])

       const fetchStates=async()=>{
        var list=[]
        statecity.map(function(item,key){
           list[key]=item.state
        })
      setStateList(list)
     } 
       const fillStates=()=>{
        return getStateList.map(function(item,key){
          return (
              <MenuItem  value={item}>
               {item}
              </MenuItem>
          )
        })
        
       }
       
       const handleState=(event)=>{
         var state=event.target.value
         setStates(state)
         fetchCity(state)
       }
    
       const fetchCity=async(selectstate)=>{
        var list=[]
        statecity.map(function(item,key){
           if(item.state==selectstate){
               item.districts.map(function(data,key){
                 list[key]=data  
               })
           }
        })
           setCityList(list)
           }
    
       const fillCities=()=>{
               return getCityList.map(function(item,key){
                 return (
                     <MenuItem  value={item}>
                      {item}
                     </MenuItem>
                 )
               })
        }
    
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
      const handleChange = (event) => {
        setChecked(event.target.checked);
      };

      const toggleDrawer = (anchor, open) => (event) => {
        if (event && event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
          return;
        }
    
        setState({ ...state, [anchor]: open });
      };
      
      
       const ShowCartItems=()=>{
       return cartItems.map(function(item,key){
         var save=item.price-item.offerprice
           return(
              <div>
              <Grid container spacing={3}style={{padding:'10px 5px 10px 10px',display:'flex',justifyContent:'center',alignItems:'center'}}>
                <Grid item xs={12} sm={4}className={classes.center} >
                  <div style={{width:120,height:120}}><Image src={`${ImageURL}/images/${item.picture}`} width={120} height={120}/></div>
                  </Grid>
               <Grid item xs={12} sm={8}  style={{padding:'30px 15px',}}>
                <div style={{fontSize:18,padding:7}} ><b>{item.productname}</b></div>      
                <div style={{fontSize:16,padding:7}} ><b>{numberFormat(item.offerprice)}</b>
                &nbsp;&nbsp;<small><s>{numberFormat(item.price)}</s> &nbsp; &nbsp;
                <b><font color="green" >You Save {numberFormat(save)}</font></b></small></div> 
                <div style={{fontSize:15,padding:7}}>Quantity : {item.qtydemand}</div>
             </Grid>
            </Grid>
             { length != key+1 ? <Divider />:<div></div>}
            </div>
                  )
            })
       }
   
       
  const ShowCoupon=()=>{
    return(
     <div>
 <Paper elevation={0}  className={classes.paper}>
      <div style={{fontSize:18,padding:5}}><b>Payment Details</b></div> 
       <div className={classes.paperPayment} >
      <div className={classes.rowStart} >M.R.P</div> 
      <div className={classes.rowEnd} ><b>{numberFormat(total+totalsavings)}</b></div>   
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
       { getAddressState ? <div style={{display:'flex',justifyContent:'flex-end',padding:20}} item xs={12} sm={12}>
       <Button variant="contained"  style={{width:200,backgroundColor:'#de011b',color:'#FFFFFF'}} onClick={()=>handleMakePayment()} >Make Payment</Button>
       </div> :<></>
  }
     </div>
    )
  }  
  const handleSubmit=async()=>{
    var err=false;
    if(!checkRequire(getAddress1))
    { err=true
      setAddress1Msg('Please enter your Address') }
    else{
      setAddress1Msg('')
    }

    if(!checkRequire(getAddress2))
    { err=true
      setAddress2Msg('Please enter your Address')  }
    else{
        setAddress2Msg('')
     }

     if(!checkRequire(getCity))
    { err=true
      setCityMsg('Please enter your City')  }
    else{
        setCityMsg('')
     }
     if(!checkRequire(getStates))
     { err=true
       setStateMsg('Please enter your State')  }
     else{
         setStateMsg('')
      }

    if(!checkRequire(getZipcode))
      { err=true
        setZipcodeMsg('Please enter your zipcode') 
       }
    if(checkRequire(getZipcode)){
        if(!checkPin(getZipcode)){
          err=true
          setZipcodeMsg('Please enter valid zipcode')
        }
        else{
          setZipcodeMsg('')
        }
     }
  if(!err){
    let body={address1:getAddress1,address2:getAddress2,zipcode:getZipcode,city:getCity,
      state:getStates,mobileno:getMobile,username:getName,emailaddress:getEmail,country:'INDIA'}
   if(!getAddressState)
  {  var result=await postData('users/userdata',body)
   
      if(result.RESULT){
       checkAddress()
       }
      else{ 
       checkAddress()
       alert('try again')
       }
  }
  else{
    var result=await postData('users/changeaddress',body)
    if(result.RESULT){
      checkAddress()
      }
     else{ 
      checkAddress()
      alert('please try again')
      }
  }
}
//6260268681

  }
  const list = (anchor) => (
    <div
      className={clsx(classes.list, {
        [classes.fullList]: anchor === 'top' || anchor === 'bottom',
      })}
      role="presentation"
    /*onClick={toggleDrawer(anchor, false)}*/
    //  onKeyDown={toggleDrawer(anchor, false)}
    >
      <List style={{padding:10}}>
          <div style={{fontSize:17,margin:5}}><b>Add Address</b></div>
        <Grid container spacing={1}>
          <Grid item xs={12}  sm={12}className={classes.subGrid}>
          <TextField fullWidth
          label="Zip Code"
          variant="outlined"
          size="small"
          value={getZipcode}
          onChange={(event)=>setZipcode(event.target.value)}
        />
        <div  className={classes.error}><small>{getZipcodeMsg}</small></div>
        </Grid>
          <Grid item xs={12}sm={12} className={classes.subGrid}>
          <TextField fullWidth
           label="Address 1"
          variant="outlined"
          size="small"
          value={getAddress1}
          onChange={(event)=>setAddress1(event.target.value)}
        />
         <div  className={classes.error}><small>{getAddress1Msg}</small></div>
          </Grid>
          <Grid item xs={12} sm={12} className={classes.subGrid}>
          <TextField fullWidth
           label="Address 2"
          variant="outlined"
          size="small"
          value={getAddress2}
          onChange={(event)=>setAddress2(event.target.value)}
        />
         <div  className={classes.error}><small>{getAddress2Msg}</small></div>
        </Grid>
        <Grid item xs={12} sm={12} className={classes.subGrid}>
        <FormControl variant="outlined" fullWidth size="small" >
        <InputLabel id="demo-simple-select-outlined-label">State</InputLabel>
        <Select
          value={getStates}
          onChange={(event)=>handleState(event)}
          label="State"
        >
       <MenuItem value="">Select State</MenuItem>
         {fillStates()}
        </Select>
      </FormControl>
      
         <div  className={classes.error}><small>{getCityMsg}</small></div>
        </Grid>
          <Grid item xs={12}sm={12} className={classes.subGrid}>
          <FormControl variant="outlined" fullWidth size="small" >
        <InputLabel id="demo-simple-select-outlined-label">City</InputLabel>
        <Select
          value={getCity}
          onChange={(event)=>setCity(event.target.value)}
          label="City"
        >
       <MenuItem value="">Select City</MenuItem>
         {fillCities()}
        </Select>
        </FormControl>
         <div  className={classes.error}><small>{getStateMsg}</small></div>
          </Grid>
        <Grid item xs={12} sm={12} className={classes.subGrid}>
        <Button variant="contained" style={{backgroundColor:'#de011b',color:'#FFFFFF'}} fullWidth  onClick={()=>handleSubmit()}>Save Address</Button>
        </Grid>
        </Grid>
      </List>
    </div>
  );



  const ShowAddress=()=>{
    
    return(
     <div>
        {getAddressState ? 
        <div>
        <div style={{display:'flex',flexDirection:'column',fontSize:14}} >
          <div><b>{getName}</b></div>
          <div> {getAddress1},{getAddress2}</div>
          <div>{getCity}-{getZipcode} ,{getStates}</div>
          <div><b>+91 - </b>{getMobile}</div>
           </div>
         </div>:
        <div style={{border:'1px solid #bdc3c7',borderRadius:5,padding:10,display:'flex',alignItems:'center',cursor:'pointer',fontSize:15}}
         onClick={toggleDrawer('right', true)} >
          <AddIcon style={{color:'#0984e3',margin:3}} /> <b>Add New Address</b>
          </div>
           }     
     </div> 
    )

  }
  

  const handleMakePayment=()=>{
    var userdetails={mobileno:getMobile,username:getName,address1:getAddress1,address2:getAddress2,state:getStates,city:getCity,zipcode:getZipcode}
    props.history.push({pathname:`/PaymentGateway`},{'userdetails':userdetails})

  }

    return(
        <div style={classes.root}>
           <Header history={props.history} />
          <div className={classes.center} >
          <div style={{width:'90%',}}>
        <Grid container spacing={0}>
        <Grid item xs={12} md={6}>
          <div  style={{paddingTop:20,fontSize:25,display:'flex',paddingLeft:24}}><b>Order Summary</b></div>
         <Paper elevation={0} className={classes.paper}>
          <Grid container spacing={1}>
            <Grid item xs={12} sm={6}>
           <div style={{fontSize:17,padding:5,marginBottom:20}}>
                <b>Delivery Address</b>
            </div>
            </Grid>
          <Grid item xs={12} sm={12}>
          <div  style={{backgroundColor:'#dfe6e9',padding:'20px 30px 20px 20px',width:'auto',margin:5,borderRadius:5,display:'flex',flexDirection:'row'}}>
          <div ><FormControlLabel
          control={<Radio style={{color:'#de011b'}} />}
          checked
        /> </div>
        {ShowAddress()}
        <React.Fragment key={'right'}>
        <SwipeableDrawer
            anchor={'right'}
            open={state['right']}
            onClose={toggleDrawer('right', false)}
            onOpen={toggleDrawer('right', true)}
          >
            {list('right')}
          </SwipeableDrawer> 
        </React.Fragment>
          </div>
          <div >
          {getAddressState ? 
           <div  style={{display:'flex',justifyContent:'flex-end',padding:10}}>
             <Button variant="contained"  style={{width:180,padding:5,color:'#FFFFFF',backgroundColor:'#de011b'}} onClick={toggleDrawer('right', true)}>Change Address</Button></div>
       :<></>}
         </div>
        </Grid>
        </Grid>
         </Paper> 
         <Paper  elevation={0} className={classes.paper}>
         <Grid container spacing={1} >
       <Grid item xs={12} md={12} >{ShowCartItems()}</Grid>
         </Grid>
         </Paper>
        </Grid>
        <Grid item xs={12} md={6}>
        <Grid container spacing={1}>
        <Grid item xs={12}sm={12}>
         <div style={{display:'flex',flexDirection:'row',paddingTop:30,justifyContent:'center'}}>
         <ShoppingCartIcon style={{color:'#de011b'}}/>&nbsp;<font size='2'>Your cart</font>&nbsp;    
      <Divider style={{width:56,marginTop:12}}/>&nbsp;<AssignmentTurnedInIcon style={{color:'#de011b'}}/>&nbsp;<font size='2'>Order Summary</font>&nbsp; 
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
        </div>
    )
}
