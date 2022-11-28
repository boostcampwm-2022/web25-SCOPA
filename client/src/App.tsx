import { Routes, Route } from 'react-router-dom';

import { DetailPage, LoginPage, MainPage, RegisterPage, Mypage } from 'pages';
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
        <Route path='/mypage' element={<Mypage />} />
      </Route>
      <Route path='/' element={<LoginLayout />}>
        <Route path='/login' element={<LoginPage />} />
        <Route path='/register' element={<RegisterPage />} />
      </Route>
    </Routes>
  );
};

export default App;
