import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import DashboardIcon from '@material-ui/icons/Dashboard';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import TableChartIcon from '@material-ui/icons/TableChart';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';

 export default function ListItems(props){
 
    const handleClick=(opt)=>{
      props.handleComponents(opt)
    }

  return (
  <div>
    <ListItem button>
      <ListItemIcon>
        <DashboardIcon />
      </ListItemIcon>
      <ListItemText primary="Dashboard" />
    </ListItem>
    <ListItem button onClick={()=>handleClick(1)} >
      <ListItemIcon>
        <AddCircleIcon />
      </ListItemIcon>
      <ListItemText primary="Category" />
    </ListItem>
    <ListItem button onClick={()=>handleClick(2)}>
      <ListItemIcon>
      <TableChartIcon />
      </ListItemIcon>
      <ListItemText primary="Display Category" />
    </ListItem>
    <ListItem button onClick={()=>handleClick(3)}>
      <ListItemIcon>
      <AddCircleIcon />
      </ListItemIcon>
      <ListItemText primary="Brand" />
    </ListItem>
    <ListItem button onClick={()=>handleClick(4)}>
      <ListItemIcon>
      <TableChartIcon />
      </ListItemIcon>
      <ListItemText primary="Display Brands" />
    </ListItem>
    <ListItem button onClick={()=>handleClick(5)}> 
      <ListItemIcon>
      <AddCircleIcon />
      </ListItemIcon>
      <ListItemText primary="Outlets" />
    </ListItem>
    <ListItem button onClick={()=>handleClick(6)}>
      <ListItemIcon>
      <TableChartIcon />
      </ListItemIcon>
      <ListItemText primary="Display Outlets" />
    </ListItem>
     <ListItem button onClick={()=>handleClick(7)}>
      <ListItemIcon>
      <AddCircleIcon />
      </ListItemIcon>
      <ListItemText primary="Models" />
    </ListItem>
    <ListItem button onClick={()=>handleClick(8)}>
      <ListItemIcon>
      <TableChartIcon />
      </ListItemIcon>
      <ListItemText primary="Display Models" />
    </ListItem>
    <ListItem button onClick={()=>handleClick(9)}>
      <ListItemIcon>
      <AddCircleIcon />
      </ListItemIcon>
      <ListItemText primary="Add PinCodes" />
    </ListItem><ListItem button onClick={()=>handleClick(10)}>
      <ListItemIcon>
      <TableChartIcon />
      </ListItemIcon>
      <ListItemText primary="Display PinCodes" />
    </ListItem>
    <ListItem button onClick={()=>handleClick(11)}>
      <ListItemIcon>
      <ExitToAppIcon />
      </ListItemIcon>
      <ListItemText primary="Logout" />
    </ListItem>
  </div>
);

  }