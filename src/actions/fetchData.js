import fetch from 'isomorphic-fetch'
const url = 'https://ruby-china.org/api/v3/'

const urlTranslate = (tag) => {
  switch(tag) {
    case 'jobs':
      return 'topics?node_id=25'
    default :
      return 'topics'
  }
}
//获取数据
const fetchData = (tag, method = 'get', params = null): Promise<Action>  => {
  const api = url + urlTranslate(tag);
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
