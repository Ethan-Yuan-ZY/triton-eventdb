const jsonwebtoken = require("jsonwebtoken");

module.exports = (req, res, next) => {
  const authenticateHeader = req.get("Authorization");
  if (!authenticateHeader) {
    req.isAuth = false;
    return next();
  }
  const token = authenticateHeader.split(" ")[1];
  if (!token || token === "") {
    req.isAuth = false;
    return next();
  }
  let decodedToken;
  try {
    decodedToken = jsonwebtoken.verify(token, "abcdefg123456");
  } catch (err) {
    req.isAuth = false;
    return next();
  }
  if (!decodedToken) {
    req.isAuth = false;
    return next();
  }
  req.isAuth = true;
  req.userId = decodedToken.userId;
  next();
};
