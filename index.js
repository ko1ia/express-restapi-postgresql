const express = require('express')
const userRouter = require('./routes/user.routes')
const postRouter = require('./routes/post.routes')
const authRouter = require('./routes/auth.routes')

const PORT = process.env.PORT || process.env.PORT

const app = express()

app.use(express.json())
app.use('/api', userRouter)
app.use('/api', postRouter)
app.use('/api', authRouter)

app.listen(PORT, () => console.log(`Server started on port: ${PORT}`))