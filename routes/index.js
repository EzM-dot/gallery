import { Router } from 'express';
import { v4 as uuidv4 } from 'uuid';
import upload from './upload.js';
import Image from '../models/images.js';
import { fileURLToPath } from 'url';
import path from 'path';

const router = Router();




router.get('/', async (req, res, next) => {
    try {
        const images = await Image.find({});
        res.render('index', { 
            images: images || [], 
            msg: req.query.msg 
        });
    } catch (err) {
        console.error('Error fetching images:', err);
        next(err);
    }
});

router.post('/upload', (req, res)=>{
    upload(req,res, (err)=>{
        if (err){
            res.redirect(`/?msg=${err}`);
        }else{
            console.log(req.file);
            // res.send("test");
            if (req.file == undefined){
                res.redirect('/?msg=Error: No file selcted!');
            }else{
                // const imageObj = {
                //     id: uuid.v4(),
                //     name: req.file.filename,
                //     path: 'images/' + req.file.filename
                // }
                // db.push(imageObj);
                // console.log(db);

                // create new image
                let newImage = new Image({
                    name: req.file.filename,
                    size: req.file.size,
                    path: 'images/' + req.file.filename
                })

                // save the uploaded image to the database
                newImage.save()

                
                res.redirect('/?msg=File uploaded successfully');
            }
        }
    })
})

export default router;