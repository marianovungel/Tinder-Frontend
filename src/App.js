import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home/Home';
import Setting from './pages/Setting/Setting';
import Principal from './pages/Principal/Principal';
import { useCookies } from 'react-cookie';
import ChatPage from './pages/ChatPage/ChatPage';

function App() {
  const [cookies] = useCookies()
  const user = cookies.id;
  return (
    <div className="App">
      <Router>
          <Routes> 
            <Route path="/" element={user ? <Principal /> : <Home />} exact />
            <Route path="/set/:id" element={<Setting />} exact />
            <Route path="/chat/:id" element={user ? <ChatPage /> : <Home />} exact />
          </Routes>
        </Router>
    </div>
  );
}

export default App;
