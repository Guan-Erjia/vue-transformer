export default (template, item) => {
  const tags = template.match(/<.+?v-for.+?>/gm)
  if(tags) {
    tags.forEach(item=>{
      
    })
    console.log(tags)
  }
}