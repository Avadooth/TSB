import { useState } from "react";
import { useNavigate } from "react-router-dom";
import UploadForm from "./UploadForm";

export default function Navbar({ user, onUpload }) {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [uploadOpen, setUploadOpen] = useState(false); // 👈 controls upload modal

  console.log("Navbar user:", user);

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <nav className="bg-white shadow-md px-6 py-4 flex justify-between items-center sticky top-0 z-10">
      <h1 className="text-2xl font-bold text-gray-800">ImageVault</h1>

      <div className="flex items-center gap-4">
        {/* Upload button now in navbar */}
        <button
          onClick={() => setUploadOpen(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-700 transition"
        >
          + Upload
        </button>

        {/* Profile Dropdown */}
        <div className="relative">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="flex items-center gap-2 bg-gray-100 px-3 py-2 rounded-full hover:bg-gray-200 transition"
          >
            <div className="w-8 h-8 rounded-full bg-green-400 flex items-center justify-center text-white font-bold">
              {user.name[0]}
            </div>
            <span className="hidden md:block">{user.name}</span>
          </button>

          {isOpen && (
            <div className="absolute right-0 mt-2 w-75 bg-white rounded-lg shadow-lg border border-gray-200 z-50">
              <div className="p-4 flex gap-3 items-center border-b border-gray-100">
                <div className="w-12 h-12 rounded-full bg-green-400 flex items-center justify-center text-white font-bold text-lg">
                  {user.name[0]}
                </div>
                <div className="flex flex-col">
                  <span className="font-semibold">{user.name}</span>
                  <span className="text-gray-500 text-sm truncate">{user.email}</span>
                </div>
              </div>
              <button
                onClick={logout}
                className="w-full text-left px-4 py-3 hover:bg-red-500 hover:rounded-lg hover:text-white transition"
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Upload Modal */}
      {uploadOpen && <UploadForm onUpload={onUpload} onClose={() => setUploadOpen(false)} />}
    </nav>
  );
}
