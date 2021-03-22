setInterval(function () {
	const player = document.querySelector("video")
	if (!player) return

	const timeDisplay = document.querySelector(".ytp-time-display")
	if (!timeDisplay) return

	const finishesAtLabel = timeDisplay.querySelector("#finishesAtLabel")
	if (!finishesAtLabel) {
		const label = document.createElement("span")
		label.classList.add("ytp-time-duration")
		label.id = "finishesAtLabel"
		timeDisplay.appendChild(label)
		return
	}

	const { duration, playbackRate, currentTime } = player,
		remaining = (duration - currentTime) / playbackRate,
		finishesAt = new Date(Date.now() + remaining * 1000),
		formatter = new Intl.DateTimeFormat([], { timeStyle: "short", hour12: false })

	finishesAtLabel.innerHTML = `&nbsp;&nbsp;-&nbsp;&nbsp;Ends at ${formatter.format(finishesAt)}`
}, 1000)
