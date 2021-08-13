(window.webpackJsonp=window.webpackJsonp||[]).push([[5],{355:function(e,i,a){"use strict";a.d(i,"a",(function(){return _})),a.d(i,"b",(function(){return f}));var n=a(0),o=a.n(n);function s(e,i,a){return i in e?Object.defineProperty(e,i,{value:a,enumerable:!0,configurable:!0,writable:!0}):e[i]=a,e}function r(e,i){var a=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);i&&(n=n.filter((function(i){return Object.getOwnPropertyDescriptor(e,i).enumerable}))),a.push.apply(a,n)}return a}function c(e){for(var i=1;i<arguments.length;i++){var a=null!=arguments[i]?arguments[i]:{};i%2?r(Object(a),!0).forEach((function(i){s(e,i,a[i])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(a)):r(Object(a)).forEach((function(i){Object.defineProperty(e,i,Object.getOwnPropertyDescriptor(a,i))}))}return e}function t(e,i){if(null==e)return{};var a,n,o=function(e,i){if(null==e)return{};var a,n,o={},s=Object.keys(e);for(n=0;n<s.length;n++)a=s[n],i.indexOf(a)>=0||(o[a]=e[a]);return o}(e,i);if(Object.getOwnPropertySymbols){var s=Object.getOwnPropertySymbols(e);for(n=0;n<s.length;n++)a=s[n],i.indexOf(a)>=0||Object.prototype.propertyIsEnumerable.call(e,a)&&(o[a]=e[a])}return o}var l=o.a.createContext({}),u=function(e){var i=o.a.useContext(l),a=i;return e&&(a="function"==typeof e?e(i):c(c({},i),e)),a},_=function(e){var i=u(e.components);return o.a.createElement(l.Provider,{value:i},e.children)},d={inlineCode:"code",wrapper:function(e){var i=e.children;return o.a.createElement(o.a.Fragment,{},i)}},p=o.a.forwardRef((function(e,i){var a=e.components,n=e.mdxType,s=e.originalType,r=e.parentName,l=t(e,["components","mdxType","originalType","parentName"]),_=u(a),p=n,f=_["".concat(r,".").concat(p)]||_[p]||d[p]||s;return a?o.a.createElement(f,c(c({ref:i},l),{},{components:a})):o.a.createElement(f,c({ref:i},l))}));function f(e,i){var a=arguments,n=i&&i.mdxType;if("string"==typeof e||n){var s=a.length,r=new Array(s);r[0]=p;var c={};for(var t in i)hasOwnProperty.call(i,t)&&(c[t]=i[t]);c.originalType=e,c.mdxType="string"==typeof e?e:n,r[1]=c;for(var l=2;l<s;l++)r[l]=a[l];return o.a.createElement.apply(null,r)}return o.a.createElement.apply(null,a)}p.displayName="MDXCreateElement"},68:function(e,i,a){"use strict";a.r(i),a.d(i,"frontMatter",(function(){return c})),a.d(i,"metadata",(function(){return t})),a.d(i,"toc",(function(){return l})),a.d(i,"default",(function(){return _}));var n=a(3),o=a(7),s=(a(0),a(355)),r=["components"],c={title:"Running rucio-replica-recoverer"},t={unversionedId:"bin/rucio-replica-recoverer",id:"bin/rucio-replica-recoverer",isDocsHomePage:!1,title:"Running rucio-replica-recoverer",description:"`",source:"@site/../docs/bin/rucio-replica-recoverer.md",sourceDirName:"bin",slug:"/bin/rucio-replica-recoverer",permalink:"/documentation/bin/rucio-replica-recoverer",editUrl:"https://github.com/rucio/documentation/tree/main/docs/../docs/bin/rucio-replica-recoverer.md",version:"current",frontMatter:{title:"Running rucio-replica-recoverer"}},l=[],u={toc:l};function _(e){var i=e.components,a=Object(o.a)(e,r);return Object(s.b)("wrapper",Object(n.a)({},u,a,{components:i,mdxType:"MDXLayout"}),Object(s.b)("pre",null,Object(s.b)("code",{parentName:"pre"},"usage: rucio-replica-recoverer [-h] [--nattempts NATTEMPTS]\n                               [--younger-than YOUNGER_THAN]\n                               [--rse-expression RSE_EXPRESSION]\n                               [--vos VOS [VOS ...]] [--run-once]\n                               [--max-replicas-per-rse MAX_REPLICAS_PER_RSE]\n                               [--sleep-time SLEEP_TIME]\n\nReplica-Recoverer is a daemon that declares suspicious replicas that are\navailable on other RSE as bad. Consequently, automatic replica recovery is\ntriggered via necromancer daemon, which creates a rule for such bad replicas.\n\noptional arguments:\n  -h, --help            show this help message and exit\n  --nattempts NATTEMPTS\n                        Minimum count of suspicious file replica appearance in\n                        bad_replicas table.Default value is 10.\n  --younger-than YOUNGER_THAN\n                        Consider all file replicas logged in bad_replicas\n                        table since speicified number of younger-than. Default\n                        value is 3.\n  --rse-expression RSE_EXPRESSION\n                        The RSE on which the recovery should be happening.\n  --vos VOS [VOS ...]   Optional list of VOs to consider. Only used in multi-\n                        VO mode.\n  --run-once            One iteration only.\n  --max-replicas-per-rse MAX_REPLICAS_PER_RSE\n                        The maximum number of suspicious replicas found on an\n                        RSE which may be declared bad. If a higher count is\n                        found, no action is be taken.\n  --sleep-time SLEEP_TIME\n                        Concurrency control: thread sleep time after each\n                        chunk of work\n\nPreparing RSEs and DIDs for testing this daemon from rucio docker:\n------------------------------------------------------------------- $ sudo\ndocker exec -it dev_rucio_1 /bin/bash Adding the RSEs to rucio DB: $ rucio-\nadmin rse add MOCK_SUSPICIOUS $ rucio-admin rse set-attribute --rse\nMOCK_SUSPICIOUS --key backend_type --value file $ rucio-admin rse set-\nattribute --rse MOCK_SUSPICIOUS --key storage_usage_tool --value\n'rucio.rse.protocols.posix.Default.getSpace' $ rucio-admin rse add-protocol\n--hostname localhost --scheme file --prefix '/tmp/rucio_rse1/' --space-token\n'ATLASDATADISK1' --web-service-path '/srm/managerv2?SFN=' --domain-json '{\n\"lan\": { \"read\": 1, \"write\": 1, \"delete\": 1 }, \"wan\": { \"read\": 1, \"write\": 1,\n\"delete\": 1}}' --impl 'rucio.rse.protocols.posix.Default' MOCK_SUSPICIOUS $\nrucio-admin rse info MOCK_SUSPICIOUS $ rucio-admin rse add MOCK_RECOVERY $\nrucio-admin rse set-attribute --rse MOCK_RECOVERY --key backend_type --value\nPOSIX $ rucio-admin rse set-attribute --rse MOCK_RECOVERY --key\nstorage_usage_tool --value 'rucio.rse.protocols.posix.Default.getSpace' $\nrucio-admin rse add-protocol --hostname localhost --scheme file --prefix\n'/tmp/rucio_rse2/' --space-token 'ATLASDATADISK2' --web-service-path\n'/srm/managerv2?SFN=' --domain-json '{ \"lan\": { \"read\": 1, \"write\": 1,\n\"delete\": 1 }, \"wan\": { \"read\": 1, \"write\": 1, \"delete\": 1}}' --impl\n'rucio.rse.protocols.posix.Default' MOCK_RECOVERY $ rucio-admin rse info\nMOCK_RECOVERY For testing, we create the following files:\n------------------------------------------------------------------- Name\nMOCK_RECOVERY MOCK_SUSPICIOUS BAD (on MOCK_SUSPICIOUS) SUSPICIOUS (on\nMOCK_SUSPICIOUS) file_available_suspicious yes yes no yes\nfile_available_suspicious_and_bad yes yes yes yes file_notavailable_suspicious\nunavailable yes no yes Only file_available_suspicious should be the one on\nwhich the daemon takes action and declares it as bad. $ id0=`uuidgen` $\nid1=`uuidgen` $ id2=`uuidgen` $ id3=`uuidgen` $ echo \"file available on\nMOCK_RECOVERY and decalred suspicious on MOCK_SUSPICIOUS (11 times)\" >\n/tmp/file_available_suspicious'_'$id1 $ echo \"file available on MOCK_RECOVERY\nand declared suspicious on MOCK_SUSPICIOUS (11 times) and 1 time\nbad/deleted/lost on MOCK_SUSPICIOUS\" >\n/tmp/file_available_suspicious_and_bad'_'$id2 $ echo \"file declared as\nunavailable on MOCK_RECOVERY and declared as suspicious 11 times on\nMOCK_SUSPICIOUS\" > /tmp/file_notavailable_suspicious'_'$id3 Uploading the\nfiles created above to rucio:\n------------------------------------------------------------------- rucio add-\ndataset mock:dataset_of_suspicious_replicas'_'$id0 Added\nmock:dataset_of_suspicious_replicas_2ba45524-860b-43f9-a601-6ccec2c46778 $\nrucio add-rule mock:dataset_of_suspicious_replicas'_'$id0 1 MOCK_SUSPICIOUS $\nrucio add-rule --source-replica-expression MOCK_SUSPICIOUS\nmock:dataset_of_suspicious_replicas'_'$id0 1 MOCK_RECOVERY $ rucio list-rules\nmock:dataset_of_suspicious_replicas'_'$id0 ID ACCOUNT SCOPE:NAME\nSTATE[OK/REPL/STUCK] RSE_EXPRESSION COPIES EXPIRES (UTC) CREATED (UTC)\n-------------------------------- ---------\n------------------------------------------------------------------------\n---------------------- ---------------- -------- ---------------\n------------------- 2a1a078b66ca4e209cc20a5826125334 root\nmock:dataset_of_suspicious_replicas_2ba45524-860b-43f9-a601-6ccec2c46778\nOK[0/0/0] MOCK_RECOVERY 1 2019-02-19 14:12:30 8c15d2f8e94a459a86a488055a10d068\nroot mock:dataset_of_suspicious_replicas_2ba45524-860b-43f9-a601-6ccec2c46778\nOK[0/0/0] MOCK_SUSPICIOUS 1 2019-02-19 14:12:28 $ rucio upload --scope mock\n--rse MOCK_SUSPICIOUS --name file_available_suspicious'_'$id1\n/tmp/file_available_suspicious'_'$id1 $ rucio upload --scope mock --rse\nMOCK_SUSPICIOUS --name file_available_suspicious_and_bad'_'$id2\n/tmp/file_available_suspicious_and_bad'_'$id2 $ rucio upload --scope mock\n--rse MOCK_SUSPICIOUS --name file_notavailable_suspicious'_'$id3\n/tmp/file_notavailable_suspicious'_'$id3 $ rucio upload --scope mock --rse\nMOCK_RECOVERY --name file_available_suspicious'_'$id1\n/tmp/file_available_suspicious'_'$id1 $ rucio upload --scope mock --rse\nMOCK_RECOVERY --name file_available_suspicious_and_bad'_'$id2\n/tmp/file_available_suspicious_and_bad'_'$id2 $ rucio upload --scope mock\n--rse MOCK_RECOVERY --name file_notavailable_suspicious'_'$id3\n/tmp/file_notavailable_suspicious'_'$id3 [...] $ rucio attach\nmock:dataset_of_suspicious_replicas'_'$id0\nmock:file_available_suspicious'_'$id1 $ rucio attach\nmock:dataset_of_suspicious_replicas'_'$id0\nmock:file_available_suspicious_and_bad'_'$id2 $ rucio attach\nmock:dataset_of_suspicious_replicas'_'$id0\nmock:file_notavailable_suspicious'_'$id3 [...] $ rucio list-file-replicas\nmock:file_available_suspicious'_'$id1 +---------+-----------------------------\n-----------------------------------+------------+-----------+-----------------\n------------------------------------------------------------------------------\n-------------------------------+ | SCOPE | NAME | FILESIZE | ADLER32 | RSE:\nREPLICA | |---------+---------------------------------------------------------\n-------+------------+-----------+---------------------------------------------\n------------------------------------------------------------------------------\n---| | mock | file_available_suspicious_5180be3e-4ebc-4c34-b528-efbfd09f067e |\n87.000 B | 206b1c91 | MOCK_SUSPICIOUS: file://localhost:0/tmp/rucio_rse1/mock/\n1f/6b/file_available_suspicious_5180be3e-4ebc-4c34-b528-efbfd09f067e | | mock\n| file_available_suspicious_5180be3e-4ebc-4c34-b528-efbfd09f067e | 87.000 B |\n206b1c91 | MOCK_RECOVERY: file://localhost:0/tmp/rucio_rse2/mock/1f/6b/file_av\nailable_suspicious_5180be3e-4ebc-4c34-b528-efbfd09f067e | +---------+---------\n-------------------------------------------------------+------------+---------\n--+---------------------------------------------------------------------------\n---------------------------------------------------+ $ rucio list-file-\nreplicas mock:file_available_suspicious_and_bad'_'$id2 +---------+------------\n------------------------------------------------------------+------------+----\n-------+----------------------------------------------------------------------\n----------------------------------------------------------------+ | SCOPE |\nNAME | FILESIZE | ADLER32 | RSE: REPLICA | |---------+------------------------\n------------------------------------------------+------------+-----------+----\n------------------------------------------------------------------------------\n----------------------------------------------------| | mock |\nfile_available_suspicious_and_bad_46964411-95d4-46c4-a973-72c045195835 |\n134.000 B | dfdf2bff | MOCK_SUSPICIOUS: file://localhost:0/tmp/rucio_rse1/mock\n/1d/2d/file_available_suspicious_and_bad_46964411-95d4-46c4-a973-72c045195835\n| | mock |\nfile_available_suspicious_and_bad_46964411-95d4-46c4-a973-72c045195835 |\n134.000 B | dfdf2bff | MOCK_RECOVERY: file://localhost:0/tmp/rucio_rse2/mock/1\nd/2d/file_available_suspicious_and_bad_46964411-95d4-46c4-a973-72c045195835 | \n+---------+-------------------------------------------------------------------\n-----+------------+-----------+-----------------------------------------------\n------------------------------------------------------------------------------\n---------+ $ rucio list-file-replicas mock:file_notavailable_suspicious'_'$id3\n+---------+-------------------------------------------------------------------\n+------------+-----------+----------------------------------------------------\n-----------------------------------------------------------------------------+\n| SCOPE | NAME | FILESIZE | ADLER32 | RSE: REPLICA | |---------+--------------\n-----------------------------------------------------+------------+-----------\n+-----------------------------------------------------------------------------\n----------------------------------------------------| | mock |\nfile_notavailable_suspicious_6157f589-80db-492c-acdd-ef5f0c45112f | 101.000 B\n| 0c14223f | MOCK_SUSPICIOUS: file://localhost:0/tmp/rucio_rse1/mock/7d/a6/fil\ne_notavailable_suspicious_6157f589-80db-492c-acdd-ef5f0c45112f | | mock |\nfile_notavailable_suspicious_6157f589-80db-492c-acdd-ef5f0c45112f | 101.000 B\n| 0c14223f | MOCK_RECOVERY: file://localhost:0/tmp/rucio_rse2/mock/7d/a6/file_\nnotavailable_suspicious_6157f589-80db-492c-acdd-ef5f0c45112f | +---------+----\n---------------------------------------------------------------+------------+-\n----------+-------------------------------------------------------------------\n--------------------------------------------------------------+ Modifying the\nfile statuses in the DB: -------------------------------------- $ python # the\npaths below point to MOCK_SUSPICIOUS RSE (.../rucio_rse1) $$ file1 = ['file://\nlocalhost:0/tmp/rucio_rse1/mock/1f/6b/file_available_suspicious_5180be3e-4ebc-\n4c34-b528-efbfd09f067e',] $$ file2 = ['file://localhost:0/tmp/rucio_rse1/mock/\n1d/2d/file_available_suspicious_and_bad_46964411-95d4-46c4-a973-72c045195835',\n] $$ file3 = ['file://localhost:0/tmp/rucio_rse1/mock/7d/a6/file_notavailable_\nsuspicious_6157f589-80db-492c-acdd-ef5f0c45112f' ] $$ from\nrucio.client.replicaclient import ReplicaClient $$ replica_client =\nReplicaClient() $$ import time $$ for i in range(11):\nreplica_client.declare_suspicious_file_replicas(file1, 'This is a good\nreason') replica_client.declare_suspicious_file_replicas(file2, 'This is a\ngood reason') replica_client.declare_suspicious_file_replicas(file3, 'This is\na good reason') time.sleep(1) # Declaring file2 bad on MOCK_SUSPICIOUS:\n--------------------------------------- $$\nreplica_client.declare_bad_file_replicas(file2, 'This is a good reason') #\nUpdate replica state of 'file_notavailable_suspicious'_'$id1' on MOCK_RECOVERY\nto 'UNAVAILABLE' # (change the file name below according to the info from\nrucio !): --------------------------------------------------------------------\n--------------------------- $$\nreplica_client.update_replicas_states('MOCK_RECOVERY', [{'scope':'mock',\n'name':'file_notavailable_suspicious_6157f589-80db-492c-acdd-ef5f0c45112f',\n'state':'U'}]) # Checking the results of the file status changes:\n------------------------------------------------ $$ from rucio.core.replica\nimport get_suspicious_files $$ from datetime import datetime, timedelta $$\nfrom_date = datetime.now() - timedelta(days=3) $$ from rucio.core.replica\nimport list_bad_replicas_status $$\nget_suspicious_files('MOCK_SUSPICIOUS',from_date,10) [{'created_at':\ndatetime.datetime(2019, 2, 19, 14, 12, 56), 'scope': u'mock', 'cnt': 11L,\n'name': u'file_notavailable_suspicious_6157f589-80db-492c-acdd-ef5f0c45112f',\n'rse': u'MOCK_SUSPICIOUS'}, {'created_at': datetime.datetime(2019, 2, 19, 14,\n12, 48), 'scope': u'mock', 'cnt': 11L, 'name':\nu'file_available_suspicious_5180be3e-4ebc-4c34-b528-efbfd09f067e', 'rse':\nu'MOCK_SUSPICIOUS'}] $$ list_bad_replicas_status(rse='MOCK_SUSPICIOUS',\nyounger_than=from_date) [{'name':\nu'file_available_suspicious_and_bad_46964411-95d4-46c4-a973-72c045195835',\n'rse': u'MOCK_SUSPICIOUS', 'created_at': datetime.datetime(2019, 2, 19, 14,\n18, 33), 'updated_at': datetime.datetime(2019, 2, 19, 14, 18, 33), 'state':\nBAD, 'scope': u'mock'}] $$ exit() Run the daemon: --------------- $ python\nbin/rucio-replica-recoverer --run-once --rse-expression='MOCK_SUSPICIOUS'\nTerminal output: ---------------- 2019-02-19 14:39:24,114 709 INFO\nreplica_recoverer[0/0]: ready to query replicas at RSEs like *MOCK*, declared\nas suspicious in the last 3 days at least 10 times and which are available on\nother RSEs. 2019-02-19 14:39:24,124 709 INFO replica_recoverer[0/0]:\nsuspicious replica query took 0.0101511478424 seconds, total of 1 replicas\nwere found. [{'scope': u'mock', 'cnt': 11L, 'name':\nu'file_available_suspicious_5180be3e-4ebc-4c34-b528-efbfd09f067e', 'rse':\nu'MOCK_SUSPICIOUS'}] 2019-02-19 14:39:24,125 709 INFO replica_recoverer[0/0]:\nlooking for replica surls. 2019-02-19 14:39:24,160 709 INFO\nreplica_recoverer[0/0]: found 1/1 surls (took 0.035572052002 seconds) -\ndeclaring them as bad replicas now. 2019-02-19 14:39:24,160 709 INFO\nreplica_recoverer[0/0]: ready to declare 1 bad replica(s) on MOCK_SUSPICIOUS: \n[u'file://localhost:0/tmp/rucio_rse1/mock/1f/6b/file_available_suspicious_5180\nbe3e-4ebc-4c34-b528-efbfd09f067e']. 2019-02-19 14:39:24,188 709 INFO\nreplica_recoverer[0/0]: finished declaring bad replicas on MOCK_SUSPICIOUS.\n2019-02-19 14:39:24,192 709 INFO replica_recoverer[0/0]: graceful stop done #\nChecking the results of the file status changes:\n------------------------------------------------ $ python $$ from\nrucio.core.replica import get_suspicious_files $$ from datetime import\ndatetime, timedelta $$ from_date = datetime.now() - timedelta(days=3) $$ from\nrucio.core.replica import list_bad_replicas_status $$\nget_suspicious_files('MOCK_SUSPICIOUS',younger_than=from_date, nattempts=10,\nis_suspicious=True, available_elsewhere=True) >>>\nget_suspicious_files('MOCK_SUSPICIOUS',younger_than=from_date, nattempts=10,\nis_suspicious=True, available_elsewhere=True) [] $$\nlist_bad_replicas_status(rse='MOCK_SUSPICIOUS', younger_than=from_date)\n[{'name': u'file_available_suspicious_5180be3e-4ebc-4c34-b528-efbfd09f067e',\n'rse': u'MOCK_SUSPICIOUS', 'created_at': datetime.datetime(2019, 2, 19, 14,\n39, 24), 'updated_at': datetime.datetime(2019, 2, 19, 14, 39, 24), 'state':\nBAD, 'scope': u'mock'}, {'name':\nu'file_available_suspicious_and_bad_46964411-95d4-46c4-a973-72c045195835',\n'rse': u'MOCK_SUSPICIOUS', 'created_at': datetime.datetime(2019, 2, 19, 14,\n18, 33), 'updated_at': datetime.datetime(2019, 2, 19, 14, 18, 33), 'state':\nBAD, 'scope': u'mock'}] $$ exit() When run in multi-VO mode, by default the\ndaemon will run on RSEs from all VOs:: $ rucio-replica-recoverer --run-once\n2020-07-28 15:15:14,151 5461 INFO replica_recoverer: This instance will work\non VOs: def, abc, xyz, 123 By using the ``--vos`` argument only the VO or VOs\nspecified will be affected:: $ rucio-replica-recoverer --run-once --vos abc\nxyz 2020-07-28 15:16:36,066 5474 INFO replica_recoverer: This instance will\nwork on VOs: abc, xyz Note that attempting the use the ``--vos`` argument when\nin single-VO mode will have no affect:: $ rucio-replica-recoverer --run-once\n--vos abc xyz 2020-07-28 15:21:33,349 5488 WARNING Ignoring argument vos, this\nis only applicable in a multi-VO setup.\n")))}_.isMDXComponent=!0}}]);