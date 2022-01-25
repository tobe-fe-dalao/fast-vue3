import request from './http/axios'
const getGithubVersion = (url: string) => {
  return request(url)
}
export default getGithubVersion
