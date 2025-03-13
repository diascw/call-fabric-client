import { useAuth } from "@/contexts/AuthContext";
import Link from "next/link";

const Navbar = () => {
  useAuth();

  return (
    <nav className="bg-gray-900 text-pink-700 p-4 flex justify-between items-center shadow-md">
      <h1 className="text-lg font-bold">
        <Link href="/">CF Client Beta</Link>
      </h1>

      <div className="flex space-x-4">
        <>
          <Link
            href="/register"
            className="text-gray-300 hover:text-white px-4 py-2 transition"
          >
            Signup
          </Link>
          <Link
            href="/login"
            className="text-gray-300 hover:text-white px-4 py-2 transition"
          >
            Signin
          </Link>
        </>
      </div>
    </nav>
  );
};

export default Navbar;
