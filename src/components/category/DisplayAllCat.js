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
import {checkRequire} from '../Checks'
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
     marginTop:30,
 } ,
 tableDiv:{
    width:window.innerWidth*0.5,
 },
 avatortheme:{
  width:50,
  height:50,
},
main:{
  display:'flex',
  alignItems:'center',
  justifyContent:'center',
} ,
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
})
)

export default function DisplayAllCat() {
  const classes=useStyles()
  const [getList,setList]=useState([])
  const [getOpen,setOpen]=useState(false)
  const [getRowData,setRowData]=useState([])
  const [getAdStatus,setAdStatus]=useState('')
  const [getIcon,setIcon]=useState({icon:'',fileIcon:''})
  const [getAd,setAd]=useState({ad:'',fileAd:''})
  const [getCategoryId,setCategoryId]=useState('')
  const [getCategoryName,setCategoryName]=useState('')
  const [getDescription,setDescription]=useState('')
  const [getMsg,setMsg]=useState('')
  const [getErrCn,setErrCn]=useState('')
  const [getErrDes,setErrDes]=useState('')
  const [getErrIcon,setErrIcon]=useState('')
  const [getErrAd,setErrAd]=useState('')
  const [getErrAdstatus,setErrAdstatus]=useState('')
  const [state, setState] = useState({
    columns: [
      { title: 'Id', field: 'categoryid' },
      { title: 'Name', field: 'categoryname' },
      { title: 'Description', field: 'description' },
      { title: 'Icon',   field: 'icon' ,
       render: rowData=><div><Avatar alt="Remy Sharp" variant='rounded' src={`${ServerURL}/images/${rowData.icon}`} className={classes.avatortheme}/></div> },
      { title: 'Ad',   field: 'ad',
      render: rowData=><div><Avatar alt="Remy Sharp" variant='rounded' src={`${ServerURL}/images/${rowData.ad}`} className={classes.avatortheme}/></div> },
      { title: 'Ad Status',   field: 'adstatus'},
    ],  
  });
  
  const fetchData=async()=>{
    var list =await getData('category/displayall')
    setList(list)
}

 useEffect(function(){
    fetchData()
},[])

 const handleDelete=async(oldData)=>{
   var body={categoryid:oldData.categoryid}
   var result=await postData('category/deleteRecord',body)
 }

 const  handleEdit=async()=>{
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
 ////console.log(getIcon.icon)
 formData.append('ad',getAd.ad)
 formData.append('adstatus',getAdStatus)
 formData.append('categoryid',getCategoryId)
 var config={headers:{'content-type':'multipart/form-data'}}
 var result=await postDataAndImage('category/updateRecord',formData,config)

 if(result){
  setMsg("Record Edited..")
  }
 else{
  setMsg("Fail To Edit Record...")
 } 
}
else{
setMsg("Error in Input")
}
}
const handleAd=(event)=>{
  setAd({ad:event.target.files[0],fileAd:URL.createObjectURL(event.target.files[0])})
 }
 
 const handleIcon=(event)=>{
   setIcon({icon:event.target.files[0],fileIcon:URL.createObjectURL(event.target.files[0])})
  }

 const handleClickOpen = async(rowData) => {
  setOpen(true);
  setRowData(rowData)
  setCategoryId(rowData.categoryid)
  setCategoryName(rowData.categoryname)
  setDescription(rowData.description)
  setAdStatus(rowData.adstatus)
  setIcon({icon:'',fileIcon:`${ServerURL}/images/${rowData.icon}`})
  setAd({ad:'',fileAd:`${ServerURL}/images/${rowData.ad}`})
  
};


const handleClose = () => {
  setOpen(false);
  setErrAdstatus('')
    setErrDes('')
    setErrIcon('')
    setErrCn('')
    setErrAd('')
    setMsg('')
  fetchData()
};



 const handleDialog=()=>{
  return (
    <div>
      <Dialog open={getOpen} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Category Register [Edit Record] </DialogTitle>
        <DialogContent>
          <DialogContentText>
          <div className={classes.center}>
 <Paper className={classes.paperStyle}>
  
     <Grid container spacing={1}>
     <Grid item xs={12} className={classes.subclass} > 
        <img src='/images/tick.png' width='10' height='10' />
            <TextField fullWidth label='Category Id' value={getRowData.categoryid} variant='standard' />
         </Grid>
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
        <Button variant="contained" color="primary" className={classes.button} onClick={()=>handleEdit()}>
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
          </DialogContentText>
          
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
  return (
      <div className={classes.root}>
     <div className={classes.tableDiv} >
    <MaterialTable style={{backgroundColor:'#ecf0f1'}}
      title="Category List"
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
    </div>
    </div>
  );
}