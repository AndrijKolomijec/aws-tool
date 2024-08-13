// Clear the autoClickEnabled flag on page load
localStorage.removeItem('autoClickEnabled')

let autoClickEnabled = localStorage.getItem('autoClickEnabled') === 'true'

// Function to check and click the button
function checkAndClickButton() {
	const button: HTMLButtonElement | null = document.querySelector(
		'button[data-testid="loading-button"]'
	)
	if (button && !button.disabled) {
		button.click()
		console.log('Button clicked')
	}
}

// Set up a MutationObserver to monitor changes in the DOM
const observer = new MutationObserver((mutations) => {
	for (const mutation of mutations) {
		if (mutation.type === 'childList' || mutation.type === 'attributes') {
			checkAndClickButton()
		}
	}
})

// Function to start observing the document for changes
function startObserving() {
	observer.observe(document.body, {
		childList: true,
		attributes: true,
		subtree: true
	})
	console.log('Observer started')
}

// Event listener for button clicks to enable auto-click
document.addEventListener('click', (event) => {
	const button = (event.target as Element)?.closest(
		'button[data-testid="loading-button"]'
	)
	if (button && !autoClickEnabled) {
		localStorage.setItem('autoClickEnabled', 'true')
		autoClickEnabled = true
		startObserving()
		console.log('Auto-click enabled')
	}
})
