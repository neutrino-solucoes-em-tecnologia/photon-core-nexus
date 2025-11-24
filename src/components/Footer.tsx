import { Link } from 'react-router-dom';
import { Facebook, Twitter, Linkedin, Youtube, Mail, MapPin, Phone } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="border-t bg-muted/30 mt-12 md:mt-20">
      <div className="wide-container py-8 md:py-12">
        {/* Mobile Layout */}
        <div className="lg:hidden space-y-6">
          {/* Brand - Full Width */}
          <div className="space-y-3">
            <div className="flex items-center space-x-2">
              <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary">
                <span className="text-lg font-bold text-primary-foreground">P</span>
              </div>
              <span className="text-base font-bold">Photon Media</span>
            </div>
            <p className="text-xs text-muted-foreground">
              O núcleo que move o universo. Conteúdo inteligente para mentes curiosas.
            </p>
            
            {/* Contact Info */}
            <div className="space-y-2 pt-2">
              <a href="mailto:contato@photon.media" className="flex items-center gap-2 text-xs text-muted-foreground hover:text-foreground transition-colors">
                <Mail className="h-3.5 w-3.5 text-primary" />
                <span>contato@photon.media</span>
              </a>
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <MapPin className="h-3.5 w-3.5 text-primary" />
                <span>São Paulo, Brasil</span>
              </div>
            </div>
          </div>

          {/* Navigation, Categories, Legal - 3 Columns */}
          <div className="grid grid-cols-3 gap-4">
            {/* Navegação */}
            <div>
              <h3 className="font-semibold mb-3 text-sm">Navegação</h3>
              <ul className="space-y-1.5 text-xs text-muted-foreground">
                <li><Link to="/" className="hover:text-foreground transition-colors inline-block">Início</Link></li>
                <li><Link to="/sobre" className="hover:text-foreground transition-colors inline-block">Sobre</Link></li>
                <li><Link to="/imprensa" className="hover:text-foreground transition-colors inline-block">Imprensa</Link></li>
                <li><Link to="/fale-conosco" className="hover:text-foreground transition-colors inline-block">Contato</Link></li>
                <li><Link to="/trabalhe-conosco" className="hover:text-foreground transition-colors inline-block">Carreiras</Link></li>
              </ul>
            </div>

            {/* Categorias */}
            <div>
              <h3 className="font-semibold mb-3 text-sm">Categorias</h3>
              <ul className="space-y-1.5 text-xs text-muted-foreground">
                <li><Link to="/categoria/tecnologia" className="hover:text-foreground transition-colors inline-block">Tecnologia</Link></li>
                <li><Link to="/categoria/negocios" className="hover:text-foreground transition-colors inline-block">Negócios</Link></li>
                <li><Link to="/categoria/inovacao" className="hover:text-foreground transition-colors inline-block">Inovação</Link></li>
                <li><Link to="/categoria/ciencia" className="hover:text-foreground transition-colors inline-block">Ciência</Link></li>
                <li><Link to="/categoria/cultura" className="hover:text-foreground transition-colors inline-block">Cultura</Link></li>
              </ul>
            </div>

            {/* Legal */}
            <div>
              <h3 className="font-semibold mb-3 text-sm">Legal</h3>
              <ul className="space-y-1.5 text-xs text-muted-foreground">
                <li><Link to="/termos" className="hover:text-foreground transition-colors inline-block">Termos</Link></li>
                <li><Link to="/privacidade" className="hover:text-foreground transition-colors inline-block">Privacidade</Link></li>
                <li><Link to="/cookies" className="hover:text-foreground transition-colors inline-block">Cookies</Link></li>
                <li><Link to="/anuncie" className="hover:text-foreground transition-colors inline-block">Anuncie</Link></li>
              </ul>
            </div>
          </div>

          {/* Social - Full Width */}
          <div>
            <h3 className="font-semibold mb-3 text-sm">Redes Sociais</h3>
            <div className="flex justify-between items-center max-w-sm">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="w-10 h-10 rounded-full bg-muted flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-colors">
                <Facebook className="h-4 w-4" />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" aria-label="Twitter" className="w-10 h-10 rounded-full bg-muted flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-colors">
                <Twitter className="h-4 w-4" />
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="w-10 h-10 rounded-full bg-muted flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-colors">
                <Linkedin className="h-4 w-4" />
              </a>
              <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" aria-label="YouTube" className="w-10 h-10 rounded-full bg-muted flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-colors">
                <Youtube className="h-4 w-4" />
              </a>
            </div>
          </div>
        </div>

        {/* Desktop Layout */}
        <div className="hidden lg:grid lg:grid-cols-5 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="flex items-center justify-center w-10 h-10 rounded-full bg-primary">
                <span className="text-xl font-bold text-primary-foreground">P</span>
              </div>
              <span className="text-lg font-bold">Photon Media</span>
            </div>
            <p className="text-sm text-muted-foreground max-w-xs">
              O núcleo que move o universo. Conteúdo inteligente para mentes curiosas.
            </p>
          </div>

          {/* Navegação */}
          <div>
            <h3 className="font-semibold mb-4 text-base">Navegação</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link to="/" className="hover:text-foreground transition-colors inline-block">Início</Link></li>
              <li><Link to="/sobre" className="hover:text-foreground transition-colors inline-block">Sobre</Link></li>
              <li><Link to="/imprensa" className="hover:text-foreground transition-colors inline-block">Imprensa</Link></li>
              <li><Link to="/fale-conosco" className="hover:text-foreground transition-colors inline-block">Fale Conosco</Link></li>
              <li><Link to="/trabalhe-conosco" className="hover:text-foreground transition-colors inline-block">Trabalhe Conosco</Link></li>
            </ul>
          </div>

          {/* Categorias */}
          <div>
            <h3 className="font-semibold mb-4 text-base">Categorias</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link to="/categoria/tecnologia" className="hover:text-foreground transition-colors inline-block">Tecnologia</Link></li>
              <li><Link to="/categoria/negocios" className="hover:text-foreground transition-colors inline-block">Negócios</Link></li>
              <li><Link to="/categoria/inovacao" className="hover:text-foreground transition-colors inline-block">Inovação</Link></li>
              <li><Link to="/categoria/ciencia" className="hover:text-foreground transition-colors inline-block">Ciência</Link></li>
              <li><Link to="/categoria/cultura" className="hover:text-foreground transition-colors inline-block">Cultura</Link></li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="font-semibold mb-4 text-base">Legal</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link to="/termos" className="hover:text-foreground transition-colors inline-block">Termos de Uso</Link></li>
              <li><Link to="/privacidade" className="hover:text-foreground transition-colors inline-block">Privacidade</Link></li>
              <li><Link to="/cookies" className="hover:text-foreground transition-colors inline-block">Cookies</Link></li>
              <li><Link to="/anuncie" className="hover:text-foreground transition-colors inline-block">Anuncie</Link></li>
            </ul>
          </div>

          {/* Social */}
          <div>
            <h3 className="font-semibold mb-4 text-base">Redes Sociais</h3>
            <div className="flex flex-wrap gap-3">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="w-9 h-9 rounded-full bg-muted flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-colors">
                <Facebook className="h-4 w-4" />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" aria-label="Twitter" className="w-9 h-9 rounded-full bg-muted flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-colors">
                <Twitter className="h-4 w-4" />
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="w-9 h-9 rounded-full bg-muted flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-colors">
                <Linkedin className="h-4 w-4" />
              </a>
              <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" aria-label="YouTube" className="w-9 h-9 rounded-full bg-muted flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-colors">
                <Youtube className="h-4 w-4" />
              </a>
            </div>
            
            {/* Newsletter - Desktop */}
            <div className="mt-4">
              <p className="text-xs text-muted-foreground mb-2">Receba nossas novidades</p>
              <Link to="/fale-conosco" className="inline-flex items-center gap-1.5 text-xs font-medium text-primary hover:underline">
                <Mail className="h-3.5 w-3.5" />
                Assinar Newsletter
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t mt-6 md:mt-8 pt-6 md:pt-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-3 md:gap-4 text-xs md:text-sm text-muted-foreground">
            <p className="text-center md:text-left">
              &copy; {new Date().getFullYear()} Photon Media. Todos os direitos reservados.
            </p>
            
            {/* Quick Links - Mobile */}
            <div className="flex items-center gap-3 md:gap-4">
              <Link to="/privacidade" className="hover:text-foreground transition-colors">
                Privacidade
              </Link>
              <span className="text-muted-foreground/50">•</span>
              <Link to="/termos" className="hover:text-foreground transition-colors">
                Termos
              </Link>
              <span className="text-muted-foreground/50">•</span>
              <Link to="/cookies" className="hover:text-foreground transition-colors">
                Cookies
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
