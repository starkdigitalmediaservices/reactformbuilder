import axios from 'axios';

export default {
  setupInterceptors: async () => {
    console.log('setupInterceptors');
    await axios.interceptors.request.use(
      async (config) => {
        const requestConfig = config;
        requestConfig.headers['Content-Type'] = 'application/json';
        requestConfig.headers.Accept = 'application/json';
        requestConfig.headers['x-access-token'] = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJvYmoiOnsiVXNlckFjY291bnRJRCI6MSwicm9sZWlkIjoxLCJlbWFpbF9pZCI6InMuYWthc2hAc3RhcmtkaWdpdGFsLm5ldCJ9LCJpYXQiOjE2MjY4NzQ1NTV9.Hm5_cloIlyttxt203poW4GllnK6LTYh4y8MXAvCzDM0'; // eslint-disable-line
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
