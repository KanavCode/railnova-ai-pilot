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
const KpiCard = ({ icon, title, value, iconColor, trend }) => (
  <div className="group bg-gradient-to-br from-slate-800/90 to-slate-900/90 backdrop-blur-sm rounded-xl p-5 border border-slate-700/50 hover:border-slate-600/70 transition-all duration-300 hover:shadow-xl hover:shadow-slate-900/20 hover:-translate-y-0.5">
    <div className="flex items-center justify-between">
      <div className="flex items-center space-x-4">
        <div className={`p-3 rounded-xl bg-gradient-to-br from-slate-700/70 to-slate-800/70 ${iconColor} group-hover:scale-105 transition-transform duration-300`}>
          {icon}
        </div>
        <div>
          <p className="text-slate-400 text-sm font-medium tracking-wide">{title}</p>
          <p className="text-white text-2xl font-bold mt-1">{value}</p>
        </div>
      </div>
      {trend && (
        <div className="text-right">
          <div className={`text-xs px-2 py-1 rounded-full ${
            trend > 0 ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'
          }`}>
            {trend > 0 ? '+' : ''}{trend}%
          </div>
        </div>
      )}
    </div>
  </div>
);

// Gantt Chart Component
const GanttChartView = ({ title, data, titleColor = "text-white", isOptimized = false }) => {
  const maxTime = 140;
  const timeMarkers = [25, 50, 75, 100, 125];

  const getStatusColor = (status) => {
    switch (status) {
      case 'delayed': return 'bg-gradient-to-r from-red-600 to-red-500 shadow-lg shadow-red-600/30';
      case 'on_time': return 'bg-gradient-to-r from-blue-600 to-blue-500 shadow-lg shadow-blue-600/30';
      case 'conflicting': return 'bg-gradient-to-r from-yellow-600 to-yellow-500 animate-pulse shadow-lg shadow-yellow-600/30';
      case 'optimized': return 'bg-gradient-to-r from-teal-500 to-emerald-500 shadow-lg shadow-teal-500/40';
      case 'held': return 'bg-gradient-to-r from-orange-500 to-amber-500 shadow-lg shadow-orange-500/30';
      case 'rerouted': return 'bg-gradient-to-r from-purple-500 to-indigo-500 shadow-lg shadow-purple-500/30';
      default: return 'bg-gradient-to-r from-blue-600 to-blue-500 shadow-lg shadow-blue-600/30';
    }
  };

  return (
    <div className={`bg-gradient-to-br from-slate-800/90 to-slate-900/90 backdrop-blur-sm rounded-2xl p-8 border border-slate-700/50 shadow-2xl ${isOptimized ? 'ring-2 ring-teal-500/20' : ''}`}>
      <div className="flex items-center justify-between mb-6">
        <h3 className={`text-xl font-bold ${titleColor} flex items-center space-x-3`}>
          {isOptimized && (
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 rounded-full bg-teal-500 animate-pulse"></div>
              <CheckCircleIcon className="w-5 h-5 text-teal-400" />
            </div>
          )}
          <span>{title}</span>
        </h3>
        <div className="flex items-center space-x-2 text-sm text-slate-400">
          <ClockIcon className="w-4 h-4" />
          <span>Timeline (minutes)</span>
        </div>
      </div>
      
      {/* Enhanced Timeline */}
      <div className="relative mb-8">
        <div className="h-10 bg-gradient-to-r from-slate-700/50 to-slate-600/50 rounded-lg relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-slate-500/10 to-transparent"></div>
          {timeMarkers.map(marker => (
            <div
              key={marker}
              className="absolute top-0 bottom-0 w-px bg-gradient-to-b from-slate-400 to-slate-600"
              style={{ left: `${(marker / maxTime) * 100}%` }}
            >
              <span className="absolute -top-8 -translate-x-1/2 text-xs font-medium text-slate-300 bg-slate-800/80 px-2 py-1 rounded-md backdrop-blur-sm">
                {marker}m
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Enhanced Train Schedules */}
      <div className="space-y-4">
        {data.map((train, index) => (
          <div key={train.id} className="group">
            <div className="flex items-center space-x-4">
              <div className="w-24 text-sm font-mono font-bold text-slate-200 bg-slate-700/50 px-3 py-2 rounded-lg">
                {train.id}
              </div>
              <div className="flex-1 relative h-10 bg-gradient-to-r from-slate-700/30 to-slate-600/30 rounded-lg overflow-hidden">
                <div
                  className={`absolute top-1 bottom-1 rounded-lg transition-all duration-500 hover:scale-y-110 ${getStatusColor(train.status)}`}
                  style={{
                    left: `${(train.start / maxTime) * 100}%`,
                    width: `${((train.end - train.start) / maxTime) * 100}%`
                  }}
                >
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-xs font-bold text-white drop-shadow-lg">
                      {train.name}
                    </span>
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-lg"></div>
                </div>
              </div>
              <div className="w-20 text-sm font-medium text-slate-300 bg-slate-700/30 px-3 py-2 rounded-lg text-center">
                {train.end - train.start}m
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// Recommendations Panel Component
const RecommendationPanel = ({ recommendations }) => (
  <div className="bg-gradient-to-br from-slate-800/90 to-slate-900/90 backdrop-blur-sm rounded-2xl p-8 border border-slate-700/50 shadow-2xl">
    <div className="flex items-center space-x-3 mb-6">
      <div className="p-2 rounded-xl bg-gradient-to-br from-amber-500/20 to-orange-500/20">
        <LightbulbIcon className="w-6 h-6 text-amber-400" />
      </div>
      <h3 className="text-xl font-bold text-amber-400">AI Recommendations & Reasoning</h3>
    </div>
    <div className="space-y-4">
      {recommendations.map((rec, index) => (
        <div key={index} className="group relative">
          <div className="flex items-start space-x-4 p-4 rounded-xl bg-gradient-to-r from-slate-700/30 to-slate-600/30 border border-slate-600/30 hover:border-amber-500/30 transition-all duration-300 hover:shadow-lg">
            <div className="p-1.5 rounded-lg bg-amber-500/20 group-hover:bg-amber-500/30 transition-colors duration-300">
              <LightbulbIcon className="w-4 h-4 text-amber-400 flex-shrink-0" />
            </div>
            <p className="text-slate-200 text-sm leading-relaxed font-medium">{rec}</p>
          </div>
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
  const [isLoaded, setIsLoaded] = useState(false);

  // Update time every second and handle initial load
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    
    // Simulate initial load animation
    setTimeout(() => setIsLoaded(true), 300);
    
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
    <div className={`min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white font-sans transition-all duration-700 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}>
      {/* Enhanced Header */}
      <header className="bg-gradient-to-r from-slate-800/95 to-slate-900/95 backdrop-blur-sm border-b border-slate-700/50 shadow-xl">
        <div className="px-8 py-6">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-4">
              <div className="p-3 rounded-2xl bg-gradient-to-br from-amber-500/20 to-orange-500/20 shadow-lg">
                <TrainIcon className="w-8 h-8 text-amber-400" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-white tracking-tight">RailNova</h1>
                <p className="text-sm text-slate-300 font-medium">AI Train Traffic Co-Pilot</p>
              </div>
            </div>
            <div className="text-right bg-slate-700/30 rounded-xl px-6 py-3 border border-slate-600/50">
              <p className="text-sm text-slate-300 font-medium">Controller ID: C-451 | Section: North-Central</p>
              <p className="text-sm text-slate-200 font-mono">
                Last Updated: {currentTime.toLocaleTimeString('en-IN', { hour12: false })}
              </p>
            </div>
          </div>
        </div>
      </header>

      {/* Main Layout */}
      <div className="flex h-[calc(100vh-120px)]">
        {/* Enhanced Left Sidebar */}
        <div className="w-80 bg-gradient-to-b from-slate-800/95 to-slate-900/95 backdrop-blur-sm border-r border-slate-700/50 shadow-2xl">
          <div className="p-8 space-y-8">
            <div>
              <h2 className="text-xl font-bold mb-6 text-white flex items-center space-x-3">
                <div className="p-2 rounded-xl bg-gradient-to-br from-blue-500/20 to-purple-500/20">
                  <svg className="w-5 h-5 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4" />
                  </svg>
                </div>
                <span>Simulation Controls</span>
              </h2>
              
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-3">Select Disruption Scenario</label>
                  <div className="relative">
                    <select
                      value={selectedScenario}
                      onChange={(e) => setSelectedScenario(e.target.value)}
                      className="w-full bg-gradient-to-r from-slate-700/80 to-slate-600/80 backdrop-blur-sm border border-slate-600/50 rounded-xl px-4 py-3 text-white font-medium focus:outline-none focus:ring-2 focus:ring-amber-500/50 focus:border-amber-500/50 transition-all duration-300 appearance-none cursor-pointer hover:border-slate-500/70"
                    >
                      <option value="scenario1" className="bg-slate-800">Scenario 1: Express Train Delayed</option>
                      <option value="scenario2" className="bg-slate-800">Scenario 2: Track Maintenance</option>
                      <option value="scenario3" className="bg-slate-800">Scenario 3: Heavy Congestion</option>
                    </select>
                    <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                      <svg className="w-5 h-5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </div>
                  </div>
                </div>

                <button
                  onClick={handleOptimization}
                  disabled={isOptimizing}
                  className="w-full bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 disabled:from-amber-700 disabled:to-orange-700 text-white font-bold py-4 px-6 rounded-xl transition-all duration-300 flex items-center justify-center space-x-3 shadow-lg hover:shadow-xl hover:shadow-amber-500/25 transform hover:-translate-y-0.5 disabled:transform-none"
                >
                  {isOptimizing ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      <span>Optimizing...</span>
                    </>
                  ) : (
                    <>
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                      </svg>
                      <span>Run AI Optimization</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Enhanced Main Content */}
        <div className="flex-1 p-8 overflow-auto">
          {/* Enhanced Tabs */}
          <div className="mb-8">
            <div className="flex space-x-2 bg-slate-800/50 rounded-2xl p-2 backdrop-blur-sm border border-slate-700/50">
              <button
                onClick={() => setActiveTab('gantt')}
                className={`flex items-center space-x-3 px-6 py-3 font-semibold text-sm rounded-xl transition-all duration-300 ${
                  activeTab === 'gantt'
                    ? 'bg-gradient-to-r from-amber-500 to-orange-500 text-white shadow-lg shadow-amber-500/25'
                    : 'text-slate-300 hover:text-white hover:bg-slate-700/50'
                }`}
              >
                <BarChartIcon className="w-5 h-5" />
                <span>Gantt Chart View</span>
              </button>
              <button
                onClick={() => setActiveTab('map')}
                className={`flex items-center space-x-3 px-6 py-3 font-semibold text-sm rounded-xl transition-all duration-300 ${
                  activeTab === 'map'
                    ? 'bg-gradient-to-r from-amber-500 to-orange-500 text-white shadow-lg shadow-amber-500/25'
                    : 'text-slate-300 hover:text-white hover:bg-slate-700/50'
                }`}
              >
                <MapIcon className="w-5 h-5" />
                <span>Map View</span>
              </button>
            </div>
          </div>

          {/* Enhanced Tab Content */}
          {activeTab === 'gantt' && (
            <div className="space-y-8">
              <GanttChartView
                title="Baseline Schedule (Manual Approach)"
                data={baselineData}
              />
              <GanttChartView
                title="AI-Optimized Schedule"
                data={optimizedData}
                titleColor="text-teal-400"
                isOptimized={true}
              />
            </div>
          )}

          {activeTab === 'map' && (
            <div className="bg-gradient-to-br from-slate-800/90 to-slate-900/90 backdrop-blur-sm rounded-2xl p-16 border-2 border-dashed border-slate-600/50 text-center shadow-2xl">
              <div className="p-6 rounded-2xl bg-gradient-to-br from-slate-700/30 to-slate-600/30 inline-block mb-6">
                <MapIcon className="w-20 h-20 text-slate-400" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">Live Map View</h3>
              <p className="text-slate-400 text-lg max-w-md mx-auto">Coming Soon! Interactive railway network visualization with real-time train positions and route optimization.</p>
            </div>
          )}
        </div>

        {/* Enhanced Right Sidebar */}
        <div className="w-96 bg-gradient-to-b from-slate-800/95 to-slate-900/95 backdrop-blur-sm border-l border-slate-700/50 shadow-2xl overflow-auto">
          <div className="p-8 space-y-8">
            {/* Enhanced Performance Impact */}
            <div>
              <div className="flex items-center space-x-3 mb-6">
                <div className="p-2 rounded-xl bg-gradient-to-br from-green-500/20 to-emerald-500/20">
                  <ChartIcon className="w-6 h-6 text-green-400" />
                </div>
                <h2 className="text-xl font-bold text-white">Performance Impact</h2>
              </div>
              <div className="space-y-4">
                <KpiCard
                  icon={<ClockIcon className="w-6 h-6" />}
                  title="Total Delay Reduced"
                  value="45 Mins"
                  iconColor="text-amber-400"
                  trend={-33}
                />
                <KpiCard
                  icon={<ChartIcon className="w-6 h-6" />}
                  title="Average Delay Per Train"
                  value="7.5 Mins"
                  iconColor="text-teal-400"
                  trend={-28}
                />
                <KpiCard
                  icon={<CheckCircleIcon className="w-6 h-6" />}
                  title="Section Throughput"
                  value="+12%"
                  iconColor="text-green-400"
                  trend={12}
                />
              </div>
            </div>

            {/* Enhanced AI Recommendations */}
            <RecommendationPanel recommendations={recommendations} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default RailNova;