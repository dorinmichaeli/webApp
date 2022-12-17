import { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MainHeader from "./components/MainHeader";
import Main from "./components/Main";
import Checkout from "./components/Checkout";
import Cart from "./components/Cart";
function App() {
  const [cartItems, setCartItems] = useState([]);
  const [products, setProducts] = useState([]);

  const sendRequest = () => {
    fetch("http://localhost:5000/api")
      .then((res) => (res.ok ? res.json() : { products: "" }))
      .then((data) => {
        setProducts(data.products);
      });
  };
  useEffect(() => {
    sendRequest();
  }, []);

  const onAdd = (product) => {
    const exist = cartItems.find((x) => x.id === product.id);
    if (exist) {
      setCartItems(
        cartItems.map((x) =>
          x.id === product.id ? { ...exist, qty: exist.qty + 1 } : x
        )
      );
    } else {
      setCartItems([...cartItems, { ...product, qty: 1 }]);
    }
  };

  const onRemove = (product) => {
    const exist = cartItems.find((x) => x.id === product.id);
    if (exist.qty === 1) {
      setCartItems(cartItems.filter((x) => x.id !== product.id));
    } else {
      setCartItems(
        cartItems.map((x) =>
          x.id === product.id ? { ...exist, qty: exist.qty - 1 } : x
        )
      );
    }
  };

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <div className="App">
              <MainHeader countCartItems={cartItems.length}></MainHeader>

              <div className="row">
                <Main products={products} onAdd={onAdd}></Main>
                <Cart
                  cartItems={cartItems}
                  onAdd={onAdd}
                  onRemove={onRemove}
                ></Cart>
              </div>
            </div>
          }
        />
        <Route path="/checkout" element={<Checkout />} />
      </Routes>
    </Router>
  );
}

export default App;
