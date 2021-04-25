import React,{useEffect,useState,createRef} from 'react';
import { fade, makeStyles } from '@material-ui/core/styles';
import {getData,postData, ServerURL,ImageURL}  from '../FetchNodeServices'
import Paper from '@material-ui/core/Paper';
 
const useStyles = makeStyles((theme) => ({
 
 
 divAction:{
  alignItems:'center',
  justifyContent:'center',
   display:'flex',
   width:150,
   height:160 ,
   borderRadius:12 ,
  padding:10,
  "&:hover": {
    // background: "#de011b",
    transform: 'scale(1.5)',
    transition: 'all 0.5s ease 0s',
  },
  cursor:'pointer'
 },
 
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
  
  headingName:{
    fontSize:'20px',fontWeight:"bold",
    padding:10,  borderBottom:'1px solid #bdc3c7'
  },
 
        
}));

export default function ShowCategory(props) {
  const classes = useStyles();
  const [getListAd,setListAd]=useState([])
 

  
  
  
  
  useEffect(function(){
    fetchCategoryAd()
},[])


  const fetchCategoryAd=async()=>{
    var body={}
    var list=await postData('pack/categoryfillad',body)
    setListAd(list)
    }

  
    
//Ad Categories//
  const ShowCategoryDiv=()=>{
     var colors=['#7ed6df','#f6e58d','#95afc0','#c7ecee','#7bed9f','#ffcccc','#F8EFBA','#00d8d6','#9980FA','#fab1a0','#ffeaa7','#dfe6e9',]
    return getListAd.map(function(item,key){

      return(
      <Paper elevation={0} style={{margin:10,borderRadius:5}}   onClick={()=>handleShowProduct(item.id)} > 
           <div  className={classes.divAction}  /*style={{backgroundColor: `${ colors[Math.floor(Math.random()*12)] }` ,}}*/  >
        <img width={120} height={120}   src={`${ImageURL}/images/${item.picture}`} />
           </div>
           <div style={{margin:4,fontSize:14,textAlign:'center'}} >
             {item.categoryname}
           </div>
         </Paper>
      )
  })
 }

 const handleShowProduct=(categoryid)=>{
   // var parameter={'categoryid':categoryid}
    props.history.push({pathname:`/ViewListofProducts/${categoryid}`})
   //props.changeView(1,parameter) for container
 }

  return (
      <div className={classes.scardview}>
      <Paper elevation={0} style={{width:'96%',marginTop:10}} >
      <div className={classes.headingName}>
        Shop from Top Categories
          </div>
      <div className={classes.cardview}> 
        {ShowCategoryDiv()}
        </div>
        </Paper>
      </div>
     
  );
}



