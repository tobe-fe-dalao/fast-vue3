const path = require('path')
const fs = require('fs')
export const getFolder = (path: any) => {
  let components: Array<string> = []
  const files = fs.readdirSync(path)
  files.forEach(function (item: string) {
    let stat = fs.lstatSync(path + '/' + item)
    if (stat.isDirectory() === true && item != 'components') {
      components.push(path + '/' + item)
      components.push.apply(components, getFolder(path + '/' + item))
    }
  })
  return components
}
