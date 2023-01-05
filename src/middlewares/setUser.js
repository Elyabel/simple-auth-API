const jwt = require("jsonwebtoken");
const { User } = require("../database/models");

/**
 * Set User
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 * @param {import('express').next} next
 */
module.exports = async (req, res, next) => {
  const token =
    req.headers.authorization && req.headers.authorization.split(" ")[1];

  if (token) {
    let decoded;

    try {
      decoded = jwt.verify(token, process.env.SECRET);
    } catch (error) {
      return next();
    }

    if (decoded) {
      const user = await User.findByPk(decoded.id);
      req.user = user;

      return next();
    }
  }

  return next();
};