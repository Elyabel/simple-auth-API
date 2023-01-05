const db = require("..");

exports.User = require("./User")(db);
exports.TokenOnUser = require("./TokenOnUser")(db);