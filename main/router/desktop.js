const express = require(`express`)
const path = require('path')
const router = express.Router()


router.use((req, res, next) => {
  console.log(`路由[/desktop]`, req.url);
  next()
})


router.get(`/urls`, (req, res, next) => {
  res.json({
    status: 200,
    data: [
        {title:"更新SVN代码"}
    ]
  })
})

module.exports = router