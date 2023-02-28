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
  const target = tagList.filter(item => item.includes(find))[0]
  if (target) {
    const beforeInner = tagList.slice(0, tagList.findIndex(each1 => each1.includes(target)) - 1)
    const startList = tagList.slice(tagList.findIndex(each1 => each1.includes(target)))
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
        const targetInner = startList.slice(0, i + 1)
        const lastsInner = startList.slice(i + 1)
        return { beforeInner, targetInner, lastsInner }
      }
    }
  }
}

export default parseHTML