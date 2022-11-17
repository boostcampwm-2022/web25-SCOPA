import { Routes, Route } from 'react-router-dom';

import { DetailPage, LoginPage, MainPage, RegisterPage, TestPage } from 'pages';
import { CheckLogin, LoginLayout, CommonLayout } from 'common';

// 라우팅은 이곳에
const App = () => {
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
