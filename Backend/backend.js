const express = require('express')
var passport = require('passport');
const app = express()
const port = 3000
var BnetStrategy = require('passport-bnet').Strategy;

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})


//oAuth
//var BNET_ID = process.env.BNET_ID
//var BNET_SECRET = process.env.BNET_SECRET

var BNET_ID = "c086145d20ff48f9acd36cb441402c23"
var BNET_SECRET = "bCu1CUrRH3uVW9thBVKUvpV4kaYwmMWp"

 
// Use the BnetStrategy within Passport.
passport.use(new BnetStrategy({
    clientID: BNET_ID,
    clientSecret: BNET_SECRET,
    callbackURL: "https://localhost:3000/auth/bnet/callback",
    region: "us"
}, function(accessToken, refreshToken, profile, done) {
    return done(null, profile);
}));



app.get('/auth/bnet',
    passport.authenticate('bnet'));
 
app.get('/auth/bnet/callback',
    passport.authenticate('bnet', { failureRedirect: '/' }),
    function(req, res){
        res.redirect('/');
    });


    const { BlizzAPI } = require("blizzapi");

/**
 * Or using TypeScript:
 * import { BlizzAPI } from 'blizzapi';
 */

const api = new BlizzAPI({
  region: "us",
  clientId: "c086145d20ff48f9acd36cb441402c23",
  clientSecret: "bCu1CUrRH3uVW9thBVKUvpV4kaYwmMWp",
});


const data =  api.query("/utils/getAllRegions");


