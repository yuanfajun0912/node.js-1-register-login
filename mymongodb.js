const mongoose = require('mongoose')
//创建数据库并连接
mongoose.connect('mongodb://localhost:27017/myLogin', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true
})
//创建数据模型结构
const userSchema = new mongoose.Schema({
  userName: {
    type: String,
    unique: true  //用户名是唯一的，否则报错
  },
  password: {
    type: String,
    set(val) {  //用bcriptjs加密
      return require('bcryptjs').hashSync(val, 10)
    }
  }
})
//创建一个模型（数据库的表）
const User = mongoose.model('User', userSchema)

module.exports = { User }
