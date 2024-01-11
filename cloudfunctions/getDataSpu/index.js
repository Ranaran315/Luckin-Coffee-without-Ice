// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({ env: cloud.DYNAMIC_CURRENT_ENV }) // 使用当前云环境

const db = cloud.database()
// 云函数入口函数
exports.main = async (event, context) => {
  // 获取coffeeList_spu表中的数据
  let dataList = await db.collection("coffeeList_spu").get()
  // 获取categoryList表中的数据
  let categoryList =await db.collection("categoryList").get()
  let ca = categoryList.data
  for(let i of ca){
    i.id = i._id
    i.coffeeList = []
  }

  let da = dataList.data
  for (let j of da){
    j.id = j._id
    for(let i of ca){
      if(j.categoryList_id == i.id){
        i.coffeeList.push(j)
      }
    }
  }
  return ca
 
}