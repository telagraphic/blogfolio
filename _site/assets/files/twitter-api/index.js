const Twitter = require('twitter-lite');
const fs = require('fs');

const twitter = new Twitter({
  subdomain: "api",
  consumer_key: process.env.CONSUMER_KEY,
  consumer_secret: process.env.CONSUMER_SECRET,
  access_token_key: process.env.ACCESS_TOKEN_KEY,
  access_token_secret: process.env.ACCESS_TOKEN_SECRET
});

async function getTweeters() {
  return new Promise((resolve, reject) => {
    fs.readFile('./tweeters.json', (err, data) => {
      if (err) reject(err);
      else resolve(JSON.parse(data));
    });
  });
};

const flattenDeep = (arr) => Array.isArray(arr) ? arr.reduce( (a, b) => a.concat(flattenDeep(b)) , []) : [arr]

async function getTweets(users) {

  let allTweets = [];

  for (let index = 0; index < users.length; index++) {
    let user_tweet_list = await getUserTweets(users[index]);
    allTweets.push(user_tweet_list);
  }

  return flattenDeep(allTweets);
};

async function getUserTweets(user) {

  return new Promise((resolve, reject) => {
    let userTweets = [];

    twitter
      .get("statuses/user_timeline", {screen_name: user.handle, count: 3})
      .then(data => {

        data.forEach(function(tweet) {

          if (!tweet.retweeted_status) {

            userTweets.push({
              "twittertime": tweet.created_at,
              "created": new Date(tweet.created_at),
              "handle": tweet.user.screen_name,
              "message": tweet.text,
              "site": tweet.user.url || '',
              "topic": user.topic,
              "hashtags": [...tweet.entities.hashtags],
              "link": `https://www.twitter.com/${tweet.user.screen_name}/status/${tweet.id_str}`,
              "id_string": tweet.id_str
            });
          }

        });

        resolve(userTweets);

      })
      .catch(error => {
        reject(error);
      });
  });
};

async function saveTweets(tweets) {
  fs.writeFileSync(`./tweets.json`, JSON.stringify(tweets));
};

async function getAllTweets() {
  let tweeters = await getTweeters();
  let tweets = await getTweets(tweeters);
  let savedTweets = await saveTweets(tweets);
}

getAllTweets();
