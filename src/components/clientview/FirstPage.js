import React, { useEffect, useState, createRef } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { IconButton, TextField } from '@material-ui/core';
import { getData, postData, ServerURL, ImageURL } from '../FetchNodeServices'
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Paper from '@material-ui/core/Paper';
import Footer from './Footer'
import Header from './Header'
import Image from 'react-image-resizer'
import KeyboardArrowLeftIcon from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@material-ui/icons/KeyboardArrowRight';
import ViewSlider from './ViewSlider'
import ShowCategory from './ShowCategory'
import TopProducts from './TopProducts'
import ProductAd from './ProductAd'
import NewBrands from './NewBrands'
import Dealsoftheday from './Dealsoftheday'


const useStyles = makeStyles((theme) => ({


  scardview: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    outline: 'none',
  },


  headingName: {
    fontSize: '20px', fontWeight: "bold",
    padding: 10, borderBottom: '1px solid #bdc3c7'
  },



}));

export default function FirstPage(props) {
  const classes = useStyles();
  const [getTopBrands, setTopBrands] = useState([])
  const width = window.innerWidth

  useEffect(function () {
    fetchTopBrands()
    window.scrollTo(0, 0)
  }, [])


  const fetchTopBrands = async () => {
    var body = {}
    var list = await postData('brand/brandfilltop', body)
    setTopBrands(list)
  }

  const TopBrands = () => {
    return (

      getTopBrands.map((item, key) => {

        return (
          <div className={classes.scardview} style={{ width: 180, height: 180, padding: 5 }}>
            <Paper className={classes.scardview} elevation={2} style={{ margin: 10 }} onClick={() => handleProductBrand(item.brandid)} >
              <div style={{ width: 150, height: 150, padding: 10, cursor: 'pointer' }}>
                <Image src={`${ImageURL}/images/${item.picture}`} width={150} height={150} />
              </div>
            </Paper>
          </div>
        )
      }))

  }

  const handleProductBrand = (brandid) => {
    props.history.push({ pathname: `/ViewListofBrandProducts/${brandid}` })
  }


  var topbrandRef = createRef()

  const settings = {
    autoplay: true,
    infinite: true,
    arrows: false,
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
    <div style={{ backgroundColor: '#FFF', }} >
      <Header history={props.history} />
      <ViewSlider history={props.history} />
      <ShowCategory history={props.history} />
      <Dealsoftheday  history={props.history} />
      <ProductAd history={props.history} />
      <TopProducts history={props.history} />
      <div className={classes.scardview}>
        <Paper elevation={0} style={{ width: '96%', margin: '10px 5px', paddding: '5px 5px 20px' }} >
          <div className={classes.headingName}>
            Top Brands
      </div>
          <div>
            {getTopBrands.length > 5 ? <div className={classes.scardview} >
              <div style={{ marginLeft: 20, }} onClick={() => gotoPrevbrand()}>
                <KeyboardArrowLeftIcon style={{ fontSize: 'large' }} />
              </div>
              <div style={{ width: '90%', }}>
                <Slider  {...settings} ref={topbrandRef} >

                  {TopBrands()}

                </Slider>
              </div>
              <div style={{ marginRight: 20, }} onClick={() => gotoNextbrand()} >
                <KeyboardArrowRightIcon style={{ fontSize: 'large' }} />
              </div>
            </div>
              : <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center', }}>
                {TopBrands()}</div>}
          </div>
        </Paper>
      </div>
      <NewBrands history={props.history} />
      <Footer history={props.history} />
    </div>
  );
}



