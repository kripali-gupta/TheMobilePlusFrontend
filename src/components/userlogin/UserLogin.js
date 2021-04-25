import React, {useState,useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Avatar from '@material-ui/core/Avatar';
import Paper from '@material-ui/core/Paper';
import { checkRequire,checkMobile, checkEmail,checkUserPassword} from '../Checks';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import IconButton from '@material-ui/core/IconButton';
import FormControl from '@material-ui/core/FormControl';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import WhatsAppIcon from '@material-ui/icons/WhatsApp'; 
import Checkbox from '@material-ui/core/Checkbox';
import Button from '@material-ui/core/Button';
import Header from '../clientview/Header'
import {postDataAndImage, getData, postData}   from  '../FetchNodeServices'
import {useSelector,useDispatch}  from 'react-redux';
import Image from 'react-image-resizer'


const useStyles = makeStyles((theme) => ({
  grow: {
    flexGrow: 1,
  },
    root: {
        display:'flex',
        justifyContent:'center',
        alignItems:'center',
        margin:'5px 10px',
        padding:10,
        flexDirection:'column'
       },
     paperStyle:{
        width:'auto',
        margin:10,
        padding:'5px 30px 5px 5px',
        height:'auto',
        borderRadius:10,
        backgroundColor:'#FFFFFF'
      },
    avator:{
        width:'auto',
        height:'auto',
        borderRadius:10
    } ,
    gridStyle:{
        display:'flex',
        margin:5,
        padding:20
    },
    red: {
        color:'#ffffff',
        backgroundColor:'#de011b',
        width:55,
        height:55,
        margin:'10px 30px',
        
      },
      center:{
        display:'flex',
        alignItems:'center',
        justifyContent:'center',
      },
      textfieldStyle:
    { margin:'4px 4px',
     // height:'30px'
    },
    divRow:{
      display:'flex',flexDirection:'row',
       fontSize:12,
    },
    error:{
      color:'red',
      //position:"absolute",
      fontSize:12,
      margin:'0px 4px'
    }
  }));
function UserLogin(props){
   const classes=useStyles()
   const [getMobile,setMobile]=useState('')
   const [getErrMob,setErrMob]=useState('')
   const [getFirstName,setFirstName]=useState('')
   const [getLastName,setLastName]=useState('')
   const [getEmail,setEmail]=useState('')
   const [getPassword,setPassword]=useState({password:'',showPassword:false})
   const [getConfirmPassword,setConfirmPassword]=useState({password:'',showPassword:false})
   const [getState,setState]=useState(true)
   const [getMobileState,setMobileState]=useState(true)
   const [checked, setChecked] = React.useState(false);
   const [getOTP,setOTP]=useState('')
   const [getErrFirst,setErrFirst]=useState('')
   const [getErrLast,setErrLast]=useState('')
   const [getErrEmail,setErrEmail]=useState('')
   const [getErrPassword,setErrPassword]=useState('')
   const [getErrCPwd,setErrCPwd]=useState('')
   const [getErrOTP,setErrOTP]=useState('')
   const [getMsg,setMsg]=useState('')
   const [getGOTP,setGOTP]=useState('') 
   const [getUser,setUser]=useState('') 
   const dispatch=useDispatch()
  
   useEffect(function(){
    window.scrollTo(0,0)

    },[])
   const CheckUser=async()=>{
    var body={mobileno:getMobile,}
    var result=await postData('users/checkUser',body)
    if(!result.RESULT){
      alert("Server Error..Please Try again")
      handleStatus()
    }
  else {
    setUser(result.data)
    localStorage.setItem('user',JSON.stringify(result.data)) 
    dispatch({type:"ADD_USER",userdata:[getMobile,result.data]})
    props.history.replace({pathname:`/ShowCartWithAddress`},{'data':result.data,'mobileno':getMobile})
     }
   }

   const UserSetLogin=()=>{
      localStorage.setItem('user',JSON.stringify(getUser)) 
      dispatch({type:"ADD_USER",userdata:[getMobile,getUser]})
      props.history.replace({pathname:`/ShowCartWithAddress`},{'data':getUser,'mobileno':getMobile})
 }

   const otpCallback=async()=>{
     var otp=parseInt(Math.random()*999)+1000
    var body={'otps':otp,mbl:getMobile}
  var result=await postData('api/sendotp',body)
    if(result.result=='Success'){
      setGOTP(otp)
      return otp
    }
    else{
     return false
    }
   }


  const handleChange = (event) => {
    setChecked(event.target.checked);
  };
  const handleMobileVerify=()=>{
    setErrMob('')
    setErrPassword('')
    if(!checkRequire(getOTP))
    {  setErrOTP('Please enter OTP')
    } 
  else{
    //console.log('otp',getGOTP)
    if(getGOTP==getOTP){
     UserSetLogin()
    }
    else
    {  setErrOTP('Invalid OTP') }
  }
 }

////Handle User Verification////
    const handleMobile=async()=>{
      var err=false
      if(checkRequire(getMobile))
       { 
        if(!checkMobile(getMobile))
       { err=true
         setErrMob("Please enter valid Mobile Number!")
          }
       else
       {setErrMob('') 
      }
     }
     if(!checkRequire(getMobile))
       { err=true
         setErrMob("Please Enter Mobile Number!") 
       }
      if(!err){
        var otp=otpCallback()
        setGOTP(otp)  
        var body={mobileno:getMobile,}
        var result=await postData('users/checkUser',body)
        if(!result.RESULT){
        setState(false)
       }
      else {
        setUser(result.data)
        setMobileState(false)
        //dispatch({type:"REMOVE_USER"})
      }
 }
    }
/////////////////////////////////////////////////
    const handleChangePassword = (event) => {
      setPassword({password:event.target.value ,showPassword:getPassword.showPassword});
    };
  
    const handleClickShowPassword = () => {
      setPassword({password:getPassword.password,showPassword: !getPassword.showPassword });
    };
  
  
    const handleChangeConfirmPassword = (event) => {
      setConfirmPassword({password:event.target.value,showPassword:getConfirmPassword.showPassword});
    };
  
    const handleClickShowConfirmPassword = () => {
      setConfirmPassword({password:getConfirmPassword.password, showPassword: !getConfirmPassword.showPassword });
    };
  

    const handleStatus=()=>{
     setState(true)
     setErrMob('')
     setMobile('')
     setErrEmail('')
     setFirstName('')
     setLastName('')
     setErrEmail('')
     setOTP('')
     setMsg('')
     setErrFirst('')
     setErrLast('')
     setErrOTP('')
    }
 ///////////////User Registration/////////////////////
    const handleVerify=async()=>{
     var  err=false
     if(!checkRequire(getFirstName))
    { err=true
      setErrFirst('Please enter Your first name') }
    else{
      setErrFirst('')
    }

    if(!checkRequire(getLastName))
    { err=true
      setErrLast('Please enter your last name')  }
    else{
        setErrLast('')
     }

    if(!checkRequire(getEmail))
      { err=true
        setErrEmail('Please enter your email address') 
       }
    if(checkRequire(getEmail)){
        if(!checkEmail(getEmail)){
          err=true
          setErrEmail('Please enter valid email address')
        }
        else{
          setErrEmail('')
        }
     }
  

      if(!checkRequire(getPassword.password))
        { err=true
          setErrPassword('Please enter password')  
        }
     if(checkRequire(getPassword.password)){
            if(!checkUserPassword(getPassword.password)){
              err=true
              setErrPassword('Password must be alphanumeric and between 8-20 characters! Allowed special characters are !@#$%^&*')
            }
            else{
              setErrPassword('')
            }
       }
     

      if(!checkRequire(getConfirmPassword.password))
        { err=true
          setErrCPwd('Please confirm your password') 
         }
      if(checkRequire(getConfirmPassword.password)){
         if(getConfirmPassword.password!=getPassword.password){
             err=true
              setErrCPwd("Password doesn't match")
            }
            else{
              setErrCPwd('')
            }
         }
           
    if(!checkRequire(getOTP))
       { err=true
         setErrOTP('Please enter OTP')
       } 
     else{
        setErrOTP('')
     }
   
     if(!err) {
      //console.log('otp777',getGOTP)
      if(getGOTP==getOTP)
   { let body={mobile:getMobile,name:getFirstName+" "+getLastName,email:getEmail,password:getPassword.password,loginstatus:'Login'}
     var result=await postData('users/addnewrecord',body)
     if(result.RESULT){
      CheckUser()
    
       //Checklogin()
      }
   else{
    alert("Server Error..Please Try again")
    handleStatus()
   } 
  }
  else{
    setErrOTP('Invalid OTP')
  }
     }
    }
//////////////////////////////////////////////////////////

 //Sign In Mobile ///

    const SignInMobile=()=>{
        return(
            <Grid container spacing={4} className={classes.gridStyle}>
       <Grid item xs={12} sm={10} >
         <div style={{fontSize:20}}> <b>Sign in</b></div>
         <div>Sign in to access your Orders, Offers and Wishlist.</div>
         </Grid>
       <Grid item xs={12} sm={10} >
       <FormControl fullWidth size="small" variant="outlined">
          <InputLabel htmlFor="outlined-adornment-amount">Enter Your Mobile no.</InputLabel>
          <OutlinedInput
            id="outlined-adornment-amount"
            size="small"
            onChange={(event)=>setMobile(event.target.value)}
            startAdornment={<InputAdornment position="start">+91 |</InputAdornment>}
            labelWidth={160}
          />
        </FormControl>
        <div  className={classes.error}><small>{getErrMob}</small></div>
        </Grid>
  { getMobileState ?<>
    <Grid item xs={12} sm={8} className={classes.center}>
    <Avatar className={classes.red} onClick={()=>handleMobile()} ><span style={{fontSize:30}}>&gt;</span></Avatar>
    </Grid></> : <div></div>
    }
  { getMobileState ? <div></div> :<>
   <Grid item xs={12} sm={8} >
         <div style={{fontSize:20}}><b>Verify</b></div>
        </Grid>
        <Grid item xs={12} sm={6} >
          <div style={{fontSize:11,paddingRight:2}}>We have sent 4 digit OTP on<b>+91-{getMobile}</b></div>
        </Grid>
       <Grid item  xs={12} sm={6} className={classes.center}>
        <div style={{fontSize:11,color:'red',cursor:'pointer'}} onClick={()=>handleStatus()}>Change</div>
        </Grid>
        <Grid item xs={12} sm={10} >
        <TextField className={classes.textfieldStyle}  fullWidth value={getOTP} label="Size"
          id="outlined-size-small"
          variant="outlined"
          size="small" label="Enter Your OTP" onChange={(event)=>setOTP(event.target.value)} />
          <div style={{fontSize:11,color:'red',textAlign:'right',cursor:'pointer'}} onClick={()=>handleStatus()} >Resend OTP</div>
          <div   className={classes.error}><small>{getErrOTP}</small></div>
      </Grid>
      <Grid item  xs={12} sm={10} >
      <Button fullWidth variant="contained" style={{backgroundColor:'#de011b',color:'#ffffff'}} onClick={()=>handleMobileVerify()} >
         Verify
         </Button>
      </Grid>
      </>}
     </Grid>
        )
    }
    //SignUp User //
   const SignUpUser=()=>{
      return(
    <Grid container spacing={4} className={classes.gridStyle} >
     <Grid item  xs={12} sm={12} >
         <div style={{fontSize:20}}> <b>Sign Up</b></div>
         <div style={{margin:'4px 4px',fontSize:14}}><b>Please enter your details.</b></div>
        </Grid>
      <Grid item xs={12} sm={10} >
        <TextField className={classes.textfieldStyle} fullWidth value={getFirstName}  id="outlined-size-small"
          variant="outlined"
          size="small"  label="Your First Name" onChange={(event)=>setFirstName(event.target.value)} />
          <div  className={classes.error}><small>{getErrFirst}</small></div>
        </Grid>
      <Grid item xs={12} sm={10} >
        <TextField className={classes.textfieldStyle}  fullWidth value={getLastName} id="outlined-size-small"
          variant="outlined"
          size="small"  label="Your Last Name" onChange={(event)=>setLastName(event.target.value)} />
        <div   className={classes.error}><small>{getErrLast}</small></div>
        </Grid>
     <Grid item xs={12} sm={10} >
        <TextField className={classes.textfieldStyle}  fullWidth value={getEmail} 
          id="outlined-size-small"
          variant="outlined"
          size="small" label="Your Email-id" onChange={(event)=>setEmail(event.target.value)} />
        <div   className={classes.error}><small>{getErrEmail}</small></div>
      </Grid>
      <Grid item xs={12} sm={10} >
      <FormControl fullWidth className={ classes.textfieldStyle} variant="outlined" size="small" >
          <InputLabel htmlFor="outlined-adornment-password" >Password</InputLabel>
          <OutlinedInput
            id="outlined-adornment-password"
            type={getPassword.showPassword ? 'text' : 'password'}
            value={getPassword.password}
            onChange={(event)=>handleChangePassword(event)}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  //onMouseDown={handleMouseDownPassword}
                  edge="end"
                >
                  {getPassword.showPassword ? <Visibility /> : <VisibilityOff />}
                </IconButton>
              </InputAdornment>
            }
            labelWidth={70}
          />
        </FormControl>
      <div style={{margin:'0px 4px',fontSize:11}}>Use 8 or more characters with a mix of letters & numbers</div>
      <div   className={classes.error}><small>{getErrPassword}</small></div>
      </Grid> 
      <Grid item xs={12} sm={10}>
      <FormControl fullWidth className={ classes.textfieldStyle} variant="outlined" size="small" >
          <InputLabel htmlFor="outlined-adornment-password">Confirm Password</InputLabel>
          <OutlinedInput
            id="outlined-adornment-password"
            type={getConfirmPassword.showPassword ? 'text' : 'password'}
            value={getConfirmPassword.password}
            onChange={(event)=>handleChangeConfirmPassword(event)}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowConfirmPassword}
                  //onMouseDown={handleMouseDownConfirmPassword}
                  edge="end"
                >
                  {getConfirmPassword.showPassword ? <Visibility /> : <VisibilityOff />}
                </IconButton>
              </InputAdornment>
            }
            labelWidth={130}
          />
        </FormControl>
        <div   className={classes.error}><small>{getErrCPwd}</small></div>
        </Grid>
        <Grid item xs={12} sm={10 }>
         <div style={{fontSize:20}}><b>Verify</b></div>
        </Grid>
        <Grid item xs={12} sm={10} >
          <div style={{fontSize:11,paddingRight:2}}>We have sent 4 digit OTP on<b>+91-{getMobile}</b></div>
          <div style={{fontSize:11,color:'red',cursor:'pointer',textAlign:'right'}} onClick={()=>handleStatus()}>Change</div>
        </Grid>
        <Grid item xs={12} sm={10}>
        <TextField className={classes.textfieldStyle}  fullWidth value={getOTP} label="Size"
          id="outlined-size-small"
          variant="outlined"
          size="small" label="Enter Your OTP" onChange={(event)=>setOTP(event.target.value)} />
          <div style={{fontSize:11,color:'red',textAlign:'right',cursor:'pointer'}} onClick={()=>handleStatus()} >Resend OTP</div>
          <div   className={classes.error}><small>{getErrOTP}</small></div>
      </Grid>
      <Grid item xs={12} sm={10} >
      <Button fullWidth variant="contained" style={{backgroundColor:'#de011b',color:'#ffffff'}} onClick={()=>handleVerify()} >
         Verify
         </Button>
      </Grid>
    </Grid>
      )
 }


    return(
 <div className={classes.grow} >
   <Header  history={props.history}/>
     <div className={classes.root} >
       <div style={{padding:10}}>
    <div className={classes.paperStyle}  >
  <Grid container spacing={1}>
   <Grid  item xs={12}sm={6} style={{padding:'50px 50px'}} >
     <div > 
   <img style={{width:'100%',height:'100%'}} alt="THE MOBILE PLUS" src="/images/mobileplus.png" />
   </div>
   </Grid>
   <Grid  item xs={12}sm={6}  >
     {getState ? SignInMobile():SignUpUser()}
     <div  style={{color:'red',position:"absolute"}}><small>{getMsg}</small></div>
  </Grid>
  </Grid>
  </div>
  <div style={{textAlign:'center',fontSize:13}}>
  By continuing you agree to our <font color='red'>Terms of service</font><br/>
  and <font color='red' >Privacy & Legal Policy.</font>
  </div>
  </div>
  </div>
 
 </div>
 
  )
}


export default UserLogin;