import { Strategy, ExtractJwt } from "passport-jwt";
import config from ".";
import { TokenTypes } from "../constants/enums";
import usersRepository from "../repositories/users";
import { IJwtPayload } from "../types";

const jwtOptions = {
  secretOrKey: config.jwt.secret,
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
};

const jwtVerify = async (payload: IJwtPayload, done: any) => {
  try {
    if (payload.type !== TokenTypes.ACCESS_TOKEN) {
      throw new Error("Invalid token type");
    }
    const user = await usersRepository.findUserById(payload.sub);
    if (!user) {
      return done(null, false);
    }
    done(null, user);
  } catch (error) {
    done(error, false);
  }
};

export default new Strategy(jwtOptions, jwtVerify);
