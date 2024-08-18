#!/usr/bin/env zx

$.verbose = argv.v || argv.verbose
const colorize = $.verbose ? chalk.magenta.bold : str => str
$.quote = (...args) => args.join(" ")

const manifests = { v2: argv.mv2, v3: argv.mv3 }
if (!manifests.v2 && !manifests.v3) {
	manifests.v2 = manifests.v3 = true
}

echo(colorize("Copying source files..."))
await fs.ensureDir("dist")
await fs.copy("_locales", "dist/_locales")
await fs.copy("icons", "dist/icons")
await fs.copy("scripts", "dist/scripts")
await fs.copy("README.md", "dist/README.md")

const { manifest_v2, manifest_v3, version } = await import("./manifest.mjs")
const args = ["-s dist", "-o", `-n youtube_ends_at-${version}.zip`]

if (manifests.v3) {
	echo(colorize("Building manifest V3 extension..."))
	await fs.writeJSON("dist/manifest.json", manifest_v3, { spaces: "\t" })
	await $`npx web-ext build ${args} -a manifest-v3-artifacts`
}

if (manifests.v2) {
	echo(colorize("Building manifest V2 extension..."))
	await fs.writeJSON("dist/manifest.json", manifest_v2, { spaces: "\t" })
	await $`npx web-ext build ${args} -a manifest-v2-artifacts`
}

echo(colorize("Done!"))
