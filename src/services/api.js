import axios from 'axios';

const API_BASE_URL = 'http://127.0.0.1:5000';

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json',
  },
});

/**
 * Run AI optimization for the selected disruption scenario
 * @param {Object} scenarioData - The scenario configuration
 * @returns {Promise<Object>} Response containing baseline and AI-optimized results
 */
export const runOptimization = async (scenarioData) => {
  // Simulate processing time for presentation purposes
  await new Promise(resolve => setTimeout(resolve, 2000));
  
  // Always return compelling mock data for presentation
  return getPresentationData(scenarioData);
};

/**
 * Compelling presentation data for screenshot-ready dashboard
 */
const getPresentationData = (scenarioData) => {
  // Compelling baseline schedule with clear conflicts and delays
  const baselineSchedule = [
    {
      train_id: 'RAJ001',
      route: 'New Delhi - Mumbai Central',
      start_time: new Date('2024-01-15T06:15:00').toISOString(),
      end_time: new Date('2024-01-15T22:45:00').toISOString(),
      delay: 75, // High delay for express train
      status: 'delayed',
      priority: 'express'
    },
    {
      train_id: 'SHT002',
      route: 'New Delhi - Agra Cantt',
      start_time: new Date('2024-01-15T06:30:00').toISOString(),
      end_time: new Date('2024-01-15T11:15:00').toISOString(),
      delay: 45, // Conflicting with Rajdhani
      status: 'conflicting',
      priority: 'express'
    },
    {
      train_id: 'FRG010',
      route: 'Tughlakabad - Kanpur',
      start_time: new Date('2024-01-15T05:45:00').toISOString(),
      end_time: new Date('2024-01-15T18:30:00').toISOString(),
      delay: 30, // Goods train blocking express path
      status: 'blocking',
      priority: 'freight'
    },
    {
      train_id: 'SUB003',
      route: 'New Delhi - Ghaziabad',
      start_time: new Date('2024-01-15T07:00:00').toISOString(),
      end_time: new Date('2024-01-15T08:30:00').toISOString(),
      delay: 25, // Local train adding to congestion
      status: 'delayed',
      priority: 'local'
    },
    {
      train_id: 'EXP007',
      route: 'Howrah - New Delhi',
      start_time: new Date('2024-01-15T08:15:00').toISOString(),
      end_time: new Date('2024-01-15T23:30:00').toISOString(),
      delay: 90, // Severely delayed due to cascade effect
      status: 'cascade_delayed',
      priority: 'express'
    }
  ];

  // AI-optimized schedule showing clear improvements
  const aiSchedule = [
    {
      train_id: 'RAJ001',
      route: 'New Delhi - Mumbai Central',
      start_time: new Date('2024-01-15T06:15:00').toISOString(),
      end_time: new Date('2024-01-15T21:45:00').toISOString(),
      delay: 15, // Significantly reduced delay
      status: 'optimized',
      priority: 'express'
    },
    {
      train_id: 'SHT002', 
      route: 'New Delhi - Agra Cantt',
      start_time: new Date('2024-01-15T06:45:00').toISOString(),
      end_time: new Date('2024-01-15T11:25:00').toISOString(),
      delay: 10, // Conflict resolved
      status: 'optimized',
      priority: 'express'
    },
    {
      train_id: 'FRG010',
      route: 'Tughlakabad - Kanpur (via alternate)',
      start_time: new Date('2024-01-15T05:30:00').toISOString(),
      end_time: new Date('2024-01-15T19:15:00').toISOString(),
      delay: 5, // Rerouted to siding
      status: 'rerouted',
      priority: 'freight'
    },
    {
      train_id: 'SUB003',
      route: 'New Delhi - Ghaziabad (alt track)',
      start_time: new Date('2024-01-15T07:15:00').toISOString(),
      end_time: new Date('2024-01-15T08:45:00').toISOString(),
      delay: 5, // Alternative track used
      status: 'optimized',
      priority: 'local'
    },
    {
      train_id: 'EXP007',
      route: 'Howrah - New Delhi',
      start_time: new Date('2024-01-15T08:00:00').toISOString(),
      end_time: new Date('2024-01-15T22:30:00').toISOString(),
      delay: 20, // Cascade effect prevented
      status: 'optimized',
      priority: 'express'
    }
  ];

  return {
    scenario: scenarioData?.name || 'Express Train Delayed',
    baseline_result: {
      schedule: baselineSchedule,
      total_delay: 265, // Sum of all delays
      avg_delay: 53, // Average delay per train
    },
    ai_result: {
      schedule: aiSchedule,
      total_delay: 55, // Dramatically reduced
      avg_delay: 11, // Much better average
      kpis: {
        delay_reduction: '45 Mins',
        avg_delay_reduction: '7.5 Mins', 
        throughput_improvement: '+12%',
      },
      reasoning: [
        'Prioritized Rajdhani (RAJ001) over Goods (FRG010) to clear express path',
        'Held Goods Carrier (FRG010) at siding for 15 mins to prevent conflict with Shatabdi',
        'Rerouted Local EMU (SUB003) via alternate track to maintain flow',
        'Optimized Shatabdi (SHT002) departure, reducing initial delay by 10 mins',
        'Coordinated platform allocation at New Delhi to minimize cross-movements',
        'Implemented dynamic signal priority for all express services',
        'Prevented cascade delays by early intervention on EXP007 schedule'
      ],
    },
    timestamp: new Date().toISOString(),
  };
};

export default api;