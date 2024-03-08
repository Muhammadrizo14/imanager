import {useEffect, useState} from 'react'
import './App.scss'
import axios from "axios";
import Photos from "./components/Photos.tsx";


const clientID = `?client_id=${import.meta.env.VITE_ACCESS_KEY}`
const mainUrl = 'https://api.unsplash.com/photos/'

// const searchUrl = 'https://api.unsplash.com/search/photos/'
function App() {
  const [loading, setLoading] = useState(false)
  const [photos, setPhotos] = useState([])
  const fetchImages = () => {
    setLoading(true)
    let url;
    url = `${mainUrl}${clientID}`
    axios
      .get(url)
      .then(res => {
        setLoading(false)
        setPhotos(res.data)
        console.log(res)
      })
      .catch(err => {
        setLoading(false)
        console.log(err)
      })
  }


  // const handleSubmit = (e:React.FormEvent<HTMLFormElement> ) => {
  //   e.preventDefault()
  //   console.log(44)
  // }


  useEffect(() => {
    fetchImages()
  }, []);
  return (
    <main>
      <section className='search'>
        <form className='search-form'>
          <input type="text" placeholder={'search'} className='form-input'/>
          <button
            type='submit'
            className='submit-btn'
            // onClick={handleSubmit}
          >
            Search
          </button>
        </form>
      </section>
      <section className='photos'>
        <h2>Explore more images </h2>

        <div className="photos-center">
          {photos.map((image: any) => (
            <Photos key={image.id} {...image}/>
          ))}
        </div>
      </section>
      <h1>{loading && 'Loading'}</h1>

    </main>
  )
}

export default App
