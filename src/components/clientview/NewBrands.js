import React,{useEffect,useState,createRef} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {getData,postData, ServerURL,ImageURL}  from '../FetchNodeServices'
import GridList from '@material-ui/core/GridList'
import Paper from '@material-ui/core/Paper';
import GridListTile from '@material-ui/core/GridListTile';
import Grid from '@material-ui/core/Grid';
import Image from 'react-image-resizer'

 
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
    cursor:'pointer'
  },   
 
  headingName:{
    fontSize:'20px',fontWeight:"bold",
    padding:10,  borderBottom:'1px solid #bdc3c7'
  },
  lroot: {
    display: 'flex',
    flexWrap: 'wrap',
    //justifyContent: 'space-around',
    alignItems:'center',
    //overflow: 'hidden',
  },
  gridList: {
    width: '100%',
    height: '100%',
  },
  
  
}));

export default function NewBrands(props) {
  const classes = useStyles();
  const [getNewBrands,setNewBrands]=useState([])
 
  
  useEffect(function(){
    fetchNewBrands()
},[])


   const fetchNewBrands=async()=>{
           var body={}
            var list=await postData('brand/brandfillnew',body)
            setNewBrands(list)
       }
 
 
  const handleProductBrand=(brandid)=>{
    props.history.push({pathname:`/ViewListofBrandProducts/${brandid}`})
  }

  /*const NewBrands=()=>{
    return(
      <div className={classes.lroot} >
            <GridList cellHeight={200} cellWidth={200} style={{display:'flex',flexWrap:'wrap'}} className={classes.gridList} cols={4} >
              {getNewBrands.map((item) => (
                <GridListTile key={item.brandname} style={{border:'1px solid',boxShadow :'20px 5px 5px #ecf0f1', }} >
                  <img style={{width:'100%',height:'100%' }} src={`${ImageURL}/images/${item.picture}`} alt={item.brandname} />
                </GridListTile>
              ))}
            </GridList>
          </div>
        )
  }
 */

  const NewBrands=()=>{
    return(
      <div  style={{padding:10}}>
      <Grid container spacing={2} >
        { getNewBrands.map((item)=>(
           <>
            <Grid item xs={12} sm={3} className={classes.scardview} style={{boxShadow :'2px 2px 2px #f1f2f6',}}  >
               <div style={{width:120,height:120,padding:5,}} onClick={()=>handleProductBrand(item.brandid)} >
               <img  style={{width:'100%',height:'100%'}}  alt={item.brand} src={`${ImageURL}/images/${item.picture}`} />
               </div>
            </Grid>
            </>
    ))}
      </Grid>
      </div>
      )
  }
 
  return (
    
      <div className={classes.scardview}>
      <Paper elevation={0} style={{width:'96%',marginTop:10,paddingBottom:10}} >
      <div className={classes.headingName}>
        New Brands
      </div>
      <div style={{padding:5}}  >
        {NewBrands()}
       </div> 
       </Paper>
      </div>
      
  );
}



