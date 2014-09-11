express = require('express')
router = express.Router()

# GET pages listing.
router.get('/', (req, res) ->
  res.render('pages')

router.get('/new', (req, res) ->
  page = {id: '', name: '', content: ''}
  res.render('page', {page: page})
)

module.exports = router
