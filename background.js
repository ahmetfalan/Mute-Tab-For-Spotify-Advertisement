function refreshData()
{
	x = 1;
	chrome.windows.getAll({populate:true}, getAllOpenWindows);
	function getAllOpenWindows(winData) {
	var tabs = [];
	for (var i in winData) {
		var getTabid;
			var winTabs = winData[i].tabs;
			var totTabs = winTabs.length;
			var muteControl = true;
			for (var j=0; j<totTabs;j++) {
				if(winTabs[j].url.indexOf("https://open.spotify.com") == 0)
				{
					getTabid = winTabs[j].id;
					if(winTabs[j].title.indexOf('Advertisement') == 0 || winTabs[j].title.indexOf('Spotify') == 0)
					{
						chrome.tabs.update(getTabid, {"muted": true}, function () {});
					}
					else
					{
						chrome.tabs.update(getTabid, {"muted": false}, function () {});
					}
				}
			}
		}
	}
    setTimeout(refreshData, x*1000);
}
refreshData();