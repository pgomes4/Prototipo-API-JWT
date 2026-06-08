function success(res, status, message, data = null) {
  return res.status(status).json({ success: true, message, data })
}

function error(res, status, message, code = 'ERROR', details = []) {
  return res.status(status).json({
    success: false,
    message,
    error: { code, details }
  })
}

module.exports = { success, error }
