const app = getApp()
Page(
  {
    data: {
      orderList: [{
        id: "1",
        imageSrc: "/static/images/orderimage.png",
        time: "2017年12月31日",
        goodsName: "iphone x保护套",
        orderNum: "#42463242",
        orderState: "已送达,"
      }],
    },

    onLoad: function () {
      if (app.globalData.userInfo) {
        this.setData({
          userInfo: app.globalData.userInfo,
          hasUserInfo: true
        })
      } else if (this.data.canIUse) {
        // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
        // 所以此处加入 callback 以防止这种情况
        app.userInfoReadyCallback = res => {
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      } else {
        // 在没有 open-type=getUserInfo 版本的兼容处理
        wx.getUserInfo({
          success: res => {
            app.globalData.userInfo = res.userInfo
            this.setData({
              userInfo: res.userInfo,
              hasUserInfo: true
            })
          }
        })
      }
    },
  })