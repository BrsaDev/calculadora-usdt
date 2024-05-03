const express = require('express')
const { get_cotas_usdt } = require("./services/traceCapital")
const path = require('path')



const app = express()

const port = 3003
app.use(express.urlencoded({ extended: false, limit: '50mb' }))
app.use(express.json({ limit: '50mb' }));
app.use(express.static('pages'))

app.get("/", (req, res) => {
    return res.sendFile(path.join(__dirname, '/pages/home.html'))
})

app.get("/cota", async (req, res) => {
    try {
        let response = await get_cotas_usdt()
        if ( response.erro ) return res.json({ erro: response.erro })
        return res.json({ cota: response.cota })
    }catch(erro) {
        return res.json({ erro })
    }
})
app.get('/get-cota', async (req, res) => {
    let { spread } = req.query
    if ( spread ) {
        let cota = await get_cotas_usdt()
        if ( !cota.erro ) {
            return res.json({ cota: cota.cota })
        }
        return res.json({ erro: cota.erro })
    }
})

app.listen(port, () => {
    console.log("Rodando na porta " + port)
})