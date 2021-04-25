import React, { useEffect, useState, createRef } from 'react';
import { fade, makeStyles } from '@material-ui/core/styles';
import { IconButton, } from '@material-ui/core';
import { getData, postData, ImageURL } from '../FetchNodeServices'
import Button from '@material-ui/core/Button';
import Slider from "react-slick";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Paper from '@material-ui/core/Paper';
import Image from 'react-image-resizer'
import KeyboardArrowLeftIcon from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@material-ui/icons/KeyboardArrowRight';
import ShoppingCart from '@material-ui/icons/ShoppingCart';
import ReactPlaceholder from 'react-placeholder';
import "react-placeholder/lib/reactPlaceholder.css";
import CircularProgress from '@material-ui/core/CircularProgress';


const useStyles = makeStyles((theme) => ({


  toproot: {
    //alignItems:'center',
    justifyContent: 'flex-start',
    display: 'flex',
    padding: 10,
    width: 190,
    height: 310,
    margin: 10,
    padding: 10,
    // border:'2px solid #dcdde1',
    borderRadius: 10,
    flexDirection: 'column',

  },
  ImageView: {
    width: 160, height: 160,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
    margin: 2,
    "&:hover": {
      // background: "#de011b",
      transform: 'scale(1.25)',
      transition: 'all 0.5s ease 0s',
    },
    cursor: 'pointer'
  },

  cartbtn: {
    padding: 2,
    height: 30,
    margin: '5px 0px',
    backgroundColor: '#de011b',
    color: '#ffffff',
    "&:hover": {
      background: "#de011b",
      transition: 'all 0.5s ease 0s',
    },

  },
  cardview: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    justifyContent: 'center'

  },
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

  text: {
    display: 'flex',
    paddingTop: 10,

  },


}));

export default function TopProducts(props) {
  const classes = useStyles();
  const [getTopProducts, setTopProducts] = useState([])
  const [getState, setState] = useState(false)

  const numberFormat = (value) =>
    new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR'
    }).format(value);


  useEffect(function () {
    fetchTopProducts()
  }, [])

  const fetchTopProducts = async () => {
    var list = await getData('product1/productitemsoffer')
    var arr = list.sort((a, b) => (b.price - b.offerprice) - (a.price - a.offerprice))
    list = []
    arr.map((item, key) => {
      if (key < 20) {
        list.push(item)
      }
    })
    setTopProducts(list)
    setState(true)
  }


  //Show Products //
  const ShowTopProducts = () => {

    return (

      getTopProducts.slice(0, 20).map((item, key) => {
        var save = item.price - item.offerprice
        var o = 1
        var color = 'green'
        if (item.status == 'Coming Soon' || item.status == 'Pre Booking') {
          o = 0.5
          if (item.status == 'Coming Soon') {
            color = 'red'
          }
        }
        var discount = Math.ceil((save / item.price) * 100)
        if (save > 0) {
          return (
            <div className={classes.scardview} >
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', }} >
                <Paper elevation={3} className={classes.toproot}>
                  {discount >= 5 ? <div style={{ position: 'absolute', zIndex: 1, opacity: o }}>
                    <img src="/images/offer_bg.svg" />
                    <p style={{ position: 'absolute', top: -1, color: '#FFF', fontSize: 12, fontWeight: 'bold', left: 8, textAlign: 'center', cursor: 'pointer' }}>{discount}%</p>
                  </div> : <></>}
                  <div className={classes.ImageView} onClick={() => handleShowProductView(item.productid)} >
                    <Image width={130} height={130} style={{ opacity: o }} alt={item.productname} src={`${ImageURL}/images/${item.picture}`} />
                    {o < 1 ? <div style={{ position: 'absolute', color: color, fontSize: 20, backgroundColor: '#fff', padding: '2px 0px', fontWeight: 'bold' }}>{item.status}</div>
                      : <></>}
                  </div>
                  <div className={classes.text} style={{ fontSize: 15, }}>
                    <b>{item.productname.length >= 23 ? (item.productname).toString().substring(0, 19) + "..." : item.productname}</b>
                  </div>
                  <div style={{ fontSize: 15 }}>
                    M.R.P <s> {numberFormat(item.price)}</s>
                  </div>
                  <div style={{ fontSize: 16 }}>

                    <b>{numberFormat(item.offerprice)}</b>
                  </div>
                  <div style={{ fontSize: 15 }}>
                    <b><small><font color='green'>Save  {numberFormat(save)}</font></small></b>
                    <div style={{ fontSize: 13, fontWeight: 'bold' }}>
                      {item.stock == 0 ? <font color="red">Not Available</font> : <font color="green">In Stock</font>}
                    </div>
                  </div>
                  <div style={{ padding: '5px 0px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    {item.status == 'Pre Booking' ? <Button fullWidth className={classes.cartbtn} variant="contained" onClick={() => handleShowProductView(item.productid)} color="primary">
                      Pre Book Now &nbsp;&nbsp;&nbsp;&nbsp;</Button> : <Button fullWidth className={classes.cartbtn} variant="contained" onClick={() => handleShowProductView(item.productid)} color="primary">
                        Add To Cart &nbsp;&nbsp;&nbsp;&nbsp; <big><ShoppingCart style={{ marginTop: 6 }} /> </big>
                      </Button>}

                  </div>
                </Paper>
              </div>
            </div>

          )
        }
      }))
  }


  const state = () => {
    setState(true)
  }
  const handleShowProductView = (productid) => {
    props.history.push({ pathname: `/ProductView/${productid}` })
  }


  var sliderRef = createRef()


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
        breakpoint: 790,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2
        }
      },
      {
        breakpoint: 500,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: true
        }
      }
    ]

  };



  const gotoNext = () => {
    sliderRef.current.slickNext()
  }
  const gotoPrev = () => {
    sliderRef.current.slickPrev()
  }


  return (

    <div className={classes.scardview}>
      <Paper elevation={0} style={{ width: '96%', margin: '10px 5px', padding: 5, }} >
        {getState ? <> <div className={classes.headingName}>
          Pick Top Offers
          </div>
          {getTopProducts.length > 5 ? <div className={classes.scardview}><div style={{ marginLeft: 20, }} onClick={() => gotoPrev()} >
            <KeyboardArrowLeftIcon style={{ fontSize: 'large' }} />
          </div>
            <div style={{ width: '90%', }}>
              <Slider {...settings} ref={sliderRef} >
                {ShowTopProducts()}
              </Slider>
            </div>
            <div style={{ marginRight: 20, }} onClick={() => gotoNext()}>
              <KeyboardArrowRightIcon style={{ fontSize: 'large' }} />
            </div></div> : <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center', }}>
              {ShowTopProducts()}</div>} </> :
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', margin: 50 }}>
            <CircularProgress style={{ color: '#de011b' }} />
          </div>}
      </Paper>

    </div>

  );
}



