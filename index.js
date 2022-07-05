const express = require('express')
const routerIdentitas = require('./routers/identitas')
const routerRiwayat = require('./routers/riwayat')
const routerPelatihan = require('./routers/pelatihan')


const app = express()
const port = 5000
const cors = require('cors')


//MENERIMA REQ.BODY
app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded

app.use(cors({
    origin:'*'
}))

app.use(routerIdentitas)
app.use(routerRiwayat)
app.use(routerPelatihan)

app.listen(port, ()=>{
    console.log('server berjalan pada port' + port)
})