import React,{useEffect,useState} from 'react';
import { fade, makeStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import { getData,ServerURL, postData,postDataAndImage } from '../FetchNodeServices';
import Avatar from '@material-ui/core/Avatar';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Divider from '@material-ui/core/Divider';
import {useDispatch,useSelector} from 'react-redux'; 
import Header from './Header';
import Footer from './Footer';

const useStyles = makeStyles((theme) => ({
   
   
}));

export default function ContactUs(props) {
    const classes = useStyles();
   

    useEffect(function(){
      window.scrollTo(0,0)
  
      },[])
    return (
        <div>
            <Header history={props.history}/>
            <div style={{display:'flex',justifyContent:'center',alignItems:'center'}}>
            <Paper elevation={0} style={{width:window.innerWidth*0.8,margin:20,padding:30}}>
            <div style={{padding:20}}>
             <div><b><font size='4'>CONTACT US</font></b></div>   
             <div style={{paddingTop:20}}><b>CALL US</b> : <font color='#de011b'>0751-4001453</font></div>      
             <div style={{paddingTop:10}}>8:00 AM to 8:00 PM, 365 days</div>
             <div style={{paddingTop:10}}><b>Address :</b><small>The Mobile Plus <br/>
            Rajeev Plaza ,Jayendra Ganj Lashkar,<br/>
            Gwalior , M.P India</small></div>
             <div style={{paddingTop:30}}><font size='4'><b>Concerns not addressed?</b></font></div> 
             <div style={{paddingTop:10}}><small>
             It is our priority to positively respond and address any concerns you may have at the earliest. To ensure this, our team is 
             continuously working to provide you the best of support, though a few concern/issues that are complex in nature may require
              additional time to resolve. </small>  
             </div>
             <div style={{paddingTop:10}}><small>
             In the unlikely event that your concerns are not addressed satisfactorily, you could communicate directly to higher authorities.
              To facilitate and better manage this we have aligned a structure to aid communication.</small>
             </div>

             <div style={{paddingTop:10}}><small>
             <b>* </b> This is the final level to redress grievances that have already been conveyed to the Level 1 customer support<br/>
             <b>* </b> While writing, we encourage you to quote the communication and allied resolution offered in earlier stages so that we get a holistic view<br/>
             <b>* </b> We value your time and are committed to ensure your satisfaction in all your interactions with us<br/>
             <b>* </b> Please allow 24-48 hours for a resolution</small>
             </div>
             <div style={{marginTop:50,display:'flex',alignItems:'center',justifyContent:'center'}}>
               <a style={{textDecoration:'none',color:'#000'}} href="http://www.numericinfosystems.in/" target="_blank">
               <div style={{display:'flex',flexDirection:'row',}}>
               <img  src="/images/nis.jfif" width='50' height='50' />
              <span style={{paddingTop:13}}> Developed by Numeric Infosystem Pvt.Ltd.</span>
               </div>
               </a>
             </div>
            </div>
            </Paper>
            </div>
            <Footer  history={props.history}/>
      </div>

  
  );
}
