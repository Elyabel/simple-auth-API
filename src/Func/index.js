const jwt = require("jsonwebtoken");

/**
 *
 * @param {string | object | Buffer} data
 * @param {jwt.Secret} secret
 * @param {jwt.SignOptions} options
 */
exports.createJWT = (
  data,
  secretOrPrivateKey = process.env.SECRET,
  options = { expiresIn: 60 * 60 * 24 * 7 }
) => jwt.sign(data, secretOrPrivateKey, options);

exports.canBan = (user, target) => {
  if (
    (user.isMod && (target.isMod || target.isAdmin || target.isDev)) ||
    (user.isAdmin && (target.isAdmin || target.isDev)) ||
    (user.isDev && (target.isAdmin || target.isDev))
  ) {
    return false;
  }

  return true;
};