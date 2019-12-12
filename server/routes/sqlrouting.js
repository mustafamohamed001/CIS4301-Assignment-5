const sqlitecontroller = require('../controllers/sqlcontroller.js');
    express = require('express'), 
    router = express.Router()

    router.route('/getFlowers').post(sqlitecontroller.getFlowers);
    router.route('/getSightings').post(sqlitecontroller.getSightings);
    router.route('/flowersUpdate').post(sqlitecontroller.flowersUpdate);
    router.route('/sightingsUpdate').post(sqlitecontroller.sightingsUpdate);
    router.route('/sightingsInsert').post(sqlitecontroller.sightingsInsert);
    router.route('/sightingsDelete').post(sqlitecontroller.sightingsDelete);
    router.route('/flowersDelete').post(sqlitecontroller.flowersDelete);
  
module.exports = router;