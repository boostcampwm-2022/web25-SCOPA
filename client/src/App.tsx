import { Routes, Route } from 'react-router-dom';
import { LoginPage, MainPage, TestPage } from 'pages';
import { LoginLayout } from 'common';

// 라우팅은 이곳에
const App = () => {
  return (
    <Routes>
      <Route path='/' element={<MainPage />} />
      <Route path='/' element={<LoginLayout />}>
        <Route path='/login' element={<LoginPage />} />
        <Route path='/test' element={<TestPage />} />
      </Route>
    </Routes>
  );
};

export default App;
