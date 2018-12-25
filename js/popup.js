var app = new Vue({
    el: '#app',
    data: {
        sourceList: [],
        selectedId: 0,
        left: '0px',
        tabs:[{id:0, text: "图片资源"}, {id:1, text: "样式表资源"}, {id:2, text: "脚本资源"}],
        imageArr:[],
        styleArr:[],
        scriptArr:[],
        bgPage: chrome.extension.getBackgroundPage()
    },
    created(){
         this.sendMessageToContentScript({action:'getsource'},this.response);
    },
    methods: {
        tabsTapHandle: function(obj) {
            this.selectedId = obj.id;
            this.left = `${obj.id * 140}px`;
            if (this.selectedId === 0) {
                this.sourceList = this.imageArr;
            }else if (this.selectedId === 1) {
                this.sourceList = this.styleArr;
            }else if (this.selectedId === 2) {
                this.sourceList = this.scriptArr;
            }
        },
        download: function() {
            this.bgPage.downloadImage(this.sourceList);
        },
        sendMessageToContentScript(message, callback){
            chrome.tabs.query({active: true, currentWindow: true}, function(tabs)
            {
                chrome.tabs.sendMessage(tabs[0].id, message, function(response)
                {
                    if(callback) callback(response);
                });
            });
        },
        response: function(response) {
            this.imageArr = response.imageArr;
            this.styleArr = response.styleArr;
            this.scriptArr = response.scriptArr;
            this.sourceList = this.imageArr;
        }
    }
})