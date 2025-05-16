import { cn } from '@/lib/utils'
import { Button } from './button'
import { NavLink } from 'react-router-dom'
import { JSX } from 'react'

interface NavbarLinkProps {
    text: string
    to: string
    onClick?: () => void
    className?: string
}
export const NavbarLink: React.FC<NavbarLinkProps> = ({ text, to, onClick, className }): JSX.Element => {
    return (
        <div className={cn("py-5", className)}>
            <Button className=" text-lg" size="lg" onClick={onClick} variant={"link"} asChild>
                <NavLink to={to}>
                    {text}
                </NavLink>
            </Button>
        </div >
    )
}
