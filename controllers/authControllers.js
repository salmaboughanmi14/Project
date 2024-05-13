const User = require('../models/users');
const { hashPassword, comparePassword } = require('../helpers/auth');
const jwt = require('jsonwebtoken');
const UserModel = require('../models/users');
const JWT_SECRET = 'your_very_secret_string';
const nodemailer = require('nodemailer');



const test = (req, res) => {
  res.json('Test is working');
};

const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name) {
      return res.json({ error: 'Name is required' });
    }

    if (!password || password.length < 6) {
      return res.json({
        error: 'Password is required and should be at least 6 characters long'
      });
    }

    const exist = await User.findOne({ email });
    if (exist) {
      return res.json({
        error: 'Email is already taken'
      });
    }

    const hashedPassword = await hashPassword(password);
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
    });
    
    return res.json(user);
  } catch (error) {
    console.log(error);
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    
    const user = await User.findOne({ email });
    if (!user) {
      return res.json({ 
        error: 'No User Found'
      });
    }

    const match = await comparePassword(password, user.password);
    if (match) {
      jwt.sign({ email: user.email, id: user._id, name: user.name }, JWT_SECRET, {}, (err, token) => { 
        if (err) throw err;
        res.cookie('token', token).json(user);
      });
    } else {
      res.json({
        error: "Passwords do not match"
      });
    }
  } catch (error) {
    console.log(error);
  }
};

const getProfile = (req, res) => {
  const {token} = req.cookies
  if(token) {
      jwt.verify(token, JWT_SECRET, {}, (err, user) => {
          if(err) throw err ;
          res.json(user)
      })
  } else {
      res.json(null )
  }
  
  }

  const forgotPassword = async (req, res) => {
    try {
        const { email } = req.body;
        // Générez le token JWT unique ici
        const token = jwt.sign({ email }, JWT_SECRET, { expiresIn: '1h' });

        // Envoyez l'e-mail avec le lien de réinitialisation du mot de passe
        var transporter = nodemailer.createTransport({
          service: 'gmail',
          auth: {
            user: 'youremail@gmail.com',
            pass: 'yourpassword'}});
    
        var mailOptions = {
          from: 'youremail@gmail.com',
          to: 'myfriend@yahoo.com',
          subject: 'Reste your Password',
          text: `http://localhost:5173/rest-password/${user._id}/${token}`
        };
    
        await transporter.sendMail(mailOptions);

        res.json({ message: 'Password reset link sent successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

  module.exports = {
      test,
      registerUser,
      loginUser ,
      getProfile,
      forgotPassword,
      
  };
