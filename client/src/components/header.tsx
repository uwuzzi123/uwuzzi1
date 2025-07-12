import { Link } from 'wouter';
import { Play, Search } from 'lucide-react';
import { Input } from '@/components/ui/input';

interface HeaderProps {
  onSearch: (query: string) => void;
  searchQuery: string;
}

export default function Header({ onSearch, searchQuery }: HeaderProps) {

  return (
    <header className="bg-card border-b border-border sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-8">
            <Link href="/" className="flex items-center space-x-2">
              <Play className="text-primary w-8 h-8" />
              <span className="text-xl font-bold">AnimeEro</span>
            </Link>
            <nav className="hidden md:flex space-x-6">
              <Link href="/" className="text-primary hover:text-white transition-colors">
                Inicio
              </Link>
              <Link href="/on-air" className="text-gray-300 hover:text-white transition-colors">
                En Emisión
              </Link>
              <Link href="/latest" className="text-gray-300 hover:text-white transition-colors">
                Últimos Episodios
              </Link>
              <Link href="/catalog" className="text-gray-300 hover:text-white transition-colors">
                Catálogo
              </Link>
            </nav>
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="relative">
              <Input
                type="text"
                placeholder="Buscar anime..."
                value={searchQuery}
                onChange={(e) => onSearch(e.target.value)}
                className="bg-muted text-white placeholder-gray-400 rounded-lg w-64 focus:ring-2 focus:ring-primary"
              />
              <Search className="absolute right-3 top-3 w-4 h-4 text-gray-400" />
            </div>

          </div>
        </div>
      </div>
    </header>
  );
}
