import { Link } from 'react-router-dom';
import { Facebook, Twitter, Linkedin, Youtube } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="border-t bg-muted/30 mt-20">
      <div className="wide-container py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="flex items-center justify-center w-10 h-10 rounded-full bg-primary">
                <span className="text-xl font-bold text-primary-foreground">P</span>
              </div>
              <span className="text-lg font-bold">Photon Media</span>
            </div>
            <p className="text-sm text-muted-foreground">
              O núcleo que move o universo. Conteúdo inteligente para mentes curiosas.
            </p>
          </div>

          {/* Navegação */}
          <div>
            <h3 className="font-semibold mb-4">Navegação</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link to="/" className="hover:text-foreground transition-colors">Início</Link></li>
              <li><Link to="/sobre" className="hover:text-foreground transition-colors">Sobre</Link></li>
              <li><Link to="/contato" className="hover:text-foreground transition-colors">Contato</Link></li>
            </ul>
          </div>

          {/* Categorias */}
          <div>
            <h3 className="font-semibold mb-4">Categorias</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link to="/categoria/tecnologia" className="hover:text-foreground transition-colors">Tecnologia</Link></li>
              <li><Link to="/categoria/negocios" className="hover:text-foreground transition-colors">Negócios</Link></li>
              <li><Link to="/categoria/inovacao" className="hover:text-foreground transition-colors">Inovação</Link></li>
            </ul>
          </div>

          {/* Social */}
          <div>
            <h3 className="font-semibold mb-4">Redes Sociais</h3>
            <div className="flex space-x-3">
              <a href="#" className="w-9 h-9 rounded-full bg-muted flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-colors">
                <Facebook className="h-4 w-4" />
              </a>
              <a href="#" className="w-9 h-9 rounded-full bg-muted flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-colors">
                <Twitter className="h-4 w-4" />
              </a>
              <a href="#" className="w-9 h-9 rounded-full bg-muted flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-colors">
                <Linkedin className="h-4 w-4" />
              </a>
              <a href="#" className="w-9 h-9 rounded-full bg-muted flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-colors">
                <Youtube className="h-4 w-4" />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t mt-8 pt-8 text-center text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} Photon Media. Todos os direitos reservados.</p>
        </div>
      </div>
    </footer>
  );
}
