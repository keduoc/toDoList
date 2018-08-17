
var Sequelize = require('sequelize');
var path = require('path');


//用sqlite数据库，以下是它的配置，不需要用户名也不需要密码
var sequelize = new Sequelize(undefined,undefined, undefined, {
  host: 'localhost',
  dialect: 'sqlite',

  // SQLite only
  storage: path.join(__dirname, '../database/database.sqlite') 
});


/*
//验证下数据库能否执行
sequelize
  .authenticate()
  .then(function(err) {
    console.log('Connection has been established successfully.');
  })
  .catch(function (err) {
    console.log('Unable to connect to the database:', err);
  });
  */


//定义一个模型，名字叫note，一个模型对应到数据库里就是一个表
//一个表里，有很多条目，条目里有很多数据结构，
//比如存到数据库里的第一项是text，代表里面的内容，类型是string，
//第二项是username；另外id，每项数据都默认有
//另外还有两项默认数据，创建时间和更新时间
//数据样式为： 1(id)  hello(text)   username   time(创建时间)  time(更新时间)
var Note = sequelize.define('note', {
  text: {
    type: Sequelize.STRING
  },
  username: {
    type: Sequelize.STRING
  }
});




Note.sync({force: true})
// force: true will drop the table if it already exists
//{force: true}的意思是，如果表存在则删了重新创建，不加的意思是，如果不存在，就新建，如果存在了，就什么也不改动
// Note.sync().then(function () {   
//   // Table created
//   Note.create({text: 'hello world'})
//   }).then(function(){
//     Note.findAll({raw: true}).then(function(notes){
//         console.log(notes)
//       })
// });



// Note.create({
//   text: 'haha'
// })


//创建一个数据表，没有的话就创建一个，有的话就什么也不操作
// Note.sync()


//将这个表删掉
//Note.drop();


//按条件删除
// Note.destroy({{where:{text:'haha'}}).then(function(note){
//   console.log('destroy...')
//   console.log(arguments)
// })


//按条件查询
// Note.destroy({raw: true, where:{id:2}}).then(function(note){
//   console.log(note)
// })



//{raw: true} 加了之后，只打印表单里的数据,表单里的其他不打印
// Note.findAll({raw: true}).then(function(articles) {
//   console.log(articles)
// })

module.exports = Note;
