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
  try {
    const response = await api.post('/optimize', {
      scenario: scenarioData,
      timestamp: new Date().toISOString(),
    });

    return response.data;
  } catch (error) {
    console.error('API Error:', error);
    
    // For development purposes, return mock data
    if (error.code === 'ECONNREFUSED' || error.response?.status >= 500) {
      console.warn('Backend not available, using mock data');
      return getMockData(scenarioData);
    }
    
    throw error;
  }
};

/**
 * Mock data for development and testing
 */
const getMockData = (scenarioData) => {
  const trains = [
    { train_id: 'EXP001', route: 'Delhi-Mumbai' },
    { train_id: 'RAJ002', route: 'Jaipur-Delhi' },
    { train_id: 'SHT003', route: 'Mumbai-Pune' },
    { train_id: 'EXP004', route: 'Bangalore-Chennai' },
    { train_id: 'LOC005', route: 'Chennai-Madurai' },
  ];

  const baselineSchedule = trains.map((train, index) => ({
    train_id: train.train_id,
    route: train.route,
    start_time: new Date(Date.now() + index * 60 * 60 * 1000).toISOString(),
    end_time: new Date(Date.now() + (index + 2) * 60 * 60 * 1000).toISOString(),
    delay: Math.floor(Math.random() * 60) + 30, // 30-90 minutes delay
    status: 'delayed',
  }));

  const aiSchedule = trains.map((train, index) => ({
    train_id: train.train_id,
    route: train.route,
    start_time: new Date(Date.now() + index * 45 * 60 * 1000).toISOString(),
    end_time: new Date(Date.now() + (index + 1.5) * 45 * 60 * 1000).toISOString(),
    delay: Math.floor(Math.random() * 20) + 5, // 5-25 minutes delay
    status: 'optimized',
  }));

  return {
    scenario: scenarioData?.name || 'Express Train Delayed',
    baseline_result: {
      schedule: baselineSchedule,
      total_delay: baselineSchedule.reduce((sum, train) => sum + train.delay, 0),
      avg_delay: baselineSchedule.reduce((sum, train) => sum + train.delay, 0) / baselineSchedule.length,
    },
    ai_result: {
      schedule: aiSchedule,
      total_delay: aiSchedule.reduce((sum, train) => sum + train.delay, 0),
      avg_delay: aiSchedule.reduce((sum, train) => sum + train.delay, 0) / aiSchedule.length,
      kpis: {
        delay_reduction: '65%',
        avg_delay_reduction: '45 min',
        throughput_improvement: '+12%',
      },
      reasoning: [
        'Rescheduled EXP001 to avoid peak congestion window',
        'Optimized platform allocation to reduce cross-traffic',
        'Implemented dynamic signal priority for express services',
        'Adjusted local service intervals to accommodate delays',
        'Coordinated with maintenance teams for optimal track usage',
      ],
    },
    timestamp: new Date().toISOString(),
  };
};

export default api;