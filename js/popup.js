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
        this.imageArr = this.bgPage.sendSource('image');
        this.init();
        
    },
    methods: {
        init: function() {
            this.sourceList = this.imageArr;
        },
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
        clear: function() {
            this.imageArr = [];
            this.styleArr = [];
            this.scriptArr = [];
            this.sourceList = [];
            this.bgPage.clearArr();
        },
        download: function() {
            this.bgPage.downloadImage('image');
        }
    }
})
