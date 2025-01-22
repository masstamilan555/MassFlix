import { useState } from "react"
import { useContentStore } from "../store/content"
import Navbar from "../components/Navbar"
import { Search } from "lucide-react"
import axios from "axios"
import toast from "react-hot-toast"
import { Link } from "react-router-dom"
import { ORIGINAL_IMG_BASE_URL } from "../utils/constant.js"

const Searchpage = () => {
    const [activetab, setActivetab] = useState("movie")
    const [searchTerm, setSearchTerm] = useState("")

    const [result, setresult] = useState([])
    const { setContentType } = useContentStore()

    const handleTabSwitch = (tab) => {
        setActivetab(tab)
        tab === "movie" ? setContentType("movie") : setContentType("tv")
        setresult([])
    }

    const handleSearch = async (e) => {
        e.preventDefault()
        try {
            const res = await axios.get(`api/v1/search/${activetab}/${searchTerm}`)
            setresult(res.data.content)
        } catch (error) {
            if (error.response.status === 400) {
                toast.error("Nothing Found, make sure you are searching under the right category")

            } else {
                toast.error("Something went wrong, try again!!! ")
            }
        }
        console.log(result);

    }
    return (
        <div className="bg-black min-h-screen text-white ">
            <Navbar />
            <div className=" container mx-auto px-4 py-8">
                <div className="flex justify-center gap-3 mb-4">
                    <button onClick={() => handleTabSwitch("movie")} className={`py-2 px-4 rounded ${activetab === "movie" ? "bg-red-600 " : "bg-gray-800"} hover:bg-red-700`}>Movies</button>
                    <button onClick={() => handleTabSwitch("tv")} className={`py-2 px-4 rounded ${activetab === "tv" ? "bg-red-600 " : "bg-gray-800"} hover:bg-red-700`}>TV Shows</button>
                    <button onClick={() => handleTabSwitch("people")} className={`py-2 px-4 rounded ${activetab === "people" ? "bg-red-600 " : "bg-gray-800"} hover:bg-red-700`}>People</button>
                </div>

                <form onSubmit={handleSearch} className="flex gap-2 items-stretch mb-8 max-w-2xl mx-auto">
                    <input type="text" className="w-full p-2 rounded bg-gray-800 text-white"
                        value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)}
                        placeholder={"Search for a " + activetab}
                    />
                    <button className="bg-red-600 hover:bg-red-700 text-white p-2 rounded">
                        <Search className="size-6" />

                    </button>
                </form>
                <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4'>
                    {result.map((res) => {
                        if (!res.poster_path && !res.profile_path) return null

                        return (
                            <div key={res?.id} className="bg-gray-800 p-4 rounded">
                                {activetab === "person" ? (
                                    <div className="flex flex-col items-center">
                                    <img src={ORIGINAL_IMG_BASE_URL + res?.profile_path} alt={res?.name} className="max-h-96 rounded mx-auto" />
                                    <h2 className="mt-2 text-xl font-bold">{res?.name}</h2>
                                    </div>
                                ):
                                <Link to={"/watch/"+res?.id} onClick={()=>setContentType(activetab)}>
                                    <img className="w-full h-auto rounded" src={ORIGINAL_IMG_BASE_URL+res?.poster_path} alt={res?.title || res?.name} />
                                    <h2 className="mt-2 text-xl font-bold">{res?.title || res?.name}</h2>
                                </Link>
                                
                                }
                            </div>
                        )

                    })}
                </div>
            </div>
        </div>
    )
}

export default Searchpage
