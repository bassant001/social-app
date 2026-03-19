import axios from "axios";
//import { useEffect, useState } from "react";
import PostCard from "../../components/postCard/PostCard";
import { useQuery } from "@tanstack/react-query";
import PostCreator from "../../components/PostCreator/PostCreator";
import Loading from "../../components/loading/Loading";
import { useDisclosure } from "@heroui/react";
import Error from "../../components/loading/Error";

export default function Home() {
    // const [allPost, setAllPost] = useState(null);
    // const [isLoding, setisLoding] = useState(false);
    // const [isError, setisError] = useState(false);
    // const [msgError, setMsgError] = useState("");
    const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
    function getAllPosts() {
        return axios.get("https://route-posts.routemisr.com/posts?sort=-createdAt", {
            headers: { token: localStorage.getItem("tkn") }
        }).then((res) => {
            console.log("success: ", res)
            return res.data;
        }).catch((err) => {
            console.log("fail", err.response?.data);
            throw err;
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
        return <>
            <Loading />
        </>
    }

    if (isError) {
        return <>
            <Error />
        </>
    }
    const allPost = data?.data?.posts || [];

    return (


        <div>
            {/*MIDDLE  (posts) */}
            <div className="bg-gray-300 min-h-screen w-3xl mx-auto flex flex-col gap-5 px-0">
                <PostCreator
                    isOpen={isOpen}
                    onOpen={onOpen}
                    onOpenChange={onOpenChange}
                    onClose={onClose}
                />

                {
                    allPost?.map(post => <PostCard key={post._id} postInfo={post} />)
                }
            </div>

            
        </div>




    )
}
