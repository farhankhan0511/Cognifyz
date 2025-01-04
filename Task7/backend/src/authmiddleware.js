import passport from "passport";
import { ApiResponse } from "./utils/ApiResponse.js";

export const verifyJWT = (req, res, next) => {
    passport.authenticate("jwt", { session: false }, (err, user, info) => {
        if (err) {
            return res.status(401).json(new ApiResponse(401, {}, "Unauthorized request"));
        }
        if (!user) {
            return res.status(401).json(new ApiResponse(401, {}, "Invalid access token"));
        }
        req.user = user; // Attach the user to the request object
        next();
    })(req, res, next);
};
