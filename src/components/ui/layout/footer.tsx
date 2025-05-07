export default function Footer() {
  return (
    <footer className="flex justify-center py-2">
      <div className="text-sm text-gray-700 dark:text-gray-100">
        <span className="mr-1">{new Date().getFullYear().toString()} &copy;</span>
        <a
          href="https://neohorizon.io/"
          target="_blank"
          rel="noreferrer"
          className="text-gray-500  hover:text-blue-600 transition-colors"
        >
          Neohorizon Analytics
        </a>
      </div>
    </footer>
  );
}
