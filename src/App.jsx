import { Outlet } from "@tanstack/react-router";
import Header from "./components/Header";
import Footer from "./components/Footer/";
import "./App.css";

function App() {
  return (
    <>
      <header>
        <Header />
      </header>

      <main className="min-h-screen">
        <Outlet />
      </main>

      <footer>
        <Footer />
      </footer>
    </>
  );
}

export default App;
