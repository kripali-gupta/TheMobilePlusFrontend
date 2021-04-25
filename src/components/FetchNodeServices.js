var axios = require('axios')
const ServerURL="http://localhost:22000"
//const ServerURL = "http://142.93.211.148:22000"
const ImageURL = "http://142.93.211.148:22000"
//To read Data from Node

const getData = async (url) => {
    try {
        const response = await fetch(`${ServerURL}/${url}`)
        const result = await response.json()
        if (result == 'Session has Expired Please Login Again') {
            alert('Session has Expired Please Login Again')
            return ([])
        }
        else {
            //console.log(result)
            return result
        }
    }
    catch (e) {
        return null
    }
}

//To send data in node
const postData = async (url, body) => {
    try {
        const response = await fetch(`${ServerURL}/${url}`, {
            method: 'post',
            mode: 'cors',
            headers: { "Content-Type": "application/json;charset=utf-8" },
            body: JSON.stringify(body)
        })
        const result = await response.json()
        if (result == 'Session has Expired Please Login Again') {
            alert('Session has Expired Please Login Again')
            return false
        }
        else {
            //console.log(result)
            return result
        }
    }
    catch (e) {
        return null
    }
}

//To send data with image in node
const postDataAndImage = async (url, formData, config) => {

    try {
        //console.log(formData)
        var response = await axios.post(`${ServerURL}/${url}`, formData, config)
        if (response.data == 'Session has Expired Please Login Again') {
            alert('Session has Expired Please Login Again')
            return false
        }
        else {
            //console.log(result)
            var result = response.data.RESULT
            return result
        }

    }
    catch (e) {
        return null
    }
}

const getAccessToken = async () => {
    const config = {
        'content-type': 'application/json;charset=utf-8',
        'Access-Control-Allow-Origin':"*"
    };
    try {
        var response = await axios.post(
            'https://login.salesforce.com/services/oauth2/token?grant_type=refresh_token&refresh_token=5Aep861ZBQbtA4s3JVAmJKwL4uR.k_XkU8fb5kVl.qjZZzB_ovDJ8uyZzvRITSxAh_8pmiV5hx9GoCoWvfaAXPm&client_id=3MVG9n_HvETGhr3CYINmRTSNMQ_Yk1IXTVdXo7uHOyCGYwgyHbFtOC03KTvy2mutE.RLlKodHsfxXCXi7PY9z&client_secret=F312B823ACF33E232C1D4F064C4DF60D8C84AA0D6366EE19621E0CFC1D13DAE6&redirect_uri=https://login.salesforce.com',
            {},
            config,
        );
        var result = response.data;
        //console.log({ result });
        return result;
    } catch (error) {
        //console.log({ error });
        return false;
    }

    // try {
    //     var response = await fetch(
    //         `https://login.salesforce.com/services/oauth2/token?grant_type=refresh_token&refresh_token=5Aep861ZBQbtA4s3JVAmJKwL4uR.k_XkU8fb5kVl.qjZZzB_ovDJ8uyZzvRITSxAh_8pmiV5hx9GoCoWvfaAXPm&client_id=3MVG9n_HvETGhr3CYINmRTSNMQ_Yk1IXTVdXo7uHOyCGYwgyHbFtOC03KTvy2mutE.RLlKodHsfxXCXi7PY9z&client_secret=F312B823ACF33E232C1D4F064C4DF60D8C84AA0D6366EE19621E0CFC1D13DAE6&redirect_uri=https://login.salesforce.com`,
    //         {
    //             method: 'post',
    //             // mode: 'cors',
    //             body: JSON.stringify({}),
    //             headers: { 'content-type': 'application/json;charset=utf-8' },
    //         },
    //     );
    //     var result = await response.json();
    //     //console.log({ result });
    //     return result;
    // } catch (e) {
    //     //console.log(e);
    //     return false;
    // }
};


export { postData, postDataAndImage, getData, ServerURL, ImageURL, getAccessToken }


/*.then((response)=>{
                const result=response.data.Result
                //console.log(result)
                 return result
              } )
        .catch(function(err){
            //console.log(err)
            return false;
        })*/