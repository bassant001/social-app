import { CgProfile } from "react-icons/cg";
import { CardHeader, Image, useDisclosure } from "@heroui/react";
import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem } from "@heroui/dropdown";
import { HiDotsVertical } from "react-icons/hi";
import { useContext, useState } from "react";
import { createdContext } from "../context/authContext";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { toast } from "react-toastify";
import PostCreator from './../PostCreator/PostCreator';
export default function MyCardHeader({ name, createdAt, photo, userCardID, CommentID, postID, isCommentCard = false, post }) {

    const { userID, userToken } = useContext(createdContext);
    const isMyPost = userID === userCardID;
    const queryClient = useQueryClient();

    function handleDeleteCard() {
        if (!isCommentCard) {
            return axios.delete(`https://route-posts.routemisr.com/posts/${postID}`, {
                headers: {
                    token: userToken
                }
            })
        }
        else {
            return axios.delete(`https://route-posts.routemisr.com/posts/${postID}/comments/${CommentID}`, {
                headers: {
                    token: userToken
                }
            })
        }
    }

    function handleSavePost() {
    return axios.put(
        `https://route-posts.routemisr.com/posts/${postID}/bookmark`,
        {},
        {
            headers: {
                Authorization: `Bearer ${userToken}`
            }
        }
    );
}

    const { mutate } = useMutation({
        mutationFn: handleDeleteCard,

        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["getAllPosts"] })
            toast.success('deleted succsessfully', { autoClose: 1000, closeOnClick: true })
        },
        onError: () => {
            toast.error('error!', { autoClose: 1000, closeOnClick: true })
        }
    })

    const { mutate: bookmarkmutate } = useMutation({
        mutationFn: handleSavePost,

        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["getAllPosts"] })
            toast.success(`${!post?.bookmarked ? "save" : "unsave"} succsessfully`, { autoClose: 1000, closeOnClick: true })
        },
        onError: () => {
            toast.error('error!', { autoClose: 1000, closeOnClick: true })
        }
    })

    const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();

    return (

        <>

            <CardHeader className="flex justify-between">
                <div className="flex gap-3">
                    {photo ? (
                        <img
                            src={photo}
                            width={40}
                            height={40}
                            className="rounded-full"
                            onError={(e) => {
                                e.target.src = //static img 
                                    "https://gazettereview.com/wp-content/uploads/2016/03/facebook-avatar.jpg";
                            }}
                        />
                    ) : (<img
                        //static img 
                        src={"https://gazettereview.com/wp-content/uploads/2016/03/facebook-avatar.jpg"}
                        width={40}
                        height={40}
                        className="rounded-full"
                    />
                    )}
                    <div className="flex flex-col">
                        <p className="text-md">{name}</p>
                        <p className="text-small text-default-500">{createdAt}</p>
                    </div>
                </div>


                <Dropdown>
                    <DropdownTrigger>
                        <HiDotsVertical color="gray" />
                    </DropdownTrigger>

                    <DropdownMenu aria-label="Static Actions">
                        {!isCommentCard && <DropdownItem key="save" onClick={bookmarkmutate}>
                            {!post?.bookmarked ? "save" : "unsave"} 
                        </DropdownItem>}

                        {/* this will handle comments replies isa*/}
                        {isCommentCard && <DropdownItem key="Reply" onClick={() => {//empty for now :)
                        }}>
                            Reply
                        </DropdownItem>}

                        {isMyPost && (
                            <>
                                <DropdownItem key="edit" onClick={onOpen}>
                                    Edit
                                </DropdownItem>

                                <DropdownItem
                                    key="delete"
                                    onClick={mutate}
                                    color="danger"
                                    className="text-danger"
                                >
                                    Delete
                                </DropdownItem>
                            </>
                        )}
                    </DropdownMenu>
                </Dropdown>
            </CardHeader>

            {/* to edit */}
            {<PostCreator
                isOpen={isOpen}
                onOpen={onOpen}
                onOpenChange={onOpenChange}
                onClose={onClose}
                post={post}
                ishome={false}
            />}
        </>


    )
}
