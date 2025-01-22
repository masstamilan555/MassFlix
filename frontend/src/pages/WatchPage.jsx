import { useEffect, useRef, useState } from "react"
import { Link, useParams } from "react-router-dom"
import { useContentStore } from "../store/content"
import axios from "axios"
import Navbar from "../components/Navbar"
import { ChevronLeft, ChevronRight } from "lucide-react"
import ReactPlayer from "react-player"
import { ORIGINAL_IMG_BASE_URL, SMALL_IMG_BASE_URL } from "../utils/constant.js"

import {formatReleaseDate} from "../utils/dateFunction.js"
import WatchPageSkeleton from "../skeleton/WatchPageSkeleton.jsx"

const WatchPage = () => {
  const { id } = useParams()
  const [trailers, setTrailers] = useState([])
  const [currenttrailerIdx, setCurrenttrailerIdx] = useState(0)
  const [loading, setLoading] = useState(true)
  const [contented, setContented] = useState({})
  const { content } = useContentStore()
  const [similarContent, setSimilarContent] = useState([])
  const sliderRef = useRef(null)




  useEffect(() => {
    const getTrailer = async () => {
      try {
        const res = await axios.get(`/api/v1/${content}/${id}/trailers`)
        setTrailers(res.data.trailers)


      } catch (error) {
        if (error.message.includes('404')) {
          setTrailers({})
        }

      }
    }
    getTrailer()
  }, [content, id])


  useEffect(() => {
    const getSimilar = async () => {
      try {
        const res = await axios.get(`/api/v1/${content}/${id}/similar`)
        setSimilarContent(res.data.similar)


      } catch (error) {
        if (error.message.includes('404')) {
          setSimilarContent([])
        }

      }
    }
    getSimilar()
  }, [content, id])

  useEffect(() => {
    const getContentdetails = async () => {
      try {
        const res = await axios.get(`/api/v1/${content}/${id}/details`)
        setContented(res.data.content)


      } catch (error) {
        if (error.message.includes('404')) {
          setContented([])
        }

      } finally {
        setLoading(false)
      }
    }
    getContentdetails()
  }, [content, id])

  const handleNext = () => {
    if (currenttrailerIdx < trailers.length) {
      setCurrenttrailerIdx(currenttrailerIdx + 1)
    }
  }
  const handlePrev = () => {
    if (currenttrailerIdx > 0) {
      setCurrenttrailerIdx(currenttrailerIdx - 1)
    }
  }


  const scrollLeft = () => {
    if (sliderRef.current) {
      sliderRef.current.scrollBy({ left: -sliderRef.current.offsetWidth, behavior: "smooth" })
    }
  }
  const scrollRight = () => {
    if (sliderRef.current) {
      sliderRef.current.scrollBy({ left: sliderRef.current.offsetWidth, behavior: "smooth" })
    }
  }

  if(loading) return(
    <div className="min-h-screen bg-black p-10">
      <WatchPageSkeleton/>
    </div>
  )
  // 404 handling
  if(!contented){
    return(
      <div className="bg-black text-white h-screen ">
        <div className="max-w-6xl mx-auto ">
          <Navbar/>
          <div className="text-center mx-auto px-4 py-8 h-full mt-40">
            <h2 className="text-2xl sm:text-5xl font-bold text-balance"> 404 Content not Found 🥲</h2>
          </div>
        </div>
      </div>

    )
  }

  return (
    <div className="bg-black min-h-screen text-white ">

      <div className="mx-auto container px-4 py-8 h-full">
        <Navbar />
        {trailers.length > 0 && (
          <div className="flex justify-between items-center mb-4">
            <button disabled={currenttrailerIdx === 0} className={`bg-gray-500/70  hover:bg-gray-500 text-white py-2 px-4 rounded ${currenttrailerIdx === 0 ? 'cursor-not-allowed opacity-50 ' : ''}`}
              onClick={handlePrev}
            >
              <ChevronLeft

                size={24} />

            </button>
            <button disabled={currenttrailerIdx === trailers.length - 1} className={`bg-gray-500/70  hover:bg-gray-500 text-white py-2 px-4 rounded ${currenttrailerIdx === trailers.length - 1 ? 'opacity-50 cursor-not-allowed  ' : ''}`}
              onClick={handleNext}
            >

              <ChevronRight
                size={24} />

            </button>

          </div>
        )}
        <div className="aspect-video mb-8 p-2 sm:px-10 md:px-32">
          {trailers.length > 0 && (
            <ReactPlayer controls={true} width={"100%"} height={"70vh"} className="mx-auto overflow-hidden rounded-lg"
              url={`https://www.youtube.com/watch?v=${trailers[currenttrailerIdx].key}`} />
          )}
          {trailers.length === 0 && (
            <h2 className="text-xl text-center mt-5">
              No Trailers available for {" "}
              <span className={`font-bold text-red-600`}>{contented?.title || content?.name}</span>😒
            </h2>

          )}
        </div>

        {/* movie details */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-20 max-w-6xl mx-auto">

          <div className="mb-4 md:mb-0">
            <h2 className="text-5xl font-bold text-balance ">{contented?.title || contented?.name}</h2>
            <p className="mt-2 text-lg ">
              {formatReleaseDate(contented?.release_date || contented?.first_air_date)} | {" "}
              {contented?.adult ? (
                <span className="text-red-600 ">18+</span>
              ) :
                (<span className="text-green-600">PG-13</span>)
              }
            </p>
            <p className="mt-4 text-lg"> {contented?.overview}</p>
          </div>
          <img src={ORIGINAL_IMG_BASE_URL + contented?.poster_path} alt="poster" className="max-h-[600px] rounded-md" />
        </div>

        {/* slider */}
              {similarContent.length>0 && (
                <div className="mt-2 max-w-5xl mx-auto relative ">
                  <h3 className="text-3xl font-bold mb-4">Similar Movies / TV Shows</h3>
                  <div className="flex overflow-x-scroll scrollbar-hide gap-4 pb-4 group" ref={sliderRef}>
                    {similarContent.map((content)=>{
                      if (contented.poster_path === null) return null
                      return(
                        <Link key={content.id} to={`/watch/${content.id}`} className="w-52 flex-none">
                          <img src={SMALL_IMG_BASE_URL+content.poster_path} alt="poster" className="w-full h-auto rounded-md"/>
                          <h4 className="mt-2 text-lg font-semibold">{content.title} || {content.name}</h4>
                        </Link>
                      )
                    })}
                    <ChevronRight className="absolute top-1/2 -translate-y-1/2 right-2 w-8 h-8 opacity-0 group-hover:opacity-100 transition-all duration-300 cursor-pointer bg-red-600 text-white rounded-full " onClick={scrollRight} />
                    <ChevronLeft className="absolute top-1/2 -translate-y-1/2 left-2 w-8 h-8 opacity-0 group-hover:opacity-100 transition-all duration-300 cursor-pointer bg-red-600 text-white rounded-full " onClick={scrollLeft} />
                    
                  </div>
                </div>
              )}
      </div>
    </div>
  )
}

export default WatchPage
