import { useLanguage } from "@/hooks/useLanguage";

const Footer = () => {
  const { t } = useLanguage();
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-foreground text-background py-12">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          <div>
            <h3 className="font-serif text-lg font-bold mb-4">Xenia</h3>
            <p className="text-background/80 text-sm">{t.footer.tagline}</p>
            <p className="text-background/60 text-sm mt-2">{t.footer.description}</p>
          </div>

          <div>
            <h4 className="font-serif font-bold mb-4">{t.footer.navigation}</h4>
            <nav className="space-y-2">
              <a href="#about-us" className="text-background/70 hover:text-background text-sm">
                {t.nav.about}
              </a>
              <a href="#services" className="text-background/70 hover:text-background text-sm block">
                {t.nav.services}
              </a>
              <a href="#gallery" className="text-background/70 hover:text-background text-sm block">
                {t.nav.gallery}
              </a>
              <a href="#hours" className="text-background/70 hover:text-background text-sm block">
                {t.nav.hours}
              </a>
              <a href="#contact" className="text-background/70 hover:text-background text-sm block">
                {t.nav.contact}
              </a>
            </nav>
          </div>

          <div>
            <h4 className="font-serif font-bold mb-4">{t.contact.phone}</h4>
            <a href="tel:+41768429600" className="text-background/70 hover:text-background text-sm">
              +41 76 842 96 00
            </a>
          </div>

          <div>
            <h4 className="font-serif font-bold mb-4">{t.contact.email}</h4>
            <a href="mailto:xenia@tagesmutter.ch" className="text-background/70 hover:text-background text-sm">
              xenia@tagesmutter.ch
            </a>
          </div>
        </div>

        <div className="border-t border-background/20 pt-8">
          <p className="text-background/60 text-sm text-center">
            © {currentYear} Xenia - Tagesmutter. {t.footer.copyright}
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
