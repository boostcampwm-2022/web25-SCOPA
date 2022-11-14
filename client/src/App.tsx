import { Routes, Route } from 'react-router-dom';
import { RegisterPage } from './pages';

// 라우팅은 이곳에
function App() {
  return (
    <Routes>
      <Route path='/' element={<div>Hello world!!</div>} />
      <Route path='/register' element={RegisterPage()} />
    </Routes>
  );
}

export default App;
