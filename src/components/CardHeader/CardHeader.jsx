import { CgProfile } from "react-icons/cg";
import { CardHeader, Image } from "@heroui/react";
export default function MyCardHeader({name, createdAt, photo}) {
  return (
     <CardHeader className="flex justify-between">
                <div className="flex gap-3">
                    {photo ? (
                        <Image 
                            src={photo}
                            width={40}
                            height={40}
                            radius="full"
                        />
                    ) : (
                        <CgProfile size={40} />
                    )}
                    <div className="flex flex-col">
                        <p className="text-md">{name}</p>
                        <p className="text-small text-default-500">{createdAt}</p>
                    </div>
                </div>

                <div> icon </div>
            </CardHeader>
  )
}
