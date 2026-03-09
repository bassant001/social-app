import axios from "axios";
import { useEffect, useState } from "react";
import PostCard from "../../components/postCard/PostCard";
import { useQuery } from "@tanstack/react-query";

export default function Home() {
    // const [allPost, setAllPost] = useState(null);
    // const [isLoding, setisLoding] = useState(false);
    // const [isError, setisError] = useState(false);
    // const [msgError, setMsgError] = useState("");

    function getAllPosts() {
        return axios.get("https://route-posts.routemisr.com/posts?sort=-createdAt", {
            headers: { token: localStorage.getItem("tkn") }
        }).then((res) => {
            console.log("success: ", res)
            return res.data;
        }).catch((err) => {
            return res.data;
            console.log("fail", err.response?.data);
        })
    }

    // useEffect(() => { getAllPosts() }, [])
    const { data, isLoading, isError, isFetching } = useQuery({
        queryKey: ["getAllPosts"], //uniqe
        queryFn: getAllPosts //func ref that must be return a promise
    })

    console.log("data", data);
    console.log("isLoading", isLoading);
    console.log("isError", isError);
    console.log("isFetching", isFetching);


    if (isLoading) {
        return <div className="bg-blue-200">
            <div className="bg-blue-100 min-h-screen w-1/2 mx-auto flex justify-center py-80">
                <h2 className="text-blue-950 font-bold"><span className="pageloader"></span> Loading...</h2>
            </div>
        </div>
    }

    if (isError) {
        return<div className="bg-blue-200">
            <div className="bg-blue-100 min-h-screen w-1/2 mx-auto flex justify-center py-80">
                <h2 className="text-blue-950 font-bold">Error has occured, Try again later...</h2>
            </div>
        </div>
    }
    const allPost = data.data.posts
    return (
        <div className="bg-blue-200">
            <div className="bg-blue-100 min-h-screen w-3xl mx-auto flex flex-col gap-5 px-4">
                {
                    allPost?.map(post => <PostCard key={post._id} postInfo={post} />)
                }
            </div>
        </div>
    )
}
