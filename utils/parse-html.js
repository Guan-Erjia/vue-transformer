const startTag = (tag) => {
  let begin = tag.match(/<[\w|-]+/m)
  if (begin) {
    return true
  } else {
    return false
  }
}

const selfTag = (tag) => {
  if (/<.+\/[\s|\S]?>/.test(tag)) {
    return true
  } else if (/\<img.+/.test(tag)) {
    return true
  } else if (/<\!--.+/.test(tag)) {
    return true
  } else {
    return false
  }
}

const parseHTML = (template, find) => {
  const tagList = template.match(/<.+?>\s*/gm)
  const targetList = tagList.filter(item => item.includes(find))
  targetList.forEach(each => {
    const beforeList = tagList.slice(0, tagList.findIndex(each1 => each1.includes(each)) - 1)
    const startList = tagList.slice(tagList.findIndex(each1 => each1.includes(each)))
    let target = null
    let open = 0
    let close = 0
    for (let i = 0; i < startList.length; i++) {
      if (startTag(startList[i])) {
        if (!selfTag(startList[i])) {
          open++
        }
      } else {
        close++
      }
      if (open === close) {
        target = startList.slice(0, i + 1)
        console.log(target.join(''))
        break
      }
    }
  })
}

export default parseHTML