import express, { json } from 'express'
import cors from 'cors'

const app = express()

app.use(json())
app.use(cors())

const users = []
const tweets = [] 

app.post("/sign-up", (req, res) => {
  const username = req.body.username
  const avatar = req.body.avatar
 
  if(!username || !avatar )
    res.status(400).send("Todos os campos são obrigatórios!")
  else {
    users.push({username, avatar})
    res.send("OK")
  }
})

app.post("/tweets", (req, res) => {
  const username = req.headers.user

  if(!req.body.tweet || !username)
    res.status(400).send("Todos os campos são obrigatórios!")
  else{
    const userPost = users.find(user => user.username === username)
    tweets.unshift({...userPost, tweet: req.body.tweet})
    res.status(201).send("OK")    
  }
})

app.get("/tweets", (req, res) => {
  const page = req.query.page

  if(!page || page < 1)
    res.status(400).send("Informe uma página válida!")
  else{
    const tweetsPage = tweets.slice((page*10)-10, page*10)
    res.send(tweetsPage)
  }
})

app.get("/tweets/:username", (req, res) => {
  const filteredTweets = tweets.filter(tweet => 
    tweet.username === req.params.username  
  )
  res.send(filteredTweets)
})

app.listen(5000)