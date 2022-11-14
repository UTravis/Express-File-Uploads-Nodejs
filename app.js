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
    let numOfFiles = 0;

    if (! req.files) {
        return res.status(400).json({ UploadError: "No files uploaded"});
    }else{
        const files = req.files.photo;

        if(files.length == 1){

            if (files.size <= 0) {
                return res.status(400).json({ UploadError: "File has no size" })
            }

            numOfFiles = 1;

            fileName = Date.now() + "-" + files.name;
            path = __dirname + "/uploads/" + fileName;
            files.mv(path, (err) => {
                if(err) return res.status(400).json(err);

                res.status(200).json({
                    status: "File Uploaded Successfully",
                    numberOfFiles: numOfFiles,
                    filesData: req.files.photo
                })
            })

        }else{

            files.forEach(file => {

                if (file.size <= 0) {
                    return res.status(400).json({ UploadError: "File has no size" })
                }
    
                numOfFiles++; //Counts the number of files uploaded
    
                fileName = Date.now() + "-" + file.name;
                path = __dirname + "/uploads/" + fileName;
                file.mv(path, (err) => {
                    if(err) return res.status(400).json(err);
                })
    
            });
    
            res.status(200).json({
                status: "Files Uploaded Successfully",
                numberOfFiles: numOfFiles,
                filesData: req.files.photo
            })

        }

        
    }


})



app.listen(port, () => console.log(`Example app listening on port ${port}!`))
