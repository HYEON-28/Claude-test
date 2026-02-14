import { BrowserRouter, Route, Routes } from 'react-router-dom';
import EditorPage from './pages/EditorPage';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<EditorPage />} />
      </Routes>
    </BrowserRouter>
  );
}
