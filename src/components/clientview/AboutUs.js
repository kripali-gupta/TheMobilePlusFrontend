import React,{useEffect,useState} from 'react';
import { fade, makeStyles } from '@material-ui/core/styles';
import { getData,ServerURL, postData,postDataAndImage } from '../FetchNodeServices';
import Avatar from '@material-ui/core/Avatar';
import Paper from '@material-ui/core/Paper';
import Header from './Header';
import Footer from './Footer';
import renderHTML from 'react-render-html';


const useStyles = makeStyles((theme) => ({
   
   
}));

export default function ContactUs(props) {
    const classes = useStyles();
    const [getTC,setTC]=useState('')

    useEffect(function(){
      fetchTC()
    window.scrollTo(0,0)

    },[])
   
     const fetchTC=async()=>{
      var result= await getData('termsandcondition/user')
      //console.log("result",result)
      if(result.result.length!=0){
       var desc = result.result[0].description
        try {
       if (result.result[0].description.length > 0)
         {desc =  result.result[0].description
          setTC(desc)}
         } 
     catch (error) {
       desc = ''
      }
      } 
     }
    return (
        <div>
            <Header history={props.history}/>
            <div style={{display:'flex',justifyContent:'center',alignItems:'center'}}>
            <Paper elevation={0} style={{width:window.innerWidth*0.8,padding:20,margin:10}}>
            {//renderHTML(getTC)
            <div style={{pointerEvents:'none'}}
            dangerouslySetInnerHTML={{
              __html: getTC
            }}></div>}
            </Paper>
            </div>
            <Footer  history={props.history}/>
      </div>

  
  );
}