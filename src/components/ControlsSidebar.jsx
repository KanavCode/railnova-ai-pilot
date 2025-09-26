import { useState } from 'react';
import { Play, Loader2, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import railnovaLogo from '@/assets/railnova-logo.png';

const ControlsSidebar = ({ onRunOptimization, isLoading }) => {
  const [selectedScenario, setSelectedScenario] = useState('');

  const scenarios = [
    {
      id: 'express-delay',
      name: 'Express Train Delayed',
      description: 'Major express service disruption affecting multiple routes'
    },
    {
      id: 'track-maintenance',
      name: 'Track Maintenance',
      description: 'Scheduled maintenance causing track blockages'
    },
    {
      id: 'heavy-congestion',
      name: 'Heavy Congestion',
      description: 'Peak hour traffic exceeding normal capacity'
    },
    {
      id: 'signal-failure',
      name: 'Signal System Failure',
      description: 'Technical malfunction in signal control systems'
    },
    {
      id: 'weather-impact',
      name: 'Weather Impact',
      description: 'Adverse weather conditions affecting operations'
    }
  ];

  const handleRunOptimization = () => {
    if (!selectedScenario) return;
    
    const scenario = scenarios.find(s => s.id === selectedScenario);
    onRunOptimization(scenario);
  };

  return (
    <div className="dashboard-nav h-screen w-80 p-6 flex flex-col">
      {/* Logo Section */}
      <div className="flex items-center gap-3 mb-8 pb-6 border-b border-border">
        <div className="w-12 h-12 rounded-lg bg-primary/10 border border-primary/30 flex items-center justify-center overflow-hidden">
          <img 
            src={railnovaLogo} 
            alt="RailNova"
            className="w-8 h-8 object-contain"
          />
        </div>
        <div>
          <h1 className="text-xl font-bold text-card-foreground">RailNova</h1>
          <p className="text-sm text-muted-foreground">AI Train Traffic Co-Pilot</p>
        </div>
      </div>

      {/* Simulation Controls */}
      <div className="flex-1">
        <div className="mb-6">
          <div className="flex items-center gap-2 mb-4">
            <div className="p-2 rounded-lg bg-accent/10 border border-accent/30">
              <Zap className="h-4 w-4 text-accent" />
            </div>
            <h2 className="text-lg font-semibold text-card-foreground">
              Simulation Controls
            </h2>
          </div>

          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium text-card-foreground mb-2 block">
                Select Disruption Scenario
              </label>
              <Select
                value={selectedScenario}
                onValueChange={setSelectedScenario}
                disabled={isLoading}
              >
                <SelectTrigger className="w-full bg-card border-border text-card-foreground">
                  <SelectValue placeholder="Choose a scenario..." />
                </SelectTrigger>
                <SelectContent className="bg-card border-border">
                  {scenarios.map((scenario) => (
                    <SelectItem
                      key={scenario.id}
                      value={scenario.id}
                      className="text-card-foreground hover:bg-muted/50"
                    >
                      <div>
                        <div className="font-medium">{scenario.name}</div>
                        <div className="text-xs text-muted-foreground">
                          {scenario.description}
                        </div>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <Button
              onClick={handleRunOptimization}
              disabled={!selectedScenario || isLoading}
              className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold py-3 glow-effect"
              size="lg"
            >
              {isLoading ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Processing...
                </>
              ) : (
                <>
                  <Play className="h-4 w-4 mr-2" />
                  Run AI Optimization
                </>
              )}
            </Button>
          </div>
        </div>

        {/* Info Panel */}
        <div className="card-gradient rounded-lg p-4 border border-border/50">
          <h3 className="font-semibold text-card-foreground mb-2">How it Works</h3>
          <ul className="text-sm text-muted-foreground space-y-2">
            <li className="flex items-start gap-2">
              <span className="text-primary mt-0.5">•</span>
              Select a disruption scenario from the dropdown
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary mt-0.5">•</span>
              Click "Run AI Optimization" to analyze
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary mt-0.5">•</span>
              Compare baseline vs AI-optimized results
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary mt-0.5">•</span>
              Review AI recommendations and KPIs
            </li>
          </ul>
        </div>
      </div>

      {/* Footer */}
      <div className="pt-4 border-t border-border text-center">
        <p className="text-xs text-muted-foreground">
          Powered by Advanced AI Traffic Management
        </p>
      </div>
    </div>
  );
};

export default ControlsSidebar;