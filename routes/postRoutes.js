const express = require('express');
const postControllers = require('../controllers/postControllers');
const router = express.Router();
const multer = require("multer");


const  credential = {
    email : "manas25112@gmail.com",
    password : "admin123"
}

const FileStorageEngine = multer.diskStorage({
    destination: (req,file,cb) =>  {
        cb(null,'images');
},
filename: (req, file, cb) => {
    cb(null, Date.now() + "--" + file.originalname);
},
});

const upload = multer({storage:FileStorageEngine});

// router.route("/info/").get(postControllers.getAllPosts).post(postControllers.createNewPost);

// router.route("/info/:id").get(postControllers.getPostById);
//router.route("/:email").get(postControllers.getPostByEmail);

router.post('/create_info',upload.single('image'), postControllers.createNewPost)

// router.post('/info',upload.single('image'), (req, res) => {
//     console.log(req.body)
// })

// home route
router.get('/', (req, res) =>{
    res.render('base', { title : "Login System"});
})

router.route('/admin').get(postControllers.getAllPosts)
router.route('/admin').post(postControllers.getPostByEmail)


// login user
router.post('/login', (req, res)=>{
    console.log(req.body.email)
    console.log(req.body.password)
    if(req.body.email == credential.email && req.body.password == credential.password){
        req.session.user = req.body.email;
        res.redirect('/dashboard');
        //res.end("Login Successful...!");
    }else{
        res.end("Invalid Username")
    }
});

// route for dashboard
router.get('/dashboard', (req, res) => {
    if(req.session.user){
        res.render('information', {user : req.session.user})
    }else{
        res.send("Unauthorize User")
    }
})

// route for logout
router.get('/logout', (req ,res)=>{
    req.session.destroy(function(err){
        if(err){
            console.log(err);
            res.send("Error")
        }else{
            res.render('base', { title: "Express", logout : "logout Successfully...!"})
        }
    })
})





router.post('/single', upload.single('image'),(req, res) => {
    console.log(req.file.path);
    res.send('single file upload success');
});



router.post('/multiple', upload.array('images',2),(req, res) => {
    console.log(req.file);
    res.send('multiple file upload success');
});


module.exports = router;