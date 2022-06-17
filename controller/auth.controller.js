require('dotenv').config()
const db = require('../db')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

class AuthController {
    async login(req, res) {
        const {name, password} = req.body;
        const person = await db.query(`SELECT * FROM person WHERE name = $1`, [name]);

        if(!person.rows[0]) {
            return res.json({'message': 'Пользователь не найден'});
        }

        const isPassEquals = await bcrypt.compare(password, person.rows[0].password);

        if(!isPassEquals) {
            return res.json({'message': 'Неверный пароль'});
        }

        const accessToken = jwt.sign(person.rows[0], process.env.ACCESS_SECRET_KEY)

        res.json(accessToken);
    }

    authenticateToken(req, res, next) {
        const authHeader = req.headers['authorization']
        const token = authHeader && authHeader.split(' ')[1]

        if(token == null) return res.sendStatus(401);

        jwt.verify(token, process.env.ACCESS_SECRET_KEY, (err, user) => {
            if(err) return res.sendStatus(403)
            req.user = user
            next()
        })



    }
}

module.exports = new AuthController()