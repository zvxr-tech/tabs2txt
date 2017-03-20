/* Select the text and copy to clipboard, when that button is clicked */
document.querySelector('#copy-button').onclick = function(e) {		
		let textArea = document.querySelector('#popup-textarea');
		textArea.select();
		document.execCommand("Copy");
		//console.log('copied');
}


function onCreated(tab) {
  //console.log(`Created new tab: ${tab.id} with url ${tab.url} `)
}

function onError(error) {
  console.log(`tabs2txt error:open_tabs  ${error}`);
}

/* Open each newline delimited URI in the textarea as a new tab */
document.querySelector('#paste-button').onclick = function(e) {
	let urlArray = document.querySelector('#popup-textarea').value.split("\n");
	
	for (let url of urlArray) {
		let trimURL = url.trim();
		if (trimURL) {
			var creating = browser.tabs.create({
				url:trimURL,
				active:false
			});
			creating.then(null, onError);
		}
	}
	//console.log(urlArray);
}

/* Iterate over the tabs */
chrome.tabs.query({currentWindow:true},
	function queryCallback(tabs) {
		let txt = "";
		for (let tab of tabs) {
			if (tab && tab.url && tab.url.length > 0 && tab.url != "") 
				txt += tab.url + "\n";
		}
		txt = txt.slice(0, -1); // chop off the last record separator
		let textArea = document.querySelector('#popup-textarea');
		textArea.value = txt;
		textArea.selectionStart=0;
		textArea.selectionEnd=textArea.textLength;
		textArea.focus();
		//console.log(txt);
});
