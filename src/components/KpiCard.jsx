import { Clock, Train, TrendingUp, Zap } from 'lucide-react';

const KpiCard = ({ title, value, icon: iconType, variant = 'default' }) => {
  const getIcon = () => {
    const iconProps = { className: 'h-6 w-6' };
    
    switch (iconType) {
      case 'clock':
        return <Clock {...iconProps} />;
      case 'train':
        return <Train {...iconProps} />;
      case 'trending':
        return <TrendingUp {...iconProps} />;
      case 'zap':
        return <Zap {...iconProps} />;
      default:
        return <TrendingUp {...iconProps} />;
    }
  };

  const getVariantStyles = () => {
    switch (variant) {
      case 'success':
        return 'border-success/30 bg-success/5 text-success';
      case 'warning':
        return 'border-warning/30 bg-warning/5 text-warning';
      case 'primary':
        return 'border-primary/30 bg-primary/5 text-primary';
      default:
        return 'border-secondary/30 bg-secondary/5 text-secondary';
    }
  };

  return (
    <div className={`card-gradient rounded-lg p-4 border hover-lift transition-smooth ${getVariantStyles()}`}>
      <div className="flex items-center justify-between mb-3">
        <div className="p-2 rounded-lg bg-card/50 border border-border/50">
          {getIcon()}
        </div>
      </div>
      
      <div className="space-y-1">
        <p className="text-sm font-medium text-muted-foreground">
          {title}
        </p>
        <p className="text-2xl font-bold text-card-foreground">
          {value}
        </p>
      </div>
    </div>
  );
};

export default KpiCard;