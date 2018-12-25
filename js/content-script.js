

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse)
{
    let result = '';
    if(request.action == 'getsource') {
        let source = performance.getEntries();
        result = classify(source);
        result = dispose(result);
    }
    sendResponse(result);
});

const imageFormate = function(url) {
    return url.split('?')[0];
}

const classify = function(obj) {
    let result = {
        imageArr:filter(obj, 'img'),
        styleArr:filter(obj, 'link'),
        scriptArr:filter(obj, 'script'),
    }
    return result;
}

const filter = function(arr, type) {
    return arr.filter(item => {
        return item.initiatorType && item.initiatorType === type;
    });
}

const dispose = function(res) {
    let result = {
        imageArr:[],
        styleArr:[],
        scriptArr:[],
    }
    res.imageArr.forEach(element => {
        let item = {
            type: element.initiatorType,
            purl: imageFormate(element.name)
        }
        result.imageArr.push(item);
    });
    res.styleArr.forEach(element => {
        let item = {
            type: element.initiatorType,
            pulr: element.name
        }
        result.styleArr.push(item);
    });
    res.scriptArr.forEach(element => {
        let item = {
            type: element.initiatorType,
            pulr: element.name
        }
        result.scriptArr.push(item);
    });
    return result;
}
