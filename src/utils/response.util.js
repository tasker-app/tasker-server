const badRequest = (res, message) => {
  return res.status(400).json({
    status: 'fail',
    error: message
  })
}

const internalServerError = (res, message = 'Internal server error') => {
  return res.status(500).json({
    status: 'fail',
    error: message
  })
}

const unauthorized = (res, message) => {
  return res.status(401).json({
    status: 'fail',
    error: message
  })
}

const success = (res, data) => {
  return res.status(200).json({
    status: 'success',
    data
  })
}

export { badRequest, internalServerError, success, unauthorized }
