// zh_zbkq/pages/index/sjfl.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    districtList: [{ name: "全部" }, { name: "次卡" }],
    typeList: [{ id: 0, name: "全部分类" }],
    yhqList: ["全部","未失效",'已失效'],
    districtChioceIcon: "../../../img/icon-go-black.png",
    typeChioceIcon: "../../../img/icon-go-black.png",
    yhqChioceIcon: "../../../img/icon-go-black.png",
    activeDistrictIndexname: '选择卡的类型',
    activeTypeIndexname: '选择卡的类型',
    activeYhqIndexname: '选择卡的期限',
    borbtm: 1,
    mdlist: [],
    qqsj: false,
    pagenum: 1,
    flpagenum: 1,
    storelist: [],
    flstorelist: [],
    mygd: false,
    jzgd: true,
    kname:'',
    time:''
  },
  tzxq:function(e){
    wx.navigateTo({
      url: 'hxjl?kid=' + e.currentTarget.dataset.kid + '&cid=' + e.currentTarget.dataset.cid,
    })
  },
  ljsy: function (e) {
    wx.navigateTo({
      url: 'hxq?kid=' + e.currentTarget.dataset.kid,
    })
  },
  hideAllChioce: function () {
    this.setData({
      districtChioceIcon: "../../../img/icon-go-black.png",
      typeChioceIcon: "../../../img/icon-go-black.png",
      yhqChioceIcon: "../../../img/icon-go-black.png",
      chioceDistrictList: false,
      chioceTypeList: false,
      chioceYhqList: false,
    });
  },
  choiceItem: function (e) {
    this.setData({
      borbtm: e.currentTarget.dataset.item
    })
    switch (e.currentTarget.dataset.item) {
      case "1":
        if (this.data.chioceDistrictList) {
          this.setData({
            districtChioceIcon: "../../../img/icon-go-black.png",
            typeChioceIcon: "../../../img/icon-go-black.png",
            yhqChioceIcon: "../../../img/icon-go-black.png",
            chioceDistrictList: false,
            chioceTypeList: false,
            chioceYhqList: false,
          });
        }
        else {
          this.setData({
            districtChioceIcon: "../../../img/icon-down-black.png",
            typeChioceIcon: "../../../img/icon-go-black.png",
            yhqChioceIcon: "../../../img/icon-go-black.png",
            chioceDistrictList: true,
            chioceTypeList: false,
            chioceYhqList: false,
          });
        }
        break;
      case "2":
        if (this.data.chioceTypeList) {
          this.setData({
            districtChioceIcon: "../../../img/icon-go-black.png",
            typeChioceIcon: "../../../img/icon-go-black.png",
            yhqChioceIcon: "../../../img/icon-go-black.png",
            chioceDistrictList: false,
            chioceTypeList: false,
            chioceYhqList: false,
          });
        }
        else {
          this.setData({
            districtChioceIcon: "../../../img/icon-go-black.png",
            typeChioceIcon: "../../../img/icon-down-black.png",
            yhqChioceIcon: "../../../img/icon-go-black.png",
            chioceDistrictList: false,
            chioceTypeList: true,
            chioceYhqList: false,
          });
        }
        break;
      case "3":
        if (this.data.chioceYhqList) {
          this.setData({
            districtChioceIcon: "../../../img/icon-go-black.png",
            typeChioceIcon: "../../../img/icon-go-black.png",
            yhqChioceIcon: "../../../img/icon-go-black.png",
            chioceDistrictList: false,
            chioceTypeList: false,
            chioceYhqList: false,
          });
        }
        else {
          this.setData({
            districtChioceIcon: "../../../img/icon-go-black.png",
            typeChioceIcon: "../../../img/icon-go-black.png",
            yhqChioceIcon: "../../../img/icon-down-black.png",
            chioceDistrictList: false,
            chioceTypeList: false,
            chioceYhqList: true,
          });
        }
        break;
    }
  },
  selectDistrict: function (e) {
    var that = this;
    console.log(e.currentTarget.dataset.index)
    if (e.currentTarget.dataset.index == 0) {
      var kname = '';
    }
    else {
      var kname = this.data.districtList[e.currentTarget.dataset.index].name;
    }
    console.log(kname)
    this.setData({
      activeDistrictIndexname: this.data.districtList[e.currentTarget.dataset.index].name,
      kname: kname,
      mdlist: [],
      qqsj: false,
      pagenum: 1,
      // flpagenum: 1,
      // storelist: [],
      // flstorelist: [],
      mygd: false,
      jzgd: true,
      chioceDistrictList: false,
      chioceTypeList: false,
      chioceYhqList: false,
    })
    that.reLoad()
  },
  selectType: function (e) {
    var that = this;
    console.log(e.currentTarget.id, e.currentTarget.dataset.index)
    if (e.currentTarget.dataset.index == 0) {
      var typeid = '';
    }
    else {
      var typeid = e.currentTarget.id;
    }
    console.log(typeid)
  },
  selectYhq: function (e) {
    var that = this;
    console.log(e.currentTarget.dataset.index)
    var typeid = e.currentTarget.dataset.index;
    console.log(typeid)
    if(typeid=='全部'){
      typeid=''
    }
    this.setData({
      activeYhqIndexname: e.currentTarget.dataset.index,
      time: typeid,
      mdlist: [],
      qqsj: false,
      pagenum: 1,
      // flpagenum: 1,
      // storelist: [],
      // flstorelist: [],
      mygd: false,
      jzgd: true,
      chioceDistrictList: false,
      chioceTypeList: false,
      chioceYhqList: false,
    })
    that.reLoad()
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    this.setData({
      flid:options.flid,
      url: getApp().imgurl
    })
    this.reLoad()
    var that = this;
    var xtxx = wx.getStorageSync('xtxx')
    console.log(xtxx)
    this.setData({
      xtxx: xtxx,
    })
    wx.setNavigationBarColor({
      frontColor: '#ffffff',
      backgroundColor: xtxx.link_color,
    })
  },
  reLoad:function(){
    var that = this, k_name = this.data.kname, time_name = this.data.time, store_id = wx.getStorageSync('sjdsjid');
    console.log('hqfllb', this.data.pagenum, k_name, store_id, time_name)
    //取门店;
    app.util.request({
      'url': 'entry/wxapp/StoreCardList',
      'cachetime': '0',
      data: { store_id: store_id, type: k_name, yxq: time_name, page: that.data.pagenum,pagesize:10 },
      success: function (res) {
        console.log('分页返回的分类门店列表数据', res.data)
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
        var mdlist = that.data.mdlist;
        mdlist = mdlist.concat(res.data)
        that.setData({
          qqsj: true,
          list: mdlist,
          mdlist: mdlist,
        })
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
      // wx.showToast({
      //   title: '没有更多了',
      //   icon: 'loading',
      //   duration: 1000,
      // })
    }
  },

  /**
   * 用户点击右上角分享
   */
  // onShareAppMessage: function () {

  // }
})