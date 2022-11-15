import { Routes, Route } from 'react-router-dom';
import { LoginPage, TestPage } from 'pages';

// 라우팅은 이곳에
const App = () => {
  return (
    <Routes>
      <Route path='/' element={<div>Hello world!!</div>} />
      <Route path='/login' element={<LoginPage />} />
      <Route path='/test' element={<TestPage />} />
    </Routes>
  );
};

export default App;
