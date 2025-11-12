import { useState } from 'react';
import { Share2, Facebook, Twitter, Linkedin, Link2, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';

export default function FloatingShare() {
  const [isOpen, setIsOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const shareButtons = [
    { icon: Facebook, label: 'Facebook', color: 'hover:text-[#1877F2]' },
    { icon: Twitter, label: 'Twitter', color: 'hover:text-[#1DA1F2]' },
    { icon: Linkedin, label: 'LinkedIn', color: 'hover:text-[#0A66C2]' },
  ];

  return (
    <TooltipProvider>
      <div className="fixed right-6 bottom-0 z-40 flex flex-col-reverse items-end gap-3">
        {/* Share options */}
        {isOpen && (
          <div className="flex flex-col gap-2 animate-in slide-in-from-bottom-5 fade-in duration-200">
            {shareButtons.map((btn) => (
              <Tooltip key={btn.label}>
                <TooltipTrigger asChild>
                  <Button
                    size="icon"
                    variant="outline"
                    className={`bg-background shadow-lg transition-colors ${btn.color}`}
                  >
                    <btn.icon className="h-5 w-5" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent side="left">
                  <p>Compartilhar no {btn.label}</p>
                </TooltipContent>
              </Tooltip>
            ))}
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  size="icon"
                  variant="outline"
                  onClick={handleCopyLink}
                  className="bg-background shadow-lg"
                >
                  {copied ? <Check className="h-5 w-5 text-green-500" /> : <Link2 className="h-5 w-5" />}
                </Button>
              </TooltipTrigger>
              <TooltipContent side="left">
                <p>{copied ? 'Link copiado!' : 'Copiar link'}</p>
              </TooltipContent>
            </Tooltip>
          </div>
        )}

        {/* Main button */}
        <Button
          size="icon"
          onClick={() => setIsOpen(!isOpen)}
          className="h-14 w-14 rounded-full shadow-xl bg-primary hover:bg-primary/90 animate-pulse"
        >
          <Share2 className="h-6 w-6" />
        </Button>
      </div>
    </TooltipProvider>
  );
}
