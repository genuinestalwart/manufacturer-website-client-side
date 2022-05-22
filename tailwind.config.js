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
					primary: "#3762cc",
					secondary: "#a4c9fe",
					accent: "#f9a8a7",
					neutral: "#6bdddd",
					"base-100": "#ffffff",
				},
			}
		],
	},
}
