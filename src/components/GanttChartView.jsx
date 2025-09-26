import { Clock, Train } from 'lucide-react';

const GanttChartView = ({ schedule = [], title, variant = 'baseline' }) => {
  if (!schedule || schedule.length === 0) {
    return (
      <div className="card-gradient rounded-lg p-6 border border-border">
        <h3 className="text-lg font-semibold text-card-foreground mb-6 flex items-center gap-2">
          <Train className="h-5 w-5" />
          {title}
        </h3>
        <div className="text-center py-8">
          <div className="p-4 rounded-lg bg-muted/30 border border-muted/50 inline-block mb-4">
            <Clock className="h-8 w-8 text-muted-foreground mx-auto" />
          </div>
          <p className="text-muted-foreground">
            No schedule data available
          </p>
        </div>
      </div>
    );
  }

  const getBarColor = () => {
    return variant === 'baseline' ? 'chart-baseline' : 'chart-optimized';
  };

  const getDelayColor = (delay) => {
    if (delay <= 15) return 'text-success';
    if (delay <= 45) return 'text-warning';
    return 'text-destructive';
  };

  const formatTime = (timeString) => {
    const date = new Date(timeString);
    return date.toLocaleTimeString('en-IN', { 
      hour: '2-digit', 
      minute: '2-digit',
      hour12: false 
    });
  };

  const calculateDuration = (start, end) => {
    const startTime = new Date(start);
    const endTime = new Date(end);
    const durationMs = endTime - startTime;
    const hours = Math.floor(durationMs / (1000 * 60 * 60));
    const minutes = Math.floor((durationMs % (1000 * 60 * 60)) / (1000 * 60));
    return `${hours}h ${minutes}m`;
  };

  return (
    <div className="card-gradient rounded-lg p-6 border border-border">
      <h3 className="text-lg font-semibold text-card-foreground mb-6 flex items-center gap-2">
        <Train className="h-5 w-5" />
        {title}
      </h3>
      
      <div className="space-y-4">
        <div className="grid grid-cols-12 gap-2 text-xs font-medium text-muted-foreground border-b border-border pb-2">
          <div className="col-span-2">Train ID</div>
          <div className="col-span-3">Route</div>
          <div className="col-span-2">Start Time</div>
          <div className="col-span-2">Duration</div>
          <div className="col-span-2">Delay</div>
          <div className="col-span-1">Status</div>
        </div>
        
        {schedule.map((train, index) => (
          <div 
            key={train.train_id} 
            className="grid grid-cols-12 gap-2 items-center p-3 rounded-lg bg-card/30 border border-border/50 hover-lift"
          >
            <div className="col-span-2">
              <span className="font-mono text-sm font-semibold text-card-foreground">
                {train.train_id}
              </span>
            </div>
            
            <div className="col-span-3">
              <span className="text-sm text-muted-foreground">
                {train.route}
              </span>
            </div>
            
            <div className="col-span-2">
              <span className="text-sm font-medium text-card-foreground">
                {formatTime(train.start_time)}
              </span>
            </div>
            
            <div className="col-span-2">
              <span className="text-sm text-card-foreground">
                {calculateDuration(train.start_time, train.end_time)}
              </span>
            </div>
            
            <div className="col-span-2">
              <span className={`text-sm font-semibold ${getDelayColor(train.delay)}`}>
                +{train.delay}m
              </span>
            </div>
            
            <div className="col-span-1">
              <div className={`w-3 h-3 rounded-full ${getBarColor()}`} />
            </div>
          </div>
        ))}
      </div>
      
      <div className="mt-4 pt-4 border-t border-border">
        <div className="flex items-center justify-between text-sm">
          <span className="text-muted-foreground">
            Total Trains: {schedule.length}
          </span>
          <div className="flex items-center gap-2">
            <div className={`w-3 h-3 rounded-full ${getBarColor()}`} />
            <span className="text-muted-foreground">
              {variant === 'baseline' ? 'Manual Schedule' : 'AI Optimized'}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GanttChartView;