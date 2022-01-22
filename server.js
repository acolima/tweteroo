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
  user.push(req.body)
  res.send("OK")
})

app.post("/tweets", (req, res) => {
  let tweet = {
    ...req.body,
    avatar: user[0].avatar
  }
  tweets.push(tweet)
  res.send("OK")
})

app.get("/tweets", (req, res) => {
  if(tweets.length === 0)
    res.send(tweets)
  else res.send(latestsTweets())
})

app.listen(5000)