// import getStorageItem from 'gdt-jsapi/getStorageItem'
export const getCount = (count) => {
    if(count < 0) return
    if(count < 10000) {
        return count
    } else if(Math.floor (count / 10000) < 10000) {
        return Math.floor (count/1000)/10 + "万";
    } else {
        return Math.floor (count / 10000000)/ 10 + "亿";
    }
}

export const get3Count = (count) => {
  if(count < 0) return
  if(count < 1000) {
      return count
  } else {
      return '999+'
  }
}

export const debounce = (func, delay) => {
    let timer;
    return function (...args) {
      if(timer) {
        clearTimeout(timer)
      };
      timer = setTimeout(() => {
        func.apply(this, args);
        clearTimeout(timer);
      }, delay);
    }
}

export const filterIndex = rankList => {
  for(let i = 0; i< rankList.length - 1; i++) {
    if(rankList[i].tracks.length && !rankList[i+1].tracks.length){
      return i + 1
    }
  }
}


// 处理歌手列表拼接歌手名字
export const getName = list => {
  let str = "";
  list.map ((item, index) => {
    str += index === 0 ? item.name : "/" + item.name;
    return item;
  });
  return str;
};

//对象是否为空
export const isEmptyObject  = obj => !obj || Object.keys(obj).length === 0;

export const clearLocStore = () => {
  localStorage.removeItem('depart_uuid')
  localStorage.removeItem('depart_name')
  localStorage.removeItem('person_uuid')
  localStorage.removeItem('person_name')
  localStorage.removeItem('role_uuid')
  localStorage.removeItem('user_uuid')
  localStorage.removeItem('ftoken')
}
export const getWrapParams = obj => {
  const user = {
    depart_uuid: localStorage.getItem('depart_uuid'),
    depart_name: localStorage.getItem('depart_name'),   
    person_uuid: localStorage.getItem('person_uuid'),
    person_name: localStorage.getItem('person_name'),
    role_uuid: localStorage.getItem('role_uuid'),
    user_uuid: localStorage.getItem('user_uuid'),
    ftoken: localStorage.getItem('ftoken')
  }
  if(isEmptyObject(obj)) {
    obj = {}
  }
  return {
      ...obj,
      ...user
  }
}

export const GetQuery = url => {
  let theRequest = {};  
  if (url.indexOf("?") !== -1) {
     let index = url.indexOf("?")  
     let str = url.substring(index+1);  
     let strs = str.split("&"); 
     for(var i = 0; i < strs.length; i ++) {  
        theRequest[strs[i].split("=")[0]]=unescape(strs[i].split("=")[1]);  
     }  
  }  
  return theRequest; 
}

export const MP = () => {
    let ak = 'xYAKjDGY3Yl1Cia3zLmVMCDkOi9ysaNP';
    return new Promise(function(resolve, reject) {
      var script = document.createElement('script')
      script.type = 'text/javascript'
      script.dataset.name = 'map'
      script.src = `https://api.map.baidu.com/api?v=3.0&ak=${ak}&callback=initMap` //callback调用init函数。
      document.head.appendChild(script)
      window.initMap = (BMap) => {
            resolve(BMap)
      }
      })
}

// const upload = async (dataURL,index) => {
//   let fd = new FormData();
//   let blob = dataURItoBlob(dataURL);
//   fd.append('file', blob);
//   let resImg = await upImgRequest(fd)
//   const data = resImg.data[0]
//   let logoID = data && data.newFileName
//   // let imgsPre = [...imgTemps];
//   imgTemps.push({
//       "uuid": index,
//       "fattach_index": 1,
//       "fattach_link": logoID,
//       "fattach_name": logoID
//   })
//   // console.log("upload",data)
//   // setImgTemps(imgsPre)
// }
export const compress = (img) =>  {
    // 用于压缩图片的canvas
  var canvas = document.createElement("canvas");
  var ctx = canvas.getContext('2d');

  // 瓦片canvas
  var tCanvas = document.createElement("canvas");
  var tctx = tCanvas.getContext("2d");

  var initSize = img.src.length;
  var width = img.width;
  var height = img.height;

  //如果图片大于四百万像素，计算压缩比并将大小压至400万以下
  var ratio;
  if ((ratio = width * height / 4000000)>1) {
      ratio = Math.sqrt(ratio);
      width /= ratio;
      height /= ratio;
  }else {
      ratio = 1;
  }

  canvas.width = width;
  canvas.height = height;

  //铺底色
  ctx.fillStyle = "#fff";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  //如果图片像素大于100万则使用瓦片绘制
  var count;
  if ((count = width * height / 1000000) > 1) {
      count = ~~(Math.sqrt(count)+1); //计算要分成多少块瓦片

  //计算每块瓦片的宽和高
      var nw = ~~(width / count);
      var nh = ~~(height / count);

      tCanvas.width = nw;
      tCanvas.height = nh;

      for (var i = 0; i < count; i++) {
          for (var j = 0; j < count; j++) {
              tctx.drawImage(img, i * nw * ratio, j * nh * ratio, nw * ratio, nh * ratio, 0, 0, nw, nh);

              ctx.drawImage(tCanvas, i * nw, j * nh, nw, nh);
          }
      }
  } else {
      ctx.drawImage(img, 0, 0, width, height);
  }

  //进行最小压缩
  var ndata = canvas.toDataURL('image/jpeg', 0.1);

  console.log('压缩前：' + initSize);
  console.log('压缩后：' + ndata.length);
  console.log('压缩率：' + ~~(100 * (initSize - ndata.length) / initSize) + "%");

  tCanvas.width = tCanvas.height = canvas.width = canvas.height = 0;

  return ndata;
}
export const dataURItoBlob = (dataURI) => {
  var byteString = atob(dataURI.split(',')[1])
  var mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0]
  var ab = new ArrayBuffer(byteString.length)
  var ia = new Uint8Array(ab)
  for (var i = 0; i < byteString.length; i++) {
      ia[i] = byteString.charCodeAt(i)
  }
  return new Blob([ab], {type: mimeString})
}
