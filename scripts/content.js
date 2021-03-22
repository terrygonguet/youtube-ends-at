setInterval(function () {
	const player = document.querySelector("video")
	if (!player) return

	const container = document.querySelector("#endsAtContainer")
	if (!container) {
		const timeDisplay = document.querySelector(".ytp-time-display")
		if (!timeDisplay) return

		const container = timeDisplay.cloneNode(false)
		container.id = "endsAtContainer"
		container.style.paddingLeft = 0

		const separator = document.createElement("span")
		separator.textContent = "•"
		separator.classList.add("ytp-chapter-title-prefix")
		container.appendChild(separator)

		const label = document.createElement("span")
		label.id = "endsAtLabel"
		label.classList.add("ytp-time-duration")
		container.appendChild(label)

		timeDisplay.parentNode.insertBefore(container, timeDisplay.nextSibling)
		return
	}

	const endsAtLabel = container.querySelector("#endsAtLabel")
	if (!endsAtLabel) return

	const { duration, playbackRate, currentTime } = player,
		remaining = (duration - currentTime) / playbackRate,
		endsAt = new Date(Date.now() + remaining * 1000),
		formatter = new Intl.DateTimeFormat([], {
			timeStyle: "short",
			hour12: false,
		})

	endsAtLabel.textContent = `Ends at ${formatter.format(endsAt)}`
}, 1000)
