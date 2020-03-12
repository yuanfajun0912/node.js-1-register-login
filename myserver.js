const express = require('express')
const app = express()
app.use(express.json())  //允许处理json数据
const jwt = require('jsonwebtoken')
const SECRET = 'FS6VS65VS1V15S+26S+V65S65S'


const { User } = require('./mymongodb')


/*
** 网络请求部分
*/
app.get('/api/users', async (req, res) => {  //获取用户列表
  const users = await User.find()
  res.send(users)
})

app.post('/api/register', async (req, res) => {  //注册
  try {                                     //因为user处在try块中
    var user = await User.create(req.body)  //想要后面能调用需要用var
  } catch(err) {  //处理用户名已存在的问题
    return res.send('用户名已存在，请重新输入')
  }
  res.send(user)
})

app.post('/api/login', async (req, res) => {  //登录
  const user = await User.findOne({ //通过登陆用户提供的用户名查找数据
    userName: req.body.userName
  })
  if(!user) return res.send('用户不存在') //验证是否有该用户
  const isPasswordTrue = await require('bcryptjs').compareSync( //验证密码
    req.body.password,
    user.password
  )
  if(!isPasswordTrue) return res.send('密码错误，请重新输入密码')  
  const token = jwt.sign({  //token
    id: user._id
  }, SECRET)
  res.send({
    message: '登录成功',
    token
  })
})

const authentic = async (req, res, next) => {  //验证token的中间件
  try {
    const token = req.headers.authorization.split(' ').pop()
    var { id } = jwt.verify(token, SECRET)
  } catch(err) {
    req.errmessage = '请重新登陆'
  }
  req.user = await User.findById(id)
  next()
}
app.get('/api/profile', authentic, async (req, res) => {
  if(!req.user) return res.send(req.errmessage)
  res.send(req.user)
})

app.delete('/api/delete/:id', async (req, res) => {  //删除某个用户
  const user = await User.findById(req.params.id)
  if(!user) return res.send('未找到删除用户')
  await user.remove()
  res.send('已经成功删除')
})



app.listen(4000, () => {
  console.log('服务已开启，请访问 http://localhost:4000/')
})