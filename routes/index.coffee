express = require('express')
router = express.Router()

# GET home page.
router.get('/', (req, res) ->
  updatedPages = []
  newPages = []
  res.render('index', { updatedPages: updatedPages, newPages: newPages })
)

module.exports = router
