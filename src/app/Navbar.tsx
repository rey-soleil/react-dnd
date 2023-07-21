import AppLogo from '~/components/AppLogo'

export default function Navbar() {
  return (
    <nav className="w-screen h-[3rem] flex space-x-1 fixed z-20 bg-base-100 items-center">
      <div className="hidden md:flex">
        <AppLogo />
      </div>
    </nav>
  )
}
