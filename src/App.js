import { Route, Routes } from "react-router";
//
import showPage from "./showPage";



function App() {
  return (
    <div className="app">
      <Routes>
        {showPage.map(page => {
          if (!page.isShow) return
          return (
            <Route key={page.path} path={page.path} element={ page.component } />
          )
        })}
      </Routes>
    </div>
  );
}

export default App;
