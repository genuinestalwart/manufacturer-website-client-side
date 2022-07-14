module.exports = {
	content: ["./src/**/*.{js,jsx,ts,tsx}"],
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
					neutral: "#C4FAFD",
					"base-100": "#ffffff",
				},
			},
		],
	},
};
