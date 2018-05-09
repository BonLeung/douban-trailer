import axios from 'axios'
import { message } from 'antd'

const defaultAxiosConf = {
  timeout: 5000
}

const _request = (params = {}, fn = () => {}) => {
  return axios({...defaultAxiosConf, ...params})
          .then(res => {
            const { success, data, errmsg, code } = res.data

            if (code === 401) {
              window.location.href = '/'
              return
            }

            if (success) {
              fn(false)

              return data
            }

            throw errmsg
          })
        .catch(err => {
          fn(false)

          message.err(String(errmsg) || '网络错误')
        })
}

export default (param) => {
  const type = typeof param

  if (type === 'function') {
    param(true)

    return (obj) => _request(obj, param)
  }

  if (type === 'object' && type !== null) {
    return _request(param)
  }
}
