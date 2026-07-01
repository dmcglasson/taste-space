import Link from "next/link";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1 className="text-3xl font-bold underline">Welcome to Taste Space!</h1>
      <p className="text-lg">Discover and share your favorite recipes!</p>
      <div className="mt-4 flex space-x-4">
        <Link
          href="/sign-in" passHref
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-10 rounded"
        >
          Sign In
        </Link>
        <Link
          href="/sign-up" passHref
          className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-10 rounded"
        >
          Sign Up
        </Link>
      </div>
    </main>
  )
}