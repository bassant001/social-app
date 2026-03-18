import { Card, CardHeader, CardBody, Divider, card } from "@heroui/react";
import MyCardHeader from "../CardHeader/CardHeader";

export default function CommentCard({ commentDetails}) {
  return (
    <>
    <Card className="w-full bg-gray-300 shadow-none border-1 text-gray-700   border-gray-300" >
       
      <CardHeader  className="flex justify-between bg-gray-200 shadow-none ">
        <MyCardHeader
          name={commentDetails.commentCreator.name}
          createdAt={commentDetails.createdAt}
          photo={commentDetails.commentCreator.photo}
          CommentID={commentDetails._id}
          postID={commentDetails.post}
          userCardID={commentDetails.commentCreator._id}
          isCommentCard={true}
        />
      </CardHeader>

      <CardBody className="bg-gray-200">
        <p>{commentDetails.content}</p>
      </CardBody>

    </Card>

    </>
  );
}