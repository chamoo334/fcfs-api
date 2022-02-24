//TODO: find an updated alternative to xss-clean
exports.cleanInput = () => async (req, res, next) => {
  if (req.body) {
    for (let [key, value] of Object.entries(req.body)) {
      if (typeof value === 'string') {
        req.body[key] = value.replace(/<([^.]+)>.*?<\/\1>/gi, '');
      }
    }
  }
  next();
};
