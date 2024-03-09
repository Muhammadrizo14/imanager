import {useEffect, useState} from 'react'
import './App.scss'
import axios from "axios";
import Photos from "./components/Photos.tsx";


const clientID = `?client_id=${import.meta.env.VITE_ACCESS_KEY}`
const mainUrl = 'https://api.unsplash.com/photos/'

// const searchUrl = 'https://api.unsplash.com/search/photos/'
function App() {
  const [loading, setLoading] = useState(false)
  const [photos, setPhotos] = useState<any[]>([])
  const [page, setPage] = useState(1)
  const fetchImages = () => {
    setLoading(true)
    let url;
    const urlPage = `&page=${page}`
    url = `${mainUrl}${clientID}${urlPage}`
    axios
      .get(url)
      .then(res => {
        setLoading(false)
        setPhotos((prev) => [...prev, ...res.data])
      })
      .catch(err => {
        setLoading(false)
        console.log(err)
      })
  }


  useEffect(() => {
      const event  = window.addEventListener('scroll', () => {
          if (!loading && window.innerHeight + window.scrollY >= document.body.scrollHeight) {
            setPage(prev => prev + 1)
          }
        });

      return () => window.removeEventListener('scroll', ()=> event)
    },
    []);



  useEffect(() => {
    fetchImages()
  }, [page]);
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
          {photos.map((image: any, i) => (
            <Photos key={i} {...image}/>
          ))}
        </div>
      </section>
      <h1>{loading && 'Loading'}</h1>

    </main>
  )
}

export default App
