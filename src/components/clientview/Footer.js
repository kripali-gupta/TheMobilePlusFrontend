import React, { useEffect, useState } from 'react';
import { fade, makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import { getData, postData, ServerURL } from '../FetchNodeServices'
import Grid from '@material-ui/core/Grid';

const useStyles = makeStyles((theme) => ({


  grow: {
    //position:"absolute",
    bottom: 0,
    display: 'block',
    width: '100%',
  },

  footRoot: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#de011b',
    //  flexDirection:'row',
    //flexWrap:'wrap',
    marginTop: '50px', padding: 10,
    bottom: 0,
  },
  footGrid: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    borderTop: '1px solid  #fff',
    paddingTop: 10,
    color: '#fff'
  },
  divgridhead: {
    fontSize: 12,
    fontWeight: 'bold',
    padding: '5px 5px',
    textTransform: 'uppercase'
  },
  divGrid: {
    flexDirection: 'column', display: 'flex',
    padding: '36px 20px 0px 50px',
    color: '#fff'
  },
  divGridContact: {
    flexDirection: 'column', display: 'flex',
    padding: '15px 10px 3px 50px',
    margin: '21px 0px',
    borderLeft: '1px solid #fff',
    color: '#fff'
  },
  divcontent: {
    fontSize: 12,
    textAlign: 'left',
    padding: 5,
    color: '#fff',
    cursor:'pointer'
  },
  divcontent3: {
    fontSize: 12,
    textAlign: 'left',
    marginTop: 4,
    padding: 5,
    color: '#fff'
  },
  alink: {
    color: '#fff',
    fontWeight: 'bold',
    textDecoration: 'none',
    padding: 3, margin: 3
  }
}));

export default function Footer(props) {
  const classes = useStyles();


  ///Main Menu Items Implementation////
  const [getListAd, setListAd] = useState([])



  useEffect(function () {
    fetchCategoryAd()
  }, [])


  const fetchCategoryAd = async () => {
    var list = await postData('pack/categoryfillad', {})
    setListAd(list)
  }

  const handleShowProduct=(categoryid)=>{    
     props.history.push({pathname:`/ViewListofProducts/${categoryid}`})
  }

  const handleAboutUs = () => {
    props.history.push({ pathname: `/AboutUs` })

  }
  /////HandleFAQ/////

  const handleFAQ = () => {
    props.history.push({ pathname: `/NeedHelp` })
  }

  const handleContactUs=()=>{
    props.history.push({pathname:`/ContactUs`})
  }
  ///// Footer /////
  const footer = () => {
    return (
      <div className={classes.footRoot} >
        <Grid container spacing={1} >
          <Grid item xs={12} md={4}>
            <div className={classes.divGrid}  >
              <div className={classes.divgridhead}>Most Popular Categories</div>
              {getListAd.map(function (item, key) {
                return (
                  <div className={classes.divcontent}   onClick={()=>handleShowProduct(item.id)} >{item.categoryname}</div>
                )
              })}
            </div>
          </Grid>
          <Grid item xs={12} md={4}>
            <div className={classes.divGrid} >
              <div className={classes.divgridhead}>Customer Services</div>
              <div className={classes.divcontent} ><a className={classes.alink} onClick={()=>handleAboutUs()} >Terms & Condition</a> </div>
              <div className={classes.divcontent} ><a className={classes.alink} onClick={()=>handleFAQ()} >FAQ</a> </div>
              <div className={classes.divcontent} ><a className={classes.alink} onClick={()=>handleContactUs()}>Contact Us</a> </div>
            </div>
          </Grid>
          <Grid item xs={12} md={4}>
            <div className={classes.divGridContact}>
              <div className={classes.divgridhead} >Contact us</div>
              <div className={classes.divcontent3} >
               Call Us : <a className={classes.alink} href="#">0751-4001453</a></div>
               <div className={classes.divcontent3} >
               Address : <small>The Mobile Plus <br/>
            Rajeev Plaza ,Jayendra Ganj Lashkar,<br/>
            Gwalior , M.P India</small></div>
            <div className={classes.divcontent3}>Should you encounter any bugs,glitches,lack of functionality,delayed deliveries,
            billing errors or other problems on the beta website,please email us on-<br/>
             <a style={{  color: '#fff',fontWeight: 'bold', textDecoration: 'none',}} href="mailto:themobileplus08@gmail.com" >themobileplus08@gmail.com</a></div>
              <div className={classes.divgridhead}>Download App</div>
              <div className={classes.divcontent3} style={{ padding: 3 }} >
                <a className={classes.alink} href="https://play.google.com/store/apps/details?id=com.mobileplusapp" target="_blank" >
                <img src="/images/play_store.png" /></a>
                <a className={classes.alink} href="https://play.google.com/store/apps/details?id=com.mobileplusapp"  target="_blank" >
                  <img width='auto' height='auto' src="/images/ios_store.png" /></a></div>
            </div>
          </Grid>
          <Grid item xs={12} sm={6} className={classes.footGrid}>
            <div style={{ fontSize: 12 }} >Best viewed on Microsoft Edge 81+, Mozilla Firefox 75+, Safari 5.1.5+, Google Chrome 80+</div>
          </Grid>

          < Grid item xs={12} sm={6} className={classes.footGrid}>
            <div style={{ fontSize: 12, }}>© 2020 All rights reserved. Reliance Retail Ltd.</div>
          </Grid>
        </Grid>
      </div>
    )
  }


  //////////////////////////////////////////////////////




  return (
    <div className={classes.grow}>
      {footer()}
    </div>
  );
}
