import { Container } from "inversify";
import { productService, userService } from "../services";
import { loginMiddleware } from "../middleware/login.middleware";

const container = new Container()

container.bind<userService>(userService).toSelf();
container.bind<productService>(productService).toSelf();
container.bind<loginMiddleware>(loginMiddleware).toSelf();

export default container;