//test.js  
//获取应用实例  
var app = getApp()
Page({
  data: {
    venuesItems: [{
      id: 1,
      smallpic: '/static/images/orderimage.png',
      title: '跟奥巴马学隐蔽式催眠',
      readNum: 360,
    }, {
      id: 2,
      smallpic: '/static/images/orderimage.png',
      title: '跟奥巴马学隐蔽式催眠',
      readNum: 360,
    }, {
      id: 3,
      smallpic: '/static/images/orderimage.png',
      title: '跟奥巴马学隐蔽式催眠',
      readNum: 360,
    }],
    imgUrls: [
      {
        url: 'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg'
      }, {
        url: 'http://img06.tooopen.com/images/20160818/tooopen_sy_175866434296.jpg'
      }, {
        url: 'http://img06.tooopen.com/images/20160818/tooopen_sy_175833047715.jpg'
      }
    ],
    indicatorDots: false,
    autoplay: false,
    interval: 5000,
    duration: 1000,
    userInfo: {}
  },
  onLoad: function () {
    console.log('onLoad test');
  }
}) 