const passport = require("passport");
const userService = require("../services/user-service");
const hashService = require("../services/hash-services");
const GoogleStrategy = require("passport-google-oauth20").Strategy;

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: `http://localhost:${process.env.PORT || 8888}/auth/google/callback`,
    },
    async (token, tokenSecret, profile, done) => {
      try {
        const { email, given_name: firstName, family_name: lastName, picture: profileImage } = profile._json;
        let user = await userService.findEmail(email);
        console.log(profile)
        if (!user) {
          const data = {
            email,
            firstName,
            lastName,
            displayName: profile.displayName,
            googleLogin: await hashService.hash(profile.id),
          };
          if (profileImage) {
            data.profileImage = profileImage;
          }
          user = await userService.createUserByData(data);
        } else {
          const isMatch = await hashService.compare(profile.id, user.googleLogin);
          if (!isMatch) {
            return done(null, false, { message: "Invalid credentials" });
          }
        }
        profile.dbId = user.id;
        return done(null, profile);
      } catch (error) {
        return done(error);
      }
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((obj, done) => {
  done(null, obj);
});

module.exports = passport;
