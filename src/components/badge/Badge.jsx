import {Badge, Avatar} from "@heroui/react";

export default function MyBadge(person) {
    const {photo, name} = person
  return (
    <div className="flex gap-3 items-center">
      <Badge color="primary" content="5" size="sm">
        <Avatar radius="md" src={photo} /> name
      </Badge>
    </div>
  );
}
