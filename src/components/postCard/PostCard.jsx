import { Card, CardBody, CardFooter, Divider, Image } from "@heroui/react";
import { FcLike } from "react-icons/fc";
import { GoComment } from "react-icons/go";
import { FaShareFromSquare } from "react-icons/fa6";
import MyCardHeader from "../CardHeader/CardHeader";
import CommentCard from "../commentCard/CommentCard";
import { Link } from "react-router";
import CommentCreator from "../CommentCreator/CommentCreator";

import {
    Modal,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Button,
    useDisclosure,
} from "@heroui/react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import axios from "axios";

export default function PostCard({ postInfo, isPostDetailsPage = false }) {


    console.log("postInfo", postInfo)
    const firstComment = postInfo?.topComment;
    const queryClient = useQueryClient();

    function handleLikePost() {
    return axios.put(
        `https://route-posts.routemisr.com/posts/${postInfo._id}/like`,
        {}, 
        {
            headers: { token: localStorage.getItem("tkn") }
        }
    );
}

    const { mutate } = useMutation({
        mutationFn: handleLikePost,

        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["getAllPosts"] })
        }
    })

    return (

        <div className="bg-gray-300 w-3xl mx-auto flex flex-col gap-0">
            <Card className=" text-gray-700">
                <MyCardHeader name={postInfo?.user?.name} createdAt={postInfo?.createdAt} photo={postInfo?.user?.photo} postID={postInfo?._id} userCardID={postInfo?.user?._id} post={postInfo} />
                <Divider />
                <CardBody>
                    <p>{postInfo?.body}</p>

                    {postInfo?.image && (
                        <img
                            src={postInfo?.image}
                            alt="post"
                            className="mt-3 rounded-xl w-full object-cover max-h-125"
                            onError={(e) => {
                                e.target.src = "https://placehold.co/600x400?text=No+Image"
                            }}
                        />
                    )}
                </CardBody>

                <Divider />
                <CardFooter className="flex justify-between">
                    <div className="flex  items-center gap-3" onClick={()=>{
                        console.log('like pressed')
                        mutate()}}> 
                    {postInfo?.likesCount}  <FcLike  /></div>
                    <div className="flex  items-center gap-3"> {postInfo?.commentsCount} <GoComment /></div>
                    <div className="flex  items-center gap-3"> {postInfo?.sharesCount} <FaShareFromSquare /></div>
                </CardFooter>
                <Divider />

                <CommentCreator id={postInfo?._id} />
            </Card>
            <div>
                {!isPostDetailsPage && firstComment && <CommentCard commentDetails={firstComment} />}

                {!isPostDetailsPage && postInfo?.commentsCount > 1 && (
                    <Link
                        className="cursor-pointer text-blue-600 flex justify-center"

                        to={`/postDetails/${postInfo?._id}`}
                    >
                        view post details
                    </Link>
                )}
            </div>
        </div>


    );
}
