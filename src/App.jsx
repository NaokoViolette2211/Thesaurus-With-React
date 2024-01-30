import { useEffect, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import './App.css'

function App() {
  const [thesaurus, setThesaurus] = useState([]);
  const [input, setInput] = useState('');
  const [searched, setSearched] = useState(false);

  useEffect(() => {
    const fetchUrl =async () => {
      try {
        const response = await fetch(`https://api.datamuse.com/words?rel_ant=${input}`)
      const data = await response.json()
      setThesaurus(data)
      }catch(err){
      console.error("Error Fetching data: ", err)}
    }
    if(input && searched){
      fetchUrl();
    }
  },[input, searched])

  const handleChange = (e) => {
    const inputValue = e.target.value;
    setInput(inputValue)
  }
  
  const handleSearch = (e) => {
    e.preventDefault();
    setSearched(true)
  }

  return (
    <div className='app'>
      <div className="app-container">
        <h1 className='title'>Find Antonyms</h1>
        <form onSubmit={handleSearch}>
          <label htmlFor="text-input"></label>
          <input 
            id='text-input'
            type="text"
            value={input}
            placeholder='Search'
            onChange={handleChange}
          />
          <button><FontAwesomeIcon icon={faSearch} /></button>
        </form>
        <div className='result-container'>
          <ul>
            {searched && input? (thesaurus.length> 0? thesaurus.map((word, index) => {
              return <li key={index}>{word.word}</li>  
            }): <li>No search results found...</li>): ""}
          </ul>
        </div>
      </div>
    </div>
  )
}

export default App
