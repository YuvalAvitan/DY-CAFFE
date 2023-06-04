import { Container } from "react-bootstrap";
import Header from "./components/Header";
import Footer from "./components/Footer";
import HomeScreen from "./screens/HomeScreen";
import MenuScreen from "./screens/MenuScreen";
import MenuScreen2 from "./screens/MenuScreen2";
import MenuScreen3 from "./screens/MenuScreen3";
import MenuScreen4 from "./screens/MenuScreen4";
import MenuScreen5 from "./screens/MenuScreen5";
import MenuScreen6 from "./screens/MenuScreen6";
import SeatingScreen from "./screens/SeatingScreen";
import NameScreen from "./screens/NameScreen";
import OutSeatScreen from "./screens/OutSeatScreen";
import InSeatScreen from "./screens/InSeatScreen";
import CategoriesListScreen from "./screens/CategoriesListScreen";
import CategoryAddScreen from "./screens/CategoryAddScreen";

import ItemScreen from "./screens/ItemScreen";
import CartScreen from "./screens/CartScreen";
import LoginScreen from "./screens/LoginScreen";
import RegisterScreen from "./screens/RegisterScreen";
import ProfileScreen from "./screens/ProfileScreen";
import UserListScreen from "./screens/UserListScreen";
import UserEditScreen from "./screens/UserEditScreen";
import PaymentScreen from "./screens/PaymentScreen";
import OrderScreen from "./screens/OrderScreen";
import PlaceOrderScreen from "./screens/PlaceOrderScreen";
import { BrowserRouter as Router, Route } from "react-router-dom";
import TableListScreen from "./screens/TableListScreen";
import TableEditScreen from "./screens/TableEditScreen";
import AddTableScreen from "./screens/AddTableScreen";

import OrderListScreen from "./screens/OrderListScreen";
import ItemEditScreen from "./screens/ItemEditScreen";
import ItemListScreen from "./screens/ItemListScreen";
const App = () => {
  return (
    <Router>
      <Header />
      <main className="py-3">
        <Container>
          <Route path="/signin" component={LoginScreen} />
          <Route
            path="/admin/categorieslist"
            component={CategoriesListScreen}
          />
          <Route path="/admin/categories/add" component={CategoryAddScreen} />
          <Route path="/admin/tablelist" component={TableListScreen} />
          <Route path="/admin/tables/:id/edit" component={TableEditScreen} />
          <Route path="/admin/tables/add" component={AddTableScreen} />

          <Route path="/orders/:id" component={OrderScreen} />
          <Route path="/name" component={NameScreen} />
          <Route path="/payment/:name" component={PaymentScreen} />
          <Route path="/placeorder/:name" component={PlaceOrderScreen} />
          <Route path="/register" component={RegisterScreen} />
          <Route path="/profile" component={ProfileScreen} />
          <Route path="/admin/userlist" component={UserListScreen} />
          <Route path="/admin/user/:id/edit" component={UserEditScreen} />
          <Route path="/items/:id" component={ItemScreen} exact />
          <Route path="/cart/:id?" component={CartScreen} />
          <Route path="/seating/:name" component={SeatingScreen} />
          <Route path="/outside/:name" component={OutSeatScreen} />
          <Route path="/inside/:name" component={InSeatScreen} />
          <Route path="/menu6" component={MenuScreen6} exact />
          <Route path="/menu5" component={MenuScreen5} exact />
          <Route path="/menu4" component={MenuScreen4} exact />
          <Route path="/menu3" component={MenuScreen3} exact />
          <Route path="/menu2" component={MenuScreen2} exact />
          <Route path="/menu" component={MenuScreen} exact />

          <Route path="/admin/orderlist" component={OrderListScreen} />
          <Route path="/admin/items/:id/edit" component={ItemEditScreen} />
          <Route path="/admin/itemlist" component={ItemListScreen} exact />

          <Route path="/" component={HomeScreen} exact />
        </Container>
      </main>
      <Footer />
    </Router>
  );
};

export default App;
