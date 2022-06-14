const db = require('../db')

class PostController {
    async createPost(req, res) {
        const {title, content, user_id} = req.body
        const newPost = await db.query(`INSERT INTO post (title, content, user_id) values ($1, $2, $3) RETURNING *`, [title, content, user_id])
        res.json(newPost.rows[0])
    }

    async getPosts(req, res) {
        const posts = await db.query(`SELECT * FROM post`)
        res.json(posts.rows)
    }

    async getOnePost(req, res) {
        const id = req.params.id
        const post = await db.query(`SELECT * FROM post WHERE id = $1`, [id])
        res.json(post.rows)
    }

    async updatePost(req, res) {
        const {id, title, content, user_id} = req.body;
        const post = await db.query('UPDATE post set title = $1, content = $2, user_id = $4 WHERE id = $3 RETURNING *', [title, content, id, user_id])
        res.json(post.rows[0])
    }
}

module.exports = new PostController()