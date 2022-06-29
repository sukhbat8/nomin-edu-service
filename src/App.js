import './App.css';
import Home from './Component/Home';
import LessonDetail from './Component/LessonDetail';
import Login from './Component/Login';
import { BrowserRouter } from "react-router-dom";
import AppRouter from './router/AppRouter';

function App() {
    return (
      <div>
        <BrowserRouter>
          <AppRouter></AppRouter>
        </BrowserRouter>

        {/* <Login/> */}
        {/* <Home/> */}
        {/* <LessonDetail/> */}
      </div>
    );
  }

export default App;
