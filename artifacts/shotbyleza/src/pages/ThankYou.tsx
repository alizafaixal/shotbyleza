import { Link } from "react-router-dom";

export default function ThankYou() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6 text-center">
      <h1 className="text-4xl font-bold mb-4">Thank You!</h1>

      <p className="text-lg mb-6">
        Your enquiry has been received. I'll get back to you within 24 hours.
      </p>

      <Link to="/" className="px-6 py-3 bg-black text-white rounded-lg">
        Back Home
      </Link>
    </div>
  );
}
