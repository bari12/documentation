(window.webpackJsonp=window.webpackJsonp||[]).push([[51],{122:function(e,t,r){"use strict";r.r(t),r.d(t,"frontMatter",(function(){return c})),r.d(t,"metadata",(function(){return s})),r.d(t,"toc",(function(){return u})),r.d(t,"default",(function(){return b}));var n=r(3),i=r(7),a=(r(0),r(364)),o=["components"],c={title:"1.25.1",sidebar_label:"1.25.1"},s={unversionedId:"release-notes/1.25.1",id:"release-notes/1.25.1",isDocsHomePage:!1,title:"1.25.1",description:"General",source:"@site/../docs/release-notes/1.25.1.md",sourceDirName:"release-notes",slug:"/release-notes/1.25.1",permalink:"/documentation/release-notes/1.25.1",editUrl:"https://github.com/rucio/documentation/tree/main/docs/../docs/release-notes/1.25.1.md",version:"current",lastUpdatedBy:"Martin Barisits",lastUpdatedAt:1636448837,formattedLastUpdatedAt:"11/9/2021",sidebar_label:"1.25.1",frontMatter:{title:"1.25.1",sidebar_label:"1.25.1"}},u=[{value:"General",id:"general",children:[{value:"Enhancements",id:"enhancements",children:[]},{value:"Bugs",id:"bugs",children:[]}]},{value:"Clients",id:"clients",children:[{value:"Enhancements",id:"enhancements-1",children:[]}]}],l={toc:u};function b(e){var t=e.components,r=Object(i.a)(e,o);return Object(a.b)("wrapper",Object(n.a)({},l,r,{components:t,mdxType:"MDXLayout"}),Object(a.b)("h2",{id:"general"},"General"),Object(a.b)("h3",{id:"enhancements"},"Enhancements"),Object(a.b)("ul",null,Object(a.b)("li",{parentName:"ul"},"Clients: Add an option to export_data not to export distance ",Object(a.b)("a",{parentName:"li",href:"https://github.com/rucio/rucio/issues/4411"},"#4411")),Object(a.b)("li",{parentName:"ul"},"Consistency checks: The Dark Reaper should run continuously instead of exiting early when there\u2019s nothing to do ",Object(a.b)("a",{parentName:"li",href:"https://github.com/rucio/rucio/issues/4377"},"#4377")),Object(a.b)("li",{parentName:"ul"},"Documentation: Fix broken link in Readme ",Object(a.b)("a",{parentName:"li",href:"https://github.com/rucio/rucio/issues/4407"},"#4407")),Object(a.b)("li",{parentName:"ul"},"Rules: update_requests_priority() does not actually update the request priority in Rucio ",Object(a.b)("a",{parentName:"li",href:"https://github.com/rucio/rucio/issues/4320"},"#4320")),Object(a.b)("li",{parentName:"ul"},"Testing: Parallelise unit tests ",Object(a.b)("a",{parentName:"li",href:"https://github.com/rucio/rucio/issues/4134"},"#4134")),Object(a.b)("li",{parentName:"ul"},"Testing: Unregistered test markers ",Object(a.b)("a",{parentName:"li",href:"https://github.com/rucio/rucio/issues/4432"},"#4432"))),Object(a.b)("h3",{id:"bugs"},"Bugs"),Object(a.b)("ul",null,Object(a.b)("li",{parentName:"ul"},"Core & Internals: list-dids-extended with new metadata plugin currently fails ",Object(a.b)("a",{parentName:"li",href:"https://github.com/rucio/rucio/issues/4360"},"#4360")),Object(a.b)("li",{parentName:"ul"},"Testing: TestBinRucio.test_create_rule on master fails ",Object(a.b)("a",{parentName:"li",href:"https://github.com/rucio/rucio/issues/4438"},"#4438")),Object(a.b)("li",{parentName:"ul"},"Testing: Fix github workflow for py3 default Dockerfile ",Object(a.b)("a",{parentName:"li",href:"https://github.com/rucio/rucio/issues/4464"},"#4464"))),Object(a.b)("h2",{id:"clients"},"Clients"),Object(a.b)("h3",{id:"enhancements-1"},"Enhancements"),Object(a.b)("ul",null,Object(a.b)("li",{parentName:"ul"},"Clients: Base client should retry when receiving a 502 error ",Object(a.b)("a",{parentName:"li",href:"https://github.com/rucio/rucio/issues/4444"},"#4444"))))}b.isMDXComponent=!0},364:function(e,t,r){"use strict";r.d(t,"a",(function(){return b})),r.d(t,"b",(function(){return d}));var n=r(0),i=r.n(n);function a(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function o(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function c(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?o(Object(r),!0).forEach((function(t){a(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):o(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}function s(e,t){if(null==e)return{};var r,n,i=function(e,t){if(null==e)return{};var r,n,i={},a=Object.keys(e);for(n=0;n<a.length;n++)r=a[n],t.indexOf(r)>=0||(i[r]=e[r]);return i}(e,t);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);for(n=0;n<a.length;n++)r=a[n],t.indexOf(r)>=0||Object.prototype.propertyIsEnumerable.call(e,r)&&(i[r]=e[r])}return i}var u=i.a.createContext({}),l=function(e){var t=i.a.useContext(u),r=t;return e&&(r="function"==typeof e?e(t):c(c({},t),e)),r},b=function(e){var t=l(e.components);return i.a.createElement(u.Provider,{value:t},e.children)},p={inlineCode:"code",wrapper:function(e){var t=e.children;return i.a.createElement(i.a.Fragment,{},t)}},m=i.a.forwardRef((function(e,t){var r=e.components,n=e.mdxType,a=e.originalType,o=e.parentName,u=s(e,["components","mdxType","originalType","parentName"]),b=l(r),m=n,d=b["".concat(o,".").concat(m)]||b[m]||p[m]||a;return r?i.a.createElement(d,c(c({ref:t},u),{},{components:r})):i.a.createElement(d,c({ref:t},u))}));function d(e,t){var r=arguments,n=t&&t.mdxType;if("string"==typeof e||n){var a=r.length,o=new Array(a);o[0]=m;var c={};for(var s in t)hasOwnProperty.call(t,s)&&(c[s]=t[s]);c.originalType=e,c.mdxType="string"==typeof e?e:n,o[1]=c;for(var u=2;u<a;u++)o[u]=r[u];return i.a.createElement.apply(null,o)}return i.a.createElement.apply(null,r)}m.displayName="MDXCreateElement"}}]);