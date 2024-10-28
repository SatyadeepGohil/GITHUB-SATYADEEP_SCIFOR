import Home from "./components/Home";
import { CartProvider } from "./components/cartContext";

function App() {
  return (
    <CartProvider>
      <Home />
    </CartProvider>
  );
}

export default App;
