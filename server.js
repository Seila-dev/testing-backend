import express from 'express'
import { PrismaClient } from '@prisma/client'
import cors from 'cors'

const prisma = new PrismaClient()


const app = express()
app.use(cors({
    origin: "https://testing-backend-8qik.onrender.com"
}
))
app.options('*', cors())
app.use(express.json())

app.post('/usuarios', async (req, res) => {

    await prisma.user.create({
        data: {
            email: req.body.email,
            name: req.body.name,
            age: req.body.age
        }
    })

    res.status(201).json(req.body)
})

app.get('/usuarios', async (request, response) => {

    const users = await prisma.user.findMany()

    response.status(200).json(users) //listagem
})

app.put('/usuarios/:id', async (req, res) => {

    await prisma.user.update({
        where: {
            id: req.params.id
        },
        data: {
            email: req.body.email,
            name: req.body.name,
            age: req.body.age
        }
    })

    res.status(201).json(req.body)
})

app.delete('/usuarios/:id', async (req, res) => {
    await prisma.user.delete({
        where: {
            id: req.params.id,
        },
    })

    res.status(200).json({ message: " Usuário deletado com sucesso" })
})

app.listen(3000)

// Criar nossa API de usuários
// - Criar um usuário
// - Listar todos os usuários
// - Editar um usuário
// - Deletar um usuário
// Username: felipe
// Senha: NBsaydDl1SRYtzUV