import { requset } from "./request";

export function getHomeMultidata () {
  return requset({
    url: "/home/multidata"
  })
}


export function getHomeGoods (type, page) {
  return requset({
    url: '/home/data',
    params: {
      type,
      page
    }
  })
}

//函数调用 -> 压入函数栈(保存函数调用使用过程中所有变量)
//函数调用结束-> 弹出函数栈(释放函数所有的变量)
// function test(){
//   const name = ['rex','aaa']
// }

// test()


// test()