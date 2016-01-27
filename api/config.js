'user strict';

var config = {
  development: {
    admin: {
      userName: 'admin',
      displayName: 'Admin'
    }
  },
  test: {
  },
  production: {
  }
};

module.exports = config[process.env.NODE_ENV || 'development'];