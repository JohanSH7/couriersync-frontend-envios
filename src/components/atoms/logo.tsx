import type { FC } from "react"

interface LogoProps {
  className?: string
}

const Logo: FC<LogoProps> = ({ className }) => {
  return (
    <div className={`font-bold text-xl ${className}`}>
      <span className="text-primary">Role</span>Auth
    </div>
  )
}

export default Logo
