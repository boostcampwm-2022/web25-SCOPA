import { Routes, Route } from 'react-router-dom';

// 라우팅은 이곳에
function App() {
  return (
    <Routes>
      <Route path='/' element={<div>Hello world!!</div>} />
    </Routes>
  );
}

export default App;
