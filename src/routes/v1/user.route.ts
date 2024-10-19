import express from 'express';
import usersController from '../../controllers/users';
const router = express.Router();

router.get("/", usersController.findUserById);

export default router;