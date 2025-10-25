import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Service } from "@/data/servicesData";

interface ServiceDetailSectionProps {
  service: Service;
}

export const ServiceDetailSection = ({ service }: ServiceDetailSectionProps) => {
  return (
    <div className="space-y-8">
      <div className="grid md:grid-cols-2 gap-8">
        <div>
          <h3 className="text-2xl font-bold mb-4">Our Process</h3>
          <div className="space-y-4">
            {service.process.map((step) => (
              <Card key={step.step}>
                <CardHeader className="pb-3">
                  <div className="flex items-center gap-3">
                    <Badge className="w-8 h-8 rounded-full flex items-center justify-center">{step.step}</Badge>
                    <CardTitle className="text-lg">{step.title}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{step.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
        <div>
          <h3 className="text-2xl font-bold mb-4">Key Features</h3>
          <div className="grid gap-4">
            {service.features.map((feature, idx) => (
              <Card key={idx}>
                <CardContent className="pt-6">
                  <p className="font-semibold">{feature}</p>
                </CardContent>
              </Card>
            ))}
          </div>
          <div className="mt-8">
            <h3 className="text-2xl font-bold mb-4">Benefits</h3>
            <div className="grid grid-cols-2 gap-3">
              {service.benefits.map((benefit, idx) => (
                <Badge key={idx} variant="secondary" className="py-2 px-4 justify-center">{benefit}</Badge>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
