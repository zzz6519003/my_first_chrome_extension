chrome.omnibox.onInputChanged.addListener(function(text, suggest) {
	suggest([
	{
		content: "color-divs", description: "Make everything red"
	}
		]);
});

chrome.omnibox.onInputEntered.addListener(function(text) {
	if (text == "color-divs") colorDivs();
});

chrome.extension.onMessage.addListener(function(request, sender, sendResponse) {
	switch(request.type) {
		case "color-divs":
			colorDivs();
			break;
	}
	return true;
});

chrome.extension.onConnect.addListener(function(port) {
	port.onMessage.addListener(function(message) {
		switch(port.name) {
			case "color-divs-port":
				colorDivs();
				break;
		}
	});
});

var colorDivs = function() {
	chrome.tabs.getSelected(null, function(tab) {
		chrome.tabs.sendMessage(tab.id, {
			type: "colors-div",
			color: "#F00"
		});
		chrome.browserAction.setBadgeText({
			text: "red!"
		});
	});
}