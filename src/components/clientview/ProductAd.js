import React,{useEffect,useState,createRef} from 'react';
import { fade, makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import GridList from '@material-ui/core/GridList'
import {getData,postData,ImageURL}  from '../FetchNodeServices'
import GridListTile from '@material-ui/core/GridListTile';
import Grid from '@material-ui/core/Grid';

 
const useStyles = makeStyles((theme) => ({
 
 
  cardview:{
    display: 'flex',
    flexDirection:'row',
    flexWrap:'wrap',
    alignItems:'center',
    justifyContent:'center'
    
  },
  scardview:{
    display:'flex',
    alignItems:'center',
    justifyContent:'center',
    outline:'none',
  },   
  
 
  
  lroot: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    alignItems:'center',
    overflow: 'hidden',
  },
  gridList: {
    width: '100%',
    height: '100%',
  },
  hover:{
    "&:hover": {
      // background: "#de011b",
      transform: 'scale(1.04)',
      transition: 'all 0.5s ease 0s',
    },
    cursor:'pointer'
  }
          
}));

export default function ProductAd(props) {
  const classes = useStyles()
  
  const [getAdBrands,setAdBrands]=useState([])
  
 
  
  useEffect(function(){
    fetchAdBrands() 
},[])


  
   const fetchAdBrands=async()=>{
     let result=await  getData('productads/displayjson')
     if(result.data.length!=0)   
        { setAdBrands(result.data)
     }
     else{
      //console.log("error",result) 
     }
     var url="productads/displayjson"
    /*try{
      const response=await fetch(`${ImageURL}/${url}`)
      const result=await response.json()
      if(result=='Session has Expired Please Login Again')
      {   alert('Session has Expired Please Login Again')}
      else{
      ////console.log("Result-",result)
      
      setAdBrands(result.data)
      }
 }
 catch(e){
     return null
 }*/
}

const handleShowProductView=(productid)=>{
   props.history.push({pathname:`/ProductView/${productid}`})
}

const AdBrandGridList=()=>{
  return(
<div >
      <Grid container spacing={3}  >
        {getAdBrands.map((item) => (
          <Grid item xs={12} sm={4}  onClick={()=>handleShowProductView(item.productitemid)} >
            <img style={{width:'100%',height:'100%',borderRadius:5}} className={classes.hover} src={`${ImageURL}/images/${item.bannerpicture}`} alt={item.brandname} />
          </Grid>
        ))}
      </Grid>
    </div>
  )
}

  return (
   
      <div className={classes.scardview}>
      <div style={{width:'96%',marginTop:10,padding:'5px 10px'}} >
        <div>
        {AdBrandGridList()}
       </div>
       </div>
      </div>
      
  );
}



