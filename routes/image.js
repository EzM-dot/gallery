import { Router } from 'express';
import Image from '../models/images.js';

const router = Router();

router.get('/:id', (req,res)=>{
    // console.log(req);
    Image.findById(req.params.id,function(err, image){
        if (err) console.log(err)
        // console.log(image);
        res.render('singleImage', {title: 'Single Image', image:image})
    } )
})

router.put('/:id', (req,res) =>{
    console.log(req.params.id)
    console.log(req.body);
    Image.updateOne({_id:req.params.id},{
        $set:{
            name:req.body.name
        }
    },{upsert: true}, function(err,image ){
        if (err) console.log(err)
        res.redirect('/')
    })
})

router.delete('/:id', (req,res) =>{
    console.log(req.params.id)

    Image.deleteOne({_id: req.params.id}, function(err){
        if (err) console.log(err)
        res.redirect('/index')
    })
})

export default router;