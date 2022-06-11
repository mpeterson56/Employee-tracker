const express = require('express');
const router = express.Router();
const cTable = require('console.table');
router.use(require('./departmentRoutes'));
router.use(require('./employeeRoutes'));
router.use(require('./roleRoutes'));


module.exports = router;