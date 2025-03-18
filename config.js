const dotenv = require('dotenv');
// const dbConnect = require('../models/dbConnect');

dotenv.config();


const getSecretKey = () =>{
    return process.env.SECRET_KEY
}

const getTimeZone = () =>{
    return process.env.TIME_ZONE;
}

const getCurrentDateTime = (timezone) =>{
    const date = new Date();
    var newDate = new Date(timezone*60 * 60000 + date.valueOf() + (date.getTimezoneOffset()*60000))
    return newDate;
}

const converTimeToUserTimezone = (datetime, timezone) =>{
    const date = new Date(datetime);
    var newDate = new Date(timezone*60 * 60000 + date.valueOf() + (date.getTimezoneOffset()*60000))
    return newDate;
}

const cronTimerInterval = 60 * 1000 * 1;

const generateDateTime = (timezone = 1) =>{
    const d = getCurrentDateTime(timezone);
    const year = d.getFullYear().toString();
    const mth = d.getMonth() + 1;
    const month = mth < 9?`0${mth}`:mth.toString();
    const dy = d.getDate();
    const day = dy < 9? `0${dy}`:dy.toString();
    const hrs = d.getHours();
    const hours = hrs < 9 ? `0${hrs}`:hrs.toString();
    const min = d.getMinutes();
    const minutes = min < 9 ? `0${min}`:min.toString();
    const sec = d.getSeconds();
    const seconds = sec < 9 ? `0${sec}`:sec.toString();

    return [`${year}${month}${day}`,`${hours}-${minutes}-${seconds}`];
}

// const getUserDb = () => {
//     return new dbConnect(getDbData());
// }

module.exports = {
    getCurrentDateTime,
    getTimeZone,
    getSecretKey,
    converTimeToUserTimezone,
    generateDateTime,
    cronTimerInterval
    //getUserDb
};