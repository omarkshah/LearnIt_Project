const users = [];

// Join user 
function userJoin(id, username, qualification) {
  const user = { id, username, qualification};

  users.push(user);

  return user;
}

// Get current user
function getCurrentUser(id) {
  return users.find(user => user.id === id);
}

module.exports = {userJoin, getCurrentUser};