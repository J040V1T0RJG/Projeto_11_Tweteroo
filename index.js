import express from "express";
import cors from "cors";

const app = express();
app.use(cors(), express.json());

let user = {username: "", avatar: ""};
let tweets = [];
let dataTweets = [];

app.post("/sign-up", (request, response) => {
    user.username = request.body.username;
    user.avatar = request.body.avatar;
    response.send("OK")
});

app.get("/tweets", (request, response) => {
    response.send(tweets)
});

app.post("/tweets", (request, response) => {
    tweets = [];
    dataTweets.push({
            username: user.username,
            avatar: user.avatar,
            tweet: request.body.tweet
    });
    if (dataTweets.length > 10) {
        
        let temporaryArray = []
        for (let i = 1; i <= 10; i++) {
            temporaryArray.push(dataTweets[i])
        }
        dataTweets = [...temporaryArray];
    };
    for (let i = dataTweets.length - 1; i >= 0; i--) {
        tweets.push(dataTweets[i])
    };
    response.send("OK")
})

app.listen(5000);