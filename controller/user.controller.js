const db = require('../db')
const bcrypt = require('bcrypt')

class UserController {
    async createUser(req, res) {
        const passwordHash = await bcrypt.hash(req.body.password, 3)
        const {name, surname} = req.body
        const newUser = await db.query(`INSERT INTO person (name, surname, password) values ($1, $2, $3) RETURNING *`, [name, surname, passwordHash])
        res.json(newUser.rows[0])
    }

    async getUsers(req, res) {
        const users = await db.query(`SELECT * FROM person`)
        res.json(users.rows)
    }

    async getOneUser(req, res) {
        const id = req.params.id
        const user = await db.query(`SELECT * FROM person WHERE id = $1`, [id])
        res.json(user.rows)
    }

    async updateUser(req, res) {
        const {id, name, surname, password} = req.body;
        const user = await db.query('UPDATE person set name = $1, surname = $2, password = $3 WHERE id = $4 RETURNING *', [name, surname, password, id])
        res.json(user.rows[0])
    }

    async deleteUser(req, res) {
        const id = req.params.id
        const user = await db.query('DELETE FROM person WHERE id = $1', [id])
        res.json({
            "message": "user deleted"
        })
    }
}

module.exports = new UserController()