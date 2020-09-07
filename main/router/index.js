const express = require(`express`)
const path = require('path')
const router = express.Router()


router.use(function(req, res, next){
  console.log(`路由[/index]`, Date.now());
  console.log(this);
  next()
})


router.get(`/command`, (req, res, next) => {
  res.json({
    status: 200,
    data: [
        {title:"更新SVN代码"}
    ]
  })
})

module.exports = router