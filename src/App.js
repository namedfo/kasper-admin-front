import { Route, Routes } from "react-router";
//
import { ToastContainer } from 'react-toastify';
import { Line } from 'rc-progress';
//
import showPage from "./showPage";
//
import 'react-toastify/dist/ReactToastify.css';
import "react-datepicker/dist/react-datepicker.css";
import { useTypedSelector } from "./hooks";



function App() {

  const { percent } = useTypedSelector(state => state.global)


  return (
    <div className="app">
      <div className="h-[1px]">
      {percent && (
        <Line percent={percent} strokeWidth={0.2} strokeColor="#a96bfa" />
      )}
        </div>

      <Routes>
        {showPage.map(page => {
          // eslint-disable-next-line array-callback-return
          if (!page.isShow || page.isShow === "false") return
          return (
            <Route key={page.path} path={page.path} element={page.component} />
          )
        })}
      </Routes>
      <ToastContainer />
    </div>
  );
}

export default App;
