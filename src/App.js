import './App.css';
import { BrowserRouter as Router, Routes } from 'react-router-dom'
import { Route } from 'react-router'
import Login from './components/login';
import Blogs from './components/blogs';

function App(props) {
  return (
    <div className="App">
      <Router>
        <Routes>
            <Route exact path={'/'} element={<Login/>}/>
            <Route exact path={'/blogs'} element={<Blogs/>}/>
        </Routes>
      </Router>
      {/* <Outlet/> */}
    </div>
  );
}

export default App;
