const models = require('../../models/model.js');

// const mysql = require('mysql');

// // Connection Pool
// let connection = mysql.createConnection({
//   host: process.env.DB_HOST,
//   user: process.env.DB_USER,
//   password: process.env.DB_PASS,
//   database: process.env.DB_NAME
// });

// View Users
exports.view = async (req, res) => {
  const rows = await models.allUsers();
  
  res.render('home', {rows: rows, removedUser: req.query.removedUser});
}

// Find User by Search
exports.find = async (req, res) => {
  let searchTerm = req.body.search;
  // User the connection

  let rows = await models.search(searchTerm);
  res.render('home', { rows });
}

exports.form = (req, res) => {
  res.render('add-user');
}

// Add new user
exports.create = async (req, res) => {
  const { first_name, last_name, email, phone, comments } = req.body;
  let searchTerm = req.body.search;

  await models.addUser(first_name, last_name, email, phone, comments);
  res.render('add-user', {alert: 'User successfully added'});
}


// Edit user
exports.edit = async (req, res) => {
  // User the connection

  let rows = await models.editUser(req.params.id);
  res.render('edit-user', { rows });
}


// Update User
exports.update = async (req, res) => {
  const { first_name, last_name, email, phone, comments } = req.body;
  // User the connection
  let rows = await models.updateUser(req.params.id, first_name, last_name, email, phone, comments);

  res.render('edit-user', {rows, alert: `${first_name} has been updated.` });
}

// Delete User
exports.delete = async (req, res) => {

  // Delete a record

  // User the connection
  // connection.query('DELETE FROM user WHERE id = ?', [req.params.id], (err, rows) => {

  //   if(!err) {
  //     res.redirect('/');
  //   } else {
  //     console.log(err);
  //   }
  //   console.log('The data from user table: \n', rows);

  // });

  // Hide a record

  await models.deleteUser(req.params.id);

  let removedUser = encodeURIComponent('User successeflly removed.');
  res.redirect('/?removed=' + removedUser);

}

// View Users
exports.viewall = async (req, res) => {

  let rows = await models.findUser(req.params.id);

  res.render('view-user', { rows });
}

exports.activate = async (req, res) => {
  console.log('got here');
  let active = await models.activate(req.params.id);
  res.json({active});
};