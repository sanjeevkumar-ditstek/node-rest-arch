import proxy from "../services/appServiceProxy";

const userRoute = async (route) => {
  route.post("/user", proxy.user.create);
  route.get("/user", (req, res) => proxy.user.getByAttribute(req, res));
  route.post("/user/login", proxy.user.login);
  route.get("/user/:id", proxy.user.getUserById);
};

export default userRoute;
