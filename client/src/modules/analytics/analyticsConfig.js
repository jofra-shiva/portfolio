// Configuration for Visitor Analytics
// Replace the placeholder IDs with your actual Google Analytics and Microsoft Clarity IDs

export const analyticsConfig = {
  // Google Analytics 4 Measurement ID
  gaMeasurementId: import.meta.env.VITE_GA_ID || 'G-XXXXXXXXXX', 
  
  // Microsoft Clarity Project ID
  clarityId: import.meta.env.VITE_CLARITY_ID || 'XXXXXXXXXX',
  
  // Toggle analytics on/off — set VITE_ANALYTICS_ENABLED=false to disable
  enabled: import.meta.env.VITE_ANALYTICS_ENABLED !== 'false'
};
