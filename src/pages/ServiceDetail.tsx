import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ServiceDetailSection } from "@/components/services/ServiceDetailSection";
import { servicesData } from "@/data/servicesData";
import { servicesDetailed } from "@/data/servicesDetailedData";
import { servicesDetailed2 } from "@/data/servicesDetailedData2";
import { ArrowLeft, Calendar } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { CookieConsent } from "@/components/CookieConsent";

const ServiceDetail = () => {
  const { serviceId } = useParams();
  const navigate = useNavigate();
  const allServices = [...servicesData, ...servicesDetailed, ...servicesDetailed2];
  const service = allServices.find(s => s.id === serviceId);

  if (!service) {
    return (
      <>
        <Header />
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-4xl font-bold mb-4">Service Not Found</h1>
            <Button onClick={() => navigate('/services')}>Back to Services</Button>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  const handleBookConsultation = () => {
    window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
  };

  return (
    <>
      <CookieConsent />
      <Header />
      <div className="min-h-screen bg-gray-50">
        <section className="relative bg-gradient-to-br from-primary/10 via-background to-primary/5 py-16">
          <div className="container mx-auto px-4">
            <Button variant="ghost" onClick={() => navigate('/services')} className="mb-6">
              <ArrowLeft className="mr-2 w-4 h-4" /> Back to Services
            </Button>
            <div className="max-w-4xl mx-auto">
              <div className="w-24 h-24 mb-6 rounded-lg overflow-hidden">
                <img src={service.icon} alt={service.title} className="w-full h-full object-cover" />
              </div>
              <h1 className="text-5xl font-bold mb-6">{service.title}</h1>
              <p className="text-xl text-muted-foreground mb-8">{service.fullDesc}</p>
              <Button size="lg" className="text-lg px-8" onClick={handleBookConsultation}>
                <Calendar className="mr-2" /> Book Now - Let's Discuss How We Can Help
              </Button>
            </div>
          </div>
        </section>

        <section className="py-20 bg-background">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <ServiceDetailSection service={service} />
            </div>
          </div>
        </section>

        <section className="py-20 bg-gradient-to-br from-primary to-primary/80 text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-4xl font-bold mb-4">Ready to Get Started?</h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto opacity-90">
              Book a consultation to discuss how we can help, pricing options, and answer any questions you might have.
            </p>
            <Button size="lg" variant="secondary" className="text-lg px-8" onClick={handleBookConsultation}>
              <Calendar className="mr-2" /> Book Now
            </Button>
          </div>
        </section>

      </div>
      <Footer />
    </>
  );
};

export default ServiceDetail;
