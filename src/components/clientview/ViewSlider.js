import React,{useEffect,useState,createRef} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { IconButton, TextField } from '@material-ui/core';
import {getData,postData, ServerURL,ImageURL}  from '../FetchNodeServices'
import Slider from "react-slick";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import {Carousel } from "react-responsive-carousel"
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";


 


export default function ViewSlider(props) {
  const [getProductBanner,setProductBanner]=useState([])

  
  
  
  
  useEffect(function(){
    fetchProductBanner()
},[])


 
 const fetchProductBanner=async()=>{
        var list=await getData('productbanner/displayjson')
        setProductBanner(list.data)
        }



  const viewSlider=()=>{
    
      //onChange={onChange} onClickItem={onClickItem} onClickThumb={onClickThumb}
        return getProductBanner.map(function(item,key){

          return(
            <div style={{height:320,cursor:'pointer'}} onClick={()=>handleShowProductView(item.productitemid)}>
              <img style={{ width:'100%', height:'100%',cursor:'pointer'}} src={`${ImageURL}/images/${item.bannerpicture}`}/>
          </div>
          )
        })
      } 

const handleShowProductView=(productid)=>{
  props.history.push({pathname:`/ProductView/${productid}`})
}
 
  
  
  return (
       <div  >
      <Carousel showArrows={true} showThumbs={false} autoPlay={true}>
          {viewSlider()}
      </Carousel>
      </div>
  );
}



