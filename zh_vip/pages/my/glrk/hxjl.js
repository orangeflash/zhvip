// zh_vip/pages/my/glrk/hxjl.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    pagenum: 1,
    order_list: [],
    storelist: [],
    mygd: false,
    jzgd: true,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
     wx.setNavigationBarTitle({
       title: '核销记录',
     })
     this.setData({
       card_id: options.kid
     })
    this.reLoad()
  },
  reLoad: function () {
    var that = this, activeIndex = this.data.activeIndex, card_id = this.data.card_id, page = this.data.pagenum;
    var fxddtype
    if (activeIndex == 0) {
      fxddtype = '1'
    }
    if (activeIndex == 1) {
      fxddtype = '2'
    }
    if (activeIndex == 2) {
      fxddtype = '3'
    }
    console.log(activeIndex, fxddtype, card_id, page)
    app.util.request({
      'url': 'entry/wxapp/CardRecord',
      'cachetime': '0',
      data: { card_id: card_id, page: page, pagesize: 10 },
      success: function (res) {
        console.log('分页返回的列表数据', res.data)
        // for (let i = 0; i < res.data.length; i++) {
        //   res.data[i].time = util.ormatDate(res.data[i].time)
        // }
        if (res.data.length < 10) {
          that.setData({
            mygd: true,
            jzgd: true,
          })
        }
        else {
          that.setData({
            jzgd: true,
            pagenum: that.data.pagenum + 1,
          })
        }
        var storelist = that.data.storelist;
        storelist = storelist.concat(res.data);
        function unrepeat(arr) {
          var newarr = [];
          for (var i = 0; i < arr.length; i++) {
            if (newarr.indexOf(arr[i]) == -1) {
              newarr.push(arr[i]);
            }
          }
          return newarr;
        }
        storelist = unrepeat(storelist)
        that.setData({
          order_list: storelist,
          storelist: storelist
        })
        console.log(storelist)
      }
    });
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
    console.log('上拉加载', this.data.pagenum)
    var that = this;
    if (!this.data.mygd && this.data.jzgd) {
      this.setData({
        jzgd: false
      })
      this.reLoad();
    }
    else {
    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})