import App from './app';
import ItemController from './controllers/item.controller';
import IndexController from "./controllers/index.controller";
import DataController from "./controllers/data.controller";

const app: App = new App([
    new ItemController(),
    new DataController(),
    new IndexController(),
]);

app.listen();
