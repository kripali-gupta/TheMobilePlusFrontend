import React,{useEffect,useState} from 'react';
import { fade, makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Header from './Header';
import Footer from './Footer';
import Accordion from '@material-ui/core/Accordion';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { getData,ImageURL, postData,postDataAndImage } from '../FetchNodeServices';
import { Divider, Grid } from '@material-ui/core';
import Image from 'react-image-resizer'

const useStyles = makeStyles((theme) => ({
    root: {
        width: window.innerWidth*0.95,
        display:'flex',
        alignItems:'center',
        justifyContent:'center',
        margin:3
      },
      heading: {
        fontSize: theme.typography.pxToRem(15),
        flexBasis: '33.33%',
        flexShrink: 0,
      },
      secondaryHeading: {
        fontSize: theme.typography.pxToRem(15),
        color: theme.palette.text.secondary,
      },
    center:{
      display:'flex',
        alignItems:'center',
        justifyContent:'center',
    }
}));

export default function ShopByCategory(props) {
    const classes = useStyles();

  const [expanded, setExpanded] = React.useState(false);
  const [getAllCategoryList, setAllCategoryList] = useState([]);
  const [getListBrand, setListBrand] = useState([]);
  const [getListModel, setListModel] = useState([]);
  
  const handleCategory = async(categoryid) => {
      
    let body={'categoryid':categoryid}
    fetchDataBrand(categoryid)
    
  };

  const handleChange = (categoryid) => (event, isExpanded) => {
    setExpanded(isExpanded ? categoryid : false);
    handleCategory(categoryid)
    
  };
  
   const fetchDataBrand=async(categoryid)=>{
    let body={'categoryid':categoryid}
    let list=await postData('brand/brandfill',body)
    setListBrand(list) 
  }

  const fetchAllCategory=async()=>{
    let list=await getData('pack/category')
    setAllCategoryList(list)
  }

  useEffect(function(){   
   fetchAllCategory()
   window.scrollTo(0,0)
  },[])
 
  
  const showCategory=()=>{
    return(        
      getAllCategoryList.map((item,key)=>{
  
  return(
    <div className={classes.root}>
    <Accordion expanded={expanded === item.id} style={{margin:5}} onChange={handleChange(item.id)}>
    <AccordionSummary
      expandIcon={<ExpandMoreIcon />}
      aria-controls="panel1bh-content"
      id="panel1bh-header"
    >
      <Typography className={classes.heading}><div style={{width:60,height:60}}>
        <Image src={`${ImageURL}/images/${item.picture}`} width={60} height={60} /></div></Typography>
     <div className={classes.center}> <h3>{item.categoryname}</h3></div>
      
    </AccordionSummary>    
    
    <AccordionDetails style={{width:window.innerWidth*0.62}}>
      <Divider/>
      <Grid container spacing={0}>   
      {getListBrand.length==0?<div></div>:getListBrand.map(function(item,key){
 return(   
    <>
    <Grid item xs={12} style={{padding:3,marginTop:10,marginBottom:10}}>
       <Divider/>
     </Grid>
     <Grid item xs={12} sm={4} style={{cursor:'pointer'}} onClick={()=>handleProductBrand(item.brandid)} >
     <div style={{width:70,height:60}}><Image src={`${ImageURL}/images/${item.picture}`} width={70} height={60} /></div>
     </Grid>
     <Grid item xs={12} sm={8}  style={{display:'flex',alignItems:'center',paddingTop:5,cursor:'pointer'}}onClick={()=>handleProductBrand(item.brandid)}>
      <div >{item.brandname}</div>
     </Grid>
     
     </>
  )
})}
       </Grid>
    </AccordionDetails>
  </Accordion>
  </div>    
  )
      })
    )}


    const handleProductBrand=(brandid)=>{
        props.history.push({pathname:`/ViewListofBrandProducts/${brandid}`})
      }


    
    return (
        <div>
            <Header history={props.history}/>
            <div style={{display:'flex',justifyContent:'center',alignItems:'center'}}>
            <div sstyle={{width:window.innerWidth*0.8,margin:20,}}>
                {showCategory()}
                      </div>
            </div>
            <Footer history={props.history}/>      
    </div>
  );
}