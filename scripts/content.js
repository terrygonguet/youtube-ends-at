/** @type {"endsAt" | "endsIn"} */
let mode = localStorage.getItem("yt-ends-at-mode") ?? "endsAt"

function ensureElementsExist() {
	const container = document.querySelector("#movie_player .endsAtContainer")
	if (!container) {
		const timeDisplay = document.querySelector("#movie_player .ytp-time-display")
		if (!timeDisplay) return

		const container = document.createElement("div")
		container.innerHTML = `
			<div class="ytp-time-display notranslate endsAtContainer" style="padding-left: 0">
				<span class="ytp-time-wrapper ytp-time-wrapper-delhi">
					<div class="ytp-time-contents">
						<span class="ytp-time-duration endsAtLabel"></span>
					</div>
				</span>
			</div>`
		const element = container.firstElementChild
		console.log(element)

		// toggle mode on click
		element.addEventListener("click", () => {
			mode = mode == "endsAt" ? "endsIn" : "endsAt"
			localStorage.setItem("yt-ends-at-mode", mode)
			updateLabel()
		})

		console.log(timeDisplay.parentNode.insertBefore(element, timeDisplay.nextSibling))
	}
}

function updateLabel() {
	const player = document.querySelector("#movie_player video")
	if (!player) return

	const endsAtLabel = document.querySelector("#movie_player .endsAtLabel")
	if (!endsAtLabel) return

	const endsAtContainer = document.querySelector("#movie_player .endsAtContainer")
	const liveIndicator = document.querySelector(".ytp-live.ytp-time-display")
	if (liveIndicator && endsAtContainer) {
		endsAtContainer.style.display = "none"
		return
	} else {
		endsAtContainer.style.display = ""
	}

	const { duration, playbackRate, currentTime } = player
	const remaining = (duration - currentTime) / playbackRate
	const endsAt = Date.now() + remaining * 1000

	switch (mode) {
		case "endsAt": {
			const formatter = new Intl.DateTimeFormat(undefined, { timeStyle: "short" })
			endsAtLabel.textContent = chrome.i18n.getMessage("endsAt", formatter.format(new Date(endsAt)))
			break
		}
		case "endsIn": {
			const formatter = new Intl.RelativeTimeFormat(undefined, { numeric: "auto" })

			let scale = "seconds",
				n = remaining
			if (remaining > 24 * 60 * 60) {
				scale = "days"
				n = remaining / (24 * 60 * 60)
			} else if (remaining > 60 * 60) {
				scale = "hours"
				n = remaining / (60 * 60)
			} else if (remaining > 60) {
				scale = "minutes"
				n = remaining / 60
			}

			endsAtLabel.textContent = chrome.i18n.getMessage("endsIn", formatter.format(n.toPrecision(2), scale))
			break
		}
	}
}

setInterval(function () {
	if (!location.pathname.startsWith("/watch")) return
	ensureElementsExist()
	updateLabel()
}, 1000)
