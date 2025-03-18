const fs = require('fs');
const fs2 = require('fs').promises;
const path = require('path');

const readDB = async ()=>{
  return new Promise((resolve, reject) => {
    fs.readFile(path.resolve('db.json'), 'utf8', function (err, data) {
      if (err) {
        console.error('Error reading', err)
        reject(err);
      }
      resolve(data);
    });
  });
}

const writeToDB = async (content) =>{
  try {
    // Rewrite the file with new data asynchronously
    await fs2.writeFile(path.resolve('db.json'), content);
    return {
      success:true,
    }
  } catch (err) {
    console.error('Error rewriting file:', err);
    return{
      error:err,
      message: err?.message || 'Sorry an error occured in writing to db'
    }
  }
}



module.exports = {
  readDB,
  writeToDB
}