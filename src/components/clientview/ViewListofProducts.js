import React, { useEffect, useState } from "react";
import { fade, makeStyles } from "@material-ui/core/styles";
import { getData, postData, ImageURL } from "../FetchNodeServices";
import Button from "@material-ui/core/Button";
import { useSelector, useDispatch } from "react-redux";
import QtyCtrl from "./QtyCtrl";
import { useParams } from "react-router-dom";
import Footer from "./Footer";
import Header from "./Header";
import Image from "react-image-resizer";
import ShoppingCart from "@material-ui/icons/ShoppingCart";
import Pagination from "@material-ui/lab/Pagination";
import Grid from "@material-ui/core/Grid";
import Divider from "@material-ui/core/Divider";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import Slider from "@material-ui/core/Slider";
import Checkbox from "@material-ui/core/Checkbox";
import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import CircularProgress from "@material-ui/core/CircularProgress";

const useStyles = makeStyles((theme) => ({
  grow: {
    flexGrow: 1,
    padding: 0,
    backgroundColor: "#f3f3f3",
  },
  scardview: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexWrap: "wrap",
    padding: 10,
  },
  productAction: {
    display: "flex",
    justifyContent: "flex-start",
    width: 210,
    //alignItems:'center',
    height: 310,
    borderRadius: 10,
    margin: 7,
    padding: 10,
    border: "2px solid #dcdde1",
    flexDirection: "column",
  },
  ImageView: {
    width: 190,
    height: 190,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: 5,
    "&:hover": {
      // background: "#de011b",
      transform: "scale(1.25)",
      transition: "all 0.5s ease 0s",
    },
  },
  divStyle: {
    margin: "0px 20px 20px",
    // width: window.innerWidth * 0.75,
    borderRadius: 5,
  },
  center: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  filterStyle: {
    fontSize: 14,
    fontWeight: "bold",
    padding: "10px 10px 5px 14px",
  },
  hover: {
    "&:hover": {
      background: "#de011b",
      transform: "scale(1)",
      transition: "all 0.5s ease 0s",
      color: "#fff",
    },
  },
  opacity: {
    opacity: 0.1,
  },
}));

