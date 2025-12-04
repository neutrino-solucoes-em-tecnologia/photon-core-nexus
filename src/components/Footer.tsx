import { Link } from 'react-router-dom';
import { Facebook, Twitter, Linkedin, Youtube, Mail } from 'lucide-react';
import { features } from '@/lib/features';
import { siteConfig } from '@/lib/site-config';

export default function Footer() {
  return (
    <footer className="border-t bg-muted/30 mt-12 md:mt-20">
      <div className="wide-container py-8 md:py-12">
        {/* Mobile Layout */}
        <div className="lg:hidden space-y-6">
          {/* Brand */}
          <div className="space-y-3">
            <div className="flex items-center space-x-2">
              <img 
                src={siteConfig.icon} 
                alt={siteConfig.name}
                className="w-8 h-8 dark:invert dark:brightness-0 dark:contrast-200"
              />
              <span className="text-base font-bold">{siteConfig.name}</span>
            </div>
            <p className="text-xs text-muted-foreground">
              O núcleo que move o universo. Conteúdo inteligente para mentes curiosas.
            </p>
          </div>

          {/* Navigation & Legal */}
          <div className="grid grid-cols-2 gap-6">
            <div>
              <h3 className="font-semibold mb-3 text-sm">Navegação</h3>
              <ul className="space-y-1.5 text-xs text-muted-foreground">
                <li><Link to="/" className="hover:text-foreground transition-colors">Início</Link></li>
                <li><Link to="/sobre" className="hover:text-foreground transition-colors">Sobre</Link></li>
                {features.imprensa.enabled && (
                  <li><Link to={features.imprensa.route} className="hover:text-foreground transition-colors">Imprensa</Link></li>
                )}
                {features.faleConosco.enabled && (
                  <li><Link to={features.faleConosco.route} className="hover:text-foreground transition-colors">Contato</Link></li>
                )}
                {features.trabalheConosco.enabled && (
                  <li><Link to={features.trabalheConosco.route} className="hover:text-foreground transition-colors">Carreiras</Link></li>
                )}
              </ul>
            </div>

            <div>
              <h3 className="font-semibold mb-3 text-sm">Legal</h3>
              <ul className="space-y-1.5 text-xs text-muted-foreground">
                <li><Link to="/termos" className="hover:text-foreground transition-colors">Termos</Link></li>
                <li><Link to="/privacidade" className="hover:text-foreground transition-colors">Privacidade</Link></li>
                <li><Link to="/cookies" className="hover:text-foreground transition-colors">Cookies</Link></li>
              </ul>
            </div>
          </div>

          {/* Social */}
          <div>
            <h3 className="font-semibold mb-3 text-sm">Redes Sociais</h3>
            <div className="flex gap-3">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-muted flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-colors">
                <Facebook className="h-4 w-4" />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-muted flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-colors">
                <Twitter className="h-4 w-4" />
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-muted flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-colors">
                <Linkedin className="h-4 w-4" />
              </a>
              <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-muted flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-colors">
                <Youtube className="h-4 w-4" />
              </a>
            </div>
          </div>
        </div>

        {/* Desktop Layout */}
        <div className="hidden lg:grid lg:grid-cols-4 gap-8">
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <img 
                src={siteConfig.icon} 
                alt={siteConfig.name}
                className="w-10 h-10 dark:invert dark:brightness-0 dark:contrast-200"
              />
              <span className="text-lg font-bold">{siteConfig.name}</span>
            </div>
            <p className="text-sm text-muted-foreground max-w-xs">
              O núcleo que move o universo. Conteúdo inteligente para mentes curiosas.
            </p>
          </div>

          <div>
            <h3 className="font-semibold mb-4 text-base">Navegação</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link to="/" className="hover:text-foreground transition-colors">Início</Link></li>
              <li><Link to="/sobre" className="hover:text-foreground transition-colors">Sobre</Link></li>
              {features.imprensa.enabled && (
                <li><Link to={features.imprensa.route} className="hover:text-foreground transition-colors">Imprensa</Link></li>
              )}
              {features.faleConosco.enabled && (
                <li><Link to={features.faleConosco.route} className="hover:text-foreground transition-colors">Fale Conosco</Link></li>
              )}
              {features.trabalheConosco.enabled && (
                <li><Link to={features.trabalheConosco.route} className="hover:text-foreground transition-colors">Trabalhe Conosco</Link></li>
              )}
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4 text-base">Legal</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link to="/termos" className="hover:text-foreground transition-colors">Termos de Uso</Link></li>
              <li><Link to="/privacidade" className="hover:text-foreground transition-colors">Privacidade</Link></li>
              <li><Link to="/cookies" className="hover:text-foreground transition-colors">Cookies</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4 text-base">Redes Sociais</h3>
            <div className="flex flex-wrap gap-3">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-full bg-muted flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-colors">
                <Facebook className="h-4 w-4" />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-full bg-muted flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-colors">
                <Twitter className="h-4 w-4" />
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-full bg-muted flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-colors">
                <Linkedin className="h-4 w-4" />
              </a>
              <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-full bg-muted flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-colors">
                <Youtube className="h-4 w-4" />
              </a>
            </div>
            <div className="mt-4">
              <p className="text-xs text-muted-foreground mb-2">Receba nossas novidades</p>
              {features.faleConosco.enabled && (
                <Link to={features.faleConosco.route} className="inline-flex items-center gap-1.5 text-xs font-medium text-primary hover:underline">
                  <Mail className="h-3.5 w-3.5" />
                  Assinar Newsletter
                </Link>
              )}
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t mt-6 md:mt-8 pt-6 md:pt-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-3 md:gap-4 text-xs md:text-sm text-muted-foreground">
            <p>&copy; {new Date().getFullYear()} {siteConfig.name}. Todos os direitos reservados.</p>
            <div className="flex items-center gap-3 md:gap-4">
              <Link to="/privacidade" className="hover:text-foreground transition-colors">Privacidade</Link>
              <span>•</span>
              <Link to="/termos" className="hover:text-foreground transition-colors">Termos</Link>
              <span>•</span>
              <Link to="/cookies" className="hover:text-foreground transition-colors">Cookies</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
