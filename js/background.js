
function downloadImage(arr) {
    arr.forEach(item => {
        chrome.downloads.download({
            url: item.purl,
            conflictAction: 'uniquify',
            saveAs: false
        });
    });
}
