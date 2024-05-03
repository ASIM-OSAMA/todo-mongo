const compression = require('compression')

const compress = (req, res) => {
  if (req.headers['x-no-compression']) {
    // don't compress responses with this request header
    return false
  } else {
    // fallback to standard filter function
    return compression.filter(req, res)
  }
}
module.exports = compress
