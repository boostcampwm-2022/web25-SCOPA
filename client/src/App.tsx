import { Routes, Route } from 'react-router-dom';

import { DetailPage, LoginPage, MainPage, RegisterPage, TestPage } from 'pages';
import { LoginLayout, CommonLayout } from 'common';
import { useCheckLogin } from 'hooks';

// 라우팅은 이곳에
const App = () => {
  useCheckLogin();
  return (
    <Routes>
      <Route path='/' element={<CommonLayout />}>
        <Route path='/' element={<MainPage />} />
        <Route path='/detail/:id' element={<DetailPage />} />
      </Route>
      <Route path='/' element={<LoginLayout />}>
        <Route path='/login' element={<LoginPage />} />
        <Route path='/register' element={<RegisterPage />} />
        <Route path='/test' element={<TestPage />} />
      </Route>
    </Routes>
  );
};

export default App;
