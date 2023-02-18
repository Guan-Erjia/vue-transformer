import fs from 'fs'
import vuePlugin from './vue/index.js'

export default (item) => {
  if (item.type === 'file') {
    item.value = fs.readFileSync(item.path, { encoding: 'utf-8' })
    if (item.ext === 'vue') {
      vuePlugin(item)
    }
  } else if (item.type === 'dir') {
  }
}