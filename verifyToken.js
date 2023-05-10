const verifyToken = (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) {
    res.status(401).send("Token not provided");
    return;
  }
  try {
    const payload = jwt.verify(token, secretKey);
    req.user = payload;
    next();
  } catch (err) {
    res.status(401).send("Invalid token");
  }
};
