"use strict";
// pages/meeting/detail.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    meeting_id: 0,
    owner: false,
    joined: false,
    info: {}
  },

  refresh: function () {
    if (this.data.meeting_id <= 0) {
      return
    }
    app.api.api_meeting_info({ meeting_id: this.data.meeting_id }).then(res => {
      this.setData({
        info: res
      })
      app.userInfo().then(res => {
        let joined = false
        for(var i in this.data.info.attendees){
          if (this.data.info.attendees[i].id == res.id){
            joined = true
            break
          }
        }
        this.setData({
          owner: res.id == this.data.info.user.id,
          joined: joined
        })
      })
    })
  },
  join: function(){

    app.api.api_meeting_join({ meeting_id: this.data.meeting_id }).then(res => {
      this.refresh()
    })
  },
  leave: function(){

    app.api.api_meeting_leave({ meeting_id: this.data.meeting_id }).then(res => {
      this.refresh()
    })
  },
  edit: function(){
    wx.navigateTo({
      url: 'edit?meeting_id=' + this.data.meeting_id,
    })
  },
  del: function(){
    wx.showModal({
      title: '提示',
      content: '确定要删除吗？',
      success: sm => {
        if (sm.confirm) {
          app.api.api_meeting_cancel({ meeting_id: this.data.meeting_id }).then(res => {
            wx.navigateBack()
          })
        }
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let meeting_id = options.meeting_id
    if(meeting_id){
      this.setData({ meeting_id: meeting_id})
    }else{
      wx.showToast({
        title: '参数错误',
        icon: 'none'
      })
      wx.navigateBack()
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
    this.refresh()
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