import { Router } from "express";
import multer from "multer";
import uploadConfig from "./config/multer";
import { CreateUserController } from "./controllers/user/CreateUserController";
import { authUserController } from "./controllers/user/AuthUserController";
import { validateSchema } from "./middlewares/validateSchema";
import { createUserSchema, authUserSchema } from "./schemas/userSchema";
import { DetailUserController } from "./controllers/user/DetailUserController";
import { isAuthenticated } from "./middlewares/isAuthenticated";
import { CreateCategoryController } from "./controllers/category/CreateCategoryController";
import { ListCategoryController } from "./controllers/category/ListCategoryController";
import { isAdmin } from "./middlewares/isAdmin";
import { createCategorySchema } from "./schemas/createCategorySchema";
import { CreateProductController } from "./controllers/product/CreateProductController";
import { createProductSchema, ListProductsSchema, ListProductByCategorySchema } from "./schemas/createProductSchema";
import { ListProductsController } from "./controllers/product/ListProductsController";
import { DeleteProductController } from "./controllers/product/DeleteProductController";
import { ListProductByCategoryController } from "./controllers/product/ListProductByCategoryController";
import { CreateOrderController } from "./controllers/order/CreateOrderController";
import { createOrderSchema, addItemSchema, removeItemSchema, detailOrderSchema, sendOrderSchema, finishOrderSchema, deleteOrderSchema } from "./schemas/createOrderSchema";
import { ListOrdersController } from "./controllers/order/ListOrdersController";
import { AddItemController } from "./controllers/order/AddItemController";
import { RemoveItemController } from "./controllers/order/RemoveItemController";
import { DetailOrderController } from "./controllers/order/DetailOrderController";
import { SendOrderController } from "./controllers/order/SendOrderController";
import { FinishOrderController } from "./controllers/order/FinishOrderController";
import { DeleteOrderController } from "./controllers/order/DeleteOrderController";


const router = Router();
const upload = multer(uploadConfig);

// Rotas user
router.post("/users", validateSchema(createUserSchema), new CreateUserController().handle);

router.post("/session", validateSchema(authUserSchema), new authUserController().handle);

router.post("/me", isAuthenticated, new DetailUserController().handle);

// Rotas category
router.post("/category", isAuthenticated, isAdmin, validateSchema(createCategorySchema), new CreateCategoryController().handle);

router.get("/category", isAuthenticated, new ListCategoryController().handle);

// Rotas products
router.post("/product", isAuthenticated, isAdmin, upload.single('file'), validateSchema(createProductSchema), new CreateProductController().handle);

router.get("/products", isAuthenticated, validateSchema(ListProductsSchema), new ListProductsController().handle);

router.delete("/product", isAuthenticated, isAdmin, new DeleteProductController().handle);

router.get("/category/product", isAuthenticated, validateSchema(ListProductByCategorySchema), new ListProductByCategoryController().handle);

// Rotas Order
router.post("/order", isAuthenticated, validateSchema(createOrderSchema), new CreateOrderController().handle);

router.get("/orders", isAuthenticated, new ListOrdersController().handle);

router.post("/order/item", isAuthenticated, validateSchema(addItemSchema), new AddItemController().handle);

router.delete("/order/remove", isAuthenticated, validateSchema(removeItemSchema), new RemoveItemController().handle);

router.get("/order/detail", isAuthenticated, validateSchema(detailOrderSchema), new DetailOrderController().handle);

router.put("/order/send", isAuthenticated, validateSchema(sendOrderSchema), new SendOrderController().handle);

router.put("/order/finish", isAuthenticated, validateSchema(finishOrderSchema), new FinishOrderController().handle);

router.delete("/order", isAuthenticated, validateSchema(deleteOrderSchema), new DeleteOrderController().handle);

export { router };