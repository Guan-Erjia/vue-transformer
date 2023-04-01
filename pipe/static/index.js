import md5 from "md5"
import config from "../../config.js"
import { Bundle } from "../../utils/index.js"
export default (item, hashSet, hashMap) => {
  const splitPath = item.path.replace(config.base, '')
  const hash = md5(item.value)
  if (hashSet.has(hash)) {
    item.bundle.push(new Bundle(`${hashMap.get(hash)}重复`))
  } else {
    hashSet.add(hash)
    hashMap.set(hash, splitPath)
  }
}