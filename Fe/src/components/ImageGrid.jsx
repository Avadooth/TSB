export default function ImageGrid({ images }) {
  return (
    <div className="p-4 columns-2 sm:columns-3 md:columns-4 lg:columns-5 gap-4">
      {images.map((img, index) => (
        <div key={img._id || img.url || index} className="mb-4 break-inside-avoid">
          <img
            src={img.url}
            alt="Uploaded"
            className="w-full rounded-lg shadow-lg hover:scale-105 transition-transform"
          />
        </div>
      ))}
    </div>
  );
}
