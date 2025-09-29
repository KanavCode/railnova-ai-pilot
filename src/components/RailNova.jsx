import React, { useState, useEffect } from 'react';

// Embedded SVG Icons
const TrainIcon = ({ className }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24">
    <path d="M12 2c-4 0-8 .5-8 4v9.5A2.5 2.5 0 0 0 6.5 18L5 19.5 5.5 20h13l-.5-.5L16.5 18a2.5 2.5 0 0 0 2.5-2.5V6c0-3.5-4-4-8-4zM7.5 17a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm9 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zM12 10H6V7h12v3h-6z"/>
  </svg>
);

const ClockIcon = ({ className }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <circle cx="12" cy="12" r="10"/>
    <polyline points="12,6 12,12 16,14"/>
  </svg>
);

const ChartIcon = ({ className }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <polyline points="22,12 18,12 15,21 9,3 6,12 2,12"/>
  </svg>
);

const CheckCircleIcon = ({ className }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
    <polyline points="22,4 12,14.01 9,11.01"/>
  </svg>
);

const LightbulbIcon = ({ className }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path d="M9 21h6"/>
    <path d="M12 17h0a7 7 0 0 1-7-7 7 7 0 0 1 14 0 7 7 0 0 1-7 7z"/>
    <polyline points="11,9.5 12,10.5 13,9.5"/>
  </svg>
);

const MapIcon = ({ className }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <polygon points="1,6 1,22 8,18 16,22 23,18 23,2 16,6 8,2"/>
    <line x1="8" y1="2" x2="8" y2="18"/>
    <line x1="16" y1="6" x2="16" y2="22"/>
  </svg>
);

const BarChartIcon = ({ className }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <line x1="18" y1="20" x2="18" y2="10"/>
    <line x1="12" y1="20" x2="12" y2="4"/>
    <line x1="6" y1="20" x2="6" y2="14"/>
  </svg>
);

// KPI Card Component
const KpiCard = ({ icon, title, value, iconColor }) => (
  <div className="bg-slate-800 rounded-lg p-4 border border-slate-700">
    <div className="flex items-center space-x-3">
      <div className={`p-2 rounded-lg bg-slate-700 ${iconColor}`}>
        {icon}
      </div>
      <div>
        <p className="text-slate-400 text-sm">{title}</p>
        <p className="text-white text-xl font-bold">{value}</p>
      </div>
    </div>
  </div>
);

