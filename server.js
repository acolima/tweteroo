import express, { json } from 'express'
import cors from 'cors'

const app = express()

app.use(json())
app.use(cors())

const user = []
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
    user.push({username, avatar})
    res.send("OK")
  }
})

app.post("/tweets", (req, res) => {
  if(!req.body.tweet)
  res.status(400).send("Todos os campos são obrigatórios!")
  else{
    tweets.push({...user[0], tweet: req.body.tweet})
    res.sendStatus(201)    
  }
})

app.get("/tweets", (req, res) => {
  if(tweets.length === 0)
    res.send(tweets)
  else res.send(latestsTweets())
})

app.listen(5000)