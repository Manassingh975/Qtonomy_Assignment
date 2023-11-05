const path = require('path');
const Information = require('../models/Information')

exports.getAllPosts = async (req, res, next) => {
    try{
        const infos = await Information.findAll()
        // console.log("==========================================================")
        // // console.log(infos)
        // infos[0].forEach(element => {
        //     console.log(element.id)
        // });
        res.render('admin', { infos : infos[0]});
    }catch(error){
        console.log(error);
        next(error);
    }
}



exports.createNewPost = async (req , res, next) => {
    try{
        let {name,age,gender,email,foodchoice,tourismlocation,travelcompanions, healthissue, transportaionpreferences, accommodationchoices, file} = req.body;
        let file_path = path.join(__dirname, `images\\${file}`)
        let info = new Information(name,age,gender,email,foodchoice,tourismlocation,travelcompanions, healthissue, transportaionpreferences, accommodationchoices, file_path)

        information = await info.save();
        res.status(201).json({'message' : "Informtion Created "})

    }catch(error){
        console.log(error)
        next(error)
    } 
}

exports.getPostById = async (req, res, next) => {
    try{
        
        let id = req.body.search
        const infos = await Information.findById(id)
        res.render('admin', { infos : infos[0]});
    }catch(error){
        console.log(error);
        next(error);
    }
}

exports.getPostByEmail = async (req, res, next) => {
    try{
        let email = req.body.search
        const infos = await Information.findByEmail(email)
        res.render('admin', { infos : infos[0]});
    }catch(error){
        console.log(error);
        next(error);
    }
}
