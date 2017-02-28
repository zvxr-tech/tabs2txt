/* This code file is executed each time the popup loads */


/* Select the text and copy to clipboard, when that button is clicked */
document.querySelector('#copy-button').onclick = function(e) {		
		let textArea = document.querySelector('#popup-textarea');
		textArea.select();
		document.execCommand("Copy");
		//console.log('copied');
}

/* Iterate over the tabs
 * works in Chrome && Firefox, others?
 */
var queryInfo = {};
chrome.tabs.query(queryInfo, 
	function queryCallback(tabs) {
		let txt = "";
		for (let tab of tabs) {
			if (tab && tab.url && tab.url.length > 0 && tab.url != "") 
				txt += tab.url + "\n";
		}
		txt = txt.slice(0, -1); // chop off the last record separator
		let textArea = document.querySelector('#popup-textarea');
		textArea.value = txt;
		textArea.select();
		//console.log(txt);
});

/* Set focus on the copy button */
document.querySelector('#copy-button').focus();
