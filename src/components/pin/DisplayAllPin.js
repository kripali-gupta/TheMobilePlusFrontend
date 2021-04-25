import React,{useState,useEffect} from 'react';
import MaterialTable from 'material-table';
import { makeStyles } from '@material-ui/core/styles';
import {getData, ServerURL ,postData,postDataAndImage}  from '../FetchNodeServices'
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
import {checkRequire,checkPin} from '../Checks'
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

const useStyles = makeStyles((theme) => ({
  
    root:{
        display:'flex',
        alignItems:'center',
        justifyContent:'center',
        marginTop:20,
    } ,
    tableDiv:{
       width:window.innerWidth*0.46,
    },
    avatortheme:{
     width:50,
     height:50,
   }, paperStyle:{
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
   input:
   {
   display: 'none',
   
   },
   button: {
   margin: theme.spacing(1),
    width:200,
   },
   main:{
     display:'flex',
     alignItems:'center',
     justifyContent:'center',
   } ,
   center:{
   display:'flex',
   alignItems:'center',
   justifyContent:'center',
   flexDirection:'row'
   },
   formControl: {
    // margin: theme.spacing(1),
   },
   })
   )


  function DisplayAllPin(){
    const classes=useStyles()
    const [getList,setList]=useState([])
    const [getOpen,setOpen]=useState('')
    const [getPinId,setPinId]=useState('')
    const [getPinno,setPinno]=useState('')
    const [getCity,setCity]=useState('')
    const [getPlace,setPlace]=useState('')
    const [getStatus,setStatus]=useState('')
    const [getErrPinno,setErrPinno]=useState('')
    const [getErrCity,setErrCity]=useState('')
    const [getErrPlace,setErrPlace]=useState('')
    const [getErrStatus,setErrStatus]=useState('')
    const [getMsg,setMsg]=useState('')



    const [state, setState] = useState({
        columns: [
          { title: 'Id', field: 'pinid' },
          { title: 'Pin No', field: 'pinno' },
          { title: 'Place', field: 'place' },
          { title: 'City', field: 'city' },
        ],  
      });

      const fetchData=async()=>{
        var list =await getData('pin/displayall')
        setList(list)
    }
    
     useEffect(function(){
        fetchData()
    },[])
    
    
       const handleEdit=async()=>{
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
        var body={pinno:getPinno,place:getPlace,city:getCity,status:getStatus,pinid:getPinId}
        var result=await postData('pin/updateRecord',body)
        if(result){
           setMsg("Record Edited..")
           }
           else{
           setMsg("Fail To Edit Record..")
           }
       }
       else {
           setMsg("Error in Input")
       }

       }

      const handleDelete=async(oldData)=>{
        var body={pinid:oldData.pinid}
        var result=await postData('pin/deleteRecord',body)
      }
      
      const handleClickOpen = async(rowData) => {
        setOpen(true);
        setPinId(rowData.pinid)
        setPinno(rowData.pinno)
        setPlace(rowData.place)
        setCity(rowData.city)
        setStatus(rowData.status)
       };
       
       const handleClose = () => {
        setOpen(false);
        setMsg('')
        setErrPinno('')
        setErrCity('')
        setErrPlace('')
        setErrStatus('')
        fetchData()
       };
          
       const handleDialog=()=>{
        return (
          <div>
            <Dialog open={getOpen} onClose={handleClose} aria-labelledby="form-dialog-title">
              <DialogTitle id="form-dialog-title">Model [Edit Record]</DialogTitle>
              <DialogContent>
                <DialogContentText>
                </DialogContentText>
                <div className={classes.main}>
            <Paper className={classes.paperStyle}>
      <Grid container spacing={1}>
      <Grid item xs={12} className={classes.subclass} > 
             <img src='/images/tick.png' width='10' height='10' />
             <TextField fullWidth label='Pin Id'value={getPinId}  variant='standard' />
         </Grid>
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
        <Button variant="contained" color="primary" className={classes.button} onClick={()=>handleEdit()} >
          Save Record
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
              </DialogContent>
              <DialogActions>
                <Button onClick={handleClose} color="primary">
                  Cancel
                </Button>
              </DialogActions>
            </Dialog>
          </div>
        );
       }
      

    return(
        <div className={classes.root}>
        <div className={classes.tableDiv} >
       <MaterialTable style={{backgroundColor:'#ecf0f1'}}
         title="Pin Codes"
         columns={state.columns}
         data={getList}
         actions={[
           {
             icon: 'edit',
             tooltip: 'Edit',
             onClick: (event, rowData) => handleClickOpen(rowData)
           }
         ]}
         editable={{
           onRowDelete: (oldData) =>
             new Promise((resolve) => {
               setTimeout(() => {
                 resolve();
                 const data = [...getList]
                   data.splice(data.indexOf(oldData), 1);
                   setList(data)
                   handleDelete(oldData)
               }, 300);
             }),
         }}
       />
       {handleDialog()}
       </div>
       </div>
    

   )

  }

  export default DisplayAllPin;