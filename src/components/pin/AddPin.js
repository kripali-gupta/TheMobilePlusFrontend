import React,{useState,useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import Avatar from '@material-ui/core/Avatar';
import Radio from '@material-ui/core/Radio';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Typography from '@material-ui/core/Typography';
import {postDataAndImage, getData, postData}   from  '../FetchNodeServices'
import {checkRequire,checkPin} from '../Checks'
import { Add } from '@material-ui/icons';

const useStyles = makeStyles((theme) => ({
    root: {
       display:'flex',
       justifyContent:'center',
       alignItems:'center',
       marginTop:20,
      },
      paperStyle:{
        width:480,
        padding:20,
        margin:20,
        backgroundColor:'#f1f2f6'
      },
      paperHeading :{
        margin:10,
        padding:10,
        display:'flex',
       justifyContent:'center',
       alignItems:'center',
       backgroundColor:'#dfe4ea'
      },
      subclass:{
        marginTop:3,
        marginBottom:4,
        display:'flex',
        flexDirection:'row'
      },
      avatortheme:{
        width:50,
        height:50,
      },
    input:
     {
      display: 'none',

    },
    button: {
      margin: theme.spacing(1),
       width:200,
    },
    center:{
      display:'flex',
      alignItems:'center',
      justifyContent:'center',
      flexDirection:'row'
    },
    }))


function AddPin(){
       const classes=useStyles()
       const [getPinno,setPinno]=useState('')
       const [getCity,setCity]=useState('')
       const [getPlace,setPlace]=useState('')
       const [getStatus,setStatus]=useState('')
       const [getErrPinno,setErrPinno]=useState('')
       const [getErrCity,setErrCity]=useState('')
       const [getErrPlace,setErrPlace]=useState('')
       const [getErrStatus,setErrStatus]=useState('')
       const [getMsg,setMsg]=useState('')

       
      
       
        const handleSubmit=async()=>{
        var  err=false
         if(!checkPin(getPinno)){
            err=true
            setErrPinno('/images/cross.png')
        }
        if(checkPin(getPinno)){
           setErrPinno('/images/tick.png')
       }
   
       if(!checkRequire(getCity)){
           err=true
           setErrCity('/images/cross.png')
       }
       if(checkRequire(getCity)){
          setErrCity('/images/tick.png')
       }

       if(!checkRequire(getPlace)){
        err=true
        setErrPlace('/images/cross.png')
       }
       if(checkRequire(getPlace)){
       setErrPlace('/images/tick.png')
        }  
   
       if(!checkRequire(getStatus)){
           err=true
           setErrStatus('/images/cross.png')
       }
       if(checkRequire(getStatus)){
          setErrStatus('/images/tick.png')
       }


         if(!err){
         var body={pinno:getPinno,place:getPlace,city:getCity,status:getStatus}
         var result=await postData('pin/addnewpin',body)
         if(result){
            setMsg("Record Submitted..")
            }
            else{
            setMsg("Fail To Submit..")
            }
        }
        else {
            setMsg("Error in Input")
        }

        }
       
        const ClearData=()=>{
            setPinno('')
            setPlace('')
            setCity('')
            setStatus('')
            setMsg('')
            setErrPinno('')
            setErrCity('')
            setErrPlace('')
            setErrStatus('')
        }


    return(
        <div className={classes.root}>
            <Paper className={classes.paperStyle}>
         <Paper  elevation={1} className={classes.paperHeading} >
      <Typography variant="h6" gutterBottom>
        Add Pin
      </Typography>
      </Paper>
      <Grid container spacing={1}>
      <Grid item xs={12} className={classes.subclass} > 
             <img src={getErrPinno} width='10' height='10' />
             <TextField fullWidth label='Pin No.'value={getPinno}  variant='standard' onChange={(event)=>setPinno(event.target.value)}/>
         </Grid>
         <Grid item xs={12} className={classes.subclass} > 
             <img src={getErrPlace} width='10' height='10' />
             <TextField fullWidth label='Place'value={getPlace}  variant='standard' onChange={(event)=>setPlace(event.target.value)}/>
         </Grid>
         <Grid item xs={12} className={classes.subclass} > 
             <img src={getErrCity} width='10' height='10' />
             <TextField fullWidth label='City'value={getCity}  variant='standard' onChange={(event)=>setCity(event.target.value)}/>
         </Grid>
         <Grid item xs={12} className={classes.subclass} > 
             <img src={getErrStatus} width='10' height='10' />
             <FormControl fullWidth >
        <InputLabel id="demo-simple-select-label">Status</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={getStatus}
          onChange={(event)=>setStatus(event.target.value)}
        >  
          <MenuItem  value="Yes">Yes</MenuItem>
          <MenuItem  value="No">No</MenuItem>
        </Select>
      </FormControl> 
         </Grid>
        
        <Grid item xs={6} className={classes.center}>
        <Button variant="contained" color="primary" className={classes.button} onClick={()=>handleSubmit()}>
          Save
         </Button>
        </Grid>
        <Grid item xs={6}className={classes.center} >
        <Button variant="contained" color="primary" className={classes.button}  onClick={()=>ClearData()} >
          Reset
         </Button>
        </Grid>
        <Grid item xs={12} className={classes.subclass}>
          <div>
            <b>Message : {getMsg}</b> 
          </div>
        </Grid>
      </Grid>
     </Paper>
          
        </div>
    )

}


export default AddPin;