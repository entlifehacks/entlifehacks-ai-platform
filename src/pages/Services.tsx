import { Button } from "@/components/ui/button";
import { ServiceCard } from "@/components/services/ServiceCard";
import { ServiceComparison } from "@/components/services/ServiceComparison";
import { servicesData } from "@/data/servicesData";
import { servicesDetailed } from "@/data/servicesDetailedData";
import { servicesDetailed2 } from "@/data/servicesDetailedData2";
import { ArrowRight, Calendar } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { CookieConsent } from "@/components/CookieConsent";

const Services = () => {
  const allServices = [...servicesData, ...servicesDetailed, ...servicesDetailed2];

  const handleBookConsultation = () => {
    const calendlySection = document.getElementById('calendly-section');
    if (calendlySection) {
      calendlySection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <CookieConsent />
      <Header />
      <div className="min-h-screen bg-gray-50">
        <section className="relative bg-gradient-to-br from-primary/10 via-background to-primary/5 py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-5xl md:text-6xl font-bold mb-6">AI-Powered Services for Your Business</h1>
              <p className="text-xl text-muted-foreground mb-8">
                Transform your operations with our comprehensive suite of AI solutions designed to drive growth and efficiency.
              </p>
              <Button size="lg" onClick={handleBookConsultation} className="text-lg px-8">
                Book Free Consultation <Calendar className="ml-2" />
              </Button>
            </div>
          </div>
        </section>

        <section className="py-20 bg-background">
          <div className="container mx-auto px-4">
            <h2 className="text-4xl font-bold text-center mb-12">Our Core Services</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
              {allServices.map((service) => (
                <ServiceCard
                  key={service.id}
                  serviceId={service.id}
                  title={service.title}
                  shortDesc={service.shortDesc}
                  icon={service.icon}
                  benefits={service.benefits}
                />
              ))}
            </div>
          </div>
        </section>

        <section className="py-20 bg-muted/30">
          <div className="container mx-auto px-4">
            <h2 className="text-4xl font-bold text-center mb-4">Service Comparison</h2>
            <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
              Compare features across all our services to find the perfect fit for your business needs.
            </p>
            <ServiceComparison />
          </div>
        </section>

        <section id="calendly-section" className="py-20 bg-gradient-to-br from-primary to-primary/80 text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-4xl font-bold mb-4">Ready to Transform Your Business?</h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto opacity-90">
              Schedule a free consultation with our AI experts to discuss your specific needs and goals.
            </p>
            <Button size="lg" variant="secondary" className="text-lg px-8">
              Book Your Free Consultation <ArrowRight className="ml-2" />
            </Button>
          </div>
        </section>
      </div>
      <Footer />
    </>
  );
};

export default Services;
