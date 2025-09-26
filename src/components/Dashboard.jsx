import { useState, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import ControlsSidebar from './ControlsSidebar';
import GanttChartView from './GanttChartView';
import KpiCard from './KpiCard';
import RecommendationPanel from './RecommendationPanel';
import { runOptimization } from '../services/api';
import { MapPin, BarChart3 } from 'lucide-react';

const Dashboard = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [baselineResult, setBaselineResult] = useState(null);
  const [aiResult, setAiResult] = useState(null);
  const [currentScenario, setCurrentScenario] = useState({
    name: 'Express Train Delayed',
    description: 'Major express service disruption affecting multiple routes'
  });
  const { toast } = useToast();

  // Load presentation data immediately on component mount
  useEffect(() => {
    const loadPresentationData = async () => {
      try {
        // Simulate that we've just processed a scenario  
        const response = await runOptimization({ 
          name: 'Express Train Delayed',
          description: 'Major express service disruption affecting multiple routes' 
        });
        setBaselineResult(response.baseline_result);
        setAiResult(response.ai_result);
      } catch (error) {
        console.error('Failed to load presentation data:', error);
      }
    };

    loadPresentationData();
  }, []);

  const handleRunOptimization = async (scenario) => {
    setIsLoading(true);
    setCurrentScenario(scenario);

    try {
      toast({
        title: "Running AI Optimization",
        description: `Analyzing ${scenario.name} scenario...`,
      });

      const response = await runOptimization(scenario);
      
      setBaselineResult(response.baseline_result);
      setAiResult(response.ai_result);

      toast({
        title: "Optimization Complete",
        description: "AI analysis has been successfully completed!",
        variant: "default",
      });

    } catch (error) {
      console.error('Optimization failed:', error);
      toast({
        title: "Optimization Failed",
        description: "Please try again or check your connection.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const getKpiData = () => {
    if (!aiResult?.kpis) return [];

    return [
      {
        title: "Total Delay Reduced",
        value: aiResult.kpis.delay_reduction || "0%",
        icon: "clock",
        variant: "success"
      },
      {
        title: "Average Delay per Train",
        value: aiResult.kpis.avg_delay_reduction || "0 min",
        icon: "train",
        variant: "primary"
      },
      {
        title: "Throughput Increased",
        value: aiResult.kpis.throughput_improvement || "0%",
        icon: "trending",
        variant: "success"
      }
    ];
  };

  return (
    <div className="flex min-h-screen bg-background">
      {/* Left Sidebar - Controls */}
      <ControlsSidebar 
        onRunOptimization={handleRunOptimization}
        isLoading={isLoading}
      />

      {/* Main Content Area */}
      <div className="flex-1 flex">
        {/* Center Content */}
        <div className="flex-1 p-6">
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-card-foreground mb-2">
              {currentScenario ? `Analysis: ${currentScenario.name}` : 'Train Schedule Analysis'}
            </h2>
            <p className="text-muted-foreground">
              {currentScenario 
                ? currentScenario.description 
                : 'Select a disruption scenario to begin AI optimization analysis'
              }
            </p>
          </div>

          <Tabs defaultValue="gantt" className="space-y-6">
            <TabsList className="bg-card border border-border">
              <TabsTrigger 
                value="gantt" 
                className="flex items-center gap-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
              >
                <BarChart3 className="h-4 w-4" />
                Gantt Chart View
              </TabsTrigger>
              <TabsTrigger 
                value="map"
                className="flex items-center gap-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
              >
                <MapPin className="h-4 w-4" />
                Map View
              </TabsTrigger>
            </TabsList>

            <TabsContent value="gantt" className="space-y-6">
              <div className="space-y-6">
                <GanttChartView
                  schedule={baselineResult?.schedule}
                  title="Baseline Schedule (Manual Approach)"
                  variant="baseline"
                />
                
                <GanttChartView
                  schedule={aiResult?.schedule}
                  title="AI-Optimized Schedule"
                  variant="optimized"
                />
              </div>
            </TabsContent>

            <TabsContent value="map" className="space-y-6">
              <div className="card-gradient rounded-lg p-12 border border-border text-center">
                <div className="p-6 rounded-lg bg-muted/30 border border-muted/50 inline-block mb-6">
                  <MapPin className="h-16 w-16 text-muted-foreground mx-auto" />
                </div>
                <h3 className="text-xl font-semibold text-card-foreground mb-2">
                  Live Map View
                </h3>
                <p className="text-muted-foreground max-w-md mx-auto">
                  Interactive railway network visualization coming soon! This will show real-time train positions, route changes, and optimization effects on the network map.
                </p>
              </div>
            </TabsContent>
          </Tabs>
        </div>

        {/* Right Sidebar - Analysis */}
        <div className="w-96 p-6 border-l border-border bg-card/30">
          <div className="space-y-6">
            {/* Performance Impact */}
            <div>
              <h3 className="text-lg font-semibold text-card-foreground mb-4">
                Performance Impact
              </h3>
              
              <div className="space-y-3">
                {getKpiData().map((kpi, index) => (
                  <KpiCard
                    key={index}
                    title={kpi.title}
                    value={kpi.value}
                    icon={kpi.icon}
                    variant={kpi.variant}
                  />
                ))}
              </div>
            </div>

            {/* AI Recommendations */}
            <RecommendationPanel reasoning={aiResult?.reasoning || []} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;