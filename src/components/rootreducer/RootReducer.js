import { SwapVerticalCircleTwoTone } from "@material-ui/icons"

const initialState={
    cart:{},
    user:{}
}

function setCart(cart){
  localStorage.setItem('cart',JSON.stringify(cart))
}

 function RootReducer(state=initialState,action){
   switch(action.type) {
      case 'ADD_CART':
        state.cart[action.payload[0]]=action.payload[1]
        setCart(state.cart)
        //console.log("cart",state.cart)
        return {cart:state.cart,user:state.user}
      case 'REMOVE_CART':
        delete state.cart[action.payload[0]]
        setCart(state.cart)
        return {cart:state.cart,user:state.user}
      case 'ADD_USER':
        state.user[action.userdata[0]]=action.userdata[1]
        return  {cart:state.cart,user:state.user}
      case 'REMOVE_ALL_CART':
        state.cart={}
        localStorage.removeItem('cart')
        return  {cart:state.cart,user:state.user}
      case 'SET_ALL_CART':
        state.cart=action.cartItems
        //console.log("CART",state.cart)
        return  {cart:state.cart,user:state.user}
      case 'REMOVE_ALL_CART_AND_USER':
          state.cart={}
          state.user={}
          localStorage.removeItem('user')
          localStorage.removeItem('cart')
        return  {cart:state.cart,user:state.user}
      default :
       return state
   }
 }

 export default RootReducer;