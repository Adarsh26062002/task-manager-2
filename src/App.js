import 'bootstrap/dist/css/bootstrap.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { useState } from 'react';
import Home1 from './components/Home1';
import TodoList from './components/TodoList';
import SignIn from './components/SignIn';


function App() {
  const [username, setUsername] = useState('');
  const handleSignUp = (username) => {
    setUsername(username);
  };
  return (
    <BrowserRouter>
      <Routes>
        <Route
          element={<Home1/>}
          path="/"
          exact={true}
        />
        <Route
          path="/todolist"
          element={<TodoList username={username}/>}
        />
        <Route
          path="/signin"
          element={<SignIn onSignIn={handleSignUp}/>}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
