import { Link } from 'react-router-dom';

export function Header() {
  return (
    <header className="w-full bg-white shadow-md py-4">
      <div className="container mx-auto px-4 flex justify-between items-center">
        <Link to="/" className="flex items-center">
          <img src="/logo.svg" alt="Bateria Amaral" className="h-12" />
        </Link>
        <nav className="hidden md:flex space-x-6">
          <Link to="/" className="text-blue-900 hover:text-blue-700 font-medium">
            Início
          </Link>
          <Link to="/dashboard" className="text-blue-900 hover:text-blue-700 font-medium">
            Dashboard
          </Link>
        </nav>
      </div>
    </header>
  );
}