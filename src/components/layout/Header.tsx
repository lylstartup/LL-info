import emailjs from "@emailjs/browser";
import { Link as LinkIcon } from "lucide-react";
import logo from "@/assets/logo.jpeg";
import { Textarea } from "@/components/ui/textarea";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X, ChevronDown, Mail } from "lucide-react";
import { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";

const navItems = [
  { label: "Características", path: "/caracteristicas" },
  { label: "Propuesta", path: "/propuesta" },
  { label: "Plan", path: "/plan" },
];

const siteUrl = "https://tusitio.com";

const masItems = [
  { label: "Avances", path: "/avances" },
  { label: "Objetivos", path: "/objetivos" },
];

const Header = () => {
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [sheetOpen, setSheetOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [comment, setComment] = useState("");
  const [copied, setCopied] = useState(false);
  const { toast } = useToast();

  const handleShareSite = async () => {
    try {
      await navigator.clipboard.writeText(siteUrl);

      if (navigator.share) {
        await navigator.share({
          title: "L&L – Ecosistema Fintech",
          text: "Mirá este proyecto fintech en desarrollo",
          url: siteUrl,
        });
      } else {
        // 👇 Solo mostramos el mensaje si NO hay share sheet
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      }

      toast({
        title: "Link copiado",
        description: "El enlace fue copiado al portapapeles.",
      });
    } catch (error) {
      toast({
        title: "No se pudo copiar",
        description: "Copiá el link manualmente.",
        variant: "destructive",
      });
    }
  };

  const handleSubmitInterest = async () => {
    if (!email.trim()) {
      toast({
        title: "Email requerido",
        description: "Por favor, ingresá tu email.",
        variant: "destructive",
      });
      return;
    }

    const mailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!mailRegex.test(email)) {
      toast({
        title: "Email incorrecto",
        description: "Ingresá un email válido.",
        variant: "destructive",
      });
      return;
    }

    try {
      await emailjs.send(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        {
          user_email: email,
          user_comment: comment || "Sin comentario",
        },
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY
      );

      toast({
        title: "¡Gracias por tu interés!",
        description: "Te contactaremos pronto.",
      });

      setEmail("");
      setComment("");
      setSheetOpen(false);
    } catch (error) {
      toast({
        title: "Error al enviar",
        description: "Intentá nuevamente más tarde.",
        variant: "destructive",
      });
      console.error("EmailJS error:", error);
    }
  };

  const isInMasSection = masItems.some((item) => location.pathname === item.path);

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 glass border-b border-border/50">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-3 group">
              <div className="w-10 h-10 rounded-xl overflow-hidden bg-primary/20 flex items-center justify-center border border-primary/30 group-hover:shadow-[0_0_20px_hsl(var(--primary)/0.3)] transition-all duration-300">
                <img
                  src={logo}
                  alt="L&L"
                  
                  className="object-contain"
                />
              </div>
              <span className="font-display font-semibold text-lg text-foreground">L&L</span>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-1">
              {navItems.map((item) => (
                <Link key={item.path} to={item.path}>
                  <Button
                    variant="nav"
                    size="sm"
                    className={location.pathname === item.path ? "text-primary" : ""}
                  >
                    {item.label}
                  </Button>
                </Link>
              ))}

              {/* Dropdown Más */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="nav"
                    size="sm"
                    className={`flex items-center gap-1 ${isInMasSection ? "text-primary" : ""}`}
                  >
                    Más <ChevronDown size={14} />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="center" className="bg-background border-border">
                  {masItems.map((item) => (
                    <DropdownMenuItem key={item.path} asChild>
                      <Link
                        to={item.path}
                        className={location.pathname === item.path ? "text-primary" : ""}
                      >
                        {item.label}
                      </Link>
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>

              {/* Ser Parte Button */}
              <Button
                variant="glow"
                size="sm"
                className="ml-2"
                onClick={() => setSheetOpen(true)}
              >
                Ser Parte
              </Button>
            </nav>

            {/* Mobile Menu Button */}
            <div className="flex items-center gap-2 lg:hidden">
              <Button
                variant="glow"
                size="sm"
                onClick={() => setSheetOpen(true)}
              >
                Ser Parte
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              >
                {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </Button>
            </div>
          </div>

          {/* Mobile Navigation */}
          {mobileMenuOpen && (
            <nav className="lg:hidden pt-4 pb-2 animate-slide-up">
              <div className="flex flex-col gap-1">
                {navItems.map((item) => (
                  <Link key={item.path} to={item.path} onClick={() => setMobileMenuOpen(false)}>
                    <Button
                      variant="ghost"
                      className={`w-full justify-start ${location.pathname === item.path ? "text-primary bg-secondary" : ""}`}
                    >
                      {item.label}
                    </Button>
                  </Link>
                ))}
                <div className="pl-4 border-l border-border/50 ml-2 mt-2 mb-1">
                  <span className="text-xs text-muted-foreground uppercase tracking-wider">Más</span>
                </div>
                {masItems.map((item) => (
                  <Link key={item.path} to={item.path} onClick={() => setMobileMenuOpen(false)}>
                    <Button
                      variant="ghost"
                      className={`w-full justify-start pl-6 ${location.pathname === item.path ? "text-primary bg-secondary" : ""}`}
                    >
                      {item.label}
                    </Button>
                  </Link>
                ))}
              </div>
            </nav>
          )}
        </div>
      </header>

      {/* Ser Parte Sheet */}
      <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
        <SheetContent className="bg-background border-border">
          <SheetHeader>
            <SheetTitle className="text-foreground">Ser Parte</SheetTitle>
            <SheetDescription>
              Dejanos tu email para mantenerte informado sobre el proyecto y futuras oportunidades de participación.
            </SheetDescription>
          </SheetHeader>
          <div className="mt-6 space-y-4">
            <div className="space-y-2">
              <label htmlFor="email" className="text-sm font-medium text-foreground">
                Email
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  id="email"
                  type="email"
                  placeholder="tu@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <div className="space-y-2">
              <label htmlFor="comment" className="text-sm font-medium text-foreground">
                Comentario (opcional)
              </label>
              <Textarea
                id="comment"
                placeholder="Comentanos qué te parece la idea..."
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                className="resize-none"
              />
            </div>
            <Button variant="glow" className="w-full" onClick={handleSubmitInterest}>
              Quiero ser parte
            </Button>
            <p className="text-xs text-muted-foreground text-center">
              No compartiremos tu información con terceros.
            </p>

            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">
                Comparte el sitio con personas interesadas!
              </label>
              <div className="flex gap-2">
                <Input
                  value={siteUrl}
                  readOnly
                  className="cursor-default"
                />
                <div className="relative">
                  <Button
                    type="button"
                    variant="outline"
                    size="icon"
                    onClick={handleShareSite}
                    title="Copiar y compartir"
                  >
                    <LinkIcon className="h-4 w-4" />
                  </Button>

                  
                </div>
              </div>
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </>
  );
};

export default Header;
