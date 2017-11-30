/**
 * Created by chenmao on 2017/7/11.
 */
import * as Util from './Fetch'
import * as constant from './constants'
import NativeShare from './native'
/**
 * shareInfo={
 *      title:'',分享标题,
 *      desc:'',分享描述,
 *      imgUrl:'',分享图片缩略图url,
 *      linkUrl:'',分享连接url
 * }
 *jsApiList是一个需要用到微信api数组；例如['checkJsApi','chooseImage','onMenuShareAppMessage','onMenuShareTimeline','onMenuShareQQ']；
 *url当前页面通过encodeURIComponent(location.href.split('#')[0]);取得
 * isGoodDetailPage判断是否是商品详情的分享
 */
export const wxShare=(url,jsApiArr,shareContent,isGoodDetailPage)=>{
    Util.get("/weixin/sharePage?pageUrl="+url,(res)=>{
        if(res.status==0){
            console.log(res)
            let nativeShare = new NativeShare();
            nativeShare.setConfig({
                wechatConfig: {
                    appId: constant.appId, // 公众号的唯一标识
                    timestamp: res.body.nowTime, // 生成签名的时间戳ex
                    nonceStr: res.body.noncestr, // 生成签名的随机串
                    signature: res.body.encodeTicket // 签名
                }
            });
            constant.access_token=res.body.accessToken;
            let shareData = {
                title: isGoodDetailPage ? shareContent.title : constant.shareShopTitle,
                desc: isGoodDetailPage ? shareContent.desc : constant.shareShopDesc,
                // 如果是微信该link的域名必须要在微信后台配置的安全域名之内的。
                link: isGoodDetailPage ? shareContent.linkUrl : constant.commonServerUrl+'/index.html',
                icon: isGoodDetailPage ? shareContent.imgUrl : constant.shareShopImgUrl,
                // 不要过于依赖以下两个回调，很多浏览器是不支持的
                success: function () {

                },
                fail: function () {

                }
            };
            nativeShare.setShareData(shareData);
            // try {
            //     nativeShare.call();
            //     // 如果是分享到微信则需要 nativeShare.call('wechatFriend')
            //     // 类似的命令下面有介绍
            // } catch(err) {
            //     // 如果不支持，你可以在这里做降级处理
            // }
        }else{
            //alert(res.msg);
        }
    },(err)=>{
        console.log(err);
    });
};