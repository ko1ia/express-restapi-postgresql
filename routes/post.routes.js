const Router = require('express')
const router = new Router()
const PostController = require('../controller/post.controller')

router.post('/post', PostController.createPost)
router.get('/post', PostController.getPosts)
router.get('/post/:id', PostController.getOnePost)
router.put('/post', PostController.updatePost)


module.exports = router