// Gantt Chart Component
const GanttChartView = ({ title, data, titleColor = "text-white" }) => {
  const maxTime = 140;
  const timeMarkers = [25, 50, 75, 100, 125];

  const getStatusColor = (status) => {
    switch (status) {
      case 'delayed': return 'bg-red-600';
      case 'on_time': return 'bg-blue-600';
      case 'conflicting': return 'bg-yellow-600 animate-pulse';
      case 'optimized': return 'bg-teal-500';
      case 'held': return 'bg-orange-500';
      case 'rerouted': return 'bg-purple-500';
      default: return 'bg-blue-600';
    }
  };

  return (
    <div className="bg-slate-800 rounded-lg p-6 border border-slate-700">
      <h3 className={`text-lg font-semibold mb-4 ${titleColor}`}>{title}</h3>
      
      {/* Timeline */}
      <div className="relative mb-4">
        <div className="h-8 bg-slate-700 rounded relative">
          {timeMarkers.map(marker => (
            <div
              key={marker}
              className="absolute top-0 bottom-0 w-px bg-slate-500"
              style={{ left: `${(marker / maxTime) * 100}%` }}
            >
              <span className="absolute -top-6 -translate-x-1/2 text-xs text-slate-400">
                {marker}m
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Train Schedules */}
      <div className="space-y-3">
        {data.map((train, index) => (
          <div key={train.id} className="flex items-center space-x-3">
            <div className="w-20 text-sm text-slate-300 font-mono">{train.id}</div>
            <div className="flex-1 relative h-8 bg-slate-700 rounded">
              <div
                className={`absolute top-1 bottom-1 rounded ${getStatusColor(train.status)}`}
                style={{
                  left: `${(train.start / maxTime) * 100}%`,
                  width: `${((train.end - train.start) / maxTime) * 100}%`
                }}
              >
                <span className="absolute inset-0 flex items-center justify-center text-xs font-semibold text-white">
                  {train.name}
                </span>
              </div>
            </div>
            <div className="w-16 text-xs text-slate-400">
              {train.end - train.start}m
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// Recommendations Panel Component
const RecommendationPanel = ({ recommendations }) => (
  <div className="bg-slate-800 rounded-lg p-6 border border-slate-700">
    <h3 className="text-lg font-semibold mb-4 text-amber-400">AI Recommendations & Reasoning</h3>
    <div className="space-y-3">
      {recommendations.map((rec, index) => (
        <div key={index} className="flex items-start space-x-3">
          <LightbulbIcon className="w-5 h-5 text-amber-400 mt-0.5 flex-shrink-0" />
          <p className="text-slate-300 text-sm leading-relaxed">{rec}</p>
        </div>
      ))}
    </div>
  </div>
);

// Main RailNova Component
const RailNova = () => {
  const [activeTab, setActiveTab] = useState('gantt');
  const [isOptimizing, setIsOptimizing] = useState(false);
  const [selectedScenario, setSelectedScenario] = useState('scenario1');
  const [currentTime, setCurrentTime] = useState(new Date());

  // Update time every second
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Hard-coded data
  const baselineData = [
    { id: 'EXP001', name: 'Rajdhani Exp', start: 0, end: 40, status: 'delayed' },
    { id: 'FRG010', name: 'Goods Carrier', start: 10, end: 70, status: 'on_time' },
    { id: 'SUB003', name: 'Local EMU', start: 30, end: 80, status: 'on_time' },
    { id: 'EXP002', name: 'Shatabdi Exp', start: 50, end: 95, status: 'conflicting' },
    { id: 'FRG011', name: 'Container Ld', start: 65, end: 110, status: 'on_time' }
  ];

  const optimizedData = [
    { id: 'EXP001', name: 'Rajdhani Exp', start: 0, end: 35, status: 'optimized' },
    { id: 'EXP002', name: 'Shatabdi Exp', start: 40, end: 85, status: 'optimized' },
    { id: 'SUB003', name: 'Local EMU', start: 75, end: 120, status: 'rerouted' },
    { id: 'FRG010', name: 'Goods Carrier', start: 10, end: 70, status: 'held' },
    { id: 'FRG011', name: 'Container Ld', start: 90, end: 135, status: 'held' }
  ];

  const recommendations = [
    "Prioritized Rajdhani (EXP001) over Goods (FRG010) to clear express path.",
    "Held Goods Carrier (FRG010) at siding for 15 mins to prevent conflict with Shatabdi.",
    "Rerouted Local EMU (SUB003) via alternate track to maintain flow.",
    "Optimized Shatabdi (EXP002) departure, reducing initial delay by 10 mins."
  ];

  const scenarios = [
    { id: 'scenario1', name: 'Express Train Delayed' },
    { id: 'scenario2', name: 'Track Maintenance' },
    { id: 'scenario3', name: 'Heavy Congestion' }
  ];

  const handleOptimization = async () => {
    setIsOptimizing(true);
    // Simulate API call - commented out actual backend connection
    /*
    try {
      const response = await fetch('/api/optimize', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ scenario: selectedScenario })
      });
      const data = await response.json();
      // Process data...
    } catch (error) {
      console.error('Optimization failed:', error);
    }
    */
    
    // Simulate processing time
    setTimeout(() => {
      setIsOptimizing(false);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-slate-900 text-white font-sans">
      {/* Header */}
      <header className="bg-slate-800 border-b border-slate-700 p-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-3">
            <TrainIcon className="w-8 h-8 text-amber-400" />
            <div>
              <h1 className="text-xl font-bold text-white">RailNova</h1>
              <p className="text-sm text-slate-400">AI Train Traffic Co-Pilot</p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-sm text-slate-400">Controller ID: C-451</p>
            <p className="text-sm text-slate-300">
              {currentTime.toLocaleTimeString('en-IN', { hour12: false })}
            </p>
          </div>
        </div>
      </header>

      {/* Main Layout */}
      <div className="flex h-[calc(100vh-80px)]">
        {/* Left Sidebar */}
        <div className="w-1/5 bg-slate-800 border-r border-slate-700 p-6">
          <div className="space-y-6">
            <div>
              <h2 className="text-lg font-semibold mb-4 text-white">Simulation Controls</h2>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm text-slate-400 mb-2">Select Disruption Scenario</label>
                  <select
                    value={selectedScenario}
                    onChange={(e) => setSelectedScenario(e.target.value)}
                    className="w-full bg-slate-700 border border-slate-600 rounded px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-amber-500"
                  >
                    {scenarios.map(scenario => (
                      <option key={scenario.id} value={scenario.id}>
                        {scenario.name}
                      </option>
                    ))}
                  </select>
                </div>

                <button
                  onClick={handleOptimization}
                  disabled={isOptimizing}
                  className="w-full bg-amber-500 hover:bg-amber-600 disabled:bg-amber-700 text-white font-semibold py-3 px-4 rounded transition-colors duration-200 flex items-center justify-center space-x-2"
                >
                  {isOptimizing ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      <span>Optimizing...</span>
                    </>
                  ) : (
                    <span>Run AI Optimization</span>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 p-6">
          {/* Tabs */}
          <div className="mb-6">
            <div className="flex space-x-1 border-b border-slate-700">
              <button
                onClick={() => setActiveTab('gantt')}
                className={`px-4 py-2 font-medium text-sm transition-colors duration-200 flex items-center space-x-2 ${
                  activeTab === 'gantt'
                    ? 'text-amber-400 border-b-2 border-amber-400'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <BarChartIcon className="w-4 h-4" />
                <span>Gantt Chart View</span>
              </button>
              <button
                onClick={() => setActiveTab('map')}
                className={`px-4 py-2 font-medium text-sm transition-colors duration-200 flex items-center space-x-2 ${
                  activeTab === 'map'
                    ? 'text-amber-400 border-b-2 border-amber-400'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <MapIcon className="w-4 h-4" />
                <span>Map View</span>
              </button>
            </div>
          </div>

          {/* Tab Content */}
          {activeTab === 'gantt' && (
            <div className="space-y-6">
              <GanttChartView
                title="Baseline Schedule (Manual Approach)"
                data={baselineData}
              />
              <GanttChartView
                title="AI-Optimized Schedule"
                data={optimizedData}
                titleColor="text-teal-400"
              />
            </div>
          )}

          {activeTab === 'map' && (
            <div className="bg-slate-800 rounded-lg p-12 border-2 border-dashed border-slate-600 text-center">
              <MapIcon className="w-16 h-16 text-slate-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-white mb-2">Live Map View</h3>
              <p className="text-slate-400">Coming Soon! Interactive railway network visualization.</p>
            </div>
          )}
        </div>

        {/* Right Sidebar */}
        <div className="w-[30%] bg-slate-800 border-l border-slate-700 p-6">
          <div className="space-y-6">
            {/* Performance Impact */}
            <div>
              <h2 className="text-lg font-semibold mb-4 text-white">Performance Impact</h2>
              <div className="space-y-3">
                <KpiCard
                  icon={<ClockIcon className="w-5 h-5" />}
                  title="Total Delay Reduced"
                  value="45 Mins"
                  iconColor="text-amber-400"
                />
                <KpiCard
                  icon={<ChartIcon className="w-5 h-5" />}
                  title="Average Delay Per Train"
                  value="7.5 Mins"
                  iconColor="text-teal-400"
                />
                <KpiCard
                  icon={<CheckCircleIcon className="w-5 h-5" />}
                  title="Section Throughput"
                  value="+12%"
                  iconColor="text-green-400"
                />
              </div>
            </div>

            {/* AI Recommendations */}
            <RecommendationPanel recommendations={recommendations} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default RailNova;