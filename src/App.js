import { Route, Routes } from "react-router";
//
import { ToastContainer } from 'react-toastify';
//
import showPage from "./showPage";
//
import 'react-toastify/dist/ReactToastify.css';



function App() {
  return (
    <div className="app">
      <Routes>
        {showPage.map(page => {
          if (!page.isShow || page.isShow === "false") return
          return (
            <Route key={page.path} path={page.path} element={ page.component } />
          )
        })}
      </Routes>
      <ToastContainer />
    </div>
  );
}

export default App;
