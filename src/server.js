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

// sendMessage
app.post('/ai/gemini/sendMessage', async (req, res) => {
  const result = await proxy.sendMessage(req.body)
  res.json({ code: 200, msg: 'success', data: result })
})
// sendMessage
app.post('/ai/gemini/reset', async (req, res) => {
  await proxy.reset()
  res.json({ code: 200, msg: 'success', data: null })
})


app.listen(port, async () => {
  console.log(`Proxy app listening on port ${port}`)
})