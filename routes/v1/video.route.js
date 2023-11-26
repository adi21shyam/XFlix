     const router = require('express').Router();
const {getVideos, postVideos, patchVotes, getVideoById, patchViews} = require('../../controller/video.controller');


router.get('/:videoId', getVideoById);
router.get('/', getVideos);
router.patch('/:videoId/views', patchViews);
router.post('/', postVideos);
router.patch('/:videoId/votes', patchVotes);

module.exports = router;