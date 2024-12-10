import express from "express";
import authController from "../../controllers/auth";
import validate from "../../middlewares/validate";
import userValidations from "../../validations/user";
const router = express.Router();

router.post(
  "/register",
  validate(userValidations.create),
  authController.register
);

router.post(
  "/login",
  validate(userValidations.loginWithEmailAndPassword),
  authController.loginWithEmailAndPassword
);

router.get("/verify-email", validate(userValidations.verifyEmailByToken), authController.verifyEmail);

export default router;
