const Router = require('express')
const router = new Router()
const PostController = require('../controller/post.controller')
const AuthController = require('../controller/auth.controller')

router.post('/post', AuthController.authenticateToken, PostController.createPost)
router.get('/post', AuthController.authenticateToken, PostController.getPosts)
router.get('/post/:id', AuthController.authenticateToken, PostController.getOnePost)
router.put('/post', AuthController.authenticateToken, PostController.updatePost)


module.exports = router