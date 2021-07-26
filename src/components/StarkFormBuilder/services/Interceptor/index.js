import axios from 'axios';

export default {
  setupInterceptors: async () => {
    console.log('setupInterceptors');
    await axios.interceptors.request.use(
      async (config) => {
        const requestConfig = config;
        requestConfig.headers['Content-Type'] = 'application/json';
        requestConfig.headers.Accept = 'application/json';
        requestConfig.headers['x-access-token'] = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJvYmoiOnsiVXNlckFjY291bnRJRCI6MSwicm9sZXMiOlsxLDIsMiwyXSwiZW1haWxfaWQiOiJzLmFrYXNoQHN0YXJrZGlnaXRhbC5uZXQifSwiaWF0IjoxNjI3Mjk0MzMzfQ.CThEGObOzzHQ1wM5I9iHVi520LM7joAF1bm3nAJ8cXw'; // eslint-disable-line
        return requestConfig;
      },
      (error) => {
        Promise.reject(error);
      }
    );
    // axios.interceptors.response.use(response => response, (error) => {
    //   console.log(error, 'interceptor errorrrr');
    //   return Promise.reject(error.response);
    // });
  },
};
