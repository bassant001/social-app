import { Input } from '@heroui/react'
import React, { useState } from 'react'
import { FaShareFromSquare } from 'react-icons/fa6'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import axios from "axios"

export default function CommentCreator({ id }) {

    const [comment, setComment] = useState("")

    //to update cache to refetch
    const queryClient = useQueryClient()

    function handleAddComment() {

        const formData = new FormData()
        formData.append("content", comment)

        return axios.post(
            `https://route-posts.routemisr.com/posts/${id}/comments`,
            formData,
            {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('tkn')}`
                }
            }
        )
    }

    const { mutate, isPending } = useMutation({
        mutationFn: handleAddComment,
        onSuccess: () => {
            setComment("")
            //2ms7 old data w replace new data 
            queryClient.invalidateQueries(["comments", id])
        }
    })

    return (
        <Input
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            labelPlacement="outside"
            placeholder="add your comment..."
            endContent={
                <div className='cursor-pointer' onClick={isPending ? undefined : () => mutate()}>
                    <FaShareFromSquare />
                </div>
            }
            type="text"
            className='bg-gray-100'
            radius="none"
            classNames={{
                inputWrapper: "shadow-none !shadow-none border-none",

            }}
        />
    )
}