import { Route, Routes } from "react-router-dom";
import AllProduct from "./AllProduct";
import Header from "./Header";
import Home from "./Home";

function App() {
  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/all" element={<AllProduct />} />
      </Routes>
    </div>
  );
}

export default App;
