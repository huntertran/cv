(function(t){function e(e){for(var n,s,o=e[0],c=e[1],l=e[2],v=0,p=[];v<o.length;v++)s=o[v],Object.prototype.hasOwnProperty.call(r,s)&&r[s]&&p.push(r[s][0]),r[s]=0;for(n in c)Object.prototype.hasOwnProperty.call(c,n)&&(t[n]=c[n]);u&&u(e);while(p.length)p.shift()();return i.push.apply(i,l||[]),a()}function a(){for(var t,e=0;e<i.length;e++){for(var a=i[e],n=!0,o=1;o<a.length;o++){var c=a[o];0!==r[c]&&(n=!1)}n&&(i.splice(e--,1),t=s(s.s=a[0]))}return t}var n={},r={app:0},i=[];function s(e){if(n[e])return n[e].exports;var a=n[e]={i:e,l:!1,exports:{}};return t[e].call(a.exports,a,a.exports,s),a.l=!0,a.exports}s.m=t,s.c=n,s.d=function(t,e,a){s.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:a})},s.r=function(t){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},s.t=function(t,e){if(1&e&&(t=s(t)),8&e)return t;if(4&e&&"object"===typeof t&&t&&t.__esModule)return t;var a=Object.create(null);if(s.r(a),Object.defineProperty(a,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var n in t)s.d(a,n,function(e){return t[e]}.bind(null,n));return a},s.n=function(t){var e=t&&t.__esModule?function(){return t["default"]}:function(){return t};return s.d(e,"a",e),e},s.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},s.p="/cv/";var o=window["webpackJsonp"]=window["webpackJsonp"]||[],c=o.push.bind(o);o.push=e,o=o.slice();for(var l=0;l<o.length;l++)e(o[l]);var u=c;i.push([0,"chunk-vendors"]),a()})({0:function(t,e,a){t.exports=a("56d7")},"111c":function(t,e,a){},"3cb1":function(t,e,a){"use strict";var n=a("94b1"),r=a.n(n);r.a},"51ff":function(t,e,a){},"56d7":function(t,e,a){"use strict";a.r(e);a("e260"),a("e6cf"),a("cca6"),a("a79d");var n=a("a026"),r=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("v-app",{attrs:{id:"inspire"}},[n("v-navigation-drawer",{attrs:{app:"",clipped:""},model:{value:t.drawer,callback:function(e){t.drawer=e},expression:"drawer"}},[n("v-list",t._l(t.menus,(function(e){return n("v-list-item",{key:e.name,attrs:{link:"",to:e.url}},[n("v-list-item-action",[n("v-icon",[t._v(t._s(e.icon))])],1),n("v-list-item-content",[n("v-list-item-title",{staticClass:"text-uppercase"},[t._v(t._s(e.name))])],1),n("v-list-item-avatar",[e.count>0?n("v-chip",[t._v(t._s(e.count))]):t._e()],1)],1)})),1)],1),n("v-app-bar",{attrs:{app:"","clipped-left":""}},[n("v-app-bar-nav-icon",{on:{click:function(e){e.stopPropagation(),t.drawer=!t.drawer}}}),n("v-toolbar-title",[t._v("Van Tuan Tran")]),n("v-spacer"),n("v-avatar",{attrs:{right:""}},[n("img",{attrs:{src:a("915e")}})])],1),n("v-content",[n("v-container",{staticClass:"fill-height",attrs:{fluid:""}},[n("router-view")],1)],1),n("v-footer",{attrs:{app:""}},[n("span",[t._v("hunter.tran © 2019")])])],1)},i=[],s=(a("4160"),a("b0c0"),a("159b"),a("bc3a")),o=a.n(s),c={props:{source:String},data:function(){return{drawer:null,menus:[{name:"cv",url:"/cv",icon:"mdi-file-document-box-multiple-outline",count:0},{name:"awards",url:"/awards",icon:"mdi-seal-variant",count:0},{name:"researches",url:"/researches",icon:"mdi-school-outline",count:0},{name:"projects",url:"/projects",icon:"mdi-briefcase-outline",count:0},{name:"blog",url:"blog",icon:"mdi-web",count:0}],cv:{}}},created:function(){this.$vuetify.theme.dark=!0},mounted:function(){this.getCount(),this.getProjectCount()},methods:{getCount:function(){var t=this;o.a.get("/data/cv.json").then((function(e){t.cv=e.data,t.menus.forEach((function(e){void 0!==t.cv[e.name]&&(e.count=t.cv[e.name].length)}))}))},getProjectCount:function(){var t=this;o.a.get("/data/projects.json").then((function(e){t.menus.forEach((function(t){"projects"===t.name&&(t.count=e.data.projects.length)}))}))}}},l=c,u=(a("5c0b"),a("2877")),v=a("6544"),p=a.n(v),d=a("7496"),f=a("40dc"),m=a("5bc1"),h=a("8212"),_=a("cc20"),g=a("a523"),b=a("a75b"),C=a("553a"),V=a("132d"),y=a("8860"),x=a("da13"),w=a("1800"),j=a("8270"),E=a("5d23"),k=a("f774"),S=a("2fa4"),O=a("2a7f"),I=Object(u["a"])(l,r,i,!1,null,null,null),P=I.exports;p()(I,{VApp:d["a"],VAppBar:f["a"],VAppBarNavIcon:m["a"],VAvatar:h["a"],VChip:_["a"],VContainer:g["a"],VContent:b["a"],VFooter:C["a"],VIcon:V["a"],VList:y["a"],VListItem:x["a"],VListItemAction:w["a"],VListItemAvatar:j["a"],VListItemContent:E["a"],VListItemTitle:E["c"],VNavigationDrawer:k["a"],VSpacer:S["a"],VToolbarTitle:O["a"]});var A=a("8c4f"),L=function(){var t=this,e=t.$createElement;t._self._c;return t._m(0)},$=[function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"iframe_container"},[a("iframe",{staticClass:"stretched_iframe",attrs:{src:"https://coding4food.net"}})])}],T={name:"blog"},D=T,R=(a("8a77"),Object(u["a"])(D,L,$,!1,null,"3769ec12",null)),M=R.exports,z=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("v-container",{staticClass:"fill-height",attrs:{fluid:""}},[a("v-row",{staticClass:"fill-height",attrs:{"align-content":"start"}},[a("v-expansion-panels",{attrs:{accordion:"",multiple:""}},[t._l(t.awards,(function(e){return a("v-expansion-panel",{key:e.title},[a("v-expansion-panel-header",[t._v(t._s(e.time)+" - "+t._s(e.title))]),a("v-expansion-panel-content",[a("v-subheader",[t._v(t._s(e.org))]),a("v-subheader",{staticClass:"line-break"},[t._v(t._s(e.description))])],1)],1)})),a("v-divider")],2)],1)],1)},B=[],U={data:function(){return{awards:[]}},mounted:function(){this.getCv()},methods:{getCv:function(){var t=this;o.a.get("/data/cv.json").then((function(e){t.awards=e.data.awards}))}}},H=U,J=a("ce7e"),N=a("cd55"),F=a("49e2"),q=a("c865"),G=a("0393"),K=a("0fd9"),Q=a("e0c7"),W=Object(u["a"])(H,z,B,!1,null,null,null),X=W.exports;p()(W,{VContainer:g["a"],VDivider:J["a"],VExpansionPanel:N["a"],VExpansionPanelContent:F["a"],VExpansionPanelHeader:q["a"],VExpansionPanels:G["a"],VRow:K["a"],VSubheader:Q["a"]});var Y=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("v-container",[a("v-row",{attrs:{align:"stretch"}},[a("v-col",{attrs:{align:"stretch"}},[a("h2",[t._v(t._s(t.cv.name))]),a("p",[t._v(t._s(t.cv.bio))])])],1),a("Experience",{attrs:{data:t.cv.education,title:"Education"}}),a("Experience",{attrs:{data:t.cv.experience,title:"Experience"}}),a("Experience",{attrs:{data:t.cv.volunteer,title:"Volunteer Experience"}})],1)},Z=[],tt=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("v-container",[a("v-row",[a("h3",[t._v(t._s(t.title))])]),t.$vuetify.breakpoint.smAndUp?a("v-row",{attrs:{align:"stretch"}},[a("v-col",{attrs:{align:"stretch"}},[a("v-timeline",{attrs:{dense:""}},t._l(t.data,(function(t){return a("v-timeline-item",{key:t.name,attrs:{right:"",small:""}},[a("ExperienceItem",{attrs:{company:t}})],1)})),1)],1)],1):a("v-row",{attrs:{align:"start",justify:"start"}},t._l(t.data,(function(t){return a("ExperienceItem",{key:t.name,staticClass:"separated-margin",attrs:{company:t}})})),1)],1)},et=[],at=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("v-card",{staticClass:"elevation-2"},[a("v-list-item",{attrs:{"three-line":""}},[a("v-list-item-content",[a("div",{staticClass:"overline mb-4"},[t._v(t._s(t.company.to)+" - "+t._s(t.company.from))]),a("v-list-item-title",{staticClass:"headline mb-1"},[t._v(t._s(t.company.title))]),a("v-list-item-subtitle",[t._v(t._s(t.company.name))]),a("v-list-item-subtitle",[t._v(t._s(t.company.location))]),a("v-list-item-content",{staticClass:"line-break"},[t._v(t._s(t.company.description))])],1),t.company.avatar?a("v-list-item-avatar",{attrs:{tile:"",size:t.imageSize,color:"grey"}},[a("v-img",{attrs:{src:t.company.avatar}})],1):t._e()],1)],1)},nt=[],rt={props:{company:{to:String,from:String,title:String,name:String,location:String,description:String,avatar:String}},computed:{imageSize:function(){return this.$vuetify.breakpoint.smAndUp?80:30}}},it=rt,st=a("b0af"),ot=a("adda"),ct=Object(u["a"])(it,at,nt,!1,null,null,null),lt=ct.exports;p()(ct,{VCard:st["a"],VImg:ot["a"],VListItem:x["a"],VListItemAvatar:j["a"],VListItemContent:E["a"],VListItemSubtitle:E["b"],VListItemTitle:E["c"]});var ut={components:{ExperienceItem:lt},props:{title:String,data:Array}},vt=ut,pt=(a("7be3"),a("62ad")),dt=a("8414"),ft=a("1e06"),mt=Object(u["a"])(vt,tt,et,!1,null,"633dd283",null),ht=mt.exports;p()(mt,{VCol:pt["a"],VContainer:g["a"],VRow:K["a"],VTimeline:dt["a"],VTimelineItem:ft["a"]});var _t={name:"cv",components:{Experience:ht},data:function(){return{cv:{name:"",bio:"",experience:[],education:[]}}},mounted:function(){this.getCv()},methods:{getCv:function(){var t=this;o.a.get("/data/cv.json").then((function(e){t.cv=e.data}))}}},gt=_t,bt=Object(u["a"])(gt,Y,Z,!1,null,null,null),Ct=bt.exports;p()(bt,{VCol:pt["a"],VContainer:g["a"],VRow:K["a"]});var Vt=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("v-container",{staticClass:"fill-height",attrs:{fluid:""}},[a("v-row",{staticClass:"fill-height",attrs:{align:"start",justify:"start"}},t._l(t.researches,(function(e){return a("v-card",{key:e.title,staticClass:"ma-3 pa-6"},[a("v-card-text",[a("div",[t._v(t._s(e.org))]),a("p",{staticClass:"title text--primary"},[t._v(t._s(e.title))]),a("div",{staticClass:"text--primary"},[t._v(t._s(e.abstract))])]),a("v-card-subtitle",t._l(e.authors,(function(e){return a("v-chip",{key:e.name,staticClass:"separated-chip",attrs:{pill:""}},[e.avatar?a("v-avatar",{attrs:{left:""}},[a("img",{attrs:{src:e.avatar}})]):a("v-icon",{attrs:{left:"",color:"red"}},[t._v("mdi-account")]),a("span",[t._v(t._s(e.name))])],1)})),1),a("v-card-actions",[a("v-btn",{attrs:{color:"green darken-4"}},[t._v("Learn More")])],1)],1)})),1)],1)},yt=[],xt={data:function(){return{researches:[]}},mounted:function(){this.getCv()},methods:{getCv:function(){var t=this;o.a.get("/data/cv.json").then((function(e){t.researches=e.data.researches}))}}},wt=xt,jt=(a("e646"),a("8336")),Et=a("99d9"),kt=Object(u["a"])(wt,Vt,yt,!1,null,"53cf0897",null),St=kt.exports;p()(kt,{VAvatar:h["a"],VBtn:jt["a"],VCard:st["a"],VCardActions:Et["a"],VCardSubtitle:Et["b"],VCardText:Et["c"],VChip:_["a"],VContainer:g["a"],VIcon:V["a"],VRow:K["a"]});var Ot=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("v-container",{staticClass:"fill-height",attrs:{fluid:""}},[a("v-row",{staticClass:"fill-height",attrs:{align:"start",justify:"start"}},t._l(t.details,(function(e){return a("v-card",{key:e.id,staticClass:"ma-4 pa-4"},[a("v-card-text",[a("div",[t._v("Last updated: "+t._s(t.getDateOnly(e.updated_at)))]),e.license?a("div",[t._v(t._s(e.license.name))]):t._e(),a("p",{staticClass:"title text--primary"},[t._v(t._s(e.name))]),a("div",{staticClass:"text--primary"},[t._v(t._s(e.description))])]),a("v-card-subtitle",[a("v-chip",{staticClass:"separated-chip",attrs:{color:"green","text-color":"white"}},[a("v-avatar",{staticClass:"green darken-4",attrs:{left:""}},[t._v(t._s(e.stargazers_count))]),t._v("stars ")],1),a("v-chip",{staticClass:"separated-chip",attrs:{color:"green","text-color":"white"}},[a("v-avatar",{staticClass:"green darken-4",attrs:{left:""}},[t._v(t._s(e.open_issues))]),t._v("open issues ")],1)],1),a("v-card-actions",[e.homepage?a("v-btn",{attrs:{color:"green darken-4",href:e.homepage,target:"_blank"}},[t._v("Home page")]):t._e(),a("v-btn",{attrs:{color:"green darken-4",href:e.clone_url,target:"_blank"}},[t._v("Source code")])],1)],1)})),1)],1)},It=[],Pt=(a("0d03"),{data:function(){return{projects:[],details:[]}},mounted:function(){this.getProjects()},methods:{getProjects:function(){var t=this;o.a.get("/data/projects.json").then((function(e){t.projects=e.data.projects,t.projects.forEach((function(e){t.getprojectDetails(e)}))}))},getprojectDetails:function(t){var e=this;o.a.get("https://api.github.com/repos/huntertran/"+t).then((function(t){e.details.push(t.data)}))},getDateOnly:function(t){var e=new Date(t);return e.toLocaleDateString("en-CA")}}}),At=Pt,Lt=(a("3cb1"),Object(u["a"])(At,Ot,It,!1,null,"e55bd284",null)),$t=Lt.exports;p()(Lt,{VAvatar:h["a"],VBtn:jt["a"],VCard:st["a"],VCardActions:Et["a"],VCardSubtitle:Et["b"],VCardText:Et["c"],VChip:_["a"],VContainer:g["a"],VRow:K["a"]}),n["a"].use(A["a"]);var Tt=[{path:"/blog",component:M},{path:"/awards",component:X},{path:"/researches",component:St},{path:"/projects",component:$t},{path:"/cv",component:Ct},{path:"/",component:Ct}],Dt=new A["a"]({routes:Tt}),Rt=Dt,Mt=a("f309");n["a"].use(Mt["a"]);var zt=new Mt["a"]({});n["a"].config.productionTip=!1,o.a.defaults.baseURL="/cv/",n["a"].prototype.$http=o.a,new n["a"]({router:Rt,vuetify:zt,render:function(t){return t(P)}}).$mount("#app")},"5c0b":function(t,e,a){"use strict";var n=a("91cd"),r=a.n(n);r.a},"7be3":function(t,e,a){"use strict";var n=a("111c"),r=a.n(n);r.a},"8a77":function(t,e,a){"use strict";var n=a("8e35"),r=a.n(n);r.a},"8e35":function(t,e,a){},"915e":function(t,e,a){t.exports=a.p+"img/avatar.f2812237.jpg"},"91cd":function(t,e,a){},"94b1":function(t,e,a){},e646:function(t,e,a){"use strict";var n=a("51ff"),r=a.n(n);r.a}});
//# sourceMappingURL=app.95723dc8.js.map