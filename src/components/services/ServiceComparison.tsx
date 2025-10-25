import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Check, X } from "lucide-react";

const comparisonData = [
  { feature: "Initial Consultation", "ai-strategy": true, "data-analysis": true, automation: true, "sales-funnels": true, crm: true, "digital-marketing": true },
  { feature: "Custom Implementation", "ai-strategy": true, "data-analysis": true, automation: true, "sales-funnels": true, crm: true, "digital-marketing": true },
  { feature: "Ongoing Support", "ai-strategy": true, "data-analysis": true, automation: true, "sales-funnels": true, crm: true, "digital-marketing": true },
  { feature: "AI Model Training", "ai-strategy": false, "data-analysis": true, automation: true, "sales-funnels": false, crm: true, "digital-marketing": true },
  { feature: "Real-time Analytics", "ai-strategy": false, "data-analysis": true, automation: false, "sales-funnels": true, crm: true, "digital-marketing": true },
  { feature: "Process Automation", "ai-strategy": false, "data-analysis": false, automation: true, "sales-funnels": true, crm: true, "digital-marketing": true },
  { feature: "ROI Tracking", "ai-strategy": true, "data-analysis": true, automation: true, "sales-funnels": true, crm: true, "digital-marketing": true },
];

export const ServiceComparison = () => {
  return (
    <div className="overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[200px]">Feature</TableHead>
            <TableHead className="text-center">AI Strategy</TableHead>
            <TableHead className="text-center">Data Analysis</TableHead>
            <TableHead className="text-center">Automation</TableHead>
            <TableHead className="text-center">Sales Funnels</TableHead>
            <TableHead className="text-center">CRM</TableHead>
            <TableHead className="text-center">Digital Marketing</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {comparisonData.map((row, idx) => (
            <TableRow key={idx}>
              <TableCell className="font-medium">{row.feature}</TableCell>
              {["ai-strategy", "data-analysis", "automation", "sales-funnels", "crm", "digital-marketing"].map(service => (
                <TableCell key={service} className="text-center">
                  {row[service as keyof typeof row] ? <Check className="w-5 h-5 text-green-500 mx-auto" /> : <X className="w-5 h-5 text-gray-300 mx-auto" />}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};
