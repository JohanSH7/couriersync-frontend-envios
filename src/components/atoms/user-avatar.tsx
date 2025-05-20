import type { FC } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

interface UserAvatarProps {
  name: string
  imageUrl?: string
  className?: string
}

const UserAvatar: FC<UserAvatarProps> = ({ name, imageUrl, className }) => {
  // Get initials from name
  const initials = name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .substring(0, 2)

  return (
    <Avatar className={className}>
      {imageUrl && <AvatarImage src={imageUrl || "/placeholder.svg"} alt={name} />}
      <AvatarFallback className="bg-blue-600 text-white">{initials}</AvatarFallback>
    </Avatar>
  )
}

export default UserAvatar
