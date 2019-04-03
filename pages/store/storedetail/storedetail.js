// pages/storedetail/storedetail.js
const app = getApp()
var fileData = require("../../../utils/data.js");

Page({

  /**
   * 页面的初始数据
   */
  data: {
    // courseData: fileData.getCourseData(),
    courseData:null,
    listData: fileData.getListData(),
    storeListData:null
  },
  buyCourse: function (e) {
    var _this = this
    var url_tmp = fileData.getListConfig().url_test;
    wx.request({
      url: url_tmp+'/pay/id',
      data: {
        // desc: 'iPhone XS Max',
        // order_no: '20190329000002'
        desc:'示例商品...',
        order_no: _this.getOrderNo(),
        openid: app.globalData.openid,
        price: e.currentTarget.dataset.price
      },
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded' // 默认值
      },
      success(res) {
        console.log(res.data)
        _this.setData({
          timeStamp: res.data.timestamp,
          nonceStr: res.data.noncestr,
          package: res.data.package,
          signType: 'MD5',
          paySign: res.data.sign
        })
        wx.requestPayment({
          timeStamp: _this.data.timeStamp,
          nonceStr: _this.data.nonceStr,
          package: _this.data.package,
          signType: 'MD5',
          paySign: _this.data.paySign,
          success(res) {
            console.log('支付成功：'+res)
          },
          fail(res){
            console.log('支付失败'+res)
          }
        })
      }

    })
  },
  getOrderNo: function () {
    const now = new Date()
    var tmp = (now - 1) + (Math.round(Math.random() * 89 + 100)).toString()
    console.log('订单号为'+tmp)
    return tmp
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log("开始请求门店信息！！")
    var url_tmp = fileData.getListConfig().url_test;
    var _this=this;
    console.log('options.id==='+options.id)
    wx.request({
      url: url_tmp + '/mydb/showClub?id=' + options.id,
      success(res) {
        console.log(res.data)
        
        _this.setData({
          storeListData: res.data
        })
      }
    }) 
    wx.request({
      url: url_tmp + '/mydb/showCoachCourse1?id=' + options.id,
      success(res) {
        console.log(res.data)
        _this.setData({
          courseData: res.data
        })
      }
    }) 


  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },

})