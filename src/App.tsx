import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { CheckInForm } from './components/CheckInForm';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-100">
        <main className="py-10">
          <Routes>
            <Route path="/" element={<CheckInForm />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;