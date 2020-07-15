const Twitter = require('twitter-lite');
const fs = require('fs');

const twitter = new Twitter({
  subdomain: "api",
  consumer_key: 'Bwvsu5c8NgcSjjxNG5onJCBK7', //process.env.CONSUMER_KEY, // Bwvsu5c8NgcSjjxNG5onJCBK7
  consumer_secret: 'VEobIrRgmzKMH07RbcuJFI90rB7YVCu4jNkP8EVKUoFN9xenCx', //process.env.CONSUMER_SECRET, // VEobIrRgmzKMH07RbcuJFI90rB7YVCu4jNkP8EVKUoFN9xenCx
  access_token_key: '598754807-Ryn692wXnJWjCvognmqtcbfKsqXhXTdxeN4BDlAf', //process.env.ACCESS_TOKEN_KEY, // 598754807-Ryn692wXnJWjCvognmqtcbfKsqXhXTdxeN4BDlAf
  access_token_secret: 'yM8ZtjVsFVJXI8qV9mVskTkwpKadhrMZwoxem54IHyC9D' //process.env.ACCESS_TOKEN_SECRET // yM8ZtjVsFVJXI8qV9mVskTkwpKadhrMZwoxem54IHyC9D
});

async function getTweeters() {
  return new Promise((resolve, reject) => {
    fs.readFile('./tweeters.json', (err, data) => {
      if (err) reject(err);
      else resolve(JSON.parse(data));
    });
  });
};

async function getProfiles(users) {

  let allTweeterProfiles = [];

  for (let index = 0; index < users.length; index++) {
    let tweeterProfiles = await getUserProfiles(users[index]);
    allTweeterProfiles.push(tweeterProfiles);
  }

  return flattenDeep(allTweeterProfiles);
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
