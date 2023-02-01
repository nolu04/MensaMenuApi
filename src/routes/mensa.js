const express = require('express')
const mensaController = require('../controllers/mensa')

const router = express.Router()

router.get('', mensaController.getAll)

router.get('/menuplan/:website', mensaController.get)   


module.exports = router 