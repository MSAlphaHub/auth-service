import { Router } from "express";
const router = Router();
import userRouters from "./user.route";
import authRouters from "./auth.route";

const v1Routes = [
  {
    path: "/users",
    route: userRouters,
  },
  {
    path: "/auth",
    route: authRouters,
  },
];

v1Routes.forEach((route) => {
  router.use(route.path, route.route);
});

export default router;
