// 云函数入口文件
const cloud = require('wx-server-sdk')
cloud.init({ env: cloud.DYNAMIC_CURRENT_ENV }) // 使用当前云环境
const db = cloud.database()

// 云函数入口函数
exports.main = async (event, context) => {
  try {
    // 获取详情页轮播图列表
    let detailBannerList = await db.collection("coffeeDetail_bannerList").where({
      spu_id: event.id
    }).get()
    
    // 为每个轮播图项添加 id 属性
    detailBannerList.data.forEach(item => {
      item.id = item._id
    })

    // 获取商品信息
    let spuGetFromDatabase = await db.collection("coffeeList_spu").doc(event.id).get()
    let spu = spuGetFromDatabase.data
    spu.id = spu._id

    // 将轮播图列表添加到商品信息中
    spu.bannerList = detailBannerList.data

    // 获取商品规格信息
    let skuGetFromDatabase = await db.collection("coffeeList_sku").get()
    skuGetFromDatabase.data.forEach(item => {
      item.id = item._id
    })

    // 获取商品规格的 meta 信息
    let metaList = await db.collection("coffeeList_meta").get()
    metaList.data.forEach(item => {
      item.id = item._id
    })

    // 获取商品规格的 metaValue 信息
    let metaValueList = await db.collection("coffeeList_metaValue").get()
    metaValueList.data.forEach(item => {
      item.id = item._id
    })

    // 为每个商品规格添加 meta 信息
    for (let sku of skuGetFromDatabase.data) {
      for (let meta of sku.metaList_id) {
        let metaYouNeed = metaList.data.find(m => m._id === meta.meta_id)
        let metaValueYouNeed = metaValueList.data.find(mv => mv._id === meta.metaValue_id)
        metaValueYouNeed.id = metaValueYouNeed._id
        metaYouNeed.id = metaYouNeed._id
        const {id,name} = metaYouNeed
        sku.metaList.push({
          id,
          name,
          value: metaValueYouNeed
        })
      }
      
    }

    // 将商品规格列表添加到商品信息中
    spu.skuList = skuGetFromDatabase.data

    // 将 metaValue 添加到 metaList 中
    for (let meta of metaList.data) {
      meta.value = metaValueList.data.filter(mv => mv.meta_id === meta._id)
      meta.checkedValue = meta.value[0]
    }

    // 将 metaList 添加到商品信息中
    spu.metaList = metaList.data

    return spu
  } catch (error) {
    console.error(error)
    return error
  }
}
