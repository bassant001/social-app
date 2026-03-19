import { Avatar, Card, CardBody } from '@heroui/react'
import { FaFileImage } from "react-icons/fa";
import {
    Modal,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Button,
    useDisclosure,
} from "@heroui/react";
import { IoCloseCircleOutline } from "react-icons/io5";
import { useRef, useState } from 'react';
import axios from 'axios';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useEffect } from "react";
export default function PostCreator({ isOpen, onOpen, onOpenChange, onClose, post = null, ishome = true }) {
    const isEdit = !!post;
    const imageInput = useRef(); //link jsk =>  var 
    const textInput = useRef();
    const [imagepreview, setImagepreview] = useState(post?.image || null)
    // const {  } = useDisclosure();
    const queryClient = useQueryClient()

    function handleClearImage() {
        setImagepreview(null);
        imageInput.current.value = "";
    }

    function handleChangeImage(e) {
        console.log(URL.createObjectURL(e.target.files[0]))
        setImagepreview(URL.createObjectURL(e.target.files[0]))
    }

    //deadmounte => works in initial render so u ve to handle it :)
    useEffect(() => {
        setImagepreview(post?.image || null);
    }, [post]); //<= watch

    function handlePost() {
        const formData = new FormData();

        if (textInput.current?.value) {
            formData.append("body", textInput.current.value);
        }

        if (imageInput.current?.files[0]) {
            formData.append("image", imageInput.current.files[0]);
        }

        if (isEdit) {
            return axios.put(
                `https://route-posts.routemisr.com/posts/${post._id}`,
                formData,
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("tkn")}`
                    }
                }
            );
        }

        return axios.post(
            `https://route-posts.routemisr.com/posts`,
            formData,
            {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("tkn")}`
                }
            }
        );
    }

    const { isPending, mutate } = useMutation({
        mutationFn: handlePost,
        onSuccess: () => {
            handleClearImage();
            onClose();
            textInput.current.value = "";

            queryClient.invalidateQueries({ queryKey: ["getAllPosts"] })
        }
    })

    return (
        <div>
            {ishome && <Card className='bg-gray-50 p-5 text-gray-700'>
                <CardBody className='flex flex-row  items-center gap-3 justify-center'>
                    <Avatar isBordered color="default" src="https://i.pravatar.cc/150?u=a042581f4e29026024d" />
                    <div className='bg-gray-200 rounded-2xl w-full p-4 cursor-pointer  hover:bg-gray-300' onClick={onOpen}>what do you think?</div>
                </CardBody>
            </Card>
            }

            <Modal
                backdrop="opaque"
                classNames={{
                    body: "py-6",
                    backdrop: "bg-blue-200/50",
                    base: "bg-white text-black border border-gray-200",
                    header: "border-b border-gray-200",
                    footer: "border-t border-gray-200",
                    closeButton: "hover:bg-gray-200 active:bg-gray-300",
                }}
                isOpen={isOpen}
                radius="lg"
                onOpenChange={onOpenChange}
            >
                <ModalContent >
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1"> {isEdit ? "Update Post" : "Create Post"}</ModalHeader>
                            <ModalBody >
                                <div className='flex flex-col gap-1 p-4'>
                                    <div className='flex flex-row  items-center gap-3 my-2'>
                                        <Avatar isBordered
                                            color="default"
                                            src="https://i.pravatar.cc/150?u=a042581f4e29026024d" />
                                        user name
                                    </div>

                                    <textarea ref={textInput} placeholder='whats on your mind?' className='bg-gray-100 hover:bg-gray-300/50 p-1 w-l rounded-lg' defaultValue={post?.body || ""} />
                                    {imagepreview && <div className='relative'>
                                        <img
                                            alt="HeroUI hero Image with delay"
                                            src={imagepreview}
                                            className='rounded-lg'
                                        />

                                        <IoCloseCircleOutline className="absolute top-2 right-2 z-9999 text-white cursor-pointer text-2xl" onClick={handleClearImage} />
                                    </div>}

                                </div>

                            </ModalBody>
                            <ModalFooter className='flex flex-row justify-between'>
                                <label>
                                    <div><FaFileImage size={40} color='blue' /></div>
                                    <input type="file" hidden onChange={handleChangeImage} ref={imageInput} />
                                </label>

                                <div>
                                    <Button className="bg-red-200 hover:bg-red-300 m-1" color="foreground" variant="light" onPress={onClose} >
                                        Close
                                    </Button>
                                    <Button disabled={isPending} className="bg-[#2417CF] shadow-lg shadow-indigo-500/20 text-white m-1" onPress={mutate}>
                                        {isEdit ? "Update" : "Post"}
                                    </Button></div>

                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </div>
    )
}
