import './App.css';
import Logo from './img/Rick-and-Morty.png';
import Cards from './components/Cards.jsx';
import Nav from './components/Nav';
import { useState, useEffect } from 'react';
import styles from './components/card.module.css'
import axios from 'axios';
import { Routes, Route, useLocation, useNavigate} from 'react-router-dom';
import About from './components/About';
import Detail from './components/Detail';
import Rick from './img/Rick-and-Morty juntos.png'
import Morty from './img/Rick-and-Morty botella.png'
import Form from './components/Form';
import Favorites from './components/Favorites';

const email = 'gonzaforesi@hotmail.com';
const password = 'gonzalo36309';
function App() {

   const location = useLocation();
   const navigate = useNavigate();
   const [characters, setCharacters] = useState([]);
   const [access, setAccess] = useState(false);

   const login = (userData) => {
      if (userData.email === email && userData.password === password){
         setAccess(true);
         navigate('/home');
      }
   }
   
   useEffect(() => {
      !access && navigate('/');
   }, [access]);
 

   const onSearch = (id) => {
         
         const repeated = characters.find((item) => item.id === Number (id))
         if (repeated) return alert ('The character is already added!')
            axios(`https://rickandmortyapi.com/api/character/${id}`)
            .then(response => response.data)
            .then ((data) => {
               if (data.name) {
                  setCharacters((oldChars) => [...oldChars, data]);
               } else {
                  window.alert('No ID entered. Please, try again!');
               }
            })
            .catch (() =>{
               window.alert("That character doesn't exist. Please, try again!")

            });
      }

      const onClose = (id) => {
         const charactersFiltered = characters.filter(character => 
            character.id !== Number(id))
            setCharacters(charactersFiltered);
         };

      
   return (
      <div className='App'>
         <figure className='logo'>
            <img className={styles.logo} src={Logo} alt='Rick and Morty'/>
         </figure>
         <figure className='Rick'>
            <img className={styles.rickImgStyle} src={Rick} alt='Rick'/>
         </figure>
         <figure className='Morty'>
            <img className={styles.mortyImgStyle} src={Morty} alt='Morty'/>
         </figure>

         {
         location.pathname !== '/'
         ? <Nav onSearch={onSearch} />
         :null
         }
       
         <Routes>
            <Route path='/' element = {<Form login={login}/>}/>
            <Route path='/home' element= {<Cards characters={characters} onClose={onClose}/>} />
            <Route path="/favorites" element={<Favorites />} /> 
            <Route path='/about' element= {<About/>} />
            <Route path='/detail/:id' element= {<Detail/>} />
         </Routes>
        
      </div>
   );
}

export default App;

