const { hash, compare } = require("bcryptjs");
const { Op } = require("sequelize");

const { createJWT } = require("../Func");
const { EMAIL_VALIDATION } = require("../constants");

const { User, TokenOnUser } = require("../database/models");

/**
 * `POST /v1/auth/register`
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 */
exports.register = async (req, res) => {
  const { username, email, password } = req.body;

  if (!username) {
    res.status(400);
    return res.send("Username is required.")
  }
  if (username.length <= 3) {
    console.log(username.length);
    res.status(400);
    return res.send("Username must be more than 3 characters.")
  }
  if (!email) {
    res.status(400);
    return res.send("Email is required.")
  }
  if (!EMAIL_VALIDATION.test(email)) {
    res.status(400);
    return res.send("Email is not valid.")
  }
  if (!password) {
    res.status(400);
    return res.send("Password is required.")
  }
  if (password.length <= 6) {
    res.status(400);
    return res.send("Password must be more than 6 charachters.")
  }

  const existingUser = await User.findOne({
    where: {
      [Op.or]: [{ username }, { email }],
    },
    attributes: {
      include: ["email"],
    },
  });

  if (existingUser) {
    res.status(409);
    return res.send("An account with that username and/or email already exists.")
  }

  const user = await User.create({
    username,
    email,
    password: await hash(password, 12),
  });

  const saveUser = user.toJSON();
  delete saveUser.password;

  const token = createJWT({ id: saveUser.id });

  const oldToken = await TokenOnUser.findOne({ where: { userId: user.id } });
  if (oldToken) {
    oldToken.token = token;
    await oldToken.save();
  } else {
    await TokenOnUser.create({ userId: user.id, token });
  }

  res.status(201);
  return res.json({
    token,
    user: saveUser,
  });
};

/**
 * `POST /v1/auth/login`
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 */
exports.login = async (req, res) => {
  const { username, password } = req.body;

  if (!username) {
    res.status(400);
    return res.send("Username is required.")
  }
  if (!password) {
    res.status(400);
    return res.send("Password is required.")
  }

  const user = await User.findOne({
    where: { username },
    attributes: { include: ["password"] },
  });

  if (user) {
    if (await compare(password, user.password)) {
      const saveUser = user.toJSON();
      delete saveUser.password;

      const token = createJWT({ id: saveUser.id });

      const oldToken = await TokenOnUser.findOne({ where: { userId: user.id } });
      if (oldToken) {
        oldToken.token = token;
        await oldToken.save();
      } else {
        await TokenOnUser.create({ userId: user.id, token });
      }

      return res.json({
        token,
        user: saveUser,
      });
    }

    res.status(401);
    return res.send("Username and/or password is incorrect.")
  }

  res.status(401);
  return res.send("Username and/or password is incorrect.")
};