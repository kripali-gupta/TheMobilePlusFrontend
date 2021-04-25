import React, { useEffect, useState, createRef } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { getData, postData, ServerURL, ImageURL } from '../FetchNodeServices'
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Image from 'react-image-resizer'
import Slider from "react-slick";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import KeyboardArrowLeftIcon from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@material-ui/icons/KeyboardArrowRight';
const useStyles = makeStyles((theme) => ({

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



    lroot: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
        alignItems: 'center',
        overflow: 'hidden',
    },
    gridList: {
        width: '100%',
        height: '100%',
    },
    hover: {
        "&:hover": {
            // background: "#de011b",
            transform: 'scale(1.04)',
            transition: 'all 0.5s ease 0s',
        },
        cursor: 'pointer'
    },
    headingName: {
        fontSize: '20px',
        fontWeight: "bold",
        padding: 10,
        borderBottom: '1px solid #bdc3c7',
    },

}));

export default function Dealsoftheday(props) {
    const classes = useStyles();
    const [getDeals, setDeals] = useState([])


    useEffect(function () {
        fetchDealsoftheday()
    }, [])


    const fetchDealsoftheday = async () => {
        var body = {}
        var list = await getData('dealsoftheday/displayjson')
        console.log("deals", list.data)
        setDeals(list.data)
    }


    const handleProduct = (productid) => {
        props.history.push({ pathname: `/ProductView/${productid}` })
    }



    const Deals = () => {
        return (
            getDeals.map((item, key) => {

                return (
                    <div className={classes.scardview}>
                        <Paper className={classes.scardview} elevation={0} onClick={() => handleProduct(item.productid)} >
                            <div style={{ padding: 10, cursor: 'pointer' }}>
                                <img src={`${ImageURL}/${item.dealspicture}`} style={{ width: '100%', height: '100%', borderRadius: 5 }} />
                            </div>
                        </Paper>
                    </div>
                )
            })
        )
    }

    var sliderRef = createRef()


    const settings = {
        autoplay: true,
        infinite: true,
        arrows: false,
        speed: 300,
        slidesToShow: 3,
        slidesToScroll: 1,
        responsive: [
            {
                breakpoint: 1200,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 4,

                }
            },
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 2,
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
           {getDeals.length !=0 ? <Paper elevation={0} style={{ width: '96%', margin: '10px 5px', padding: 5, }} >
                <div className={classes.headingName}>
                    Deals of the Day
                 </div>
                {getDeals.length > 3 ? <div className={classes.scardview}><div style={{ marginLeft: 20, }} onClick={() => gotoPrev()} >
                    <KeyboardArrowLeftIcon style={{ fontSize: 'large' }} />
                </div>
                    <div style={{ width: '90%', }}>
                        <Slider {...settings} ref={sliderRef} >
                            {Deals()}
                        </Slider>
                    </div>
                    <div style={{ marginRight: 20, }} onClick={() => gotoNext()}>
                        <KeyboardArrowRightIcon style={{ fontSize: 'large' }} />
                    </div></div> : <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center', }}>
                        {Deals()}</div>}
            </Paper> :<></>}

        </div>

    );
}



