import Link from "next/link";

export default function NotFound() {
  return (
    <main className="min-h-screen flex items-center justify-center px-4">
      <div className="text-center">
        <h1 className="text-2xl font-semibold mb-2">404 - Page Not Found</h1>
        <p className="text-sm text-gray-500">The page you are looking for does not exist.</p>
        <Link href="/" className="inline-block mt-4 text-sm text-emerald-600">Go home</Link>
      </div>
    </main>
  );
}
