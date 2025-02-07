"use strict";
// pages/room/edit.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    user_info: {},
    room_id: 0,
    name: "",
    description: ""
  },
  refreshInfo: function() {
    if (this.data.room_id > 0){
      app.api.api_meeting_room_info({ room_id: this.data.room_id}).then(res => {
        this.setData({
          name: res.name,
          description: res.description
        })
      })
    }
  },
  bindKeyInput(e) {
    this.data[e.currentTarget.dataset.obj] = e.detail.value
  },
  onGetUserInfo: function (e) {
    app.onGetUserInfo(e).then(res => {
      this.setData({ user_info: res })
    })
  },
  save: function() {

    if (this.data.room_id > 0) {
      app.api.api_meeting_room_edit({
        room_id: this.data.room_id,
        name: this.data.name,
        description: this.data.description
      }).then(res => {
        wx.navigateBack()
      })
    } else {
      app.api.api_meeting_room_create({
        name: this.data.name,
        description: this.data.description
      }).then(res => {
        wx.redirectTo({
          url: 'detail?room_id='+res.id,
        })
      })
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    app.userInfo().then(res => {
      this.setData({ user_info: res })
    })
    let room_id = options.room_id
    if(room_id){
      this.setData({ room_id: parseInt(room_id)})
      this.refreshInfo()
    }
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
    this.refreshInfo()
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

  }
})