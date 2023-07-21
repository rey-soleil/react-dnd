import AppLogo from '~/components/AppLogo'
import { Icons } from '~/lib/icons'

export default function Navbar() {
  return (
    <nav className="navbar border-b-2 border-base-300">
      <label
        htmlFor="main-drawer"
        className="sm:hidden flex btn btn-square drawer-button btn-ghost mx-3"
      >
        <Icons.Menu className="text-4xl " />
      </label>
      <AppLogo />
      <div className="flex-1" />
    </nav>
  )
}
