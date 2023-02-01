const mysql = require('mysql');

// Connection Pool
let connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME
});

exports.allUsers = async () => {
    // User the connection
     let _rows = await new Promise((resolve) => {
        connection.query('SELECT * FROM user WHERE status != "removed"', (err, rows) => {
            // When done with the connection, release it
            if (!err) {
              resolve(rows);
            } else {
              console.log(err);
            }
            console.log('The data from user table: \n', rows);
          });
    });

    return _rows;
};

exports.search = async (searchTerm) => {
    return await new Promise((resolve) => {
        connection.query('SELECT * FROM user WHERE first_name LIKE ? OR last_name LIKE ?', ['%' + searchTerm + '%', '%' + searchTerm + '%'], (err, rows) => {
            if (!err) {
                resolve(rows);
            } else {
              console.log(err);
            }
            console.log('The data from user table: \n', rows);
          });
    });
};

exports.addUser = async (first_name, last_name, email, phone, comments) => {
    // User the connection
    return await new Promise((resolve) => {
        connection.query('INSERT INTO user SET first_name = ?, last_name = ?, email = ?, phone = ?, comments = ?', [first_name, last_name, email, phone, comments], (err, rows) => {
            if (!err) {
              resolve(rows);
            } else {
              console.log(err);
            }
            console.log('The data from user table: \n', rows);
          });
    });
}

exports.editUser = async (id) => {
    return await new Promise((resolve) => {
        connection.query('SELECT * FROM user WHERE id = ?', [id], (err, rows) => {
            if (!err) {
                resolve(rows);
            } else {
                console.log(err);
            }
            console.log('The data from user table: \n', rows);
        });
    });
};

exports.updateUser = async (id, first_name, last_name, email, phone, comments) => {
    return await new Promise((resolve) => {
  connection.query('UPDATE user SET first_name = ?, last_name = ?, email = ?, phone = ?, comments = ? WHERE id = ?', [first_name, last_name, email, phone, comments, id], (err, rows) => {

    if (!err) {
      // User the connection
      connection.query('SELECT * FROM user WHERE id = ?', [id], (err, rows) => {
        // When done with the connection, release it
        
        if (!err) {
          resolve(rows);
        } else {
          console.log(err);
        }
        console.log('The data from user table: \n', rows);
      });
    } else {
      console.log(err);
    }
    console.log('The data from user table: \n', rows);
  })
});
};

exports.deleteUser = async(id) => {
    return await new Promise((resolve) => {
    connection.query('UPDATE user SET status = ? WHERE id = ?', ['removed', id], (err, rows) => {
        if (!err) {
          resolve(rows);
        } else {
          console.log(err);
        }
        console.log('The data from beer table are: \n', rows);
      });
    });
}

exports.findUser = async (id) => {
    // User the connection
    return await new Promise((resolve) => {
  connection.query('SELECT * FROM user WHERE id = ?', [id], (err, rows) => {
    if (!err) {
      resolve(rows);
    } else {
      console.log(err);
    }
    console.log('The data from user table: \n', rows);
  });
    });
}

exports.activate = async (id) => {
    return await new Promise((resolve) => {
        console.log('got here');
        connection.query('SELECT status FROM user WHERE id = ?', [id], (err, rows1) => {
            
            if (!err) {
                let toggledStatus = rows1[0].status === 'active' ? 'none' : 'active';
                console.log('Toggle status: ' + toggledStatus);
                connection.query('UPDATE user SET status = ?', [toggledStatus], (err, rows2) => {
      
                    if (!err) {
                        resolve(toggledStatus === 'active');
                    } else {
                      console.log(err);
                    }
                  })
            } else {
              console.log(err);
            }
            console.log('The data from user table: \n', rows1);
          });
      });
};