export const version = "1.8.0"

export const browser_specific_settings = {
	gecko: {
		id: "youtube-ends-at@gonguet.com",
	},
}

export const base = {
	default_locale: "en",

	name: "__MSG_extensionName__",
	description: "__MSG_extensionDescription__",

	icons: {
		16: "icons/icon-16.png",
		48: "icons/icon-48.png",
		96: "icons/icon-96.png",
		128: "icons/icon-128.png",
	},

	content_scripts: [
		{
			matches: ["*://www.youtube.com/*"],
			js: ["scripts/content.js"],
		},
	],
}

export const manifest_v2 = {
	manifest_version: 2,
	version,
	...base,
	browser_specific_settings,
}

export const manifest_v3 = {
	manifest_version: 3,
	version,
	...base,
}
