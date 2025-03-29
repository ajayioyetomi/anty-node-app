const { readDB, writeToDB } = require("../db/index");
const { generateDateTime, cronTimerInterval } = require("../config");
// const {TwitterApi} = require('twitter-api-v2');

let twitter = {};

require("dotenv").config();

// Replace these with your actual credentials from your Twitter Developer account
// const client = new TwitterApi({
//   appKey: process.env.APP_KEY,
//   appSecret: process.env.SECRET_KEY,
//   accessToken: process.env.ACCESS_KEY,
//   accessSecret: process.env.ACCESS_SECRET_KEY,
//   // consumer_key: process.env.APP_KEY,
//   // consumer_secret: process.env.SECRET_KEY,
//   // access_token_key: process.env.ACCESS_KEY,
//   // access_token_secret: process.env.ACCESS_SECRET_KEY,
// });

async function updateTwitterProfileData() {
  // const username_1 = 'TheAntiShifty'
  // const username_2 = 'MemeSenseMD';
  // const username_3 = 'TheAntiShiftyES'

  const user_id_1 = "1891543994162966528";
  const user_id_2 = "1900004452725383169";
  // const user_id_3 = '1896763788466200576';

  let url_1 = `https://api.x.com/2/users/${user_id_1}?user.fields=public_metrics,profile_image_url`;
  let url_2 = `https://api.x.com/2/users/${user_id_2}?user.fields=public_metrics,profile_image_url`;

  const BEARER_TOKEN = process.env.BEARER_TOKEN;

  try {
    const response1 = fetch(url_1, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${BEARER_TOKEN}`,
        "Content-Type": "application/json",
      },
    });
    const response2 = fetch(url_2, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${BEARER_TOKEN}`,
        "Content-Type": "application/json",
      },
    });

    const response = await Promise.allSettled([response1, response2]);

    let result1 = {
      username: "",
      profile_image_url: "",
    };

    let result2 = {
      username: "",
      profile_image_url: "",
    };

    if (response[0].status === "fulfilled") {
      result1 = await response[0]?.value?.json();
      console.log(result1, "result 1");
      if (twitter)
        twitter.profiles[user_id_1] = {
          username: result1.data?.username,
          profile_image_url: result1?.data?.profile_image_url,
          name: result1?.data?.name,
        };
    }
    if (response[1].status === "fulfilled") {
      result2 = await response[1]?.value?.json();
      console.log(result2,'result2');
      if (twitter)
        twitter.profiles[user_id_2] = {
          username: result2.data?.username,
          profile_image_url: result2?.data?.profile_image_url,
          name: result2?.data?.name,
        };
    }
    // await writeToDB(JSON.stringify({twitter}))
    return { result1, result2 };
  } catch (error) {
    console.error("Follower Error:", error);
    return { error };
  }
}

async function updateTwitterFollowerData() {
  // const username_1 = 'TheAntiShifty'
  // const username_2 = 'MemeSenseMD';
  // const username_3 = 'TheAntiShiftyES'

  const user_id_1 = "1891543994162966528";
  const user_id_2 = "1900004452725383169";
  // const user_id_3 = '1896763788466200576';

  let url_1 = `https://api.x.com/2/users/${user_id_1}?user.fields=public_metrics`;
  let url_2 = `https://api.x.com/2/users/${user_id_2}?user.fields=public_metrics`;
  // let url_3 = `https://api.x.com/2/users/${user_id_3}?user.fields=public_metrics`;

  const BEARER_TOKEN = process.env.BEARER_TOKEN;

  try {
    const response1 = fetch(url_1, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${BEARER_TOKEN}`,
        "Content-Type": "application/json",
      },
    });
    const response2 = fetch(url_2, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${BEARER_TOKEN}`,
        "Content-Type": "application/json",
      },
    });

    const response = await Promise.allSettled([response1, response2]);

    let result1 = {
      data: {
        name: "AntiShifty",
        username: "TheAntiShifty",
        id: "1891543994162966528",
        public_metrics: {
          followers_count: 23821,
          following_count: 3952,
          tweet_count: 1596,
          listed_count: 4,
          like_count: 2032,
          media_count: 201,
        },
      },
    };

    let result2 = {
      data: {
        public_metrics: {
          followers_count: 376,
          following_count: 1539,
          tweet_count: 81,
          listed_count: 1,
          like_count: 183,
          media_count: 7,
        },
        username: "MemeSenseMD",
        name: "MemeSense MD",
        id: "1900004452725383169",
      },
    };

    if (response[0].status === "fulfilled") {
      result1 = await response[0]?.value?.json();
      if (twitter)
        twitter.followers[user_id_1] =
          result1?.data?.public_metrics?.followers_count;
    }
    if (response[1].status === "fulfilled") {
      result2 = await response[1]?.value?.json();
      if (twitter)
        twitter.followers[user_id_2] =
          result2.data?.public_metrics?.followers_count;
    }
    await writeToDB(JSON.stringify({ twitter }));
    return { result1, result2 };
  } catch (error) {
    console.error("Follower Error:", error);
    return { error };
  }
}

