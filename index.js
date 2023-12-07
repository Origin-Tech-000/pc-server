const { log } = require('console')
const path=require('path')
const express = require('express')
const app = express()
const fs = require('fs')
const multer= require('multer')
const upload=multer({dest:'./uploads'})
app.use(express.json())

app.get('/readfile/:name', async (req, res) => {
    // const data = fs.readFileSync('./test.json', { encoding: 'utf-8' })
    // var mongoObjectId = function () {
    //     var timestamp = (new Date().getTime() / 1000 | 0).toString(16);
    //     return timestamp + 'xxxxxxxxxxxxxxxx'.replace(/[x]/g, function () {
    //         return (Math.random() * 16 | 0).toString(16);
    //     }).toLowerCase();
    // };
    // var datas=mongoObjectId()
    // const d=JSON.parse(data)
    // log(d.data.length)
    // return res.send(data);
    return res.sendFile(path.join(__dirname,`./uploads/${req.params.name}.png`))
})

app.get('/writefile', async (req, res) => {
    const data = fs.writeFileSync('./test.json', JSON.stringify({ 'dataa': 'neeeeeee',}, null, 2))
    return res.send(data);
})

app.get('/appendfile', async (req, res) => {
    const data = fs.appendFile('./test.json',',{"data":"hai world"}',(err)=>{})
    return res.send(data);
})

app.post('/uploaddata/:name',upload.single('image'),async(req,res)=>{
    const  mongoObjectId = function () {
        var timestamp = (new Date().getTime() / 1000 | 0).toString(16);
        return timestamp + 'xxxxxxxxxxxxxxxx'.replace(/[x]/g, function () {
            return (Math.random() * 16 | 0).toString(16);
        }).toLowerCase();
    };
    const id=mongoObjectId()
    fs.renameSync(`./uploads/${req.file.filename}`,`./uploads/${req.params.name+'.png'}`)
    try {
        const w=req.params.name
        const doc=fs.readFileSync('./text.json',{encoding:"utf8"})
        const data=JSON.parse(doc)
        const body={_id:id,name:w,imageName:w+'.png'}
        log(data.details.length)
        if(data.details.length===0){
            log(req.params.name)
            data.details[0]=body
            fs.writeFileSync('./text.json',JSON.stringify(data))
            return res.json(data)
        }else{
           data.details[data.details.length]=body
           console.log(data);
           fs.writeFileSync('./text.json',JSON.stringify(data))
            return res.json(data)
        }
    } catch (error) {
        log(error.message)
        return res.json(error)
    }
})
const port=process.env.PORT ||20005
app.listen(port, () => {
    console.log(`runnig on port ${port}`);
})
