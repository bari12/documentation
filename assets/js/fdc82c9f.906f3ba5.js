(window.webpackJsonp=window.webpackJsonp||[]).push([[285],{358:function(e,t,n){"use strict";n.r(t),n.d(t,"frontMatter",(function(){return l})),n.d(t,"metadata",(function(){return s})),n.d(t,"toc",(function(){return u})),n.d(t,"default",(function(){return p}));var o=n(3),r=n(7),i=(n(0),n(364)),a=["components"],l={id:"configure-rucio-globus",title:"Configure Rucio To Use Globus Online as a Transfer Tool",sidebar_label:"Configure Rucio To Use Globus Online as a Transfer Tool"},s={unversionedId:"configure-rucio-globus",id:"configure-rucio-globus",isDocsHomePage:!1,title:"Configure Rucio To Use Globus Online as a Transfer Tool",description:"This document walks through an example configuration of Rucio to use Globus Online as a transfer tool. There are four configuration points shown here: registration of your application with Globus, RSE setup (properties and parameters), the Rucio configuration file rucio.cfg and the Globus configuration file config.yml.",source:"@site/../docs/configure_globus_transfertool.md",sourceDirName:".",slug:"/configure-rucio-globus",permalink:"/documentation/configure-rucio-globus",editUrl:"https://github.com/rucio/documentation/tree/main/docs/../docs/configure_globus_transfertool.md",version:"current",lastUpdatedBy:"Martin Barisits",lastUpdatedAt:1636448837,formattedLastUpdatedAt:"11/9/2021",sidebar_label:"Configure Rucio To Use Globus Online as a Transfer Tool",frontMatter:{id:"configure-rucio-globus",title:"Configure Rucio To Use Globus Online as a Transfer Tool",sidebar_label:"Configure Rucio To Use Globus Online as a Transfer Tool"},sidebar:"docs",previous:{title:"Database Operations",permalink:"/documentation/database"},next:{title:"Contributing Guide",permalink:"/documentation/contributing"}},u=[{value:"Register Application with Globus",id:"register-application-with-globus",children:[]},{value:"RSE Setup",id:"rse-setup",children:[]},{value:"Rucio Configuration File",id:"rucio-configuration-file",children:[]},{value:"Globus Configuration File",id:"globus-configuration-file",children:[]}],c={toc:u};function p(e){var t=e.components,n=Object(r.a)(e,a);return Object(i.b)("wrapper",Object(o.a)({},c,n,{components:t,mdxType:"MDXLayout"}),Object(i.b)("p",null,"This document walks through an example configuration of Rucio to use Globus Online as a transfer tool. There are four configuration points shown here: registration of your application with Globus, RSE setup (properties and parameters), the Rucio configuration file rucio.cfg and the Globus configuration file config.yml."),Object(i.b)("p",null,"Use of both Globus Server endpoints and Globus Personal endpoints has been tested with the below approach. Creation of the Globus endpoints is outside the scope here. Some knowledge of Rucio setup and familiarity with Globus configuration is presumed."),Object(i.b)("h2",{id:"register-application-with-globus"},"Register Application with Globus"),Object(i.b)("p",null,"Using Globus Online as a transfer tool requires ",Object(i.b)("a",{parentName:"p",href:"https://developers.globus.org"},"registering")," the client application with Globus Online. Be sure to select Native App and include a scope for urn:globus:auth:scope:transfer.api.globus.org:all. Once you have the Client ID you\u2019ll need to install the globus sdk and run the below Python code to obtain a refresh token."),Object(i.b)("p",null,"There is a ",Object(i.b)("a",{parentName:"p",href:"https://globus-sdk-python.readthedocs.io/en/stable/tutorial/"},"helpful walk-through")," that goes into more detail around OAuth and token retrieval."),Object(i.b)("p",null,"Obtain a refresh token to access Globus resources:"),Object(i.b)("pre",null,Object(i.b)("code",{parentName:"pre",className:"language-py"},"# obtain authorization code\nimport globus_sdk\nCLIENT_ID = '' # your client ID obtained from registering application\nclient = globus_sdk.NativeAppAuthClient(CLIENT_ID)\nclient.oauth2_start_flow(refresh_tokens=True)\nclient.oauth2_get_authorize_url() # Use the URL returned here to obtain an authorization code\nAUTH_CODE = '' # Use the authorization code returned by authenticating to Globus Online\n\n# use the authorization code to create a refresh token\ntoken_response = client.oauth2_exchange_code_for_tokens(AUTH_CODE)\nrefresh_token = token_response.by_resource_server['transfer.api.globus.org']['refresh_token']\n")),Object(i.b)("h2",{id:"rse-setup"},"RSE Setup"),Object(i.b)("p",null,"Below shows a typical setup for a test RSE. Options for CLI given when supported."),Object(i.b)("p",null,"The following code will create a non-determinisic RSE."),Object(i.b)("p",null,"Python:"),Object(i.b)("pre",null,Object(i.b)("code",{parentName:"pre",className:"language-py"},"# set up the target non-deterministic rse (TEST_RSE)\nfrom rucio.client.rseclient import RSEClient\nrseclient = RSEClient()\nrse_name = 'TEST_RSE' # rse name MUST BE UPPER CASE\nrse_properties = {'ASN': 'ASN', 'availability': 7, 'deterministic': False, 'volatile': False, 'city': 'Upton', 'region_code': 'DE', 'country_name': 'US', 'continent': 'NA', 'time_zone': 'America/New_York', 'ISP': None, 'staging_area': False, 'rse_type': 'DISK', 'longitude': 40.868352, 'latitude': -72.878871}\nr = rseclient.add_rse(rse_name, **rse_properties) # r is true on success\n")),Object(i.b)("p",null,"CLI alternative: RSE creation not supported at time of writing of this document as there is no way to pass the properties."),Object(i.b)("p",null,"The following code creates a schema to connect to Globus for the RSE created above."),Object(i.b)("p",null,"Python:"),Object(i.b)("pre",null,Object(i.b)("code",{parentName:"pre",className:"language-py"},"from rucio.client.rseclient import RSEClient\nrseclient = RSEClient()\nrse_name = 'TEST_RSE' # rse name MUST BE UPPER CASE\n# Globus scheme\nprefix = '/~/scratch-space/' # Be sure to use a relative path for your endpoint\nparams = {'scheme': 'globus', 'prefix': prefix, 'impl': 'rucio.rse.protocols.globus.GlobusRSEProtocol', 'third_party_copy': 1, 'domains': {\"lan\": {\"read\": 1,\"write\": 1,\"delete\": 1},\"wan\": {\"read\": 1,\"write\": 1,\"delete\": 1}}}\np = rseclient.add_protocol(rse_name, params) # p is true on success\n")),Object(i.b)("p",null,"CLI alternative: (the hostname value is required for the CLI command but is arbitrary as it is ultimately not used in the scheme):"),Object(i.b)("pre",null,Object(i.b)("code",{parentName:"pre",className:"language-bash"},'> rucio-admin rse add-protocol --scheme \'globus\' --prefix \'/~/scratch-space\' --impl \'rucio.rse.protocols.globus.GlobusRSEProtocol\' --domain-json \'{"wan": {"read": 1, "write": 1, "third_party_copy": 1, "delete": 1}, "lan": {"read": 1, "write": 1, "third_party_copy": 1, "delete": 1}}\' --hostname \'globus_online\' TEST_RSE\n')),Object(i.b)("p",null,"The following code sets some attributes for the RSE."),Object(i.b)("p",null,"Python:"),Object(i.b)("pre",null,Object(i.b)("code",{parentName:"pre",className:"language-py"},"from rucio.client.rseclient import RSEClient\nrseclient = RSEClient()\nrse_name = 'TEST_RSE' # rse name MUST BE UPPER CASE\n\nresult = rseclient.add_rse_attribute(rse = rse_name, key = 'naming_convention', value = 'bnl') # This is the value for relative SURL\nresult = rseclient.add_rse_attribute(rse = rse_name, key = 'globus_endpoint_id', value = 'd6ae63d8-503f-11e9-a620-0a54e005f849')\nresult = rseclient.add_rse_attribute(rse = rse_name, key = 'istape', value = False)\n")),Object(i.b)("p",null,"CLI alternative:"),Object(i.b)("pre",null,Object(i.b)("code",{parentName:"pre",className:"language-bash"},"> rucio-admin rse set-attribute --rse TEST_RSE --key naming_convention --value bnl\n> rucio-admin rse set-attribute --rse TEST_RSE --key globus_endpoint_id --value d6ae63d8-503f-11e9-a620-0a54e005f849\n> rucio-admin rse set-attribute --rse TEST_RSE --key istape --value false\n")),Object(i.b)("h2",{id:"rucio-configuration-file"},"Rucio Configuration File"),Object(i.b)("p",null,"The Rucio configuration file rucio.cfg should contain the following for the conveyor mechanism. More schemes can be included but globus is required. You only need the file scheme if you plan on using the upload method for replicas. If the transfertype value is bulk Rucio will bundle many files into a transfer task. If single then each file will be submitted on individual transfer tasks.:"),Object(i.b)("pre",null,Object(i.b)("code",{parentName:"pre",className:"language-bash"},"[conveyor]\nscheme = file,globus\ntransfertool = globus\ntransfertype = bulk\nglobus_auth_app = MyGlobusAuthApp\n")),Object(i.b)("p",null,"globus_auth_app is the application given in config.yml (see below)"),Object(i.b)("h2",{id:"globus-configuration-file"},"Globus Configuration File"),Object(i.b)("p",null,"The Globus configuration file ./lib/rucio/transfertool/config.yml is a file of YAML syntax and should include at minimum the registered application name, the client ID and refresh token:"),Object(i.b)("pre",null,Object(i.b)("code",{parentName:"pre",className:"language-yml"},"globus:\n  apps:\n    RucioGlobusXferNativeApp:\n      client_id: a758...\n      refresh_token: Agjo...\n")))}p.isMDXComponent=!0},364:function(e,t,n){"use strict";n.d(t,"a",(function(){return p})),n.d(t,"b",(function(){return f}));var o=n(0),r=n.n(o);function i(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function a(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);t&&(o=o.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,o)}return n}function l(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?a(Object(n),!0).forEach((function(t){i(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):a(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function s(e,t){if(null==e)return{};var n,o,r=function(e,t){if(null==e)return{};var n,o,r={},i=Object.keys(e);for(o=0;o<i.length;o++)n=i[o],t.indexOf(n)>=0||(r[n]=e[n]);return r}(e,t);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);for(o=0;o<i.length;o++)n=i[o],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(r[n]=e[n])}return r}var u=r.a.createContext({}),c=function(e){var t=r.a.useContext(u),n=t;return e&&(n="function"==typeof e?e(t):l(l({},t),e)),n},p=function(e){var t=c(e.components);return r.a.createElement(u.Provider,{value:t},e.children)},b={inlineCode:"code",wrapper:function(e){var t=e.children;return r.a.createElement(r.a.Fragment,{},t)}},d=r.a.forwardRef((function(e,t){var n=e.components,o=e.mdxType,i=e.originalType,a=e.parentName,u=s(e,["components","mdxType","originalType","parentName"]),p=c(n),d=o,f=p["".concat(a,".").concat(d)]||p[d]||b[d]||i;return n?r.a.createElement(f,l(l({ref:t},u),{},{components:n})):r.a.createElement(f,l({ref:t},u))}));function f(e,t){var n=arguments,o=t&&t.mdxType;if("string"==typeof e||o){var i=n.length,a=new Array(i);a[0]=d;var l={};for(var s in t)hasOwnProperty.call(t,s)&&(l[s]=t[s]);l.originalType=e,l.mdxType="string"==typeof e?e:o,a[1]=l;for(var u=2;u<i;u++)a[u]=n[u];return r.a.createElement.apply(null,a)}return r.a.createElement.apply(null,n)}d.displayName="MDXCreateElement"}}]);