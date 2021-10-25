module.exports = (err, req, res) => {
  const { statusCode = 500, message } = err;
  res.status(statusCode).send({ message });
};
