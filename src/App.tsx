import './App.css';
import { Table } from './components/Table';

function App() {

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center p-10">
      <div className="pt-12 pb-6 w-full text-center">
          <h1 className="text-2xl font-bold text-indigo-700 mb-2">
             Virtualized Infinite Scroll Product Table
          </h1>
          <p className="text-gray-600">
            Built with React, TypeScript, TanStack Table, Virtuoso, and Tailwind CSS
          </p>
      </div>
      <Table />
    </div>
  );
}


export default App;
