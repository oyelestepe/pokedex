import './App.css'
import PokemonList from './components/PokemonList'

function App() {


  return (
    <>
      <div className='flex flex-col items-center justify-center min-h-screen'>
        <img src="https://raw.githubusercontent.com/PokeAPI/media/master/logo/pokeapi_256.png" alt="PokeAPI Logo" />
        <h1 className='text-[#3761A8] font-bold'>Welcome to the Pokedex</h1>
        <p className='text-2xl text-[#3761A8] font-bold'>Explore the world of Pokémon!</p>
        <PokemonList />
      </div>
    </>
  )
}

export default App
