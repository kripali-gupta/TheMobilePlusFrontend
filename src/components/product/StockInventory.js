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
import InputBase from '@material-ui/core/InputBase';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import {checkRequire} from '../Checks'
import Dialog from '@material-ui/core/Dialog';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles((theme) => ({

  
    root:{
        display:'flex',
        alignItems:'center',
        justifyContent:'center',
        marginTop:10,
    } ,
    tableDiv:{
       width:window.innerWidth*0.9,
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

function StockInventory(){
    const classes=useStyles()
    const [getList,setList]=useState([])
    
    
    const [state, setState] = useState({
        columns: [
          { title: 'Product Id', field: 'productid',editable:'never' },
          { title: 'Product Name', field: 'productname',editable:'never' },
          { title: 'Brand Name', field: 'brandname',editable:'never' },
          { title: 'Price', field: 'price',editable:'never' },
          { title: 'Offer Price', field: 'offerprice',editable:'never' },
          { title: 'Offer Type', field: 'offertype',editable:'never' },
          { title: 'Stock', field: 'stock',initialEditValue: 'initial edit value',type:'numeric'},
          { title: 'Product Picture',   field: 'picture' ,editable:'never',
           render: rowData=><div><Avatar alt="Remy Sharp" variant='rounded' src={`${ServerURL}/images/${rowData.picture}`} className={classes.avatortheme}/></div> },
          { title: 'Ad',   field: 'ad',editable:'never',
           render: rowData=><div><Avatar alt="Remy Sharp" variant='rounded' src={`${ServerURL}/images/${rowData.ad}`} className={classes.avatortheme}/></div> },
         { title: 'Ad Status',   field: 'adstatus',editable:'never'},
          { title: 'Vendor Status', field: 'vendorstatus',editable:'never' },
          
        ],  
      });
    
    const fetchData=async()=>{
    var list=await getData("product/displaystockbybrand")
    setList(list)

    }

      useEffect(function(){
          fetchData()
      },[])

    
       
    
     const handleSave=async(data)=>{
      // //console.log(getList)
     var body=data
     var result=await postData('product/updateallstock',body)
      if(!result)
       { alert("Failed To Save Data")} 
     }

      

    
     
  
 return(
    <div className={classes.root}>
        <div className={classes.tableDiv} >
       
      
       <MaterialTable style={{backgroundColor:'#ecf0f1'}}
         title="Product List"
         columns={state.columns}
         data={getList}
          options={{
            actionsColumnIndex: -1
          }}
         editable={{
               onBulkUpdate: (changes) =>
               new Promise((resolve, reject) => {
                 setTimeout(() => {
                   resolve();
                   const data=[...getList]

                   const changeData=Object.values(changes)
                    changeData.map(function(item,key){
                        //console.log(item)
                        data.splice(data.indexOf(item.oldData), 1);
                        data.push(item.newData)
                    })
                    ////console.log(data)
                    data.sort((a,b)=> a.productid -b.productid)
                    setList(data)
                    handleSave(data)
                 }, 1200);
               })
         }}
       >
      </MaterialTable>
       </div>
       </div>
     )
  

}

export default StockInventory;