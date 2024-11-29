module.exports = [
    {
        context: '/api',
        target: 'http://localhost:7777',
        secure: false,
        changeOrigin: false,
        // bypass: function (req) {
        //   req.headers['X-PRDL-BAAS'] = '%MISSING TOKEN FOR PROXY BYPASS ON ENV CONFIG%';
        // },
    },
    {
        context: '/auth',
        target: 'http://localhost:8180',
        //target: 'https://identity.dev.ufcu.live.backbaseservices.com', // dev target
        secure: false,
        changeOrigin: false,
        // bypass: function (req) {
        //   req.headers['X-PRDL-BAAS'] = '%MISSING TOKEN FOR PROXY BYPASS ON ENV CONFIG%';
        // },
    },
];
