//copy from net

//实现在指定图片集中随机替换背景图片

var imgArr=[
    "http://pb37tp5ix.bkt.clouddn.com/img/bg/background-cover-1.jpg", 
    "http://pb37tp5ix.bkt.clouddn.com/img/bg/background-cover-2.jpg", 
    "http://pb37tp5ix.bkt.clouddn.com/img/bg/background-cover-3.jpg", 
    "http://pb37tp5ix.bkt.clouddn.com/img/bg/background-cover-4.jpg",
    "http://pb37tp5ix.bkt.clouddn.com/img/bg/background-cover-5.jpg",
    "http://pb37tp5ix.bkt.clouddn.com/img/bg/background-cover-6.jpg",
    "http://pb37tp5ix.bkt.clouddn.com/img/bg/background-cover-7.jpg",
    "http://pb37tp5ix.bkt.clouddn.com/img/bg/background-cover-8.jpg",
    "http://pb37tp5ix.bkt.clouddn.com/img/bg/background-cover-9.jpg",
    "http://pb37tp5ix.bkt.clouddn.com/img/bg/background-cover-10.jpg",
    "http://pb37tp5ix.bkt.clouddn.com/img/bg/background-cover-11.jpg",
    "http://pb37tp5ix.bkt.clouddn.com/img/bg/background-cover-12.jpg",
    "http://pb37tp5ix.bkt.clouddn.com/img/bg/background-cover-13.jpg",
    "http://pb37tp5ix.bkt.clouddn.com/img/bg/background-cover-14.jpg",
    "http://pb37tp5ix.bkt.clouddn.com/img/bg/background-cover-15.jpg",
    "http://pb37tp5ix.bkt.clouddn.com/img/bg/background-cover-16.jpg",
    "http://pb37tp5ix.bkt.clouddn.com/img/bg/background-cover-17.jpg",
    "http://pb37tp5ix.bkt.clouddn.com/img/bg/background-cover-18.jpg",
    "http://pb37tp5ix.bkt.clouddn.com/img/bg/background-cover-19.jpg",
    "http://pb37tp5ix.bkt.clouddn.com/img/bg/background-cover-20.jpg",
    "http://pb37tp5ix.bkt.clouddn.com/img/bg/background-cover-21.jpg"
]; 
 

var index =parseInt(Math.random()*(imgArr.length-1)); 

var currentImage=imgArr[index]; 

document.getElementById("BackgroundArea").style.backgroundImage="url("+currentImage+")"; 
