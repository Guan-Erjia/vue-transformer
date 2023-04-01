import fs from 'fs'
import vuePlugin from './vue/index.js'
import staticPlugin from './static/index.js'

const hashSet = new Set()
const hashMap = new Map()
export default (item) => {
  if (item.type === 'file') {
    item.value = fs.readFileSync(item.path, { encoding: 'utf-8' })
    item.bundle = []
    staticPlugin(item, hashSet, hashMap)
    if (item.ext === 'vue') {
      // vuePlugin(item)
      // fs.writeFileSync(item.path, item.value)     !!!!!执行前请使用git备份
    }
  } else if (item.type === 'dir') {
  }
}