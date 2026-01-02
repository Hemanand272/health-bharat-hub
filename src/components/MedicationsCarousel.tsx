import { Card } from "@/components/ui/card";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { useCallback, useEffect, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import medicalGallery1 from "@/assets/medical-gallery-1.jpg";
import medicalGallery2 from "@/assets/medical-gallery-2.jpg";
import medicalGallery3 from "@/assets/medical-gallery-3.jpg";

const carouselItems = [
  { image: medicalGallery1, title: "Wide Range of Medications", description: "Access information about various medications and their natural alternatives" },
  { image: medicalGallery2, title: "Modern Healthcare Solutions", description: "Bridging traditional remedies with modern medical science" },
  { image: medicalGallery3, title: "Comprehensive Medical Resources", description: "Learn about different treatment options and preventive care" },
];

const MedicationsCarousel = () => {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true }, [Autoplay({ delay: 4000, stopOnInteraction: false })]);
  const [selectedIndex, setSelectedIndex] = useState(0);

  const scrollPrev = useCallback(() => { if (emblaApi) emblaApi.scrollPrev(); }, [emblaApi]);
  const scrollNext = useCallback(() => { if (emblaApi) emblaApi.scrollNext(); }, [emblaApi]);
  const onSelect = useCallback(() => { if (!emblaApi) return; setSelectedIndex(emblaApi.selectedScrollSnap()); }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on("select", onSelect);
    return () => { emblaApi.off("select", onSelect); };
  }, [emblaApi, onSelect]);

  return (
    <section id="gallery" className="py-20 md:py-32 bg-background">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center mb-16">
          <h2 className="mb-6 text-foreground">Medical Resources Gallery</h2>
          <p className="text-lg md:text-xl text-muted-foreground">Explore our comprehensive collection of healthcare information and resources</p>
        </div>
        <div className="max-w-6xl mx-auto relative">
          <div className="overflow-hidden rounded-2xl" ref={emblaRef}>
            <div className="flex">
              {carouselItems.map((item, index) => (
                <div key={index} className="flex-[0_0_100%] min-w-0">
                  <Card className="mx-4 overflow-hidden border-0 shadow-elegant hover-lift">
                    <div className="relative h-[400px] md:h-[500px] overflow-hidden">
                      <img src={item.image} alt={item.title} className="w-full h-full object-cover transition-smooth hover:scale-105" />
                      <div className="absolute inset-0 bg-gradient-to-t from-background/95 via-background/50 to-transparent"></div>
                      <div className="absolute bottom-0 left-0 right-0 p-8 md:p-12">
                        <h3 className="text-2xl md:text-3xl font-bold text-foreground mb-3">{item.title}</h3>
                        <p className="text-lg text-muted-foreground">{item.description}</p>
                      </div>
                    </div>
                  </Card>
                </div>
              ))}
            </div>
          </div>
          <Button variant="outline" size="icon" className="absolute left-4 top-1/2 -translate-y-1/2 h-12 w-12 rounded-full bg-background/80 backdrop-blur-sm" onClick={scrollPrev}>
            <ChevronLeft className="h-6 w-6" />
          </Button>
          <Button variant="outline" size="icon" className="absolute right-4 top-1/2 -translate-y-1/2 h-12 w-12 rounded-full bg-background/80 backdrop-blur-sm" onClick={scrollNext}>
            <ChevronRight className="h-6 w-6" />
          </Button>
          <div className="flex justify-center gap-2 mt-8">
            {carouselItems.map((_, index) => (
              <button key={index} className={`w-2 h-2 rounded-full transition-all duration-300 ${index === selectedIndex ? "bg-primary w-8" : "bg-muted-foreground/30"}`} onClick={() => emblaApi?.scrollTo(index)} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default MedicationsCarousel;
