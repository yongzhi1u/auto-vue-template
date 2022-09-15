import fs from 'fs'

export const fileReader = (src, componentName) => {
  return new Promise((resolve, reject) => {
    fs.readFile(src, (err, data) => {
      if (err) {
        reject(err)
      }
      let content = data.toString();
      const pattern = /{{\s*([a-zA-Z]+)\s*}}/
      let pattResult = null
      while ((pattResult = pattern.exec(content))) {
        content = content.replace(pattern, componentName)
      }
      resolve(content)
    })
  })
}

export const fileWriter = (content, dest) => {
  fs.access(dest, fs.constants.F_OK, (err) => {
    if (!err) return Promise.reject('file or directory exsists')
  });
  return new Promise((resolve, reject) => {
    fs.writeFile(dest, content, 'utf-8', (err, data) => {
      if (err) {
        reject(err)
      }
      resolve()
    })
  })
}

export const makeDir = (dest) => {
  fs.access(dest, fs.constants.F_OK, (err) => {
    if (!err) return Promise.reject('file or directory exsists')
  });
  return new Promise((resolve, reject) => {
    fs.mkdir(dest, (err, data) => {
      if (err) {
        reject(err)
      }
      resolve()
    })
  })
}