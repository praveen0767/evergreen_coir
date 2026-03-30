import { Leaf } from "lucide-react";

const Footer = () => (
  <footer className="bg-earth text-earth-foreground pt-16 pb-8">
    <div className="container mx-auto px-4">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
        <div>
          <div className="flex items-center gap-2 mb-4">
            <Leaf className="h-6 w-6 text-gold" />
            <span className="font-heading text-xl font-bold">Srivari Coirs</span>
          </div>
          <p className="text-earth-foreground/70 text-sm leading-relaxed">
            Manufacturer & exporter of premium coir products from Pollachi, Tamil Nadu.
            Committed to sustainability and quality since day one.
          </p>
        </div>
        <div>
          <h4 className="font-heading font-semibold text-lg mb-4">Quick Links</h4>
          <div className="space-y-2">
            {["Home", "About", "Products", "Gallery", "Contact"].map((link) => (
              <a
                key={link}
                href={`#${link.toLowerCase()}`}
                className="block text-sm text-earth-foreground/70 hover:text-gold transition-colors"
              >
                {link}
              </a>
            ))}
          </div>
        </div>
        <div>
          <h4 className="font-heading font-semibold text-lg mb-4">Products</h4>
          <div className="space-y-2">
            {["Coir Pots", "Moss Sticks", "Cocopeat", "Coir Mats", "Mulch Mats", "Hanging Baskets"].map((p) => (
              <a
                key={p}
                href="#products"
                className="block text-sm text-earth-foreground/70 hover:text-gold transition-colors"
              >
                {p}
              </a>
            ))}
          </div>
        </div>
      </div>
      <div className="border-t border-earth-foreground/10 pt-8 text-center">
        <p className="text-earth-foreground/50 text-sm">
          © {new Date().getFullYear()} Srivari Coirs. All rights reserved.
        </p>
      </div>
    </div>
  </footer>
);

export default Footer;
