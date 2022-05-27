const fs = require('fs')
export const getFolder = (path: any) => {
  const components: Array<string> = []
  const files = fs.readdirSync(path)
  files.forEach(function (item: string) {
    const stat = fs.lstatSync(path + '/' + item)
    if (stat.isDirectory() === true && item != 'components') {
      components.push(path + '/' + item)
      // components.push.apply(components, getFolder(path + '/' + item))
    }
  })
  return components
}
