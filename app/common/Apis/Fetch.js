/**
 * 封装get,post等请求方法
 * Created by chenmao on 2017/6/28.
 */

const commonUrl="http://192.168.9.81/dianbao-admin";
const commonIp="http://192.168.9.81";
// const commonIp="https://uu.wedo77.com";
// const commonUrl="https://uu.wedo77.com/dianbao-admin";

export const get=(url,successCallback,failCallback)=>{
    $.ajax({
        type: "GET",
        url: commonUrl+url,
        cache:false,
        dataType: "json",
        success: function(data){
            successCallback(data);
        },
        error:function (err) {
            failCallback(err);
        }
    });
};
export const postWithIp=(url,data,successCallback,failCallback)=>{
    let Url=commonIp+url;
    $.ajax({
        type: "POST",
        url: Url,
        data: data,
        dataType: "json",
        cache:false,
        beforeSend:function(){
            //发送之前的回调，返回false可以取消本次请求
        },
        success: function(data){
            successCallback(data);
        },
        error:function (err) {
            failCallback(err);
        },
        complete:function () {
            //不管成功失败都走这个回调
        }
    });
};

export const post=(url,data,successCallback,failCallback)=>{
    let Url=commonUrl+url;
    $.ajax({
        type: "POST",
        url: Url,
        data: data,
        dataType: "json",
        cache:false,
        beforeSend:function(){
            //发送之前的回调，返回false可以取消本次请求
        },
        success: function(data){
            successCallback(data);
        },
        error:function (err) {
            failCallback(err);
        },
        complete:function () {
            //不管成功失败都走这个回调
        }
    });
};

export const postTow=(url,data,successCallback,failCallback)=>{
    let Url=commonUrl+url;
    $.ajax({
        type: "POST",
        url:Url,
        //data: data,
        contentType: "application/json; charset=utf-8",
        data:JSON.stringify(data),
        dataType: "json",
        beforeSend:function(){
            //发送之前的回调，返回false可以取消本次请求
        },
        success: function(data){
            successCallback(data);
        },
        error:function (err) {
            failCallback(err);
        },
        complete:function () {
            //不管成功失败都走这个回调
        }
    });
};


