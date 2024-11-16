import CreateContact from './components/CreateContact';
import Navbar from './components/Navbar';
import StickyHeadTable from './components/Table';
import { Routes, Route } from 'react-router-dom'

function App() {
  return (
    <div className='w-full h-screen'>
      <Navbar />

      <div className='p-4 h-screen'>
        <Routes>
          <Route path='/' element={<StickyHeadTable />} />
          <Route path='/create' element={<CreateContact />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