export default function ViewListofProducts(props) {
  const classes = useStyles();
  const [getList, setList] = useState([]);
  const [getPage, setPage] = useState([]);
  const [getCount, setCount] = useState(false);
  const [getFilterList, setFilterList] = useState([]);
  const [getCategory, setCategory] = useState([]);
  const [getCategoryName, setCategoryName] = useState("");
  const [getBrandList, setBrandList] = useState([]);
  const [getBrand, setBrand] = useState([]);
  const [getMaxPrice, setMaxPrice] = React.useState(0);
  const [getMinPrice, setMinPrice] = React.useState(0);
  const [getPrice, setPrice] = React.useState([getMinPrice, getMaxPrice]);
  const [getAvailabilty, setAvailability] = useState("");
  const [getOrder, setOrder] = useState("");
  const [getDiscount, setDiscount] = useState("");
  const [getState, setState] = useState(false);

  const dispatch = useDispatch();
  const params = useParams();
  var cart = useSelector((state) => state.cart);
  var cartItems = Object.values(cart);

  const numberFormat = (value) =>
    new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
    }).format(value);

  useEffect(function () {
    fetchCategoryAd();
    fetchData();
    fetchBrand();
    window.scrollTo(0, 0);
    setState(false);
  }, []);

  const fetchCategoryAd = async () => {
    var result = await postData("pack/fetchcategorybyid", {
      categoryid: params.cid,
    });
    if (result) {
      //console.log(result)
      setCategory(result.data);
    }
  };

  const fetchData = async () => {
    var arr = [];
    let body = { categoryid: params.cid };
    var list = await postData("product1/productitembyid", body);
    setList(list);
    setFilterList(list);
   if(list.length!=0){
    list.map(function (item, index) {
      if (index < 20) {
        arr.push(item);
      }
      setCategoryName(item.categoryname);
    });
    setPage(arr);
    var min = list.reduce(
      (min, b) => Math.min(min, b.offerprice),
      list[0].offerprice
    );
    var max = list.reduce(
      (max, b) => Math.max(max, b.offerprice),
      list[0].offerprice
    );
    setMinPrice(min);
    setMaxPrice(max);
    setPrice([min, max]);
    setOrder("");
    setDiscount("");
    setAvailability("");
   }
    setState(true);
  };

  //Count Cart Items//
  const handleQtyChange = (value, item, key) => {
    if (value >= 1 && value <= item.stock) {
      item["qtydemand"] = value;
      dispatch({ type: "ADD_CART", payload: [item.productid, item] });
      setCount(!getCount);
    } else if (value == 0) {
      item["qtydemand"] = value;
      var list = getPage;
      list[key]["cartstatus"] = 0;
      setPage(list);
      dispatch({ type: "REMOVE_CART", payload: [item.productid, item] });
      setCount(!getCount);
    } else {
    }
  };

  //ADD To Cart//
  const AddToCart = (item, key) => {
    if (item.stock >= 1) {
      item["qtydemand"] = 1;
      var list = getPage;
      list[key]["cartstatus"] = 1;
      setPage(list);
      dispatch({ type: "ADD_CART", payload: [item.productid, item] });
      setCount(!getCount);
    } else {
      handleShowProductView(item.productid);
    }
  };

  // Show Products //
  const ShowProducts = () => {
    return getPage.map(function (item, key) {
      var save = item.price - item.offerprice;
      var color = "green";
      var o = 1;
      if (item.status == "Coming Soon" || item.status == "Pre Booking") {
        o = 0.5;
        if (item.status == "Coming Soon") {
          color = "red";
        }
      }
      var discount = Math.ceil((save / item.price) * 100);
      item["cartstatus"] = 0;
      cartItems.map(function (product, key) {
        if (item.productid == product.productid) {
          item.qtydemand = product.qtydemand;
          item.cartstatus = 1;
        }
      });
      return (
        <div className={classes.productAction}>
          {discount >= 5 ? (
            <div style={{ position: "absolute", zIndex: 1, opacity: o }}>
              <img src="/images/offer_bg.svg" />
              <p
                style={{
                  position: "absolute",
                  top: -1,
                  color: "#FFF",
                  fontSize: 12,
                  fontWeight: "bold",
                  left: 8,
                  textAlign: "center",
                }}
              >
                {discount}%
              </p>
            </div>
          ) : (
            <></>
          )}
          <div
            className={classes.ImageView}
            onClick={() => handleShowProductView(item.productid)}
          >
            <Image
              width={150}
              height={150}
              style={{ opacity: o }}
              alt={item.productname}
              src={`${ImageURL}/images/${item.picture}`}
              onClick={() => handleShowProductView(item.productid)}
            />
            {o < 1 ? (
              <div
                style={{
                  position: "absolute",
                  cursor: "pointer",
                  color: color,
                  fontSize: 15,
                  backgroundColor: "#fff",
                  marginTop: 20,
                  padding: "2px 0px",
                  fontWeight: "bold",
                }}
              >
                {item.status}
              </div>
            ) : (
              <></>
            )}
          </div>
          <div style={{ fontSize: 15, fontWeight: "bold" }}>
            {item.productname.length >= 25
              ? item.productname.toString().substring(0, 21) + "..."
              : item.productname}
          </div>
          <div style={{ fontSize: 15 }}>
            <small>
              {" "}
              M.R.P <s> {numberFormat(item.price)} </s>{" "}
            </small>
            &nbsp;&nbsp;
            <b>{numberFormat(item.offerprice)}</b>
          </div>
          <div>
            <b>
              <small>
                <font color="green">Save {numberFormat(save)}</font>
              </small>
            </b>
          </div>
          <div style={{ fontSize: 13, fontWeight: "bold" }}>
            {item.stock == 0 ? (
              <font color="red">Not Available</font>
            ) : (
              <font color="green">In Stock</font>
            )}
          </div>
          <div
            style={{
              padding: "5px 0px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {item.status == "Pre Booking" ? (
              <>
                <Button
                  variant="contained"
                  fullWidth
                  style={{
                    height: 30,
                    padding: 5,
                    backgroundColor: "#de011b",
                    color: "#ffffff",
                  }}
                  onClick={() => handleShowProductView(item.productid)}
                >
                  Pre Book Now &nbsp;&nbsp;&nbsp;&nbsp;{" "}
                </Button>
              </>
            ) : item.cartstatus == 0 ? (
              <Button
                variant="contained"
                fullWidth
                style={{
                  height: 30,
                  padding: 5,
                  backgroundColor: "#de011b",
                  color: "#ffffff",
                }}
                onClick={
                  item.qtdemand > 0
                    ? () => AddToCart(item, key)
                    : () => handleShowProductView(item.productid)
                }
              >
                Add to Cart &nbsp;&nbsp;&nbsp;&nbsp;{" "}
                <big>
                  <ShoppingCart style={{ marginTop: 6 }} />{" "}
                </big>
              </Button>
            ) : (
              <QtyCtrl
                value={item.qtydemand}
                onChange={(value) => handleQtyChange(value, item, key)}
              />
            )}
          </div>
        </div>
      );
    });
  };

  const handleShowProductView = (productid) => {
    props.history.push({ pathname: `/ProductView/${productid}` });
  };

  const handlePages = (event, page) => {
    var list = [];
    var i = 0;
    getList.map(function (item, index) {
      if (index >= (page - 1) * 20 && i < 20) {
        list.push(item);
        i++;
      }
    });
    setPage(list);
    setState(true);
  };

  const fetchBrand = async () => {
    var list = await postData("brand/brandfill", { categoryid: params.cid });

    list.map((item)=>{
     item['checked']=false
    })
    setBrandList(list);
  };


  const BrandWise = (brand) => {
    var arr=[]
    getList.map((item)=>{
      brand.map((d)=>{
       if(item.brandid==d.brandid){
         if(d.checked){
           arr.push(item)
         }
       }
      })
    })
    setFilterList(arr)
    var list = [];
    arr.map(function (item, index) {
      if (index < 20) {
        list.push(item);
      }
    });
    setPage(list);
    setAvailability("");
    setPrice([getMinPrice, getMaxPrice]);
    setDiscount("");
    setOrder("") 
  };

  
  const handleBrandChange = (event) => {
    var arr=[]
    getBrandList.map((item)=>{
      if(item.brandid==event.target.name){
        item['checked']=event.target.checked
      }
      arr.push(item)
    })
    BrandWise(arr)
  };

 

  const BrandFilter = () => {
    return (
      <FormControl component="fieldset" >
        <FormGroup>
        {getBrandList.map((item)=>{
          return(
            <FormControlLabel
            control={<Checkbox checked={item.checked} style={{color:'#de011b'}} size="small" onChange={handleBrandChange} name={item.brandid} />}
            label={<span style={{ fontSize: 12 }}>{item.brandname}</span>}
          />
          )
        })
        }
        </FormGroup>
      </FormControl>
    );
  };

  const PriceWise = () => {
    var arr = [];
    var list = [];
    getList.map((item) => {
      if (item.offerprice >= getPrice[0] && item.offerprice <= getPrice[1]) {
        arr.push(item);
      }
    });
    setFilterList(arr);
    //console.log(list)
    arr.map(function (item, index) {
      if (index < 20) {
        list.push(item);
      }
    });
    setPage(list);
    setAvailability("");
    setDiscount("");
    setOrder("");
  };

  const handlePrice = (event, newPrice) => {
    setPrice(newPrice);
    PriceWise();
  };

  const Price = () => {
    return (
      <div>
        <div style={{ padding: "0px 8px" }}>
          <Slider
            value={getPrice}
            onChange={handlePrice}
            valueLabelDisplay="auto"
            aria-labelledby="range-slider"
            min={getMinPrice}
            max={getMaxPrice}
            style={{ color: "#de011b" }}
          />
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            fontSize: 12,
            padding: "0px 20px 10px",
          }}
        >
          <div style={{ width: "100%" }}>
            {" "}
            Min
            <br />
            {getPrice[0]}
          </div>
          <div
            style={{
              width: "100%",
              display: "flex",
              justifyContent: "flex-end",
            }}
          >
            {" "}
            Max <br />
            {getPrice[1]}{" "}
          </div>
        </div>
      </div>
    );
  };

  const SortWise = (order) => {
    var arr = [];
    switch (order) {
      case "Low to High":
        arr = getList.sort((a, b) => a.offerprice - b.offerprice);
        setFilterList(arr);
        break;
      case "High to Low":
        arr = getList.sort((a, b) => b.offerprice - a.offerprice);
        setFilterList(arr);
        break;
      case "Oldest to Newest":
        arr = getList.sort((a, b) => a.productid - b.productid);
        setFilterList(arr);
        break;
      case "Newest to Oldest":
        arr = getList.sort((a, b) => b.productid - a.productid);
        setFilterList(arr);
        break;
      default:
        return;
    }
    var list = [];
    arr.map(function (item, index) {
      if (index < 20) {
        list.push(item);
      }
    });
    setPage(list);
    setAvailability("");
    setPrice([getMinPrice, getMaxPrice]);
    setDiscount("");
  };

  const handleOrder = (event) => {
    setOrder(event.target.value);
    var order = event.target.value;
    SortWise(order);
  };

  const SortBy = () => {
    return (
      <RadioGroup value={getOrder} onChange={(event) => handleOrder(event)}>
        <FormControlLabel
          value="Low to High"
          control={<Radio style={{ color: "#de011b" }} size="small" />}
          label={<span style={{ fontSize: 12 }}>Low to High</span>}
        />
        <FormControlLabel
          value="High to Low"
          control={<Radio style={{ color: "#de011b" }} size="small" />}
          label={<span style={{ fontSize: 12 }}>High to Low</span>}
        />
        <FormControlLabel
          value="Oldest to Newest"
          control={<Radio style={{ color: "#de011b" }} size="small" />}
          label={<span style={{ fontSize: 12 }}>Oldest to Newest</span>}
        />
        <FormControlLabel
          value="Newest to Oldest"
          control={<Radio style={{ color: "#de011b" }} size="small" />}
          label={<span style={{ fontSize: 12 }}>Newest to Oldest</span>}
        />
      </RadioGroup>
    );
  };

  const handleChangeAvailability = (event) => {
    setAvailability(event.target.value);
    var arr = [];
    getList.map((item) => {
      if (item.stock > 0) {
        arr.push(item);
      }
    });
    setFilterList(arr);
    var list = [];
    arr.map(function (item, index) {
      if (index < 20) {
        list.push(item);
      }
    });
    setPage(list);
    setDiscount("");
    setPrice([getMinPrice, getMaxPrice]);
    setOrder("");
  };

  const Availability = () => {
    return (
      <div style={{ fontSize: 15 }}>
        <Checkbox
          checked={getAvailabilty == "In Stock"}
          onChange={handleChangeAvailability}
          style={{ color: "#de011b" }}
          value="In Stock"
        />
        <span style={{ padding: "10px 0px" }}>In Stock</span>
      </div>
    );
  };

  const DiscountWise = (discount) => {
    var arr = [];
    switch (discount) {
      case "40% or more":
        getList.map((item) => {
          var dis = Math.ceil(
            ((item.price - item.offerprice) / item.price) * 100
          );
          if (dis >= 40) {
            arr.push(item);
          }
        });
        setFilterList(arr);
        break;
      case "30% or more":
        getList.map((item) => {
          var dis = Math.ceil(
            ((item.price - item.offerprice) / item.price) * 100
          );
          if (dis >= 30) {
            arr.push(item);
          }
        });
        setFilterList(arr);
        break;
      case "20% or more":
        getList.map((item) => {
          var dis = Math.ceil(
            ((item.price - item.offerprice) / item.price) * 100
          );
          if (dis >= 20) {
            arr.push(item);
          }
        });
        setFilterList(arr);
        break;
      case "10% or more":
        getList.map((item) => {
          var dis = Math.ceil(
            ((item.price - item.offerprice) / item.price) * 100
          );
          if (dis >= 10) {
            arr.push(item);
          }
        });
        setFilterList(arr);
        break;
      default:
        return;
    }
    var list = [];
    arr.map(function (item, index) {
      if (index < 20) {
        list.push(item);
      }
    });
    setPage(list);
    setAvailability("");
    setPrice([getMinPrice, getMaxPrice]);
    setOrder("");
  };

  const handleDiscount = (event) => {
    setDiscount(event.target.value);
    DiscountWise(event.target.value);
  };

  const Discount = () => {
    return (
      <div>
        <RadioGroup
          value={getDiscount}
          onChange={(event) => handleDiscount(event)}
        >
          <FormControlLabel
            value="40% or more"
            control={<Radio style={{ color: "#de011b" }} size="small" />}
            label={<span style={{ fontSize: 12 }}>40% or more</span>}
          />
          <FormControlLabel
            value="30% or more"
            control={<Radio style={{ color: "#de011b" }} size="small" />}
            label={<span style={{ fontSize: 12 }}>30% or more</span>}
          />
          <FormControlLabel
            value="20% or more"
            control={<Radio style={{ color: "#de011b" }} size="small" />}
            label={<span style={{ fontSize: 12 }}>20% or more</span>}
          />
          <FormControlLabel
            value="10% or more"
            control={<Radio style={{ color: "#de011b" }} size="small" />}
            label={<span style={{ fontSize: 12 }}>10% or more</span>}
          />
        </RadioGroup>
      </div>
    );
  };


  const Filters = () => {
    return (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          backgroundColor: "#fff",
          margin: "20px 0px",
          height: "auto",
          position: "sticky",
          top: 120,
        }}
      >
        <div style={{ fontSize: 16, fontWeight: "bold", padding: 10 }}>
          {" "}
          Filters
        </div>
        <Divider />
        <div>
          {" "}
          <div className={classes.filterStyle}>Price</div> {Price()}{" "}
        </div>
        <Divider />
        <div>
          <Accordion elevation={0}>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
              style={{ fontSize: 14, fontWeight: "bold" }}
            >
              Sort By
            </AccordionSummary>
            <AccordionDetails>{SortBy()}</AccordionDetails>
          </Accordion>
        </div>
        <Divider />
        <div>
          <Accordion elevation={0}>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
              style={{ fontSize: 14, fontWeight: "bold" }}
            >
              Discount
            </AccordionSummary>
            <AccordionDetails>{Discount()}</AccordionDetails>
          </Accordion>
        </div>
        <Divider />
        <div>
          <Accordion elevation={0}>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
              style={{ fontSize: 14, fontWeight: "bold" }}
            >
             Brands
            </AccordionSummary>
            <AccordionDetails>{BrandFilter()}</AccordionDetails>
          </Accordion>
        </div>
        <Divider/>
        <div>
          {" "}
          <div className={classes.filterStyle}>Availability</div>{" "}
          {Availability()}{" "}
        </div>
       
      </div>
    );
  };

  const ProductsData = () => {
    return (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          margin: "20px 10px",
        }}
      >
        <div
          className={classes.divStyle}
          style={{ display: "flex", flexDirection: "row", color: "none" }}
        >
          <div style={{ width: "100%", padding: "0px 10px", fontSize: 17 }}>
            <b>{getCategory.categoryname}</b>
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "flex-end",
              width: "100%",
              padding: "0px 10px",
              fontSize: 17,
            }}
          >
            Showing &nbsp;
            <b>
              {getPage.length}/{getFilterList.length}
            </b>{" "}
            &nbsp;items
          </div>
        </div>
        <div className={classes.divStyle}>
          <div
            className={classes.hover}
            style={{
              border: "1px solid #de011b",
              borderRadius: 20,
              padding: "5px 10px",
              width: 130,
              cursor: "pointer",
              textAlign: "center",
            }}
            onClick={() => fetchData()}
          >
            All Products
          </div>
        </div>
        <div className={classes.divStyle} style={{ backgroundColor: "#fff" }}>
          <div className={classes.scardview}>
            {getFilterList.length == 0 ? (
              <h4>No Products found</h4>
            ) : (
              ShowProducts()
            )}
          </div>
        </div>
        {getFilterList.length / 20 <= 1 ? (
          <></>
        ) : (
          <div className={classes.center} style={{ width: "100%" }}>
            <Pagination
              count={Math.ceil(getFilterList.length / 20)}
              variant="outlined"
              shape="rounded"
              onChange={(event, page) => handlePages(event, page)}
            />
          </div>
        )}
      </div>
    );
  };

  return (
    <div className={classes.grow}>
      <Header history={props.history} />
      <div className={classes.center}>
        <div
          style={{ width: window.innerWidth, margin: 5, padding: "5px 20px" }}
        >
          <Grid container spacing={1}>
            <Grid item xs={12} md={2}>
              {Filters()}
            </Grid>
            <Grid item xs={12} md={10}>
              {getState ? (
                ProductsData()
              ) : (
                <div className={classes.center} style={{ marginTop: 100 }}>
                  <CircularProgress style={{ color: "#de011b" }} />
                </div>
              )}
            </Grid>
          </Grid>
        </div>
      </div>
      <Footer history={props.history} />
    </div>
  );
}
