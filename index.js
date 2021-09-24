const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const router = require('./Routes');
const env =require('dotenv');
const exphbs = require('express-handlebars');
const { UserModel } = require('./models/Users');

// require timers.js
const PORT = 5000||env.process.PORT;
const app = express();
app.use(cors());
app.use(express.json());
app.use('',router);

app.engine('hbs', exphbs({
    defaultLayout: 'main',
    extname: '.hbs'
}));
app.set('view engine', 'hbs');
app.get('/login', (req, res) => {
    res.render('login');
});
app.get('/register', (req, res) => {
    res.render('register');
});
// app.get('/main', async (req, res) => {
//     res.render('mainpage');
//     const user_id=req.user?req.user._id:null;
//     await UserModel.findById(user_id).then(response=>{
//         if(response){
//             res.render('mainpage');
//         }else{
//             res.render('login');
//         }
//     }).catch(error=>console.log(error))
        
// });


app.use(express.static('views'))
// create setInterval callbacks
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true)
mongoose.connect('mongodb://localhost:27017/login-auth1', { useNewUrlParser: true, useUnifiedTopology: true }).then(async res => {
    console.log('our database is running on port 27017');
})
app.listen(PORT, console.log(`server is running on port${PORT}`))