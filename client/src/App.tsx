import { Routes, Route } from 'react-router-dom';

import { DetailPage, LoginPage, MainPage, RegisterPage, SettingsPage } from 'pages';
import { LoginLayout, CommonLayout } from 'common';
import { useCheckLogin, useLoadSettings } from 'hooks';
import { LINK } from 'utils/constants';

// 라우팅은 이곳에
const App = () => {
  useCheckLogin();
  useLoadSettings();
  return (
    <Routes>
      <Route path='/' element={<CommonLayout />}>
        <Route path={LINK.MAIN} element={<MainPage />} />
        <Route path={`${LINK.USERS}/:id`} element={<DetailPage />} />
        <Route path={LINK.MYPAGE} element={<DetailPage isMine />} />
        <Route path={LINK.SETTINGS} element={<SettingsPage />} />
        <Route path={LINK.MESSAGE}>
          <Route path='' element={<div>메시지 목록</div>} />
          <Route path=':id' element={<div>메시지 내용</div>} />
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
