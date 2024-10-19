import { Router } from "express";
const router = Router();
import userRouters from './user.route'

const v1Routes = [
  {
    path: "/users",
    route: userRouters,
  },
];

v1Routes.forEach((route) => {
  router.use(route.path, route.route);
});

export default router;
