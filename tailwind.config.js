module.exports = {
	content: [
		"./src/**/*.{js,jsx,ts,tsx}",
	],
	theme: {
		extend: {},
	},
	plugins: [require("daisyui")],
	daisyui: {
		themes: [
			{
				manufacturetheme: {
					primary: "#4A5FC1",
					secondary: "#00ABE1",
					accent: "#f9aca6",
					neutral: "#F4DB7D",
					"base-100": "#ffffff",
				},
			},
		],
	},
}
