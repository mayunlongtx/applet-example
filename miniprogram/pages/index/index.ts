// index.ts
// 获取应用实例
import { formatRichText } from '../../utils/util'

Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    canIUseGetUserProfile: false,
    canIUseOpenData: wx.canIUse('open-data.type.userAvatarUrl') && wx.canIUse('open-data.type.userNickName'), // 如需尝试获取用户信息可改为false
    webViewSrc:'',
    nodes: `<p>我是普通的标签</p>\n<p>&nbsp;</p>\n<p>
    <p><a href=\"https://www.baidu.com/\" target=\"_blank\" rel=\"noopener\">我是url</a></p>
    <p><a href=\"https://xxx.pdf\" target=\"_blank\" rel=\"noopener\">我是文件</a></p>
    <img src="https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fpic1.win4000.com%2Fwallpaper%2F8%2F549cf5201acb9.jpg&refer=http%3A%2F%2Fpic1.win4000.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1669006938&t=36c83de484db3fb99305e418d602b6f8" /></p>`
  },
  // 分享
  onShareAppMessage: function (res) {
    // 可以通过判断 res.from 判断触发分享的方式。
    return {
      title: '一个好东西',
      path: '/pages/index/index',
      imageUrl: 'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fpic1.win4000.com%2Fwallpaper%2F8%2F549cf5201acb9.jpg&refer=http%3A%2F%2Fpic1.win4000.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1669006938&t=36c83de484db3fb99305e418d602b6f8'
    }
  },
  onLoad() {
    let imgContent = formatRichText(this.data.nodes)
    this.setData({
      nodes: imgContent
    });
  },
  linktap(e: any){
    console.log('e--->', e);
    wx.downloadFile({
      url: e.detail.href,
      success: function (res) {
        const filePath = res.tempFilePath
        wx.openDocument({
          filePath: filePath,
          success: function (res) {
            console.log('打开文档成功')
          }
        })
      }
    })
    return
    wx.navigateTo({
      url: `/pages/web-view/web-view?url=${e.detail.href}`,
    })
      
  },
})
