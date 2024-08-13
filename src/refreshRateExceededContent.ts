// Function to handle when the target element is added or its text content changes
function handleNewAlertNode(node: Element) {
	if (node.classList && node.classList.contains('awsui-context-alert')) {
		// Check if the node's text content is "Rate exceeded"
		if (node.textContent?.includes('Rate exceeded')) {
			console.log(
				"Text 'Rate exceeded' detected in awsui-context-alert, refreshing the page."
			)
			location.reload()
		} else {
			// Create a MutationObserver to watch for text content changes in this node
			const textObserver = new MutationObserver((mutationsList) => {
				for (const mutation of mutationsList) {
					if (
						mutation.type === 'characterData' &&
						mutation.target.textContent?.includes('Rate exceeded')
					) {
						console.log(
							"Text 'Rate exceeded' detected in awsui-context-alert, refreshing the page."
						)
						location.reload()
					}
				}
			})

			// Start observing the node's text content for changes
			textObserver.observe(node, {
				characterData: true,
				subtree: true
			})
		}
	} else if (
		node.getAttribute &&
		node.getAttribute('data-testid') === 'execution-status'
	) {
		console.log('Loading successful')
	}
}

// Create a mutation observer to listen for new nodes added to the DOM
const observer = new MutationObserver((mutationsList: MutationRecord[]) => {
	for (const mutation of mutationsList) {
		if (mutation.type === 'childList') {
			mutation.addedNodes.forEach((node) => {
				if (node.nodeType === Node.ELEMENT_NODE) {
					if (
						(node as Element).classList &&
						(node as Element).classList.contains('awsui-context-alert')
					) {
						handleNewAlertNode(node as Element)
					} else if (
						(node as Element).getAttribute &&
						(node as Element).getAttribute('data-testid') === 'execution-status'
					) {
						handleNewAlertNode(node as Element)
					} else {
						// Check if the node contains the target element as a descendant;
						(node as Element)
							.querySelectorAll(
								'.awsui-context-alert, [data-testid="execution-status"]'
							)
							.forEach((element) => {
								handleNewAlertNode(element)
							})
					}
				}
			})
		}
	}
})

// Start observing the body for childList changes
observer.observe(document.body, {
	childList: true,
	subtree: true
})
