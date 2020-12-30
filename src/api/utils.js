
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

const user = {
  depart_uuid: localStorage.getItem('depart_uuid'),
  depart_name: localStorage.getItem('depart_name'),
  person_uuid: localStorage.getItem('person_uuid'),
  person_name: localStorage.getItem('person_name'),
  role_uuid: localStorage.getItem('role_uuid'),
  user_uuid: localStorage.getItem('user_uuid'),
  ftoken: localStorage.getItem('ftoken')
}

export const getWrapParams = obj => {
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
