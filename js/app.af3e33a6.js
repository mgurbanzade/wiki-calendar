(function(t){function e(e){for(var a,o,i=e[0],s=e[1],u=e[2],l=0,f=[];l<i.length;l++)o=i[l],r[o]&&f.push(r[o][0]),r[o]=0;for(a in s)Object.prototype.hasOwnProperty.call(s,a)&&(t[a]=s[a]);d&&d(e);while(f.length)f.shift()();return c.push.apply(c,u||[]),n()}function n(){for(var t,e=0;e<c.length;e++){for(var n=c[e],a=!0,i=1;i<n.length;i++){var s=n[i];0!==r[s]&&(a=!1)}a&&(c.splice(e--,1),t=o(o.s=n[0]))}return t}var a={},r={app:0},c=[];function o(e){if(a[e])return a[e].exports;var n=a[e]={i:e,l:!1,exports:{}};return t[e].call(n.exports,n,n.exports,o),n.l=!0,n.exports}o.m=t,o.c=a,o.d=function(t,e,n){o.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:n})},o.r=function(t){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},o.t=function(t,e){if(1&e&&(t=o(t)),8&e)return t;if(4&e&&"object"===typeof t&&t&&t.__esModule)return t;var n=Object.create(null);if(o.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var a in t)o.d(n,a,function(e){return t[e]}.bind(null,a));return n},o.n=function(t){var e=t&&t.__esModule?function(){return t["default"]}:function(){return t};return o.d(e,"a",e),e},o.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},o.p="/wiki-calendar/";var i=window["webpackJsonp"]=window["webpackJsonp"]||[],s=i.push.bind(i);i.push=e,i=i.slice();for(var u=0;u<i.length;u++)e(i[u]);var d=s;c.push([0,"chunk-vendors"]),n()})({0:function(t,e,n){t.exports=n("56d7")},2856:function(t,e,n){},"56d7":function(t,e,n){"use strict";n.r(e);n("cadf"),n("551c"),n("097d");var a=n("2b0e"),r=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{style:{backgroundImage:t.bg},attrs:{id:"app"}},[n("div",{staticClass:"facts"},[n("transition",{attrs:{name:"fade",mode:"out-in"}},[n("div",{key:t.facts,staticClass:"fact"},[t._v(t._s(t.facts))])])],1),n("div",{staticClass:"days"},t._l(t.daysCount,function(e,a){return n("day",{key:a,attrs:{day:e,currentElement:t.currentElement,isLastDay:a+1===t.daysCount},on:{daySelected:t.handleSelectedDay}})})),n("current-time")],1)},c=[],o=n("bc3a"),i=n.n(o),s=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"day",class:{today:t.todayClass,selected:t.isSelected,last:t.isLastDay},on:{click:t.select}},[n("div",{staticClass:"date"},[t._v(t._s(t.day))])])},u=[],d=(n("c5f6"),{name:"Day",props:{day:Number,currentElement:Number,isLastDay:Boolean},data:function(){return{}},computed:{todayClass:function(){return this.day===(new Date).getDate()},isSelected:function(){return this.currentElement===this.day}},methods:{select:function(){return this.$emit("daySelected",this.day)}}}),l=d,f=(n("db44"),n("2877")),h=Object(f["a"])(l,s,u,!1,null,"bfa13514",null);h.options.__file="Day.vue";var v=h.exports,p=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"date-row",class:{february:1===(new Date).getMonth()}},[n("div",[t._v(t._s(t.showDate))]),n("div",[t._v(t._s(t.showTime))])])},m=[],g={name:"current-time",data:function(){return{showDate:this.date(),showTime:this.time()}},methods:{date:function(){var t=new Date,e=t.toLocaleString("en-us",{month:"long"}),n=t.getFullYear();return"".concat(e," ").concat(n)},time:function(){var t=this;setInterval(function(){var e=new Date,n=("0"+e.getHours()).slice(-2),a=("0"+e.getMinutes()).slice(-2),r=("0"+e.getSeconds()).slice(-2);t.showTime="".concat(n,":").concat(a,":").concat(r)},1e3)}}},y=g,b=(n("7dff"),Object(f["a"])(y,p,m,!1,null,null,null));b.options.__file="CurrentTime.vue";var w=b.exports,_={name:"app",data:function(){return{bg:"",facts:"Looking for facts...",interval:Object,receivedEvents:Array,currentEventIndex:0,currentElement:(new Date).getDate(),requestFailed:!1}},computed:{daysCount:function(){var t=new Date;return new Date(t.getFullYear(),t.getMonth()+1,0).getDate()}},methods:{handleSelectedDay:function(t){this.currentElement=t,this.getFacts(t),this.bg=this.generateGradient()},getFacts:function(t){var e=this,n=(new Date).getMonth()+1;this.requestFailed=!1,i.a.get("https://cors.io/?https://history.muffinlabs.com/date/".concat(n,"/").concat(t,"?.json")).then(function(t){var n=t.data.data.Events;e.receivedEvents=n.map(function(t){return t.text})}).catch(function(){e.facts="The server does not want to share its data :(",e.requestFailed=!0})},appendFact:function(){var t=this;this.facts=this.receivedEvents[this.currentEventIndex]||"Looking for facts...",setInterval(function(){t.facts=t.receivedEvents[t.currentEventIndex]||"Looking for facts...",t.currentEventIndex>=t.receivedEvents.length?t.currentEventIndex=0:t.currentEventIndex+=1},7e3)},random:function(){return Math.floor(255*Math.random())},generateGradient:function(){var t="rgb(".concat(this.random(),", ").concat(this.random(),", ").concat(this.random(),")"),e="rgb(".concat(this.random(),", ").concat(this.random(),", ").concat(this.random(),")");return"linear-gradient(to right, ".concat(t,", ").concat(e,")")}},watch:{receivedEvents:function(){this.currentEventIndex=0,this.requestFailed||(this.facts="Looking for facts...")}},components:{Day:v,CurrentTime:w},beforeMount:function(){this.bg=this.generateGradient(),this.getFacts((new Date).getDate())},mounted:function(){this.appendFact()}},D=_,E=(n("5c0b"),Object(f["a"])(D,r,c,!1,null,null,null));E.options.__file="App.vue";var x=E.exports;a["a"].config.productionTip=!1,new a["a"]({render:function(t){return t(x)}}).$mount("#app")},"5c0b":function(t,e,n){"use strict";var a=n("2856"),r=n.n(a);r.a},"7dff":function(t,e,n){"use strict";var a=n("97da"),r=n.n(a);r.a},"97da":function(t,e,n){},db44:function(t,e,n){"use strict";var a=n("ecd0"),r=n.n(a);r.a},ecd0:function(t,e,n){}});
//# sourceMappingURL=app.af3e33a6.js.map