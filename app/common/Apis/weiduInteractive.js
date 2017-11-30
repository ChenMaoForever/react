/**
 * Created by andyWang on 2017/10/30.
 */
import * as constants from './constants'
import * as Utils from './Utils'
import * as Fetch from './Fetch';
import { Modal } from 'antd-mobile';
const alert = Modal.alert;
//授权登录调用原生方法
export const userAuthorization=()=>{
    //let qqq=readUserInfo();
    // alert("调用原生方法");
    let ua = navigator.userAgent.toLowerCase();
    //alert(ua.match(/kaBao_UU_Wedo/i));
    if(ua.match(/kaBao_UU_Wedo/i)=="kabao_uu_wedo") {
    //在微度app中
        let data={
            type:"1"
        };
        let pla = ismobile(1);
        if(pla === 1) {
            window.business.toGetParamMessageFromApp(JSON.stringify(data));
        } else if(pla === 0) {
             // alert("qqqqq");
            window.webkit.messageHandlers.toGetParamMessageFromApp.postMessage(JSON.stringify(data));
        }
    } else {
     //不在微度app中
    }

};
//原生调用H5方法返回s
window.sendMessageToJS=function(data){
   // alert("授权第一章");
   // alert(data);
    let userInfoData=JSON.parse(data);
    let userInfo={
        enterpriseName:userInfoData.contentMsg.enterpriseName,
        kabaoId:userInfoData.contentMsg.kabaoId,//
        enterpriseId:userInfoData.contentMsg.enterpriseId,//商户id
        moblie:userInfoData.contentMsg.moblie//手机号码
    };
    let body={
        kabaoId:userInfoData.contentMsg.kabaoId,
        mobile:userInfoData.contentMsg.moblie
    };
    Fetch.post('/user/getUserId',body, (response) => {
       // console.log(response);
        // alert("666666");
       // alert(response.status);
        if(response.status===0){
           // alert(response.body.enterpriseName);
            let userInfo={
                enterpriseName:response.body.enterpriseName,
                kabaoId:userInfoData.contentMsg.kabaoId,//卡宝用户id
                enterpriseId:response.body.enterpriseId,//商户id
                moblie:userInfoData.contentMsg.moblie,//手机号码
                userId:response.body.userId//商户id
            };
            Utils.saveUserId(userInfo);
        }
    }, (error) => {
      //  alert("77777");
    });
};
//判断手机机型0:iPhone 1:Android
export const ismobile=(test)=>{
    let u = navigator.userAgent,
        app = navigator.appVersion;
    if(/AppleWebKit.*Mobile/i.test(navigator.userAgent) || (/MIDP|SymbianOS|NOKIA|SAMSUNG|LG|NEC|TCL|Alcatel|BIRD|DBTEL|Dopod|PHILIPS|HAIER|LENOVO|MOT-|Nokia|SonyEricsson|SIE-|Amoi|ZTE/.test(navigator.userAgent))) {
        if(window.location.href.indexOf("?mobile") < 0) {
            try {
                if(/iPhone|mac|iPod|iPad/i.test(navigator.userAgent)) {
                    return 0;
                } else {
                    return 1;
                }
            } catch(e) {}
        }
    } else if(u.indexOf('iPad') > -1) {
        return 0;
    } else {
        return 1;
    }
};
//分享
//原生调用H5 分享
window.notiJSToGetParameter=function(data){
    let userInfo=Utils.readUserInfo();
    let ua = navigator.userAgent.toLowerCase();
    if(ua.match(/kaBao_UU_Wedo/i)=="kabao_uu_wedo") {
        //在微度app中
        let data;
        if(constants.commodityInformation===null){
            data ={
                type:"1",
                contentMsg:{
                    shopId:"1001",//凤鸣让写死的
                    goodsId:"0",//没有商品id写0
                    title:constants.shareShopTitle,//商品
                    content:constants.shareShopDesc,//分享center
                    picture:constants.shareShopImgUrl,//商品或店铺图片
                    enterpriseId:userInfo.enterpriseId,
                    url:constants.commonServerUrl,
                    shareType:"8"//8 店铺 9 商品
                }
            };
        }else {
            data ={
                type:"1",
                contentMsg:{
                    shopId:"1001",//凤鸣让写死的
                    goodsId:constants.commodityInformation.goodsId,//没有商品id写0
                    title:constants.commodityInformation.title,//商品
                    content:constants.commodityInformation.desc,//分享center
                    picture:constants.commodityInformation.imgUrl,//商品或店铺图片
                    enterpriseId:userInfo.enterpriseId,
                    url:constants.commonServerUrl,
                    shareType:"9"//8 店铺 9 商品
                }
            };
        }

        let pla = ismobile(1);
        if(pla === 1) {
            window.business.sendParamMessageToApp(JSON.stringify(data));
        } else if(pla === 0) {
            //  alert("qqqqq");
            window.webkit.messageHandlers.sendParamMessageToApp.postMessage(JSON.stringify(data));
        }
    } else {
        //不在微度app中
    }
};
//在纬度中打开应用
export const weiduOpenUrl=(paymentData)=>{
   // console.log("伽马",paymentData);
    let config = {
        /*scheme:必须*/
        scheme_IOS: "ubar://?type="+10+"&token="+paymentData,
        scheme_Adr: "ubar://splash/openwith?type="+10+"&token="+paymentData,
        adr_download_url: "http://sj.qq.com/myapp/detail.htm?apkName=com.uns.uu",
        ios_download_url:"https://itunes.apple.com/cn/app/u-ba/id1115165868?l=en&mt=8",
        timeout: 6000,
        //externalOpen:"http://192.168.9.82:8080/UU/browserOpen.html?token="+paymentData
        externalOpen:"https://uu.wedo77.com/UU/browserOpen.html?token="+paymentData
    };
    let browser=browserType();
    console.log(browser);
    if(browser===0){
        let pla=ismobile(1);
        //console.log(pla);
        //  alert(pla);
        if(pla === 0){
           // alert("打开ios支付");
            window.location=config.scheme_IOS;
            t = setTimeout(function(){
                window.location = config.ios_download_url;
            },config.timeout);
            window.onblur = function() {
                clearTimeout(t);
            };
        }else if(pla === 1){//android
           // alert("打开android支付");
            window.location=config.scheme_Adr;
           // $('body').append("<iframe src='"+config.scheme_Adr+"' style='display:none' target='' ></iframe>");
            setTimeout(function(){
                t = window.location = config.adr_download_url;
            },config.timeout);
            t = window.onblur = function() {
                clearTimeout(t);
            };
        }
    }else{
        window.location=config.externalOpen;
    }
};

//判断是在什么浏览器中打开
export const browserType=()=>{
    let ua = navigator.userAgent.toLowerCase();
    if(ua.match(/kaBao_UU_Wedo/i)=="kabao_uu_wedo") {
        return 0;
        //微度浏览器
    }else if(ua.match(/MicroMessenger/i) == 'micromessenger'){
        return 1;
        //微信浏览器
    }else if(ua.match(/Mqqbrowser/i) == "mqqbrowser"){
        if(ua.match(/Mobile/i) == "mobile"){
            return 0;
        }else{
            return 1;
        }
        //在QQ空间打开
    }else if(ua.match(/WeiBo/i) == "weibo") {
        return 1;
        //在微博中打开
    }else {
        return 0;
    }
};

