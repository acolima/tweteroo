import express, { json } from 'express'
import cors from 'cors'

const app = express()

app.use(json())
app.use(cors())

const users = []
const tweets = [] 

function latestsTweets(){
  const latest = []  
  let cont = 0

  for(let i = tweets.length; cont < 10 && i > 0; cont++, i--)
    latest.push(tweets[i-1])

  return latest
}

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

  if(!req.body.tweet)
    res.status(400).send("Todos os campos são obrigatórios!")
  else{
    const userPost = users.find(user => user.username === username)
    tweets.push({...userPost, tweet: req.body.tweet})
    res.status(201).send("OK")    
  }
})

app.get("/tweets", (req, res) => {
  if(tweets.length === 0)
    res.send(tweets)
  else res.send(latestsTweets())
})

app.get("/tweets/:username", (req, res) => {
  const filteredTweets = tweets.filter(tweet => 
    tweet.username === req.params.username  
  )
  res.send(filteredTweets)
})

app.listen(5000)