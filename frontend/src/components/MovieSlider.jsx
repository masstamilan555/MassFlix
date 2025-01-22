/* eslint-disable react/prop-types */

import { useEffect, useRef, useState } from "react";
import { useContentStore } from "../store/content"
import { SMALL_IMG_BASE_URL } from "../utils/constant";
import { Link } from "react-router-dom";
import axios from "axios";

import { ChevronLeft, ChevronRight } from "lucide-react";

const MovieSlider = ({ category }) => {
    const { content } = useContentStore()
    const formattedContent = content === "movie" ? "Movies" : "TV Shows"
    const formattedCategoryname = category.replaceAll("_", " ")[0].toUpperCase() + category.replaceAll("_", " ").slice(1);
    const [contented, setContented] = useState([])

    const [showArrows, setShowArrows] = useState(false)
    const sliderRef = useRef(null)

    useEffect(() => {
        const getContent = async () => {
            const res = await axios.get(`/api/v1/${content}/${category}`)
            setContented(res.data.content)
        }
        getContent()
    }, [content, category])

    const scrollLeft = () => {
        if(sliderRef.current){
            sliderRef.current.scrollBy({left:-sliderRef.current.offsetWidth,behavior:"smooth"})
        }
    }
    const scrollRight = () => {
        if(sliderRef.current){
            sliderRef.current.scrollBy({left:sliderRef.current.offsetWidth,behavior:"smooth"})
        }    }

    return (
        <div className="text-white bg-black relative px-5 md:px-20" onMouseEnter={()=> setShowArrows(true)}
         onMouseLeave = {()=> setShowArrows(false)} >
        
        <h2 className="mb-4 text-2xl font-bold">
            {formattedCategoryname} {formattedContent}
        </h2>
        <div className="flex space-x-4 overflow-x-scroll scrollbar-hide " ref={sliderRef}>
            {contented.map((item)=>(
                <Link to={`/watch/${item.id}`} className="min-w-[250px] relative group " key={item.id} >
                        <div className="rounded-lg overflow-hidden">
                            <img src={SMALL_IMG_BASE_URL+item.backdrop_path} alt="Movie" className="transition-transform duration-300 ease-in-out group-hover:scale-125" />
                        </div>
                        <p className="mt-2 text-center">
                            {item.title || item.name}
                        </p>
                </Link>
            ))}
        </div>
        {showArrows && (
            <>
                <button onClick={scrollLeft} className=" absolute top-1/2 -translate-y-1/2 left-5 md:left-24 flex items-center justify-center size-12 rounded-full bg-black bg-opacity-50 hover:bg-opacity-75 text-white z-10" >
                    <ChevronLeft size={24} />
                </button>

                <button onClick={scrollRight} className=" absolute top-1/2 -translate-y-1/2 right-5 md:right-24 flex items-center justify-center size-12 rounded-full bg-black bg-opacity-50 hover:bg-opacity-75 text-white z-10" >
                    <ChevronRight size={24} />
                </button>
            </>    )
        }
    </div >
  )
}

export default MovieSlider
