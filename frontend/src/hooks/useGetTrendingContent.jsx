import axios from "axios";
import { useContentStore } from "../store/content";
import { useEffect, useState } from "react";

const useGetTrendingContent = () => {
    const [trendingContent, settrendingContent] = useState(null);
    const { content } = useContentStore()
    
    
    useEffect(() => {
        const getTrendingContent = async () => {

            const res = await axios.get(`/api/v1/${content}/trending`)
            settrendingContent(res.data.content)
        }
        getTrendingContent()    
        
    }, [content])
    return { trendingContent }
}

export default useGetTrendingContent
