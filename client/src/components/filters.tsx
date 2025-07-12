import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Filter, X } from 'lucide-react';
import { SearchFilters } from '@/lib/types';

interface FiltersProps {
  onApplyFilters: (filters: SearchFilters) => void;
  onClearFilters: () => void;
}

export default function Filters({ onApplyFilters, onClearFilters }: FiltersProps) {
  const [selectedType, setSelectedType] = useState<string>('');
  const [selectedGenre, setSelectedGenre] = useState<string>('');
  const [selectedStatus, setSelectedStatus] = useState<string>('');

  const types = [
    { value: 'tv', label: 'TV' },
    { value: 'movie', label: 'Película' },
    { value: 'special', label: 'Especial' },
    { value: 'ova', label: 'OVA' },
  ];

  const genres = [
    { value: 'accion', label: 'Acción' },
    { value: 'aventura', label: 'Aventura' },
    { value: 'comedia', label: 'Comedia' },
    { value: 'drama', label: 'Drama' },
    { value: 'romance', label: 'Romance' },
    { value: 'shounen', label: 'Shounen' },
    { value: 'seinen', label: 'Seinen' },
    { value: 'ciencia-ficcion', label: 'Ciencia Ficción' },
    { value: 'artes-marciales', label: 'Artes Marciales' },
    { value: 'carreras', label: 'Carreras' },
  ];

  const statuses = [
    { value: '1', label: 'En Emisión' },
    { value: '2', label: 'Finalizado' },
    { value: '3', label: 'Próximamente' },
  ];

  const handleApplyFilters = () => {
    const filters: SearchFilters = {};
    
    if (selectedType) filters.types = [selectedType];
    if (selectedGenre) filters.genres = [selectedGenre];
    if (selectedStatus) filters.statuses = [parseInt(selectedStatus)];

    onApplyFilters(filters);
  };

  const handleClearFilters = () => {
    setSelectedType('');
    setSelectedGenre('');
    setSelectedStatus('');
    onClearFilters();
  };

  return (
    <div className="flex flex-wrap gap-4 mb-6">
      <Select value={selectedType} onValueChange={setSelectedType}>
        <SelectTrigger className="w-48 bg-muted">
          <SelectValue placeholder="Tipo: Seleccionar" />
        </SelectTrigger>
        <SelectContent>
          {types.map((type) => (
            <SelectItem key={type.value} value={type.value}>
              {type.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Select value={selectedGenre} onValueChange={setSelectedGenre}>
        <SelectTrigger className="w-48 bg-muted">
          <SelectValue placeholder="Género: Seleccionar" />
        </SelectTrigger>
        <SelectContent>
          {genres.map((genre) => (
            <SelectItem key={genre.value} value={genre.value}>
              {genre.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Select value={selectedStatus} onValueChange={setSelectedStatus}>
        <SelectTrigger className="w-48 bg-muted">
          <SelectValue placeholder="Estado: Seleccionar" />
        </SelectTrigger>
        <SelectContent>
          {statuses.map((status) => (
            <SelectItem key={status.value} value={status.value}>
              {status.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Button onClick={handleApplyFilters} className="bg-primary hover:bg-primary/80">
        <Filter className="w-4 h-4 mr-2" />
        Filtrar
      </Button>

      <Button variant="secondary" onClick={handleClearFilters} className="bg-muted hover:bg-muted/80">
        <X className="w-4 h-4 mr-2" />
        Limpiar
      </Button>
    </div>
  );
}
