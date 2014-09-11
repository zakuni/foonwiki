express = require('express')
router = express.Router()

# GET pages listing.
router.get('/', (req, res) ->
  res.render('pages')
)

module.exports = router
