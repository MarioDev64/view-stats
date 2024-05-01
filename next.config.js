module.exports = {
	images: {
		remotePatterns: [
			{
				protocol: 'https',
				hostname: 'openweathermap.org',
				port: '',
				pathname: '/img/wn/**'
			}
		]
	},
	experimental: {
		missingSuspenseWithCSRBailout: false,
	},
};
