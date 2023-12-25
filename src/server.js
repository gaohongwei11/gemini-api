const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const proxy = require("./proxy")
const app = express()
const port = 3200

const json = express.json({ type: '*/json' })
app.use(cors())
app.use(json)
app.use(bodyParser.urlencoded({ extended: false }))

// 登录
app.post('/ai/v1/gemini', async (req, res) => {
  const result = await proxy.run(req.body)
  res.json({ code: 200, errMsg: '成功', data: result })
})


app.listen(port, async () => {
  console.log(`Proxy app listening on port ${port}`)
})