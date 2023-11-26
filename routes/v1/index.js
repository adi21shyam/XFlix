// const router = require('express').Router();
const express = require('express')
const router = express.Router()
const videoRoutes = require("./video.route");

// console.log(typeof videoRoutes)/
router.use('/videos', videoRoutes);


module.exports = router;
