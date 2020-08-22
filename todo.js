const express = require('express')
const app = express()
const ejs = require('ejs')
const { registerPartial } = require('handlebars')
const bodyParser = require('body-parser')

var urlencodedParser = bodyParser.urlencoded({extended: false})

app.set('view engine', 'ejs')

var task = []

app.get('/todo', (req,res)=>{
    res.render('todo', {task:task})
})

app.post('/todo', urlencodedParser, (req,res)=>{
  task.push(req.body.task)
  res.redirect('/todo')
})
var index
app.post('/todo/delete', urlencodedParser, (req,res)=>{
  index = (req.body.index)
  task.splice(index, 1)
  res.redirect('/todo')
})

app.post('/todo/edit', urlencodedParser, (req,res)=>{
    res.render('edit', {index:req.body.index, task:task})
  })

app.post('/todo/edit/change', urlencodedParser, (req,res)=>{
    var changed = req.body.edited
    index = req.body.index
    task[index]=changed
    res.redirect('/todo')
  })
  
app.listen(4000, () => {
  console.log('Server connected to port: 4000')
})