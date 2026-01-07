import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { useLanguage } from "@/hooks/useLanguage";

const Gallery = () => {
  const { t, lang } = useLanguage();
  const { ref, inView } = useInView({ threshold: 0.2, triggerOnce: true });
  const [selectedImage, setSelectedImage] = useState<number | null>(null);
  const [currentSlide, setCurrentSlide] = useState(0);

  // Gallery with descriptions
  const images = [
    { src: "/images/img-1.jpg", alt: lang === "de" ? "Kreatives Malen" : "Peinture créative" },
    { src: "/images/img-2.jpg", alt: lang === "de" ? "Liebevolle Betreuung" : "Garde bienveillante" },
    { src: "/images/img-3.jpg", alt: lang === "de" ? "Spielerisches Lernen" : "Apprentissage ludique" },
    { src: "/images/img-4.jpg", alt: lang === "de" ? "Gemeinsames Spiel" : "Jeu collectif" },
    { src: "/images/img-5.jpg", alt: lang === "de" ? "Kunsthandwerk" : "Artisanat créatif" },
    { src: "/images/img-6.jpg", alt: lang === "de" ? "Draußen spielen" : "Jeu en plein air" },
    { src: "/images/img-7.jpg", alt: lang === "de" ? "Aktivitäten drinnen" : "Activités intérieures" },
    { src: "/images/img-8.jpg", alt: lang === "de" ? "Gemeinsame Zeit" : "Temps ensemble" },
    { src: "/images/img-9.jpg", alt: lang === "de" ? "Spaß und Lachen" : "Amusement et rires" },
    { src: "/images/img-10.jpg", alt: lang === "de" ? "Spielerische Entwicklung" : "Développement ludique" },
    { src: "/images/img-11.jpg", alt: lang === "de" ? "Kreative Projekte" : "Projets créatifs" },
    { src: "/images/img-12.jpg", alt: lang === "de" ? "Kinderfreundliche Umgebung" : "Environnement accueillant" },
    { src: "/images/img-13.jpg", alt: lang === "de" ? "Kunstausstellung" : "Exposition d'art" },
    { src: "/images/img-14.jpg", alt: lang === "de" ? "Gemeinsames Basteln" : "Bricolage ensemble" },
    { src: "/images/img-15.jpg", alt: lang === "de" ? "Aktivitäten mit Freude" : "Activités joyeuses" },
    { src: "/images/img-16.jpg", alt: lang === "de" ? "Outdoor-Abenteuer" : "Aventure en plein air" },
    { src: "/images/img-17.jpg", alt: lang === "de" ? "Lernspiele" : "Jeux éducatifs" },
    { src: "/images/img-18.jpg", alt: lang === "de" ? "Bewegungs-Aktivitäten" : "Activités motrices" },
    { src: "/images/img-19.jpg", alt: lang === "de" ? "Gemeinsames Essen" : "Partage et repas" },
    { src: "/images/img-20.jpg", alt: lang === "de" ? "Kreativsession" : "Séance créative" },
    { src: "/images/img-21.jpg", alt: lang === "de" ? "Tägliche Abenteuer" : "Aventures quotidiennes" },
  ];

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % images.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <section id="gallery" className="py-24 bg-secondary/30" ref={ref}>
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-16 text-center"
        >
          <span className="text-sm uppercase tracking-widest text-primary">
            {t.gallery.label}
          </span>
          <h2 className="font-serif text-4xl md:text-5xl mt-4">{t.gallery.title}</h2>
          <p className="text-lg text-muted-foreground mt-6 max-w-2xl mx-auto">
            {t.gallery.description}
          </p>
        </motion.div>

        {/* Slider for >6 images */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="relative w-full"
        >
          <div className="relative h-96 md:h-[500px] rounded-2xl overflow-hidden group">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentSlide}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
                className="absolute inset-0 cursor-pointer"
                onClick={() => setSelectedImage(currentSlide)}
              >
                <img
                  src={images[currentSlide].src}
                  alt={images[currentSlide].alt}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-foreground/60 via-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="absolute bottom-4 left-4 opacity-0 group-hover:opacity-100 transition-opacity">
                  <p className="text-sm font-medium text-white">{images[currentSlide].alt}</p>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Navigation Buttons */}
            <button
              onClick={prevSlide}
              className="absolute left-4 top-1/2 -translate-y-1/2 z-10 bg-white/20 hover:bg-white/40 backdrop-blur-sm p-3 rounded-full transition-all opacity-0 group-hover:opacity-100"
              aria-label="Previous image"
            >
              <ChevronLeft className="h-6 w-6 text-white" />
            </button>
            <button
              onClick={nextSlide}
              className="absolute right-4 top-1/2 -translate-y-1/2 z-10 bg-white/20 hover:bg-white/40 backdrop-blur-sm p-3 rounded-full transition-all opacity-0 group-hover:opacity-100"
              aria-label="Next image"
            >
              <ChevronRight className="h-6 w-6 text-white" />
            </button>

            {/* Slide Indicators */}
            <div className="absolute bottom-4 right-4 flex gap-2 z-10 opacity-0 group-hover:opacity-100 transition-opacity">
              {images.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentSlide(i)}
                  className={`h-2 rounded-full transition-all ${
                    i === currentSlide ? "w-8 bg-accent" : "w-2 bg-white/50"
                  }`}
                  aria-label={`Go to slide ${i + 1}`}
                />
              ))}
            </div>
          </div>
        </motion.div>

        {/* Thumbnails Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-3 mt-8"
        >
          {images.map((image, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`aspect-square rounded-lg overflow-hidden transition-all ${
                index === currentSlide
                  ? "ring-2 ring-accent scale-105"
                  : "hover:scale-105 opacity-60 hover:opacity-100"
              }`}
            >
              <img
                src={image.src}
                alt={image.alt}
                className="w-full h-full object-cover"
              />
            </button>
          ))}
        </motion.div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {selectedImage !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedImage(null)}
            className="fixed inset-0 z-50 bg-foreground/80 backdrop-blur-sm flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-4xl w-full"
            >
              <button
                onClick={() => setSelectedImage(null)}
                className="absolute -top-10 right-0 text-white hover:text-accent"
              >
                <X className="h-8 w-8" />
              </button>
              <img
                src={images[selectedImage].src}
                alt={images[selectedImage].alt}
                className="w-full h-auto rounded-lg"
              />
              <p className="text-center text-white mt-4">{images[selectedImage].alt}</p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Gallery;
