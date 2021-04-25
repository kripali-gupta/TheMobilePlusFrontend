import React,{useEffect,useState} from 'react';
import { fade, makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import {getData,postData, ServerURL}  from '../FetchNodeServices'
import Button from '@material-ui/core/Button';
import Avatar from '@material-ui/core/Avatar';
import {useSelector,useDispatch}  from 'react-redux';
import QtyCtrl from './QtyCtrl'
import {blue } from '@material-ui/core/colors';
import {useParams} from 'react-router-dom';
import Footer from './Footer'
import Header from './Header'
import TreeView from '@material-ui/lab/TreeView';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import TreeItem from '@material-ui/lab/TreeItem';
import { Paper } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  grow: {
      flexGrow: 1,
      backgroundColor:'#ffffff',
      padding:0
    },
    paperStyle:{
        margin:20,
        width:200,
        height:'auto',
        padding:25,
        borderRadius:5
    }
    
  }));
  
export default function CategoriesTreeView(props) {
    const classes = useStyles();
    const [getList,setList]=useState([])
    const [getBrandList,setBrandList]=useState([])
    const [expanded, setExpanded] = React.useState([]);
  const [selected, setSelected] = React.useState([]);
  
    

    
    useEffect(function(){
      fetchData()
  },[])

  const fetchData=async()=>{
    var list=await getData('category/displayall')
    setList(list)
  }
  
 const fetchBrand=async(categoryid)=>{
     //console.log(categoryid)
      var list=await postData('brand/displaybyidMainMenu',{'categoryid':categoryid})
      setBrandList(list)
      
 }
  
   const handleToggle = (event,nodeIds) => {
    setExpanded(nodeIds);
  };

  const handleSelect = (event,nodeIds) => {
    setSelected(nodeIds)
    fetchBrand(nodeIds)
  };

  // Show Categories //
 const ShowCategories=()=>{
 return getList.map(function(item,key){
     var id=0
     return(
    <TreeView
      defaultCollapseIcon={<ExpandMoreIcon />}
      defaultExpandIcon={<ChevronRightIcon />}
      expanded={expanded}
      selected={selected}
      onNodeToggle={handleToggle}
      onNodeSelect={handleSelect}
      multiSelect
    >
<TreeItem nodeId={item.categoryid} label={item.categoryname}>
    {getBrandList.map(function(item,key){
    return(
 <TreeItem nodeId={item.brandid} label={item.brandname} />
     )
       })}
     </TreeItem>
    </TreeView>
     )
 }
 )
}
  
   
  
    return (
      <div className={classes.grow}>
          <div>
          <Paper elevation={1} className={classes.paperStyle}>
              {ShowCategories()}
     {/*<TreeItem nodeId="1" label="Applications">
        <TreeItem nodeId="2" label="Calendar" />
        <TreeItem nodeId="3" label="Chrome" />
        <TreeItem nodeId="4" label="Webstorm" />
      </TreeItem>
    </TreeView>*/}
     </Paper>
        </div>
      </div>
    );
  }
  