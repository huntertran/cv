(function(t){function e(e){for(var n,o,s=e[0],l=e[1],c=e[2],v=0,p=[];v<s.length;v++)o=s[v],Object.prototype.hasOwnProperty.call(r,o)&&r[o]&&p.push(r[o][0]),r[o]=0;for(n in l)Object.prototype.hasOwnProperty.call(l,n)&&(t[n]=l[n]);u&&u(e);while(p.length)p.shift()();return i.push.apply(i,c||[]),a()}function a(){for(var t,e=0;e<i.length;e++){for(var a=i[e],n=!0,s=1;s<a.length;s++){var l=a[s];0!==r[l]&&(n=!1)}n&&(i.splice(e--,1),t=o(o.s=a[0]))}return t}var n={},r={app:0},i=[];function o(e){if(n[e])return n[e].exports;var a=n[e]={i:e,l:!1,exports:{}};return t[e].call(a.exports,a,a.exports,o),a.l=!0,a.exports}o.m=t,o.c=n,o.d=function(t,e,a){o.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:a})},o.r=function(t){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},o.t=function(t,e){if(1&e&&(t=o(t)),8&e)return t;if(4&e&&"object"===typeof t&&t&&t.__esModule)return t;var a=Object.create(null);if(o.r(a),Object.defineProperty(a,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var n in t)o.d(a,n,function(e){return t[e]}.bind(null,n));return a},o.n=function(t){var e=t&&t.__esModule?function(){return t["default"]}:function(){return t};return o.d(e,"a",e),e},o.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},o.p="/cv/";var s=window["webpackJsonp"]=window["webpackJsonp"]||[],l=s.push.bind(s);s.push=e,s=s.slice();for(var c=0;c<s.length;c++)e(s[c]);var u=l;i.push([0,"chunk-vendors"]),a()})({0:function(t,e,a){t.exports=a("56d7")},"56d7":function(t,e,a){"use strict";a.r(e);a("e260"),a("e6cf"),a("cca6"),a("a79d");var n=a("a026"),r=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("v-app",{attrs:{id:"inspire"}},[n("v-navigation-drawer",{attrs:{app:"",clipped:""},model:{value:t.drawer,callback:function(e){t.drawer=e},expression:"drawer"}},[n("v-list",t._l(t.menus,(function(e){return n("v-list-item",{key:e.name,attrs:{link:"",to:e.url}},[n("v-list-item-action",[n("v-icon",[t._v(t._s(e.icon))])],1),n("v-list-item-content",[n("v-list-item-title",{staticClass:"text-uppercase"},[t._v(t._s(e.name))])],1)],1)})),1)],1),n("v-app-bar",{attrs:{app:"","clipped-left":""}},[n("v-avatar",[n("img",{attrs:{src:a("915e")}})]),n("v-toolbar-title",[t._v("Van Tuan Tran")])],1),n("v-content",[n("v-container",{staticClass:"fill-height",attrs:{fluid:""}},[n("router-view")],1)],1),n("v-footer",{attrs:{app:""}},[n("span",[t._v("hunter.tran © 2019")])])],1)},i=[],o={props:{source:String},data:function(){return{drawer:null,menus:[{name:"cv",url:"/cv",icon:"mdi-file-document-box-multiple-outline"},{name:"blog",url:"blog",icon:"mdi-web"}]}},created:function(){this.$vuetify.theme.dark=!0}},s=o,l=a("2877"),c=a("6544"),u=a.n(c),v=a("7496"),p=a("40dc"),f=a("8212"),m=a("a523"),d=a("a75b"),_=a("553a"),b=a("132d"),h=a("8860"),g=a("da13"),V=a("1800"),w=a("5d23"),y=a("f774"),x=a("2a7f"),C=Object(l["a"])(s,r,i,!1,null,null,null),j=C.exports;u()(C,{VApp:v["a"],VAppBar:p["a"],VAvatar:f["a"],VContainer:m["a"],VContent:d["a"],VFooter:_["a"],VIcon:b["a"],VList:h["a"],VListItem:g["a"],VListItemAction:V["a"],VListItemContent:w["a"],VListItemTitle:w["c"],VNavigationDrawer:y["a"],VToolbarTitle:x["a"]});var O=a("bc3a"),I=a.n(O),L=a("8c4f"),T=function(){var t=this,e=t.$createElement;t._self._c;return t._m(0)},E=[function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"iframe_container"},[a("iframe",{staticClass:"stretched_iframe",attrs:{src:"https://coding4food.net"}})])}],k={name:"blog"},S=k,$=(a("8a77"),Object(l["a"])(S,T,E,!1,null,"3769ec12",null)),P=$.exports,A=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("v-container",[a("v-row",{attrs:{align:"stretch"}},[a("v-col",{attrs:{align:"stretch"}},[a("h2",[t._v(t._s(t.cv.name))]),a("p",[t._v(t._s(t.cv.bio))])])],1),a("Experience",{attrs:{data:t.cv.education,title:"Education"}}),a("Experience",{attrs:{data:t.cv.experience,title:"Experience"}})],1)},M=[],R=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("v-container",[a("v-row",[a("h3",[t._v(t._s(t.title))])]),a("v-row",{attrs:{align:"stretch"}},[a("v-col",{attrs:{align:"stretch"}},[a("v-timeline",{attrs:{dense:!0}},t._l(t.data,(function(e){return a("v-timeline-item",{key:e.name,attrs:{right:"",dense:!0,small:""}},[a("span",{attrs:{slot:"opposite"},slot:"opposite"},[t._v(t._s(e.to)+" - "+t._s(e.from))]),a("v-card",{staticClass:"elevation-2"},[a("v-list-item",{attrs:{"three-line":""}},[a("v-list-item-content",[a("div",{staticClass:"overline mb-4"},[t._v(t._s(e.to)+" - "+t._s(e.from))]),a("v-list-item-title",{staticClass:"headline mb-1"},[t._v(t._s(e.title))]),a("v-list-item-subtitle",[t._v(t._s(e.name))]),a("v-list-item-subtitle",[t._v(t._s(e.location))]),a("v-list-item-content",{staticClass:"line-break"},[t._v(t._s(e.description))])],1),a("v-list-item-avatar",{attrs:{tile:"",size:"80",color:"grey"}},[a("v-img",{attrs:{src:e.avatar}})],1)],1)],1)],1)})),1)],1)],1)],1)},J=[],z={props:{title:String,data:Array}},B=z,D=(a("f1e0"),a("b0af")),F=a("62ad"),N=a("adda"),U=a("8270"),q=a("0fd9"),G=a("8414"),H=a("1e06"),K=Object(l["a"])(B,R,J,!1,null,"0a412350",null),Q=K.exports;u()(K,{VCard:D["a"],VCol:F["a"],VContainer:m["a"],VImg:N["a"],VListItem:g["a"],VListItemAvatar:U["a"],VListItemContent:w["a"],VListItemSubtitle:w["b"],VListItemTitle:w["c"],VRow:q["a"],VTimeline:G["a"],VTimelineItem:H["a"]});var W={name:"cv",components:{Experience:Q},data:function(){return{cv:{name:"",bio:"",experience:[],education:[]}}},mounted:function(){this.getCv()},methods:{getCv:function(){var t=this;I.a.get("/data/cv.json").then((function(e){t.cv=e.data}))}}},X=W,Y=Object(l["a"])(X,A,M,!1,null,null,null),Z=Y.exports;u()(Y,{VCol:F["a"],VContainer:m["a"],VRow:q["a"]}),n["a"].use(L["a"]);var tt=[{path:"/blog",component:P},{path:"/cv",component:Z}],et=new L["a"]({routes:tt}),at=et,nt=a("f309");n["a"].use(nt["a"]);var rt=new nt["a"]({});n["a"].config.productionTip=!1,I.a.defaults.baseURL="/cv/",n["a"].prototype.$http=I.a,new n["a"]({router:at,vuetify:rt,render:function(t){return t(j)}}).$mount("#app")},"6f57":function(t,e,a){},"8a77":function(t,e,a){"use strict";var n=a("8e35"),r=a.n(n);r.a},"8e35":function(t,e,a){},"915e":function(t,e,a){t.exports=a.p+"img/avatar.f2812237.jpg"},f1e0:function(t,e,a){"use strict";var n=a("6f57"),r=a.n(n);r.a}});
//# sourceMappingURL=app.cf8afb57.js.map