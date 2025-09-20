import './App.css';
import { Table } from './components/Table';

function App() {

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center p-10">
      <h1 className="text-2xl font-bold mb-6 text-indigo-600">
        Product Table
      </h1>
      <Table />
    </div>
  );
}


export default App;
