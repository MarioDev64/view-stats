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
	env: {
		OPENWEATHERMAP_API_KEY: '49b720a4fba7860675eb76bac2579bf4'
	},
	experimental: {
		missingSuspenseWithCSRBailout: false,
	},
};
