import fetch from 'node-fetch'
import apiConfig from '../config/api.json'

async function request(endpoint, params = {}) {
  const url = params.mainApi
    ? params.mainApi
    : apiConfig.main_api +
      endpoint +
      '?' +
      new URLSearchParams({
        // token:
        //   params.params && params.params.token
        //     ? params.params.token
        //     : apiConfig.token,
        ...params.params,
      })
  const response = await fetch(url, {
    method: params.method || 'GET',
    headers: {
      'Content-Type': 'application/json',
      ...params.headers,
    },
    body: JSON.stringify(params.body),
  })
  const responseJson = await response.json()
  return responseJson
}

export default request
