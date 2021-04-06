/** @type {"endsAt" | "endsIn"} */
let mode = "endsAt"

function ensureElementsExist() {
	const container = document.querySelector("#endsAtContainer")
	if (!container) {
		const timeDisplay = document.querySelector(".ytp-time-display")
		if (!timeDisplay) return

		const container = timeDisplay.cloneNode(false)
		container.id = "endsAtContainer"
		container.style.paddingLeft = 0
		container.style.cursor = "pointer"

		const separator = document.createElement("span")
		separator.textContent = "•"
		separator.classList.add("ytp-chapter-title-prefix")
		container.appendChild(separator)

		const label = document.createElement("span")
		label.id = "endsAtLabel"
		label.classList.add("ytp-time-duration")
		container.appendChild(label)

		// toggle mode on click
		container.addEventListener("click", () => {
			mode = mode == "endsAt" ? "endsIn" : "endsAt"
			updateLabel()
		})

		timeDisplay.parentNode.insertBefore(container, timeDisplay.nextSibling)
	}
}

function updateLabel() {
	const player = document.querySelector("video")
	if (!player) return

	const endsAtLabel = document.querySelector("#endsAtLabel")
	if (!endsAtLabel) return

	const { duration, playbackRate, currentTime } = player,
		remaining = (duration - currentTime) / playbackRate,
		endsAt = Date.now() + remaining * 1000

	switch (mode) {
		case "endsAt":
			{
				const formatter = new Intl.DateTimeFormat([], {
					timeStyle: "short",
					hour12: false,
				})
				endsAtLabel.textContent = chrome.i18n.getMessage("endsAt", formatter.format(new Date(endsAt)))
			}
			break
		case "endsIn":
			{
				const formatter = new Intl.RelativeTimeFormat([], { numeric: "auto" })

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
			}
			break
	}
}

setInterval(function () {
	ensureElementsExist()
	updateLabel()
}, 1000)
