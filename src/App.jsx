import NavBar from "./components/Navbars/NavBar";
import { Routes, Route } from "react-router-dom";

//Context
import { SearchProvider } from "./Context/search";
import { MyListProvider } from "./Context/myList";

//Pages
import Home from "./pages/home";
import MyList from "./pages/myList";
import Search from "./pages/search";
function App() {
  return (
    <>
      <MyListProvider>
        <SearchProvider>
          {/* Absolute sticky navbar overlay */}
          <div className="fixed top-0  left-0 w-full z-50">
            <NavBar />
          </div>
          <main className="h-[100vh] overflow-y-auto">
            <Routes>
              <Route path="/" element={<Home />}></Route>
              <Route path="/my-list" element={<MyList />} />
              <Route path="/search" element={<Search />} />
            </Routes>
          </main>
        </SearchProvider>
      </MyListProvider>
    </>
  );
}

export default App;
