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
import Typography from '@material-ui/core/Typography';
import {checkRequire, checkMobile, checkEmail, checkPassword,checkGst,checkPhone} from '../Checks'
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';




const useStyles = makeStyles((theme) => ({
  
 root:{
     display:'flex',
     alignItems:'center',
     justifyContent:'center',
     marginTop:20,
 } ,
 tableDiv:{
    width:window.innerWidth*0.85,
 },
 avatortheme:{
  width: theme.spacing(6),
  height: theme.spacing(6),
},
main: {
  display:'flex',
  justifyContent:'center',
  alignItems:'center',
 },
 paperStyle:{
  width:window.innerWidth*0.45,
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
   width: 60,
   height: 60,
 },
input:
{
 display: 'none',

},
button: {
 margin: theme.spacing(1),
  width:220,
},
center:{
 display:'flex',
 alignItems:'center',
 justifyContent:'center',
 flexDirection:'row'
}
})
)

export default function DisplayAllOutlets() {
  const classes=useStyles()
  const [getList,setList]=useState([])
  const [getOpen,setOpen]=useState(false)
  const [getGoogleOpen,setGoogleOpen]=useState(false)
  const [getRowData,setRowData]=useState([])
  const [getFirm,setFirm]=useState('')
    const [getOwner,setOwner]=useState('')
    const [getMobile,setMobile]=useState('')
    const [getPhone,setPhone]=useState('')
    const [getRegno,setRegno]=useState('')
    const [getGst,setGst]=useState('')
    const [getAddress,setAddress]=useState('')
    const [getState,setState]=useState('')
    const [getCity,setCity]=useState('')
    const [getLocation,setLocation]=useState('')
    const [getPhoto,setPhoto]=useState({photo:'',file:''})
    const [getEmail,setEmail]=useState('')
    const [getDescription,setDescription]=useState('')
    const [getAvgprice,setAvgprice]=useState('')
    const [getRatings,setRatings]=useState('')
    const [getStatus,setStatus]=useState('')
    const [getPassword,setPassword]=useState('')
    const [getLat,setLat]=useState('')
    const [getLong,setLong]=useState('')
    const [getMsg,setMsg]=useState('')
    const [getErrFirm,setErrFirm]=useState('')
    const [getErrOwn,setErrOwn]=useState('')
    const [getErrEmail,setErrEmail]=useState('')
    const [getErrLoc,setErrLoc]=useState('')
    const [getErrLat,setErrLat]=useState('')
    const [getErrLong,setErrLong]=useState('')
    const [getErrMob,setErrMob]=useState('')
    const [getErrPhone,setErrPhone]=useState('')
    const [getErrDes,setErrDes]=useState('')
    const [getErrAddress,setErrAddress]=useState('')
    const [getErrState,setErrState]=useState('')
    const [getErrCity,setErrCity]=useState('')
    const [getErrStatus,setErrStatus]=useState('')
    const [getErrReg,setErrReg]=useState('')
    const [getErrGst,setErrGst]=useState('')
    const [getErrRate,setErrRate]=useState('')
    const [getErrPhoto,setErrPhoto]=useState('')
    const [getErrPass,setErrPass]=useState('')
    const [getErrAvg,setErrAvg]=useState('')
    const [getStateList,setStateList]=useState([])
    const [getCityList,setCityList]=useState([])
   /*
http://maps.google.com/maps?z=12&t=m&q=<lat>,<lng>
z is the zoom level (1-21)
t is the map type ("m" map, "k" satellite, "h" hybrid, "p" terrain, "e" GoogleEarth)
q is the search query
    */

    const [state, setstate] = useState({
    columns: [
      { title: 'Id', field: 'outletid' },
      { title: 'Firm Name', field: 'firmname' },
      { title: 'Owner Name', field: 'ownername' },
      {title:'Address',render:rowData=><div>{rowData.address}<br/>{rowData.cityname},{rowData.statename}</div>},
      { title: 'Contact Details', render:rowData=><div>{rowData.mobile}<br/>{rowData.emailid}</div> },
      { title: 'State',   field: 'statename'},
      { title: 'City',   field: 'cityname'},
      { title: 'Photograph',   field: 'photograph',
      render: rowData =><div><Avatar alt="Remy Sharp" variant='rounded' src={`${ServerURL}/images/${rowData.photograph}`} className={classes.avatortheme}/></div> },
      { title: 'Geo-location',  render:rowData=> <div>
        <a  href={`http://maps.google.com/maps?z=6&t=m&q=${rowData.lat},${rowData.lng}`} target='mw' >
        <div><Button onClick={()=>handleMap()}>See Location</Button></div>
       </a></div>},
      { title: 'Status',   field: 'status'},

    ],  
  });
  
  const handleMap=()=>{
    setGoogleOpen(true)
  }

  const GoogleMap=()=>{
    return(
      <div >
     <Dialog open={getGoogleOpen} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Geo-Location</DialogTitle>
        <DialogContent>
          <DialogContentText>
            <iframe  name='mw' width='500' height='500'></iframe>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </div>
    )
  }
  const fetchData=async()=>{
    var list =await getData('outlet/displayall')
    setList(list)
}

 useEffect(function(){
    fetchData()
    fetchStates()
},[])

const fetchStates=async()=>{
  var list=await getData('statecity/displayall')
  setStateList(list)
}

const fillStates=()=>{
return getStateList.map(function(item,key){
  return (
      <MenuItem  value={item.stateid}>
       {item.statename}
      </MenuItem>
  )
})

}

const handleState=(event)=>{
 var stateid=event.target.value
 setState(stateid)
 fetchCity(stateid)
}

const fetchCity=async(stateid)=>{
   var body={'stateid':stateid}
   var list=await postData('statecity/displaybyid',body)
   //console.log(list)
   setCityList(list)
   }

const fillCities=()=>{
       return getCityList.map(function(item,key){
         return (
             <MenuItem  value={item.cityid}>
              {item.cityname}
             </MenuItem>
         )
       })
}

const handleDelete=async(oldData)=>{
  var body={outletid:oldData.outletid}
  var result=await postData('outlet/deleteRecord',body)
}

const handleClickOpen = (rowData) => {
fetchCity(rowData.state)
 setOpen(true);
 setRowData(rowData)
 setFirm(rowData.firmname)
 setOwner(rowData.ownername)
 setMobile(rowData.mobile)
 setPhone(rowData.phone)
 setRegno(rowData.registrationno)
 setGst(rowData.gstno)
 setAddress(rowData.address)
 setState(rowData.state)
 //console.log(rowData.state,rowData.city)
 setCity(rowData.city)
 setLocation(rowData.location)
 setPhoto({photo:'',file:`${ServerURL}/images/${rowData.photograph}`})
 setEmail(rowData.emailid)
 setDescription(rowData.description)
 setAvgprice(rowData.averageprice)
 setRatings(rowData.ratings)
 setStatus(rowData.status)
 setPassword(rowData.password)
 setLat(rowData.lat)
 setLong(rowData.lng)
};

const handleClose = () => {
 setOpen(false);
 setGoogleOpen(false);
 setMsg('')
 setErrFirm('')
          setErrOwn('')
          setErrMob('')
          setErrPhone('')
          setErrRate('')
          setErrPhoto('')
          setErrGst('')
          setErrLoc('')
          setErrLat('')
          setErrLong('')
          setErrPass('')
          setErrStatus('')
          setErrState('')
          setErrCity('')
          setErrEmail('')
          setErrRate('')
          setErrDes('')
          setErrAddress('')
          setErrReg('')
          setErrAvg('')
 fetchData()
};

const handleEdit=async()=>{
  var err=false
  if(!checkRequire(getFirm))
  {  err=true
     setErrFirm('/images/cross.png')}
  if(checkRequire(getFirm)){
    setErrFirm('/images/tick.png')
  }

  if(!checkRequire(getOwner))
  {  err=true
    setErrOwn('/images/cross.png')}
  if(checkRequire(getOwner)){
    setErrOwn('/images/tick.png')
  }

  if(!checkMobile(getMobile))
  {err=true
   setErrMob('/images/cross.png')}
  if(checkMobile(getMobile)){
    setErrMob('/images/tick.png')
  }
  
  if(!checkPhone(getPhone))
  {err=true
   setErrPhone('/images/cross.png')}
  if(checkPhone(getPhone)){
    setErrPhone('/images/tick.png')
  }

  if(!checkRequire(getRegno))
  {err=true
   setErrReg('/images/cross.png')}
  if(checkRequire(getRegno)){
    setErrReg('/images/tick.png')
  }
  
  if(!checkGst(getGst))
  { err=true
   setErrGst('/images/cross.png')}
  if(checkGst(getGst)){
    setErrGst('/images/tick.png')
  }
  
  if(!checkRequire(getAddress))
  {err=true
   setErrAddress('/images/cross.png')}
  if(checkRequire(getAddress)){
    setErrAddress('/images/tick.png')
  }
  
  if(!checkRequire(getState))
  { err=true
   setErrState('/images/cross.png')}
  if(checkRequire(getState)){
    setErrState('/images/tick.png')
  }
  
  if(!checkRequire(getStatus))
  {err=true
   setErrStatus('/images/cross.png')}
  if(checkRequire(getStatus)){
    setErrStatus('/images/tick.png')
  }
  
  if(!checkRequire(getCity))
  {err=true
    setErrCity('/images/cross.png')}
  if(checkRequire(getCity)){
    setErrCity('/images/tick.png')
  }
  
  if(!checkRequire(getLocation))
  {err=true
   setErrLoc('/images/cross.png')}
  if(checkRequire(getLocation)){
    setErrLoc('/images/tick.png')
  }
  
  if(!checkRequire(getLat))
  {err=true
   setErrLat('/images/cross.png')}
  if(checkRequire(getLat)){
    setErrLat('/images/tick.png')
  }
  
  if(!checkRequire(getLong))
  {err=true
   setErrLong('/images/cross.png')}
  if(checkRequire(getLong)){
    setErrLong('/images/tick.png')
  }

  if(!checkEmail(getEmail))
  {err=true
   setErrEmail('/images/cross.png')}
  if(checkEmail(getEmail)){
    setErrEmail('/images/tick.png')
  }
  
  if(!checkRequire(getDescription))
  {err=true
   setErrDes('/images/cross.png')}
  if(checkRequire(getDescription)){
    setErrDes('/images/tick.png')
  }
  
  if(!checkRequire(getAvgprice))
  {err=true
   setErrAvg('/images/cross.png')}
  if(checkRequire(getAvgprice)){
    setErrAvg('/images/tick.png')
  }
  
  if(!checkRequire(getRatings))
  {err=true
   setErrRate('/images/cross.png')}
  if(checkRequire(getRatings)){
    setErrRate('/images/tick.png')
  }
  
  if(!checkPassword(getPassword))
  {err=true
   setErrPass('/images/cross.png')}
  if(checkPassword(getPassword)){
    setErrPass('/images/tick.png')
  }
  if(!err)
  { 
    var formData=new FormData() 
    formData.append('firmname',getFirm)
    formData.append('ownername',getOwner)
    formData.append('mobile',getMobile)
    formData.append('phone',getPhone)
    formData.append('regno',getRegno)
    formData.append('address',getAddress)
    formData.append('state',getState)
    formData.append('city',getCity)
    formData.append('gstno',getGst)
    formData.append('location',getLocation)
    formData.append('photo',getPhoto.photo)
    formData.append('emailid',getEmail)
    formData.append('description',getDescription)
    formData.append('averageprice',getAvgprice)
    formData.append('ratings',getRatings)
    formData.append('status',getStatus)
    formData.append('password',getPassword)
    formData.append('lat',getLat)
    formData.append('lng',getLong)
    formData.append('outletid',getRowData.outletid)
    var config={headers:{'content-type':'multipart/form-data'}}
    var result=await postDataAndImage('outlet/updateRecord',formData,config)
    //console.log(result)
    if(result){
      setMsg("Record Edited..")
      }
     else{
      setMsg("Fail To Edit Record...")
     } 

  }
  else{
    setMsg('Error in Input')
  }
}
const handleDialog=()=>{
  return (
    <div>
      <Dialog fullScreen open={getOpen} onClose={handleClose} style={{display:'flex',alignItems:'center',justifyContent:'center',width:window.innerWidth}}>
         <Toolbar>
            <IconButton edge="start" color="inherit" onClick={handleClose} aria-label="close">
              <CloseIcon />
            </IconButton>
            <Typography variant="h6" className={classes.title}>
              Outlet [Edit Record]
            </Typography>
            </Toolbar>
            <div className={classes.main}>
        <Paper className={classes.paperStyle}>
        <Grid container spacing={1}>
        <Grid item xs={12} className={classes.subclass}>
         <img src='/images/tick.png' width='10' height='10' />
         <TextField fullWidth label='Outlet Id' value={getRowData.outletid} variant='standard'  /> 
         </Grid>
         <Grid item xs={6} className={classes.subclass}>
         <img src={getErrFirm} width='10' height='10' />
         <TextField fullWidth label='Firm Name' value={getFirm} variant='standard' onChange={(event)=>setFirm(event.target.value)} /> 
         </Grid>
         <Grid item xs={6} className={classes.subclass}>
         <img src={getErrOwn} width='10' height='10' />
         <TextField fullWidth label='Owner Name' value={getOwner} variant='standard'onChange={(event)=>setOwner(event.target.value)} /> 
         </Grid>
         <Grid item xs={6} className={classes.subclass}>
         <img src={getErrMob} width='10' height='10' />
         <TextField fullWidth label='Mobile No' value={getMobile} variant='standard' onChange={(event)=>setMobile(event.target.value)} /> 
         </Grid>
         <Grid item xs={6} className={classes.subclass}>
         <img src={getErrPhone} width='10' height='10' />
         <TextField fullWidth label='Phone-no' value={getPhone} variant='standard'  onChange={(event)=>setPhone(event.target.value)} /> 
         </Grid>
         <Grid item xs={6} className={classes.subclass}>
         <img src={getErrEmail} width='10' height='10' />
         <TextField fullWidth label='Email-Id' value={getEmail} variant='standard'  onChange={(event)=>setEmail(event.target.value)}/> 
         </Grid>
         <Grid item xs={6} className={classes.subclass}>
         <img src={getErrPass} width='10' height='10' />
         <TextField fullWidth type='password' label='Password' value={getPassword} variant='standard'  onChange={(event)=>setPassword(event.target.value)}/> 
         </Grid>
         <Grid item xs={6} className={classes.subclass}>
         <img src={getErrReg} width='10' height='10' />
         <TextField fullWidth label='Registration No' value={getRegno} variant='standard' onChange={(event)=>setRegno(event.target.value)} /> 
         </Grid>
         <Grid item xs={6} className={classes.subclass}>
         <img src={getErrGst} width='10' height='10' />
         <TextField fullWidth label='GST No' value={getGst} variant='standard' onChange={(event)=>setGst(event.target.value)}/> 
         </Grid>
         <Grid item xs={6} className={classes.subclass}>
         <img src={getErrState} width='10' height='10' />
         <FormControl fullWidth >
        <InputLabel id="demo-simple-select-label">State</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={getState}
          onChange={(event)=>handleState(event)}
        ><MenuItem value="">Select State</MenuItem>
          {fillStates()}
        </Select>
      </FormControl>
         </Grid>
         <Grid item xs={6} className={classes.subclass}>
         <img src={getErrCity} width='10' height='10' />
         <FormControl fullWidth >
        <InputLabel id="demo-simple-select-label">City</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={getCity}
          onChange={(event)=>setCity(event.target.value)}
        > 
         <MenuItem value="">Select City</MenuItem>
          {fillCities()}
        </Select>
      </FormControl>
         </Grid>
         <Grid item xs={12} className={classes.subclass}>
         <img src={getErrAddress} width='10' height='10' />
         <TextField fullWidth label='Address'value={getAddress}  variant='standard' onChange={(event)=>setAddress(event.target.value)} /> 
         </Grid>
         <Grid item xs={4} className={classes.subclass}>
         <img src={getErrLoc} width='10' height='10' />
         <TextField fullWidth label='Location' value={getLocation} variant='standard' onChange={(event)=>setLocation(event.target.value)}/> 
         </Grid>
         <Grid item xs={4} className={classes.subclass}>
         <img src={getErrLat} width='10' height='10' />
         <TextField fullWidth label='Latitude' value={getLat} variant='standard'  onChange={(event)=>setLat(event.target.value)}/> 
         </Grid>
         <Grid item xs={4} className={classes.subclass}>
         <img src={getErrLong} width='10' height='10' />
         <TextField fullWidth label='Longitude' value={getLong} variant='standard' onChange={(event)=>setLong(event.target.value)}/> 
         </Grid>
         <Grid item xs={12} className={classes.subclass}>
         <img src={getErrDes} width='10' height='10' />
         <TextField fullWidth label='Description' value={getDescription} variant='standard' onChange={(event)=>setDescription(event.target.value)}/> 
         </Grid>
         <Grid item xs={6} className={classes.subclass}>
         <img src={getErrAvg} width='10' height='10' />
         <TextField fullWidth label='Average Price' value={getAvgprice} variant='standard' onChange={(event)=>setAvgprice(event.target.value)}/> 
         </Grid>
         <Grid item xs={6} className={classes.subclass}>
         <img src={getErrRate} width='10' height='10' />
         <TextField fullWidth label='Ratings' value={getRatings} variant='standard' onChange={(event)=>setRatings(event.target.value)}/> 
         </Grid>
         <Grid item xs={6} className={classes.center} >
         <img src={getErrPhoto} width='10' height='10' />
         <Avatar alt="Remy Sharp" variant='rounded' src={getPhoto.file} className={classes.avatortheme}/>
        </Grid>
        <Grid item xs={6} className={classes.center}>
         <input
        accept="image/*"
        className={classes.input}
        id="contained-button-file"
        multiple
        type="file"
        onChange={(event)=>setPhoto({photo:event.target.files[0],file:URL.createObjectURL(event.target.files[0])})}
       />
       <label htmlFor="contained-button-file">
        <Button variant="contained" color="primary"   className={classes.button} startIcon={<CloudUploadIcon />} component="span">
          Upload Photo
        </Button>
        </label>
         </Grid>
         <Grid item xs={12} className={classes.subclass}>
         <img src={getErrStatus} width='10' height='10' />
         <div> Status :</div>
       <Radio
        checked={getStatus === 'Active'}
        onChange={(event)=>setStatus(event.target.value)}
        value="Active"
        name="radio-button-demo"
        //inputProps={{ 'aria-label': 'A' }}
      />Active
      <Radio
        checked={getStatus === 'Deactive'}
        onChange={(event)=>setStatus(event.target.value)}
        value="Deactive"
        name="radio-button-demo"
        //inputProps={{ 'aria-label': 'B' }}
      />Deactivate
        </Grid>
        <Grid item xs={6} className={classes.center}>
        <Button variant="contained" color="primary" className={classes.button} onClick={()=>handleEdit()} > 
          Save Record
         </Button>
        </Grid>
        <Grid item xs={12} className={classes.subclass}>
          <div><b>Message : {getMsg}</b>
          </div>
        </Grid>
        </Grid>
        </Paper>
   </div>

        
      </Dialog>
    </div>
  );
 }
  return (
      <div className={classes.root}>
     <div className={classes.tableDiv} >
    <MaterialTable style={{backgroundColor:'#ecf0f1'}}
      title="Vendor Outlets List"
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
            }, 600);
          }),
      }}
    />
    {handleDialog()}
    {GoogleMap()}
    </div>
    </div>
  );
}