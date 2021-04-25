import React,{useEffect,useState} from 'react';
import { fade, makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Header from './Header';
import Footer from './Footer';


const useStyles = makeStyles((theme) => ({
   
   
}));

export default function FAQ(props) {
    const classes = useStyles();
   

    useEffect(function(){
        window.scrollTo(0,0)
    
        },[])

    return (
        <div >
            <Header history={props.history}/>
            <div style={{display:'flex',justifyContent:'center',alignItems:'center'}}>
            <Paper elevation={0} style={{width:window.innerWidth*0.8,margin:20,padding:30,fontSize:15}}>
            <div style={{margin:10}}>
             <div><b><font size='5'>FAQs</font></b></div>   
             <div style={{paddingTop:10}}><b><font size='4'>Frequently Asked Questions</font></b></div>   
             <div style={{paddingTop:10}}>Check out this section to get answers for all the frequently asked questions.</div>
             
             <div style={{paddingTop:30}}><b><font size='5'>~ Registration</font></b></div>

             <div style={{paddingTop:15}}><b>How do I register?</b></div>
             <div style={{paddingTop:10}}><small>
              You can register by clicking on the "Sign In" section located at the top right corner on the home page.
              Please provide the required information in the form that appears and click on submit. We will send a one-time password (OTP) 
              to verify your mobile number. Post verification, you can start shopping on The Mobile Plus.</small>
             </div>

             <div style={{paddingTop:15}}><b>Do I need to register before shopping on The Mobile Plus</b></div>
             <div style={{paddingTop:10}}><small>
             Yes, you do need to register before shopping with us. However, you can browse the website without registration.
              You are required to login or register while you checkout.</small>
             </div>

             <div style={{paddingTop:15}}><b>Can I register multiple times using the same phone number/email ID?</b></div>
             <div style={{paddingTop:10}}><small>
             Each email ID/login ID and mobile number can only be associated with one customer account.</small>
             </div>

             <div style={{paddingTop:15}}><b>What if I enter the wrong email ID while registering online/through the phone?</b></div>
             <div style={{paddingTop:10}}><small>
             Please contact our customer support team at <font color='#de011b'>0751-4001453</font> or write to us at:
             <font color='#de011b'> <a  style={{textDecoration:'none',color:'#de011b'}}href="#">themobileplus08@gmail.com</a></font>and we will fix this issue for you.
             </small>
             </div>


             <div style={{paddingTop:30}}><b><font size='5'>~ Login / Account Related</font></b></div>

             <div style={{paddingTop:15}}><b>What is My Account?</b></div>
             <div style={{paddingTop:10}}><small>
             'My Account' is the section where you can view your Personal Information, Order History and Shopping List.
             </small></div>

             <div style={{paddingTop:15}}><b>I am unable to login</b></div>
             <div style={{paddingTop:10}}><small>
             You may have entered incorrect login details. Please enter the correct information & try again.
             </small></div>


             <div style={{paddingTop:30}}><b><font size='5'>~ Product / Price / Promotion</font></b></div>

             <div style={{paddingTop:15}}><b>How do I look for a particular Product?</b></div>
             <div style={{paddingTop:10}}><small>
             You can search for a product by navigating through the category pages or by using search tab on the top of every page.
             </small></div>

             <div style={{paddingTop:15}}><b>How will you ensure the freshness of products?</b></div>
             <div style={{paddingTop:10}}><small>
             We ensure that all our products are hygienically and carefully handled and maintain them in the correct temperature & packaging.
             </small></div>


            <div style={{paddingTop:30}}><b><font size='5'>~ Payment</font></b></div>

             <div style={{paddingTop:15}}><b>What are the various modes of payment I can use for shopping?</b></div>
             <div style={{paddingTop:10}}><small>
             You can pay for your order using the following modes of payment:<br/><br/>

             * Credit Card / Debit Card<br/>
             * Netbanking<br/>
             * e-Wallets<br/>
             * Cash on Delivery </small></div>

             <div style={{paddingTop:50 ,fontsize:15}}>
             If you’d like get in touch with us, please do write to us at <font color='#de011b'><a  style={{textDecoration:'none',color:'#de011b'}}href="#">themobileplus08@gmail.com</a> &nbsp;</font> or call us on <font color='#de011b'>0751-4001453</font>&nbsp;
             between 8:00 am & 8:00 pm throughout the week and we will respond immediately.<br/>
            </div>


             </div>
            </Paper>
            </div>
            <Footer history={props.history}/>
      </div>

  
  );
}