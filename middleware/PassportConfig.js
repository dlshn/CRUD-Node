const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const UserSchema = require('../model/UserSchema');
const crypto = require('crypto');

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    callbackURL: '/auth/google/callback',
    passReqToCallback:true
}, async (req, accessToken, refreshToken, profile, done)=>{
    console.log(profile);
    done(null, profile);
}));

passport.serializeUser((user, done)=>{
    done(null, user);
});
passport.deserializeUser((user, done)=>{
    done(null, id);
});