async function updateTwitterUserTweetsData() {
  console.log("starts");
  // const username_1 = 'TheAntiShifty'
  // const username_2 = 'MemeSenseMD';
  // const username_3 = 'TheAntiShiftyES'

  const user_id_1 = "1891543994162966528";
  const user_id_2 = "1900004452725383169";
  // const user_id_3 = '1896763788466200576';

  let url_1 = `https://api.x.com/2/users/${user_id_1}/tweets?expansions=attachments.media_keys&media.fields=url,type,preview_image_url&tweet.fields=entities,public_metrics`;
  let url_2 = `https://api.x.com/2/users/${user_id_2}/tweets?expansions=attachments.media_keys&media.fields=url,type,preview_image_url&tweet.fields=entities,public_metrics`;

  const BEARER_TOKEN = process.env.BEARER_TOKEN;

  try {
    const response1 = fetch(url_1, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${BEARER_TOKEN}`,
        "Content-Type": "application/json",
      },
    });

    const response2 = fetch(url_2, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${BEARER_TOKEN}`,
        "Content-Type": "application/json",
      },
    });

    const response = await Promise.allSettled([response1, response2]);
    console.log(response, "responses");
    let result1 = {};

    let result2 = {};

    if (twitter && twitter?.tweets) {
      result1 = twitter?.tweets[user_id_1] || {};
      result2 = twitter?.tweets[user_id_2] || {};
    }

    if (response[0].status === "fulfilled") {
      result1 = await response[0]?.value?.json();
      console.log(result1, "result1");
      if (twitter) twitter.tweets[user_id_1] = result1;
    } else {
      console.log("error 1");
    }

    if (response[1].status === "fulfilled") {
      result2 = await response[1]?.value?.json();
      console.log(result2, "result2");
      if (twitter) twitter.tweets[user_id_2] = result2;
    } else {
      console.log("error 2");
    }

    return { result1, result2 };
  } catch (error) {
    console.error("Data Error:", error);
    return error;
  }
}

function getCurrentDate() {
  let [date] = generateDateTime();
  return Number(date);
}

const updateTwitterDbData = async () => {
  try {
    let db = await readDB();
    let db_content = JSON.parse(db);
    twitter = db_content?.twitter || {};

    let old_date = Number(twitter?.date || "0");
    let new_date = Number(getCurrentDate());

    if (new_date == old_date) return twitter;
    console.log("first");
    await updateTwitterProfileData();
    console.log("second");
    await updateTwitterFollowerData();
    console.log("third");
    await updateTwitterUserTweetsData();
    console.log(twitter, "after");

    if (twitter) {
      twitter.date = new_date.toString();
      writeToDB(JSON.stringify({ twitter }));
    }
    console.log(twitter, "twitter");
  } catch (e) {
    console.error("Update error:", e);
  }
};

const getTwitterFollowers = async () => {
  // await updateTwitterDbData();
  return new Promise(async (resolve, reject) => {
    console.log("test");
    try {
      let db = await readDB();
      let db_content = JSON.parse(db);
      let twitter = db_content.twitter;
      resolve(twitter);
    } catch (e) {
      console.error(e);
      reject({
        error: e,
        message: "Sorry, an error occured",
      });
    }
  });
};

const updateTwitterData = async () => {
  updateTwitterDbData();
  setInterval(async () => {
    console.log('check for updates')
    await updateTwitterDbData();
  }, cronTimerInterval);
};

module.exports = {
  getTwitterFollowers,
  updateTwitterFollowerData,
  updateTwitterUserTweetsData,
  updateTwitterData,
};
