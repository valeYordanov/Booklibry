const { verifyToken } = require("../token-util/jwt");


function session() {
  return function (req, res, next) {
    const token = req.cookies?.token;

    if (token) {
      try {
        const sessionData = verifyToken(token);
        req.user = {
          email: sessionData.email,
          username: sessionData.username,

          _id: sessionData._id,
        };
        res.locals.hasUser = true;
      } catch (error) {
        res.clearCookie("token");
      }
    }
    next();
  };
}

module.exports = { session };
