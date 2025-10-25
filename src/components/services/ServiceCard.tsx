import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface ServiceCardProps {
  serviceId: string;
  title: string;
  shortDesc: string;
  icon: string;
  benefits: string[];
}

export const ServiceCard = ({ serviceId, title, shortDesc, icon, benefits }: ServiceCardProps) => {
  const navigate = useNavigate();

  const handleLearnMore = () => {
    navigate(`/services/${serviceId}`);
  };

  return (
    <Card className="hover:shadow-xl transition-all duration-300 group cursor-pointer" onClick={handleLearnMore}>
      <CardHeader>
        <div className="w-20 h-20 mb-4 rounded-lg overflow-hidden">
          <img src={icon} alt={title} className="w-full h-full object-cover" />
        </div>
        <CardTitle className="text-2xl group-hover:text-primary transition-colors">{title}</CardTitle>
        <CardDescription className="text-base">{shortDesc}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-3 mb-6">
          {benefits.slice(0, 4).map((benefit, idx) => (
            <div key={idx} className="flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0" />
              <span className="text-sm">{benefit}</span>
            </div>
          ))}
        </div>
        <Button className="w-full group-hover:bg-primary/90" onClick={(e) => { e.stopPropagation(); handleLearnMore(); }}>
          Learn More <ArrowRight className="ml-2 w-4 h-4" />
        </Button>
        <div className="mt-4 text-center space-y-1">
          <p className="text-sm text-muted-foreground">Reach out to see how we can help</p>
          <p className="text-sm text-muted-foreground">and pricing</p>
        </div>

      </CardContent>
    </Card>
  );
};
