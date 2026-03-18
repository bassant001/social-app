import { useQuery } from "@tanstack/react-query";
import { RiLockPasswordFill } from "react-icons/ri";
import { useContext, useRef, useState } from "react";
import { createdContext } from "../../components/context/authContext";
import Loading from "../../components/loading/Loading";
import Error from "../../components/loading/Error";
import axios from "axios";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
  Card,
  CardHeader,
  CardBody,
  Avatar
} from "@heroui/react";
import PostCard from "../../components/postCard/PostCard";
import { IoCloseCircleOutline } from "react-icons/io5";
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { FaFileImage } from "react-icons/fa";


export default function Profile() {
  const imageInput = useRef(); //link jsk =>  var 
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
  const queryClient = useQueryClient()
  const { userID, userToken } = useContext(createdContext);

  const password = useRef();
  const new_password = useRef();

  function handleClearImage() {
    setImagepreview(null);
    imageInput.current.value = "";
  }

  function handleChangeImage(e) {
    console.log(URL.createObjectURL(e.target.files[0]))
    setImagepreview(URL.createObjectURL(e.target.files[0]))
  }

  function handleUploadImage() {
    const data = new FormData();

    if (imageInput.current?.files[0]) {
      data.append("photo", imageInput.current.files[0]);
    }

    return axios.put(
      "https://route-posts.routemisr.com/users/upload-photo",
      data,
      {
        headers: {
          Authorization: `Bearer ${userToken}`
        }
      }
    );
  }
  function getUserProfile() {
    return axios.get(
      `https://route-posts.routemisr.com/users/${userID}/profile`,
      {
        headers: {
          Authorization: `Bearer ${userToken}`
        }
      }
    )
      .then((res) => {
        return res.data;
      })
      .catch((err) => {
        console.log("fail", err.response?.data);
        throw err;
      });
  }

  function getPosts() {
    return axios.get(
      `https://route-posts.routemisr.com/users/${userID}/posts`,
      {
        headers: {
          Authorization: `Bearer ${userToken}`
        }
      }
    ).then((res) => res.data);

  }


  const { mutate: uploadPhoto, isPending } = useMutation({
    mutationFn: handleUploadImage,
    onSuccess: () => {
      handleClearImage();
      onClose();
      queryClient.invalidateQueries({ queryKey: ["getUserProfile"] })
    }
  })

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["getUserProfile"], //uniqe
    queryFn: getUserProfile //func ref that must be return a promise
  })
  console.log("data", data);
  console.log("isError", isError);

  const { email, bookmarksCount, followers, following, dateOfBirth, followingCount, name, photo, _id } = data?.data?.user || {};

  const { data: postData } = useQuery({
    queryKey: ["post", userID],
    queryFn: getPosts,
  });

  console.log("data", postData);
  const allPost = postData?.data?.posts || [];

  const [imagepreview, setImagepreview] = useState(photo)

  if (isLoading) {
    return <>
      <Loading />
    </>
  }
  if (isError) {
    console.log(error);
    return <>
      <Error />
    </>
  }


  return (
    <>
      <div className="flex bg-gray-300 p-5 gap-5">

        {/*LEFT (about) */}
        <div className="w-1/4 bg-white p-5 h-fit sticky top-16 rounded-xl shadow">

          <p className="font-bold text-lg mb-5">About</p>

          {/* First name */}
          <div className="mb-4">
            <p className="text-gray-500 text-sm">Name</p>
            <p className="text-gray-800 font-medium">{name || "—"}</p>
          </div>

          {/* Email */}
          <div className="mb-4">
            <p className="text-gray-500 text-sm">Email address</p>
            <p className="text-gray-800 font-medium">
              {email || "—"}
            </p>
          </div>

          {/* Date of birth */}
          <div className="mb-4">
            <p className="text-gray-500 text-sm">Date of birth</p>
            <p className="text-gray-800">
              {dateOfBirth || "+ Add"}
            </p>
          </div>

          {/* Bookmarks */}
          <div className="mb-4">
            <p className="text-gray-500 text-sm hover:text-gray-800 cursor-pointer">Bookmarks</p>
            <p className="text-gray-800 font-medium">
              {bookmarksCount || 0}
            </p>
          </div>
          {/* Profile image */}
          <div className="mb-4">
            <p className="text-gray-500 text-sm hover:text-gray-800 cursor-pointer" onClick={onOpen}>
              profile image
            </p>
          </div>

          {/* password */}
          <div className="mb-4">
            <p className="text-gray-500 text-sm hover:text-gray-800 cursor-pointer" >
              password
            </p>
          </div>

        </div>


        {/*MIDDLE (profile + posts) */}
        <div className="w-fit">

          <Card className="bg-white shadow rounded-xl">

            <CardHeader className="pb-0 pt-2 px-4 flex-col items-center">

              <img
                src={
                  photo ||
                  "https://gazettereview.com/wp-content/uploads/2016/03/facebook-avatar.jpg"
                }
                className="w-40 h-40 rounded-full object-cover"
              />

            </CardHeader>

            <CardBody className="py-4 text-center">

              <p className="text-2xl font-bold">{name}</p>

              <div className="flex justify-around mt-3 text-gray-600">
                <p>{followers?.length || 0} followers</p>
                <p>{followingCount || 0} following</p>
              </div>

            </CardBody>
          </Card>

          {/* posts */}
          <div className="mt-5 flex flex-col gap-3">
            {allPost?.map((post) => (
              <PostCard key={post._id} postInfo={post} />
            ))}
          </div>

        </div>


        {/*RIGHT (suggestions) */}
        <div className="w-1/4 bg-white p-5 h-fit sticky top-15 rounded-xl shadow">
          Suggestions
        </div>
      </div>


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
              <ModalHeader className="flex flex-col gap-1"> Edit </ModalHeader>
              <ModalBody >
                <div className='flex flex-col gap-1 p-4'>

                  <div className='flex flex-row  items-center gap-3 my-2'>
                    <Avatar isBordered
                      color="default"
                      src={imagepreview} />
                    {name}
                  </div>
                  {/* change profile */}
                  <label className="bg-blue-100 p-1">
                    <div className="flex flex-row items-center"><FaFileImage size={40} color='blue' /> change profile picture</div>
                    <input type="file" hidden onChange={handleChangeImage} ref={imageInput} />
                  </label>

                  {/* choosen image display */}
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
                <Button className="bg-red-200 hover:bg-red-300 m-1" color="foreground" variant="light" onPress={onClose} >
                  Close
                </Button>
                <Button disabled={isPending} className="bg-[#2417CF] shadow-lg shadow-indigo-500/20 text-white m-1" onPress={uploadPhoto}>
                  Save
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
