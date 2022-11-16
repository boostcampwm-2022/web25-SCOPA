import { Routes, Route } from 'react-router-dom';

import { LoginPage, MainPage, TestPage } from 'pages';
import { CheckLogin, LoginLayout, CommonLayout } from 'common';

// 라우팅은 이곳에
const App = () => {
  return (
    <Routes>
      <Route path='/' element={<CheckLogin />}>
        <Route path='/' element={<CommonLayout />}>
          <Route path='/' element={<MainPage />} />
        </Route>
        <Route path='/' element={<LoginLayout />}>
          <Route path='/login' element={<LoginPage />} />
          <Route path='/test' element={<TestPage />} />
        </Route>
      </Route>
    </Routes>
  );
};

export default App;
