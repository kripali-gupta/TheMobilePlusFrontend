import React,{useState,useEffect} from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Drawer from '@material-ui/core/Drawer';
import Box from '@material-ui/core/Box';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import Badge from '@material-ui/core/Badge';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Link from '@material-ui/core/Link';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import NotificationsIcon from '@material-ui/icons/Notifications';
import ListItems from './ListItems';
import CategoryInterface from '../category/CategoryInterface';
import OutletInterface from '../outlets/OutletInterface';
import BrandInterface from '../brand/BrandInterface';
import DisplayAll from '../category/DisplayAll';
import DisplayAllCat from '../category/DisplayAllCat'
import DisplayAllBrand from '../brand/DisplayAllBrand'
import DisplayAllOutlets from '../outlets/DisplayAllOutlets'
import ModelInterface from '../model/ModelInterface'
import DisplayAllModel  from '../model/DisplayAllModel'
import { getData,ServerURL } from '../FetchNodeServices';
import Avatar from '@material-ui/core/Avatar';
import AddPin from '../pin/AddPin';
import DisplayAllPin from '../pin/DisplayAllPin';



function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://material-ui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  toolbar: {
    paddingRight: 24, // keep right padding when drawer closed
  },
  toolbarIcon: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: '0 8px',
    ...theme.mixins.toolbar,
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
  },
  menuButtonHidden: {
    display: 'none',
  },
  title: {
    flexGrow: 1,
  },
  drawerPaper: {
    position: 'relative',
    whiteSpace: 'nowrap',
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerPaperClose: {
    overflowX: 'hidden',
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    width: theme.spacing(7),
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(9),
    },
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    height: '100vh',
    overflow: 'auto',
  },
  container: {
    paddingTop: theme.spacing(0),
    paddingBottom: theme.spacing(4),
  },
  paper: {
    padding: theme.spacing(2),
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column',
  },
  fixedHeight: {
    height: 240,
  },
  large: {
    width: theme.spacing(7),
    height: theme.spacing(7),
  },
}));

export default function Dashboard(props) {
  const classes = useStyles();
  const [open, setOpen] = useState(true);
  const [admin,setAdmin]=useState([])
  const [ShowComponent,setComponent]=useState(<CategoryInterface />)
  const handleDrawerOpen = () => {
    setOpen(true);
  };
  const handleDrawerClose = () => {
    setOpen(false);
  };
   
  const CheckSession=async()=>{
    var  result=await getData('admin/checktoken')
    //console.log(result)
    if(!result){
      props.history.replace({pathname:`/Signin`})
    }
    else{
      var admin=JSON.parse(localStorage.getItem('admin'))
      //console.log(admin)
      setAdmin(admin)
      ////console.log(props.history.location.admin)
    }

  }
  
  useEffect(function(){
  CheckSession()
  },[])

  const handleComponents=async(opt)=>{
     switch(opt){
       case 1:
         setComponent(<CategoryInterface/>)
         break
       case 2:
         setComponent(<DisplayAllCat/>)
         break
       case 3:
         setComponent(<BrandInterface/>)
         break
       case 4:
         setComponent(<DisplayAllBrand/>)
         break
       case 5:
         setComponent(<OutletInterface/>)
         break
       case 6:
         setComponent(<DisplayAllOutlets/>)
         break
       case 7:
         setComponent(<ModelInterface/>)
         break
       case 8:
        setComponent(<DisplayAllModel/>)
        break
       case 9:
         setComponent(<AddPin/>)
        break
       case 10:
        setComponent(<DisplayAllPin/>)
        break
       case 11:
         var result=await getData('admin/logout')
         if(result)
         {props.history.replace({pathname:`/Signin`})}
         
     }
  }

  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position="absolute" className={clsx(classes.appBar, open && classes.appBarShift)}>
        <Toolbar className={classes.toolbar}>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            className={clsx(classes.menuButton, open && classes.menuButtonHidden)}
          >
            <MenuIcon />
          </IconButton>
          <Typography component="h1" variant="h6" color="inherit" noWrap className={classes.title}>
            <div>{admin.adminname}</div>
          </Typography>
          <div>
          <Avatar alt="Remy Sharp" src={`${ServerURL}/images/${admin.picture}`} className={classes.large}/>
          </div>
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        classes={{
          paper: clsx(classes.drawerPaper, !open && classes.drawerPaperClose),
        }}
        open={open}
      >
        <div className={classes.toolbarIcon}>
          <IconButton onClick={handleDrawerClose}>
            <ChevronLeftIcon />
          </IconButton>
        </div>
        <Divider />
        <List><ListItems handleComponents={handleComponents} /></List>
        <Divider />
      </Drawer>
      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        <Container maxWidth="lg" className={classes.container}>
          {ShowComponent}
                 </Container>
      </main>
    </div>
  );
}