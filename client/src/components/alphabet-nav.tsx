import { Button } from '@/components/ui/button';

interface AlphabetNavProps {
  onLetterClick: (letter: string) => void;
  selectedLetter?: string;
}

export default function AlphabetNav({ onLetterClick, selectedLetter }: AlphabetNavProps) {
  const letters = ['#', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];

  return (
    <div className="flex flex-wrap gap-2 mb-6">
      <span className="text-gray-400 text-sm mr-2">Navegar por:</span>
      <div className="flex flex-wrap gap-1">
        {letters.map((letter) => (
          <Button
            key={letter}
            variant={selectedLetter === letter ? "default" : "secondary"}
            size="sm"
            onClick={() => onLetterClick(letter)}
            className={`px-3 py-1 text-sm transition-colors ${
              selectedLetter === letter 
                ? 'bg-primary text-white' 
                : 'bg-muted hover:bg-primary hover:text-white'
            }`}
          >
            {letter}
          </Button>
        ))}
      </div>
    </div>
  );
}
