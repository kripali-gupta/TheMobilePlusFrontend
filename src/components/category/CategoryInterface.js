import React,{useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import Avatar from '@material-ui/core/Avatar';
import Radio from '@material-ui/core/Radio';
import Typography from '@material-ui/core/Typography';
import {postDataAndImage}   from  '../FetchNodeServices'
import {checkRequire} from '../Checks'
import {MDBIcon} from "mdbreact";

const useStyles = makeStyles((theme) => ({
    root: {
       display:'flex',
       justifyContent:'center',
       alignItems:'center',
       marginTop:30,
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
       width:160,
    },
    center:{
      display:'flex',
      alignItems:'center',
      justifyContent:'center',
      flexDirection:'row'
    }
  }));

function CategoryInterface(){
  const classes=useStyles();
  const [getAdStatus,setAdStatus]=useState('')
  const [getIcon,setIcon]=useState({icon:'',fileIcon:''})
  const [getAd,setAd]=useState({ad:'',fileAd:''})
  const [getCategoryName,setCategoryName]=useState('')
  const [getDescription,setDescription]=useState('')
  const [getMsg,setMsg]=useState('')
  const [getErrCn,setErrCn]=useState('')
  const [getErrDes,setErrDes]=useState('')
  const [getErrIcon,setErrIcon]=useState('')
  const [getErrAd,setErrAd]=useState('')
  const [getErrAdstatus,setErrAdstatus]=useState('')
  


const handleAd=(event)=>{
 setAd({ad:event.target.files[0],fileAd:URL.createObjectURL(event.target.files[0])})
}

const handleIcon=(event)=>{
  setIcon({icon:event.target.files[0],fileIcon:URL.createObjectURL(event.target.files[0])})
 }

const  handleSubmit=async()=>{
    var err=false;
    if(!checkRequire(getCategoryName))
    { err=true
      setErrCn('/images/cross.png') }
    if(checkRequire(getCategoryName))
    { setErrCn('/images/tick.png')}

    if(!checkRequire(getDescription))
    { err=true
      setErrDes('/images/cross.png') }
    if(checkRequire(getDescription))
    { setErrDes('/images/tick.png')}    

    if(!checkRequire(getIcon.icon))
    { err=true
      setErrIcon('/images/cross.png') }
    if(checkRequire(getIcon.icon))
    { setErrIcon('/images/tick.png')}   
    
    if(!checkRequire(getAd.ad))
    { err=true
      setErrAd('/images/cross.png') }
    if(checkRequire(getAd.ad))
    { setErrAd('/images/tick.png')} 
    
    if(!checkRequire(getAdStatus))
    { err=true
      setErrAdstatus('/images/cross.png') }
    if(checkRequire(getAdStatus))
    { setErrAdstatus('/images/tick.png')}    
 
    if(!err) 
 { var formData=new FormData()
   formData.append('categoryname',getCategoryName)
   formData.append('description',getDescription)
   formData.append('icon',getIcon.icon)
   formData.append('ad',getAd.ad)
   formData.append('adstatus',getAdStatus)
   var config={headers:{'content-type':'multipart/form-data'}}
   var result=await postDataAndImage('category/addnewcategory',formData,config)
   //console.log(result)
   if(result){
    setMsg("Record Submitted..")
    }
   else{
    setMsg("Fail To Submit..")
   } 
}
else{
  setMsg("Error in Input")
}
}
  const ClearData=()=>{
    setCategoryName('')
    setDescription('')
    setIcon({icon:'',fileIcon:''})
    setAd({ad:'',fileAd:''})
    setMsg('')
    setAdStatus('')
    setErrAdstatus('')
    setErrDes('')
    setErrIcon('')
    setErrCn('')
    setErrAd('')
  }

 return(
 <div className={classes.root}>
 <Paper className={classes.paperStyle}>
 <Paper  elevation={1} className={classes.paperHeading} >
   <img src='/images/category.jpg' alt="Category"  className={classes.avatortheme} ></img>
    <Typography variant="h6" gutterBottom>
        Add New Category
      </Typography>
     </Paper>
     <Grid container spacing={1}>
         <Grid item xs={12} className={classes.subclass} > 
             <img src={getErrCn} width='10' height='10' />
             <TextField fullWidth label='Category Name' value={getCategoryName} variant='standard' onChange={(event)=>setCategoryName(event.target.value)}/>
         </Grid>
         <Grid item xs={12} className={classes.subclass} > 
         <img src={getErrDes} width='10' height='10' />
             <TextField  fullWidth label='Description'  value={getDescription} variant='standard' onChange={(event)=>setDescription(event.target.value)}/>
         </Grid>
         <Grid item xs={6} className={classes.center}>
         <img src={getErrIcon} width='10' height='10' />
         <input
        accept="image/*"
        className={classes.input}
        id="contained-button-fileicon"
        multiple
        type="file"
        onChange={(event)=>handleIcon(event)}
      />
      <label htmlFor="contained-button-fileicon">
        <Button variant="contained" color="primary"   className={classes.button} startIcon={<CloudUploadIcon />} component="span">
          Upload Icon
        </Button>
      </label>
         </Grid>
       <Grid item xs={6} className={classes.center} >
         <Avatar alt="Remy Sharp" variant='rounded' src={getIcon.fileIcon} className={classes.avatortheme}/>
        </Grid>
        <Grid item xs={6} className={classes.center} >
        <img src={getErrAd} width='10' height='10' />
        <input
        accept="image/*"
        className={classes.input}
        id="contained-button-filead"
        multiple
        type="file"
        onChange={(event)=>handleAd(event)}
      />
      <label htmlFor="contained-button-filead">
        <Button variant="contained" color="primary"  className={classes.button} startIcon={<CloudUploadIcon />} component="span">
          Upload Ad
        </Button>
      </label>
         </Grid>
       <Grid item xs={6}  className={classes.center}  >
         <Avatar alt="Remy Sharp" variant='rounded' src={getAd.fileAd} className={classes.avatortheme}/>
        </Grid>
       <Grid item xs={12} className={classes.subclass}>
        <img src={getErrAdstatus} width='10' height='10' />
         <div>Ad Status :
         </div>
       <Radio
        checked={getAdStatus === 'Yes'}
        onChange={(event)=>setAdStatus(event.target.value)}
        value="Yes"
        name="radio-button-demo"
        //inputProps={{ 'aria-label': 'A' }}
      />Yes
      <Radio
        checked={getAdStatus === 'No'}
        onChange={(event)=>setAdStatus(event.target.value)}
        value="No"
        name="radio-button-demo"
        //inputProps={{ 'aria-label': 'B' }}
      />No
        </Grid> 
        <Grid item xs={6} className={classes.center}>
        <Button variant="contained" color="primary" className={classes.button} onClick={()=>handleSubmit()}>
          Save
         </Button>
        </Grid>
        <Grid item xs={6}className={classes.center} >
        <Button variant="contained" color="primary" className={classes.button} onClick={()=>ClearData()}>
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
 );

}


export default CategoryInterface;