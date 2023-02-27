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
  } else {
    return false
  }
}

const parseHTML = (template, find) => {
  const tagList = template.match(/<.+?>/gm)
  const targetList = tagList.filter(item => item === find)
  targetList.forEach(each => {
    const startList = tagList.slice(tagList.findIndex(each1 => each1 === each))
    let target = ''
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
        console.log('已闭合')
        console.log(startList.slice(0, i + 1))
        target = startList[i]
        break
      }
    }
  })
}

export default parseHTML