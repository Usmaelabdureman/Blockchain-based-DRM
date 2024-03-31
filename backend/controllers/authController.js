// Import the necessary packages for OAuth
const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth2").Strategy;
const FacebookStrategy = require("passport-facebook").Strategy;
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");
const config = require("../config/config");

exports.signup = async (req, res, next) => {
  try {
    const { firstName, lastName, username, email, password, userType } =
      req.body;
    if (!password) {
      return res.status(400).json({ message: "Password is required" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const existing = await User.findOne({ username });
    if (existing) {
      return res.status(400).json({ message: "User already exists" });
    }

    const user = await User.create({
      firstName,
      lastName,
      userType,
      email,
      username,
      password: hashedPassword,
    });
    res.status(201).json({ message: "User created successfully", user });
    console.log(user);
  } catch (error) {
    next(error);
  }
};

exports.login = async (req, res, next) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });

    if (!user) {
      return res.status(401).json({ message: "Invalid username or password" });
    }

    if (!user.password) {
      return res.status(500).json({ message: "Password not set for the user" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid username or password" });
    }

    const token = jwt.sign({ userId: user._id }, config.secretKey, {
      expiresIn: "1h",
    });
    res.status(200).json({ message: "Authentication successful", token });
  } catch (error) {
    next(error);
  }
};

// passport.use(new GoogleStrategy({
//     clientID: process.env.GOOGLE_CLIENT_ID,
//     clientSecret: process.env.GOOGLE_CLIENT_SECRET,
//     callbackURL: process.env.GOOGLE_CALLBACK_URL
//   },
//   async (accessToken, refreshToken, profile, done) => {
//     try {
//       let user = await User.findOne({ googleId: profile.id });
//       if (!user) {
//         user = await User.create({
//           username: profile.emails[0].value,
//           userType: 'consumer', // Assuming users signing up with Google are consumers
//           googleId: profile.id
//         });
//       }
//       return done(null, user);
//     } catch (error) {
//       return done(error);
//     }
//   }
// ));

// passport.use(new FacebookStrategy({
//     clientID: process.env.FACEBOOK_APP_ID,
//     clientSecret: process.env.FACEBOOK_APP_SECRET,
//     callbackURL: process.env.FACEBOOK_CALLBACK_URL,
//     profileFields: ['id', 'emails']
//   },
//   async (accessToken, refreshToken, profile, done) => {
//     try {
//       let user = await User.findOne({ facebookId: profile.id });
//       if (!user) {
//         user = await User.create({
//           username: profile.emails[0].value,
//           userType: 'consumer',
//           facebookId: profile.id
//         });
//       }
//       return done(null, user);
//     } catch (error) {
//       return done(error);
//     }
//   }
// ));

// router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

// router.get('/google/callback',
//   passport.authenticate('google', { failureRedirect: '/login' }),
//   (req, res) => {

//     res.redirect('/');
//   }
// );

// router.get('/facebook', passport.authenticate('facebook', { scope: ['email'] }));

// router.get('/facebook/callback',
//   passport.authenticate('facebook', { failureRedirect: '/login' }),
//   (req, res) => {

//     res.redirect('/');
//   }
// );
