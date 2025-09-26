import { Lightbulb, CheckCircle2 } from 'lucide-react';

const RecommendationPanel = ({ reasoning = [] }) => {
  return (
    <div className="card-gradient rounded-lg p-4 border border-border">
      <div className="flex items-center gap-2 mb-4">
        <div className="p-2 rounded-lg bg-primary/10 border border-primary/30">
          <Lightbulb className="h-5 w-5 text-primary" />
        </div>
        <h3 className="text-lg font-semibold text-card-foreground">
          AI Recommendations & Reasoning
        </h3>
      </div>
      
      {reasoning.length === 0 ? (
        <div className="text-center py-8">
          <div className="p-4 rounded-lg bg-muted/30 border border-muted/50 inline-block">
            <Lightbulb className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
          </div>
          <p className="text-muted-foreground">
            Run optimization to see AI recommendations
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {reasoning.map((reason, index) => (
            <div
              key={index}
              className="flex items-start gap-3 p-3 rounded-lg bg-card/30 border border-border/50 hover-lift"
            >
              <div className="flex-shrink-0 mt-0.5">
                <CheckCircle2 className="h-4 w-4 text-success" />
              </div>
              <p className="text-sm text-card-foreground leading-relaxed">
                {reason}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default RecommendationPanel;