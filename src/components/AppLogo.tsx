import Link from 'next/link'

export default function AppLogo({ className }: { className?: string }) {
  return (
    <Link href="/" className={`flex items-center ${className || ''}`}>
      {/* <Image src="/logo.png" width={50} height={30} alt="Logo" /> */}
      <h1 className="pl-3 text-xl">
        React<strong className="text-primary">DND</strong>{' '}
      </h1>
    </Link>
  )
}
