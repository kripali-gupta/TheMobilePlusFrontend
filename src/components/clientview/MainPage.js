import React,{useEffect,useState} from 'react';
import { fade, makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import InputBase from '@material-ui/core/InputBase';
import Badge from '@material-ui/core/Badge';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import AccountCircle from '@material-ui/icons/AccountCircle';
import NotificationsIcon from '@material-ui/icons/Notifications';
import MoreIcon from '@material-ui/icons/MoreVert';
import {getData,postData, ServerURL}  from '../FetchNodeServices'
import Button from '@material-ui/core/Button'
import {useSelector,useDispatch}  from 'react-redux';
import  ShowCartIcon        from './ShowCartIcon'
import  FirstPage      from './FirstPage'
import  ViewListofProducts   from './ViewListofProducts'
import  Footer  from './Footer'


           

 
const useStyles = makeStyles((theme) => ({
  mainmenu:{
    display: 'flex',
    flexDirection:'row',
    },
  
  grow: {
    flexGrow: 1,
  //  backgroundColor:'#ffffff',
    padding:0,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
 
  title: {
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(3),
      width: 'auto',
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
  sectionDesktop: {
    display: 'none',
    [theme.breakpoints.up('md')]: {
      display: 'flex',
    },
  },
  sectionMobile: {
    display: 'flex',
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
  },
 
}));

export default function MainPage(props) {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = useState(null);
  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);
  
  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };
  
  ///Main Menu Items Implementation////
  const [anchorMM, setAnchorMM] = React.useState(null);
  const [getCategoryList,setCategoryList]= useState([])
  const [getBrandList,setBrandList]=useState([])
  const dispatch=useDispatch()
  const cartItems=useSelector(state=>state.cart)
  const [getCount,setCount]=useState(cartItems.length)
  const changeView=(value,parameter)=>{
      if(value==1)
      {setContainer(<ViewListofProducts categoryid={parameter.categoryid} /> ) }
  }
  const [getContainer,setContainer]=useState(<FirstPage changeView={changeView} />)
  const handleClick = (event) => {
   setAnchorMM(event.currentTarget);
   fetchBrand(event.currentTarget.value)
  };

  const handleClose = () => {
    setAnchorMM(null);
  };

  useEffect(function(){
    fetchCategory()
},[])

const fetchCategory=async()=>{
  var list=await getData('category/displayall')
  setCategoryList(list)
}

  const fetchBrand=async(categoryid)=>{
    var list=await postData('brand/displaybyidMainMenu',{'categoryid':categoryid})
    setBrandList(list)
    
    }
    
 
  const DisplayMainMenu=()=>{
    return(
         <div >
         {getCategoryList.map((item,key)=>{
        return(
   
           <Button  style={{width:150,margin:'0px 10px'}} aria-controls="simple-menu" value={item.categoryid} onClick={(event)=>handleClick(event)}>
           {item.categoryname}
         </Button> 
         
        ) })
         } </div>  
 
     )
     
  }

  const DisplayBrandMenu=()=>{

      return(
       getBrandList.map((item,key)=>{
         
         return (
         <MenuItem style={{width:150}} onClick={handleClose}>{item.brandname}</MenuItem>
)
}))
  }

 
//////////////////////////////////////////////////////

  const menuId = 'primary-search-account-menu';
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      id={menuId}
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
      <MenuItem onClick={handleMenuClose}>My account</MenuItem>
    </Menu>
  );

  const mobileMenuId = 'primary-search-account-menu-mobile';
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem>
        <ShowCartIcon />
        <p>Cart</p>
      </MenuItem>
      <MenuItem>
        <IconButton aria-label="show 11 new notifications" color="inherit">
          <Badge  color="secondary">
            <NotificationsIcon />
          </Badge>
        </IconButton>
        <p>Notifications</p>
      </MenuItem>
      <MenuItem onClick={handleProfileMenuOpen}>
        <IconButton
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
        >
          <AccountCircle />
        </IconButton>
        <p>Profile</p>
      </MenuItem>
    </Menu>
  );

  return (
    <div className={classes.grow}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="open drawer"
          >
            <MenuIcon />
          </IconButton>
          <Typography className={classes.title} variant="h6" noWrap>
           Ecommerce-site
          </Typography>
          <div className={classes.search}>
            <div className={classes.searchIcon}>
              <SearchIcon />
            </div>
            <InputBase
              placeholder="Search…"
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
              inputProps={{ 'aria-label': 'search' }}
            />
          </div>
          <div className={classes.grow} />
          <div className={classes.sectionDesktop}>
            <ShowCartIcon />
            <IconButton aria-label="show 17 new notifications" color="inherit">
              <Badge color="secondary">
                <NotificationsIcon />
              </Badge>
            </IconButton>
            <IconButton
              edge="end"
              aria-label="account of current user"
              aria-controls={menuId}
              aria-haspopup="true"
              onClick={handleProfileMenuOpen}
              color="inherit"
            >
              <AccountCircle />
            </IconButton>
          </div>
          <div className={classes.sectionMobile}>
            <IconButton
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
            >
              <MoreIcon />
            </IconButton>
          </div>
        </Toolbar>
      </AppBar>
      <AppBar position="static" style={{backgroundColor:'#dfe6e9'}} >
        <Toolbar >
            <div className={classes.mainmenu}>
        {DisplayMainMenu()}
        <Menu
        id="simple-menu"
        anchorEl={anchorMM}
        getContentAnchorEl={null}
        keepMounted
        open={Boolean(anchorMM)}
        onMouseDown={handleClose}
        anchorOrigin={{vertical:'bottom',horizontal:'center'}}
        transformOrigin={{vertical:'top',horizontal:'center'}}
      >
        {DisplayBrandMenu()}
      </Menu>
        </div>
        </Toolbar>
      </AppBar>
      {renderMobileMenu}
      {renderMenu}
     <div>
       {getContainer}
     </div>
     <Footer />
    </div>
  );
}


