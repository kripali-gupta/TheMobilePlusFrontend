import React,{useState,useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {getData, ServerURL}  from '../FetchNodeServices'

export default function DisplayAll(){
  const [getList,setList]=useState([])

  const fetchData=async()=>{
      var list =await getData('category/displayall')
      setList(list)
  }
  
   useEffect(function(){
      fetchData()
  },[])

  const  displayData=()=>{
      return getList.map(function(item,index){
          return(
              <tr>
          <td>{index+1}</td><td>{item.categoryname}</td><td>{item.description}</td><td><img src={`${ServerURL}/images/${item.icon}`} width='50' height='50' /></td>
          <td><img src={`${ServerURL}/images/${item.ad}`} width='50' height='50' /></td><td>{item.adstatus}</td>
          </tr>
          )
      })
  }
  return(
      <div>
          <center>
          <table border='1' cellSpacing='0' cellPadding='5'>
          <caption><h2>List of Categories</h2></caption>
          <tr><th>S.No</th><th>Category Name</th><th>Description</th><th>Icon</th><th>Ad</th><th>Ad Status</th></tr>
          {displayData()}
          </table>
          </center>
      </div>
  )
}