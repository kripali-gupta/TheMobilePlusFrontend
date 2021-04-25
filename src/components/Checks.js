function checkRequire(txt){
    if(txt.length==0 || txt.indexOf(' ') == 0 )
    { 
    return false }
    else
    { 
    return true}
}

function checkPassword(txt){
    if(txt.length<=5)
    return false
    else
    return true
}

function checkUserPassword(txt){
    var reg=/^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,20}$/
    if(reg.test(txt)==false)
    return false
    else
    return true
}

function checkPin(txt){
    var reg=/[0-9]{6}/
    //Alert.alert('cc '+reg.test(txt))
    if(reg.test(txt)==false)
     return false
     else
     return true
}


function checkMobile(txt){
  var reg=/^[0-9]{10}$/
       //Alert.alert('cc '+reg.test(txt))
       if(reg.test(txt)==false)
        return false
        else
        return true
    
    }

 function checkPhone(txt){
        var reg=/^[0-9]+$/
             //Alert.alert('cc '+reg.test(txt))
             if(reg.test(txt)==false)
              return false
              else
              return true
          
      }

      function checkGst(txt){
        var reg=/[a-zA-Z0-9]{15}/
             //Alert.alert('cc '+reg.test(txt))
             if(reg.test(txt)==false)
              return false
              else
              return true
          
          }

function checkEmail(txt)
{if(checkRequire(txt))
 { var reg= /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    if(reg.test(txt)==false)
    {return false}
    else
    {return true}
}
else
{return false}

 }


export {checkRequire,checkMobile,checkEmail,checkPassword,checkPhone,checkGst,checkPin,checkUserPassword}