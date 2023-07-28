import styles from './searchBar.module.css' ;
import { useState } from 'react';

function SearchBar({onSearch}) {
   const [id,setId] = useState ("");

   const handleChange = (event) => {
      setId (event.target.value);
   }

   return (
      <div
      style={{
         display: 'flex',
         margin:5,
         marginTop:-40,
         width: '100%',
         justifyContent: 'end',
         fontFamily: '"Lato", Arial, sans-serif',
         marginRight: 125,
      }}
      >
      <input className={styles.input} 
          type='search'
          placeholder='Search a character by ID here'
          onChange={handleChange}
          value={id}
          
         />
      <button className = {styles.buttom}
          onClick={()=>{onSearch(id); setId ('')}}
          >Add Character</button> 
      </div>
   );
}

export default SearchBar; 