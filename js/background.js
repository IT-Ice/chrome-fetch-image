const URL_RULE = ["<all_urls>"];
const BLOCK = ["blocking"];
const HOST = location.host;
const TARGET_HOST = ''
const bg = {
    imageArr: [],
    styleArr: [],
    scriptArr: [],
    imageFormate: function(url) {
        return url.split('?')[0];
    },
    beforeRequest: function(details) {
        const {type, url, initiator} = details;
        let arr  = [];
        let item = {type: type,purl: bg.imageFormate(url)};
        if (type === 'image') {
            arr = bg.imageArr;
        }else if (type === 'stylesheet') {
            arr = bg.styleArr;
        }else if (type === 'script') {
            arr = bg.scriptArr;
        }
        bg.distinct(item, arr);
    },
    distinct: function(obj, arr) {
        let tag = arr.find((value, index, arr) => {
            return value.purl === obj.purl;
        }) 
        !tag && arr.push(obj);
    }
}

function sendSource(type) {
    if (type === 'image') {
        return bg.imageArr;
    }else if (type === 'stylesheet') {
        return bg.styleArr;
    }else if (type === 'script') {
        return bg.scriptArr;
    }
}

function clearArr() {
    bg.imageArr = [];
    bg.styleArr = [];
    bg.scriptArr = [];
}

function downloadImage(type) {
    if (type === 'image') {
        bg.imageArr.forEach(item => {
            chrome.downloads.download({
                url: item.purl,
                conflictAction: 'uniquify',
                saveAs: false
            });
        });
    }
}

chrome.webRequest.onBeforeRequest.addListener(bg.beforeRequest, {urls: URL_RULE}, BLOCK);