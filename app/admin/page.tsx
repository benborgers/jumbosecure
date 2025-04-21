export default function Admin() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <p className="text-center text-gray-500">
        As a non-admin, you cannot view this page, because you cannot set posts
        to <code>published</code>.
      </p>
    </div>
  );
}
