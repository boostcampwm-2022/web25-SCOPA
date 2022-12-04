import { Routes, Route } from 'react-router-dom';

import { DetailPage, LoginPage, MainPage, RegisterPage, SettingsPage } from 'pages';
import { LoginLayout, CommonLayout } from 'common';
import { useCheckLogin, useLoadSettings } from 'hooks';

// 라우팅은 이곳에
const App = () => {
  useCheckLogin();
  useLoadSettings();
  return (
    <Routes>
      <Route path='/' element={<CommonLayout />}>
        <Route path='/' element={<MainPage />} />
        <Route path='/users/:id' element={<DetailPage />} />
        <Route path='/mypage' element={<DetailPage isMine />} />
        <Route path='/settings' element={<SettingsPage />} />
      </Route>
      <Route path='/' element={<LoginLayout />}>
        <Route path='/login' element={<LoginPage />} />
        <Route path='/register' element={<RegisterPage />} />
      </Route>
    </Routes>
  );
};

export default App;
