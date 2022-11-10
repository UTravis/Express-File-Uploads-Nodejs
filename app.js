const express = require('express')
const fileUpload =  require('express-fileupload');


const app = express()

app.use(express.json())
app.use(fileUpload())

const port = 3000

app.post('/upload', (req, res) => {
    const fileName = Date.now() + "_" + req.files.photo.name; //Gets the name of the uploaded file and add the current date to it
    const path = __dirname + "/uploads/" +fileName;
    req.files.photo.mv(path, ( err => {
        if(err) return res.status(400).json(err);
        res.status(200).json(req.files.photo)
    } ))
})

app.post('/double-uploads/', (req, res) => {
    let fileName;
    let path;

    const files = req.files.photo;
    files.forEach(file => {
        fileName = file.name;
        path = __dirname + "/uploads/" + fileName;
        file.mv(path, (err) => {
            if(err) return res.status(400).json(err);
        })
    });

    res.status(200).json(files)
})



app.listen(port, () => console.log(`Example app listening on port ${port}!`))