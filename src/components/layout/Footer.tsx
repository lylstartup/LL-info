import { Instagram } from "lucide-react";
import { Mail } from "lucide-react";
import logo from "@/components/layout/logo.jpeg";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="border-t border-border/50 bg-card/50">
      <div className="container mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo & Description */}
          <div className="md:col-span-2">
            <Link to="/" className="flex items-center gap-3 mb-4">
              <div className="w-10 h- rounded-xl overflow-hidden bg-primary/20 flex items-center justify-center border border-primary/30">
                <img
                  src={logo}
                  alt="L&L"
                  width={40}
                  height={40}
                  className="object-contain"
                />
              </div>
              <span className="font-display font-semibold text-lg text-foreground">L&L</span>
            </Link>
            <p className="text-muted-foreground text-sm max-w-md leading-relaxed">
              Ecosistema fintech en desarrollo. Construyendo el futuro de las inversiones 
              con tecnología, educación e inteligencia artificial.
            </p>
          </div>

          {/* Sumate */}
          <div>
            <h4 className="font-display font-semibold text-foreground mb-4">Contacto</h4>
            <div className="space-y-3">
              <p className="text-muted-foreground text-sm">
                Envianos un mensaje para hacernos saber cualquier cosa que quieras.
              </p>

              <div className="flex flex-col gap-3">
                <a
                  href="https://mail.google.com/mail/?view=cm&fs=1&to=lyl.startup@gmail.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:text-primary/80 transition-colors"
                >
                  <Mail className="h-4 w-4" />
                  lyl.startup@gmail.com
                </a>

                <a
                  href="https://www.instagram.com/ll.startup/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:text-primary/80 transition-colors"
                >
                  <Instagram className="h-4 w-4" />
                  @ll.startup
                </a>
              </div>

              <p className="text-muted-foreground text-sm">
                
              </p>

            </div>
          </div>

          {/* Aviso Legal */}
          <div>
            <h4 className="font-display font-semibold text-foreground mb-4">Aviso</h4>
            <p className="text-muted-foreground text-sm leading-relaxed">
              Este sitio presenta un proyecto en fase de desarrollo. 
              La información mostrada describe una visión y plan, no un producto final disponible.
            </p>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-border/50 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-muted-foreground text-sm">
            2026 L&L. Proyecto en desarrollo.
          </p>
          <div className="flex items-center gap-6">
            <span className="text-muted-foreground/60 text-xs">
              Construido con visión de largo plazo
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
