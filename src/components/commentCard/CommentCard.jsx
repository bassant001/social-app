import { CardFooter } from '@heroui/react'
import MyCardHeader from '../CardHeader/CardHeader'

export default function CommentCard({CommentDetails}) {
  return (
    <CardFooter className="flex flex-col gap-2 items-start">
      <MyCardHeader
        createdAt={CommentDetails.createdAt}
        name={CommentDetails.commentCreator.name}
        photo={CommentDetails.commentCreator.photo}
      />
      <p>{CommentDetails.content}</p>
    </CardFooter>
  )
}