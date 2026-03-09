import { Card, CardBody, CardFooter, Divider, Image } from "@heroui/react";
import { FcLike } from "react-icons/fc";
import { GoComment } from "react-icons/go";
import { FaShareFromSquare } from "react-icons/fa6";
import MyCardHeader from "../CardHeader/CardHeader";

export default function PostCard({ postInfo }) {
    console.log("postInfo", postInfo)
    return (
        <Card className="w-2xl mx-auto bg-blue-50">
           <MyCardHeader name={postInfo.user.name} createdAt={postInfo.createdAt} photo={postInfo.user.photo}/>
            <Divider />
            <CardBody>
                <p>{postInfo.body}</p>

                {postInfo.image && (
                    <img
                        src={postInfo.image}
                        alt="post"
                        className="mt-3 rounded-xl w-full object-cover h-[900px]"
                    />
                )}
            </CardBody>
            <Divider />
            <CardFooter className="flex justify-between">
                <div className="flex  items-center gap-3"> {postInfo.likesCount}  <FcLike /></div>
                <div className="flex  items-center gap-3"> {postInfo.commentsCount} <GoComment /></div>
                <div className="flex  items-center gap-3"> {postInfo.sharesCount} <FaShareFromSquare /></div>
            </CardFooter>
        </Card>
    );
}
