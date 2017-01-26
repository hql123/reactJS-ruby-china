import fetch from 'isomorphic-fetch'
const url = 'https://ruby-china.org/api/v3'

const pathTranslate = (tag) => {
  switch(tag) {
    case '/jobs':
      return '/topics?node_id=25'
    case '/homeland':
      return '/topics?node_id=23'
    case '/topics/popular':
      return '/topics?type=popular'
    case '/topics/no_reply':
      return '/topics?type=no_reply'
    case '/topics/last':
      return '/topics?type=recent'
    default :
      return tag
  }
}
const urlTranslate = (path, search) => {
  if (path === '/nodes') {
    return path;
  }
  let offset = 0;
  if (search.indexOf('page') > -1) {
    var end = new RegExp(/\d+$/);
    const page = end.exec(search)[0];
    if (Number(page) > 1) {
      offset = (Number(page) - 1)*25;
    }
  }
  if (search.indexOf('limit')) {
    return path + search;
  }
  if (search.indexOf('?') === 0 || path.indexOf('?') > -1) {
    return path + search + '&offset=' + offset + '&limit=25';
  }
  return path + '?offset=' + offset + '&limit=25';
}
//获取数据
const fetchData = (tag, search = '', method = 'get', params = null): Promise<Action>  => {
  const api = url + urlTranslate(pathTranslate(tag), search);
  console.log(decodeURI(api));
  return fetch(api, { method: method, body: params})
  .then(response =>{
    if (!response.ok) {
      return Promise.reject(response.status);
    }
    return Promise.resolve(response.json());
  }).catch(error => {
    console.log(error);
    return Promise.reject("服务器异常，请稍后再试");
  })
}




module.exports = {
  fetchData,
};
