import LoginForm from "../components/LoginForm";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-6">
  <LoginForm />
  <p className="mt-4 text-sm text-gray-600">
    Don't have an account?{" "}
    <Link to="/register" className="text-blue-600 hover:underline">
      Sign Up
    </Link>
  </p>
</div>
  );
}