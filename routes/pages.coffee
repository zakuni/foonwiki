express = require('express')
router = express.Router()

# GET pages listing.
router.get('/', (req, res) ->
  res.send('respond with a resource')
)

module.exports = router
