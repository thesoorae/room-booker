const pool = require('./pool.js');

const insertUser = (email, firstName, lastName, cb)=>{
  const sqlQuery = 'INSERT INTO users(email,privileges,first_name,last_name)VALUES($1,$2,$3,$4) RETURNING *';
  pool.connect((poolError,client, done) => {
    if(poolError){
      return cb(poolError);
    }
    client.query(sqlQuery,[email, 0, firstName, lastName],(err,result)=>{
      done(err);
      return err
        ? cb(err)
        : cb(null, result);
    });
  });
};

const selectUser = (email,cb)=>{
  pool.connect((poolError,client, done) => {
    if(poolError){
      return cb(poolError);
    }
    const sqlQuery = 'SELECT id,email,first_name,last_name from users WHERE email=$1';
    pool.query(sqlQuery,[email],(err,result)=>{
      const response = result.rowCount > 0
        ? result.rows[0]
        : null;
      done(err);
      return err
        ? cb(err)
        : cb(null, response);
    });
  });
};
module.exports = {
  insertUser:insertUser,
  selectUser:selectUser
};
