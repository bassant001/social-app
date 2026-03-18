import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router";
import CommentCard from "../commentCard/CommentCard";
import CommentCreator from "../CommentCreator/CommentCreator";
import PostCard from "./PostCard";
import Loading from "../loading/Loading";

export default function PostDetails() {

    const { postId } = useParams();

    function getPostDetails() {
        return axios.get(
            `https://route-posts.routemisr.com/posts/${postId}`,
            {
                headers: { token: localStorage.getItem("tkn") }
            }
        ).then((res) => res.data);
    }

    function getPostComments() {
        return axios.get(
            `https://route-posts.routemisr.com/posts/${postId}/comments`,
            {
                headers: { token: localStorage.getItem("tkn") }
            }
        ).then((res) => {console.log(res);
            return res.data 
            }) }

    const { data: postData, isLoading } = useQuery({
        queryKey: ["post", postId],
        queryFn: getPostDetails,
    });

    const { data: commentsData } = useQuery({
        queryKey: ["comments", postId],
        queryFn: getPostComments,
    });

     if (isLoading) {
            return <>
            <Loading/>
            </>
        }


    const comments = commentsData?.data?.comments;

    return (
  
            <div className="bg-gray-300 min-h-screen w-3xl mx-auto flex flex-col gap-0">

                <PostCard postInfo={postData?.data.post} isPostDetailsPage />

                {comments?.map((comment) => (
                    <CommentCard 
                        key={comment._id}
                        commentDetails={comment}
                    />
                ))}

            </div>
    );
}