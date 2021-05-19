import './App.css';
import SearchForm from './components/Search/SearchForm';

function App() {
  return (
    <div className="App">
      <SearchForm onSubmit={(v) => console.log(v)} />
    </div>
  );
}

export default App;
