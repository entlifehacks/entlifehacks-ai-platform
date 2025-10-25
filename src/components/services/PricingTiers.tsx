import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Check } from "lucide-react";
import { PricingTier } from "@/data/pricingData";

interface PricingTiersProps {
  tiers: PricingTier[];
  onBookConsultation: () => void;
}

export const PricingTiers = ({ tiers, onBookConsultation }: PricingTiersProps) => {
  return (
    <div className="grid md:grid-cols-3 gap-8 max-w-7xl mx-auto">
      {tiers.map((tier, idx) => (
        <Card key={idx} className={`relative ${tier.popular ? 'border-primary border-2 shadow-xl scale-105' : ''}`}>
          {tier.popular && (
            <Badge className="absolute -top-3 left-1/2 -translate-x-1/2 bg-primary">Most Popular</Badge>
          )}
          <CardHeader>
            <CardTitle className="text-xl">{tier.name}</CardTitle>
            <CardDescription>{tier.description}</CardDescription>
            <div className="mt-4">
              <span className="text-4xl font-bold">{tier.price}</span>
              <span className="text-muted-foreground ml-2">{tier.period}</span>
            </div>
          </CardHeader>
          <CardContent>
            <ul className="space-y-3 mb-6">
              {tier.features.map((feature, i) => (
                <li key={i} className="flex items-start gap-2">
                  <Check className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                  <span className="text-sm">{feature}</span>
                </li>
              ))}
            </ul>
            <Button className="w-full" variant={tier.popular ? "default" : "outline"} onClick={onBookConsultation}>
              {tier.cta}
            </Button>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};
