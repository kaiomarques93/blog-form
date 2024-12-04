import Link from "next/link";

export function Logo() {
  return (
    <Link href='/'>
        <div className="bg-blue-400 text-white font-bold rounded-md p-3">Cubo</div>
    </Link>
  )
}
