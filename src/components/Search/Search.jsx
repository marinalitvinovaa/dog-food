import './styles.css';
import {ReactComponent as SearchIcon} from './ic-search.svg'
import {ReactComponent as CloseIcon} from './ic-close-input.svg'
import { useState } from 'react';
import { useRef } from 'react';

function Search({onSubmit: propsOnSubmit, onInput}) {
  const [inputText, setInputText] = useState('')
  const inputRef = useRef(null)
  
  const handleInput = () => {
    setInputText(inputRef.current.value)
    onInput && onInput(inputRef.current.value)
  }


  const handleFormSubmit = (e) => {
    e.preventDefault();
    propsOnSubmit(inputText)
    // setInputText('')
  }
  const handleClearInput = (e) => {
    e.stopPropagation()
    setInputText('')
    onInput && onInput('')
  }

  return (
    <>
      <form className="search" onSubmit={handleFormSubmit}>
        <input ref={inputRef} type="text" className='search__input' placeholder='Поиск' onInput={handleInput}/>
        <button type='button' className='search__btn'>
          {inputText && <CloseIcon onClick={handleClearInput} className='search__icon-clear'/>}
          {!inputText && <SearchIcon onClick={handleFormSubmit} className='search__icon'/>}
        </button>
      </form>
    </>
  );
}

export default Search;