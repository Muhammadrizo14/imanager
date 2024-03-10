import React, {ChangeEvent, useEffect, useRef, useState} from 'react'
import './App.scss'
import axios from "axios";
import Photos from "./components/Photos.tsx";


const clientID = `?client_id=${import.meta.env.VITE_ACCESS_KEY}`
const mainUrl = 'https://api.unsplash.com/photos/'
const searchUrl = 'https://api.unsplash.com/search/photos/'

function App() {
  const [loading, setLoading] = useState(false)
  const [photos, setPhotos] = useState<any[]>([])
  const [page, setPage] = useState(1)
  const [query, setQuery] = useState('')
  const [newImages, setNewImages] = useState(false)
  const mounted = useRef(false)


  const fetchImages = () => {
    setLoading(true)
    let url;
    const urlPage = `&page=${page}`
    const urlQuery = `&query=${query}`

    if (query) {
      url = `${searchUrl}${clientID}${urlPage}${urlQuery}`
    } else {
      url = `${mainUrl}${clientID}${urlPage}`
    }

    axios
      .get(url)
      .then(res => {
        if (query && page === 1) {
          setPhotos(res.data.results)
        } else if (query) {
          setPhotos((prev) => [...prev, ...res.data.results])
        } else {
          setPhotos((prev) => [...prev, ...res.data])
        }
        setNewImages(false)
        setLoading(false)
      })
      .catch(err => {
        setNewImages(false)
        setLoading(false)
        console.log(err)
      })
  }

  const handleSubmit = (e: React.MouseEvent<HTMLElement>) => {
    setPhotos([])
    e.preventDefault()
    if (!query) return
    if (page === 1) {
      fetchImages()
    }
    setPage(1)
  }


  const event = () => {
    if (window.innerHeight + window.scrollY >= document.body.scrollHeight - 2) {
      setNewImages(true)
    }
  }


  useEffect(() => {
    window.addEventListener('scroll', event)
    return () => window.removeEventListener('scroll', event)
  }, []);

  useEffect(() => {
    if (!mounted.current) {
      mounted.current = true
      return
    }
    if (!newImages) return
    if (loading) return

    setPage(prev => prev + 1)

  }, [newImages]);

  useEffect(() => {
    fetchImages()
  }, [page]);
  return (
    <main>
      <section className='search'>
        <form className='search-form'>
          <input
            type="text"
            placeholder={'search'}
            value={query}
            onChange={(e: ChangeEvent<HTMLInputElement>) => setQuery(e.target.value)}
            className='form-input'
          />
          <button
            type='submit'
            className='submit-btn'
            onClick={(e: React.MouseEvent<HTMLElement>) => handleSubmit(e)}
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
