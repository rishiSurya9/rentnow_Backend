import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import passport from "passport";
import bcrypt from "bcrypt";
import User from "../models/user.model";
import generateToken from "../utils/generateToken";

export default new GoogleStrategy(
  {
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "/auth/google/callback",
  },

  async (accessToken, refreshToken, profile, done) => {
    try {
      const { email, name, id } = profile._json;

      // Find user by email
      let user = await User.findOne({ email });

      // If user doesn't exist, create a new one
      if (!user) {
        const salt = await bcrypt.genSalt(Number(process.env.SALT));
        const tempPassword = `${id.slice(-6)}${name.slice(-2)}`;
        const hashPassword = await bcrypt.hash(tempPassword, salt);

        user = await User.create({
          name,
          email,
          is_verified: true,
          password: hashPassword,
        });
      }

      // Generate tokens
      const tokens = await generateToken(user);

      // Return user and tokens
      return done(null, { user, ...tokens });
    } catch (error) {
      console.error("Google OAuth Error:", error);
      return done(error, false, { message: "Authentication failed. Please try again." });
    }
  }
);
