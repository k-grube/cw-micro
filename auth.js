const basicAuth = require('basic-auth')
const { AutomateAPI } = require('connectwise-rest')

const { CWA_SERVER_URL } = process.env

/**
 * Example authentication function, do not use this in production
 */
exports.checkMemberCredentials = (req, res, next) => {
  // decode basic auth
  const auth = basicAuth(req)

  if (!auth) {
    res.status(401).send('unauthorized')
    return
  }

  const { name, pass } = auth

  // check username, password against automate API
  // or your other authentication service
  // passport.js would be a good drop in here as well
  AutomateAPI.getToken({
    username: name,
    password: pass,
    serverUrl: CWA_SERVER_URL,
  })
    .then((result) => {
      // if the token request was not successful
      if (!result.AccessToken) {
        res.status(401).send('unauthorized')
      }
      next()
    })
    .catch((err) => next(err))
}
