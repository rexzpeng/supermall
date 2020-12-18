import{
  ADD_COUNTER,
  ADD_TO_CART
} from './mutation-types'
export default {
  addCart(context,payload){
    //payload 新添加商品
    //c1.查找之前数组中是否含有该商品
    let oldProduct = context.state.cartList.find(item=>item.iid === payload.iid)
    
    //2.判断oldProduct
    if(oldProduct){
     // oldProduct.count += 1
     context.commit('addCounter',oldProduct)
    }else{
      payload.count = 1
      //context.state.cartList.push(payload)
      context.commit('addToCart',payload)
    }

  }
}