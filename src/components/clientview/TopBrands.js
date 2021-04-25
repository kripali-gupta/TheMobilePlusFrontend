import React,{useEffect,useState,createRef} from 'react';
import { fade, makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import { IconButton, TextField } from '@material-ui/core';
import {getData,postData, ServerURL,ImageURL}  from '../FetchNodeServices'
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import Slider from "react-slick";
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Avatar from '@material-ui/core/Avatar';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import {Carousel } from "react-responsive-carousel"
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import GridList from '@material-ui/core/GridList'
import Paper from '@material-ui/core/Paper';
import GridListTile from '@material-ui/core/GridListTile';
import Grid from '@material-ui/core/Grid';
import {useSelector,useDispatch}  from 'react-redux';
import QtyCtrl from './QtyCtrl'
import {blue } from '@material-ui/core/colors';
import Footer from './Footer'
import Header from './Header'
import Image from 'react-image-resizer'
import KeyboardArrowLeftIcon from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@material-ui/icons/KeyboardArrowRight';
import ShoppingCart from '@material-ui/icons/ShoppingCart';

 
const useStyles = makeStyles((theme) => ({
 
 
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

export default function TopBrands(props) {
  const classes = useStyles();
  const [getTopBrands,setTopBrands]=useState([])
 
 
  
  useEffect(function(){
    fetchTopBrands()
},[])

 const fetchTopBrands=async()=>{
          var list=await getData('brand/brandfilltop')
          setTopBrands(list)
          }
  
const TopBrands=()=>{
  return(
         
    getTopBrands.map((item,key)=>{

return(
 <div  className={classes.scardview} style={{width:180,height:180,padding:5}}>
<Paper className={classes.scardview} elevation={2} style={{margin:10}} onClick={()=>handleProductBrand(item.brandid)} >
<div  style={{width:150,height:150,padding:10}}>
 <Image src={`${ImageURL}/images/${item.picture}`} width={150} height={150} />
</div>
</Paper>
</div>
)
}))

  }

  const handleProductBrand=(brandid)=>{
    props.history.push({pathname:`/ViewListofBrandProducts/${brandid}`})
  }


var topbrandRef=createRef()

  const settings = {
    autoplay:true,
    infinite: true,
    arrows:false,
    speed: 300,
    slidesToShow: 5,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 4,

        }
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,

        }
      },
      {
        breakpoint: 700,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2
        }
      },
      {
        breakpoint: 500,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
      // You can unslick at a given breakpoint now by adding:
      // settings: "unslick"
      // ssinstead of a settings object
    ]
  
  };

 
  
  

    const gotoNextbrand = () => {
      topbrandRef.current.slickNext()
      }
      const gotoPrevbrand = () => {
        topbrandRef.current.slickPrev()
      }  
 
  return (
    
    <div className={classes.scardview}>
    <Paper elevation={0} style={{width:'96%',marginTop:10,padddingBottom:10}} >
    <div className={classes.headingName}>
      Top Brands
    </div>
    <div>
    <div className={classes.scardview} >
    <div>
        <IconButton onClick={()=>gotoPrevbrand()}>
         <KeyboardArrowLeftIcon style={{fontSize:'large'}}/>
        </IconButton>
        </div>
    <div style={{width:'90%', }}>  
    <Slider  {...settings} ref={topbrandRef} > 
   
    {TopBrands()}
        
   </Slider>
   </div>
   <div>
      <IconButton onClick={()=>gotoNextbrand()}>
         <KeyboardArrowRightIcon style={{fontSize:'large'}} />
        </IconButton>
      </div>
   </div>

    </div>
   </Paper>
    </div>
      );
}



