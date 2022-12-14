import { Routes, Route } from 'react-router-dom';

import { DetailPage, LoginPage, MainPage, RegisterPage, SettingsPage, MessagePage, MessageDetail } from 'pages';
import { LoginLayout, CommonLayout } from 'common';
import { useCheckLogin, useLoadSettings, useSetSSE } from 'hooks';
import { LINK } from 'utils/constants';

// 라우팅은 이곳에
const App = () => {
  useCheckLogin();
  useLoadSettings();
  useSetSSE();

  return (
    <Routes>
      <Route path='/' element={<CommonLayout />}>
        <Route path={LINK.MAIN} element={<MainPage />} />
        <Route path={`${LINK.USERS}/:id`} element={<DetailPage />} />
        <Route path={LINK.MYPAGE} element={<DetailPage />} />
        <Route path={LINK.SETTINGS} element={<SettingsPage />} />
        <Route path={LINK.MESSAGE} element={<MessagePage />}>
          <Route path=':id' element={<MessageDetail />} />
        </Route>
      </Route>
      <Route path='/' element={<LoginLayout />}>
        <Route path={LINK.LOGIN} element={<LoginPage />} />
        <Route path={LINK.REGISTER} element={<RegisterPage />} />
      </Route>
    </Routes>
  );
};

export default App;
