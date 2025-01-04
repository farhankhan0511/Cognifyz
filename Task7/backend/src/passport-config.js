import passport from "passport";
import { Strategy as JwtStrategy, ExtractJwt } from "passport-jwt";
import { User } from "./Usermodel.js";


const jwtOptions = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(), 
    secretOrKey: process.env.ACCESS_TOKEN_SECRET,            
};

passport.use(
    new JwtStrategy(jwtOptions, async (payload, done) => {
        try {
            const user = await User.findById(payload._id).select("-password");
            if (user) return done(null, user); 
            return done(null, false);         
        } catch (err) {
            return done(err, false);          
        }
    })
);

export const initializePassport = passport;
