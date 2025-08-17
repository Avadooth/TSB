import { Dialog } from "@headlessui/react";
import { useState } from "react";
import API from "../api";

export default function UploadForm({ onUpload, onClose }) {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleUpload = async () => {
    if (!file) {
      alert("Upload an image file");
      return;
    }
    setLoading(true);
    const formData = new FormData();
    formData.append("images", file);

    try {
      const res = await API.post("/images/upload", formData, {
        withCredentials: true,
      });
      onUpload(res.data);
      onClose(); // 👈 close after success
      setFile(null);
    } catch (err) {
      alert(err.response?.data?.message || "Upload failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={true} onClose={onClose} className="relative z-50">
      <div className="fixed inset-0 bg-black/50 flex justify-center items-center">
        <div className="bg-white p-6 rounded-lg w-11/12 max-w-md">
          <Dialog.Title className="text-lg font-semibold mb-4">Upload Image</Dialog.Title>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setFile(e.target.files[0])}
            className="mb-4 w-full"
          />
          <div className="flex justify-end gap-2">
            <button onClick={onClose} className="px-4 py-2 bg-gray-200 rounded-lg">
              Cancel
            </button>
            <button
              onClick={handleUpload}
              disabled={loading}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
            >
              {loading ? "Uploading..." : "Upload"}
            </button>
          </div>
        </div>
      </div>
    </Dialog>
  );
}
