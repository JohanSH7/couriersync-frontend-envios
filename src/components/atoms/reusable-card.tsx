import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

interface ReusableCardProps {
  title: string;
  children: React.ReactNode;
}

const ReusableCard = ({ title, children }: ReusableCardProps) => {
  return (
    <Card className="app-card">
      <CardHeader>
        <CardTitle className="app-card-title">{title}</CardTitle>
      </CardHeader>
      <CardContent>{children}</CardContent>
    </Card>
  );
};

export default ReusableCard;