const express = require('express')
const { AutomateAPI, ManageAPI } = require('connectwise-rest')
const router = express.Router()

const {
  CWM_COMPANY_ID,
  CWM_PUBLIC_KEY,
  CWM_PRIVATE_KEY,
  CWM_COMPANY_URL,
  CWA_PASSWORD,
  CWA_USER,
  CWA_SERVER_URL,
  CW_CLIENT_ID,
} = process.env

const cwa = new AutomateAPI({
  username: CWA_USER,
  password: CWA_PASSWORD,
  serverUrl: CWA_SERVER_URL,
  clientId: CW_CLIENT_ID,
})

const cwm = new ManageAPI({
  companyId: CWM_COMPANY_ID,
  publicKey: CWM_PUBLIC_KEY,
  privateKey: CWM_PRIVATE_KEY,
  companyUrl: CWM_COMPANY_URL,
  clientId: CW_CLIENT_ID,
})

/**
 * Example route that retrieves charge-codes from the Manage API
 */
router.get('/api/cwm/time/charge-codes', (req, res) => {
  cwm.SystemAPI.getSystemReportsByReportName('chargeCode')
    .then((report) => res.json(report))
    .catch((err) => {
      res.status(err.status).end()
    })
})

/**
 * Another example route that gets the first computer in a list from Automate API
 */
router.get('/api/cwa/', (req, res) => {
  cwa.ComputersAPI.getComputerList({ pageSize: 1 })
    .then((results) => res.json(results))
    .catch((err) => {
      res.status(err.status).end()
    })
})

router.get

module.exports = router
