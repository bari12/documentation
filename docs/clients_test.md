<a name="downloadclient"></a>
# downloadclient

<a name="downloadclient.BaseExtractionTool"></a>
## BaseExtractionTool Objects

```python
class BaseExtractionTool()
```

<a name="downloadclient.BaseExtractionTool.__init__"></a>
#### \_\_init\_\_

```python
 | __init__(program_name, useability_check_args, extract_args, logger)
```

Initialises a extraction tool object

**Arguments**:

- `program_name`: the name of the archive extraction program, e.g., unzip
- `useability_check_args`: the arguments of the extraction program to test if its installed, e.g., --version
- `extract_args`: the arguments that will be passed to the program for extraction
- `logger`: logging.Logger object

<a name="downloadclient.BaseExtractionTool.is_useable"></a>
#### is\_useable

```python
 | is_useable()
```

Checks if the extraction tool is installed and usable

**Returns**:

True if it is usable otherwise False

<a name="downloadclient.BaseExtractionTool.try_extraction"></a>
#### try\_extraction

```python
 | try_extraction(archive_file_path, file_to_extract, dest_dir_path)
```

Calls the extraction program to extract a file from an archive

**Arguments**:

- `archive_file_path`: path to the archive
- `file_to_extract`: file name to extract from the archive
- `dest_dir_path`: destination directory where the extracted file will be stored

**Returns**:

True on success otherwise False

<a name="downloadclient.DownloadClient"></a>
## DownloadClient Objects

```python
class DownloadClient()
```

<a name="downloadclient.DownloadClient.__init__"></a>
#### \_\_init\_\_

```python
 | __init__(client=None, logger=None, tracing=True, check_admin=False, check_pcache=False)
```

Initialises the basic settings for an DownloadClient object

**Arguments**:

- `client`: Optional: rucio.client.client.Client object. If None, a new object will be created.
- `external_traces`: Optional: reference to a list where traces can be added
- `logger`: Optional: logging.Logger object to use for downloads. If None nothing will be logged.

<a name="downloadclient.DownloadClient.download_pfns"></a>
#### download\_pfns

```python
 | download_pfns(items, num_threads=2, trace_custom_fields={}, traces_copy_out=None)
```

Download items with a given PFN. This function can only download files, no datasets.

**Arguments**:

- `items`: List of dictionaries. Each dictionary describing a file to download. Keys:
pfn                 - PFN string of this file
did                 - DID string of this file (e.g. 'scope:file.name'). Wildcards are not allowed
rse                 - rse name (e.g. 'CERN-PROD_DATADISK'). RSE Expressions are not allowed
base_dir            - Optional: Base directory where the downloaded files will be stored. (Default: '.')
no_subdir           - Optional: If true, files are written directly into base_dir and existing files are overwritten. (Default: False)
adler32             - Optional: The adler32 checmsum to compare the downloaded files adler32 checksum with
md5                 - Optional: The md5 checksum to compare the downloaded files md5 checksum with
transfer_timeout    - Optional: Timeout time for the download protocols. (Default: None)
- `num_threads`: Suggestion of number of threads to use for the download. It will be lowered if it's too high.
- `trace_custom_fields`: Custom key value pairs to send with the traces
- `traces_copy_out`: reference to an external list, where the traces should be uploaded

**Returns**:

a list of dictionaries with an entry for each file, containing the input options, the did, and the clientState
clientState can be one of the following: ALREADY_DONE, DONE, FILE_NOT_FOUND, FAIL_VALIDATE, FAILED

**Raises**:

- `InputValidationError`: if one of the input items is in the wrong format
- `NoFilesDownloaded`: if no files could be downloaded
- `NotAllFilesDownloaded`: if not all files could be downloaded
- `RucioException`: if something unexpected went wrong during the download

<a name="downloadclient.DownloadClient.download_dids"></a>
#### download\_dids

```python
 | download_dids(items, num_threads=2, trace_custom_fields={}, traces_copy_out=None)
```

Download items with given DIDs. This function can also download datasets and wildcarded DIDs.

**Arguments**:

- `items`: List of dictionaries. Each dictionary describing an item to download. Keys:
did                 - DID string of this file (e.g. 'scope:file.name')
filters             - Filter to select DIDs for download. Optional if DID is given
rse                 - Optional: rse name (e.g. 'CERN-PROD_DATADISK') or rse expression from where to download
no_resolve_archives - Optional: bool indicating whether archives should not be considered for download (Default: False)
resolve_archives    - Deprecated: Use no_resolve_archives instead
force_scheme        - Optional: force a specific scheme to download this item. (Default: None)
base_dir            - Optional: base directory where the downloaded files will be stored. (Default: '.')
no_subdir           - Optional: If true, files are written directly into base_dir and existing files are overwritten. (Default: False)
nrandom             - Optional: if the DID addresses a dataset, nrandom files will be randomly choosen for download from the dataset
ignore_checksum     - Optional: If true, skips the checksum validation between the downloaded file and the rucio catalouge. (Default: False)
transfer_timeout    - Optional: Timeout time for the download protocols. (Default: None)
- `num_threads`: Suggestion of number of threads to use for the download. It will be lowered if it's too high.
- `trace_custom_fields`: Custom key value pairs to send with the traces.
- `traces_copy_out`: reference to an external list, where the traces should be uploaded

**Returns**:

a list of dictionaries with an entry for each file, containing the input options, the did, and the clientState

**Raises**:

- `InputValidationError`: if one of the input items is in the wrong format
- `NoFilesDownloaded`: if no files could be downloaded
- `NotAllFilesDownloaded`: if not all files could be downloaded
- `RucioException`: if something unexpected went wrong during the download

<a name="downloadclient.DownloadClient.download_from_metalink_file"></a>
#### download\_from\_metalink\_file

```python
 | download_from_metalink_file(item, metalink_file_path, num_threads=2, trace_custom_fields={}, traces_copy_out=None)
```

Download items using a given metalink file.

**Arguments**:

- `item`: dictionary describing an item to download. Keys:
base_dir            - Optional: base directory where the downloaded files will be stored. (Default: '.')
no_subdir           - Optional: If true, files are written directly into base_dir and existing files are overwritten. (Default: False)
ignore_checksum     - Optional: If true, skips the checksum validation between the downloaded file and the rucio catalouge. (Default: False)
transfer_timeout    - Optional: Timeout time for the download protocols. (Default: None)
- `num_threads`: Suggestion of number of threads to use for the download. It will be lowered if it's too high.
- `trace_custom_fields`: Custom key value pairs to send with the traces.
- `traces_copy_out`: reference to an external list, where the traces should be uploaded

**Returns**:

a list of dictionaries with an entry for each file, containing the input options, the did, and the clientState

**Raises**:

- `InputValidationError`: if one of the input items is in the wrong format
- `NoFilesDownloaded`: if no files could be downloaded
- `NotAllFilesDownloaded`: if not all files could be downloaded
- `RucioException`: if something unexpected went wrong during the download

<a name="downloadclient.DownloadClient.download_aria2c"></a>
#### download\_aria2c

```python
 | download_aria2c(items, trace_custom_fields={}, filters={})
```

Uses aria2c to download the items with given DIDs. This function can also download datasets and wildcarded DIDs.
It only can download files that are available via https/davs.
Aria2c needs to be installed and X509_USER_PROXY needs to be set!

**Arguments**:

- `items`: List of dictionaries. Each dictionary describing an item to download. Keys:
did                 - DID string of this file (e.g. 'scope:file.name'). Wildcards are not allowed
rse                 - Optional: rse name (e.g. 'CERN-PROD_DATADISK') or rse expression from where to download
base_dir            - Optional: base directory where the downloaded files will be stored. (Default: '.')
no_subdir           - Optional: If true, files are written directly into base_dir and existing files are overwritten. (Default: False)
nrandom             - Optional: if the DID addresses a dataset, nrandom files will be randomly choosen for download from the dataset
ignore_checksum     - Optional: If true, skips the checksum validation between the downloaded file and the rucio catalouge. (Default: False)
- `trace_custom_fields`: Custom key value pairs to send with the traces
- `filters`: dictionary containing filter options

**Returns**:

a list of dictionaries with an entry for each file, containing the input options, the did, and the clientState

**Raises**:

- `InputValidationError`: if one of the input items is in the wrong format
- `NoFilesDownloaded`: if no files could be downloaded
- `NotAllFilesDownloaded`: if not all files could be downloaded
- `RucioException`: if something went wrong during the download (e.g. aria2c could not be started)

<a name="accountclient"></a>
# accountclient

<a name="accountclient.AccountClient"></a>
## AccountClient Objects

```python
class AccountClient(BaseClient)
```

Account client class for working with rucio accounts

<a name="accountclient.AccountClient.add_account"></a>
#### add\_account

```python
 | add_account(account, type, email)
```

Sends the request to create a new account.

**Arguments**:

- `account`: the name of the account.
- `type`: The account type
- `email`: The Email address associated with the account.

**Returns**:

True if account was created successfully else False.

**Raises**:

- `Duplicate`: if account already exists.

<a name="accountclient.AccountClient.delete_account"></a>
#### delete\_account

```python
 | delete_account(account)
```

Sends the request to disable an account.

**Arguments**:

- `account`: the name of the account.

**Returns**:

True is account was disabled successfully. False otherwise.

**Raises**:

- `AccountNotFound`: if account doesn't exist.

<a name="accountclient.AccountClient.get_account"></a>
#### get\_account

```python
 | get_account(account)
```

Sends the request to get information about a given account.

**Arguments**:

- `account`: the name of the account.

**Returns**:

a list of attributes for the account. None if failure.

**Raises**:

- `AccountNotFound`: if account doesn't exist.

<a name="accountclient.AccountClient.update_account"></a>
#### update\_account

```python
 | update_account(account, key, value)
```

Update a property of an account.

**Arguments**:

- `account`: Name of the account.
- `key`: Account property like status.
- `value`: Property value.

<a name="accountclient.AccountClient.list_accounts"></a>
#### list\_accounts

```python
 | list_accounts(account_type=None, identity=None, filters=None)
```

Sends the request to list all rucio accounts.

**Arguments**:

- `type`: The account type
- `identity`: The identity key name. For example x509 DN, or a username.
- `filters`: A dictionnary key:account attribute to use for the filtering

**Returns**:

a list containing account info dictionary for all rucio accounts.

**Raises**:

- `AccountNotFound`: if account doesn't exist.

<a name="accountclient.AccountClient.whoami"></a>
#### whoami

```python
 | whoami()
```

Get information about account whose token is used

**Returns**:

a list of attributes for the account. None if failure.

**Raises**:

- `AccountNotFound`: if account doesn't exist.

<a name="accountclient.AccountClient.add_identity"></a>
#### add\_identity

```python
 | add_identity(account, identity, authtype, email, default=False, password=None)
```

Adds a membership association between identity and account.

**Arguments**:

- `account`: The account name.
- `identity`: The identity key name. For example x509 DN, or a username.
- `authtype`: The type of the authentication (x509, gss, userpass).
- `default`: If True, the account should be used by default with the provided identity.
- `email`: The Email address associated with the identity.
- `password`: Password if authtype is userpass.

<a name="accountclient.AccountClient.del_identity"></a>
#### del\_identity

```python
 | del_identity(account, identity, authtype)
```

Delete an identity's membership association with an account.

**Arguments**:

- `account`: The account name.
- `identity`: The identity key name. For example x509 DN, or a username.
- `authtype`: The type of the authentication (x509, gss, userpass).
- `default`: If True, the account should be used by default with the provided identity.

<a name="accountclient.AccountClient.list_identities"></a>
#### list\_identities

```python
 | list_identities(account)
```

List all identities on an account.

**Arguments**:

- `account`: The account name.

<a name="accountclient.AccountClient.list_account_rules"></a>
#### list\_account\_rules

```python
 | list_account_rules(account)
```

List the associated rules of an account.

**Arguments**:

- `account`: The account name.

<a name="accountclient.AccountClient.get_account_limits"></a>
#### get\_account\_limits

```python
 | get_account_limits(account, rse_expression, locality)
```

Return the correct account limits for the given locality.

**Arguments**:

- `account`: The account name.
- `rse_expression`: Valid RSE expression
- `locality`: The scope of the account limit. 'local' or 'global'.

<a name="accountclient.AccountClient.get_global_account_limit"></a>
#### get\_global\_account\_limit

```python
 | get_global_account_limit(account, rse_expression)
```

List the account limit for the specific RSE expression.

**Arguments**:

- `account`: The account name.
- `rse_expression`: The rse expression.

<a name="accountclient.AccountClient.get_global_account_limits"></a>
#### get\_global\_account\_limits

```python
 | get_global_account_limits(account)
```

List all RSE expression limits of this account.

**Arguments**:

- `account`: The account name.

<a name="accountclient.AccountClient.get_local_account_limits"></a>
#### get\_local\_account\_limits

```python
 | get_local_account_limits(account)
```

List the account rse limits of this account.

**Arguments**:

- `account`: The account name.

<a name="accountclient.AccountClient.get_local_account_limit"></a>
#### get\_local\_account\_limit

```python
 | get_local_account_limit(account, rse)
```

List the account rse limits of this account for the specific rse.

**Arguments**:

- `account`: The account name.
- `rse`: The rse name.

<a name="accountclient.AccountClient.get_local_account_usage"></a>
#### get\_local\_account\_usage

```python
 | get_local_account_usage(account, rse=None)
```

List the account usage for one or all rses of this account.

**Arguments**:

- `account`: The account name.
- `rse`: The rse name.

<a name="accountclient.AccountClient.get_global_account_usage"></a>
#### get\_global\_account\_usage

```python
 | get_global_account_usage(account, rse_expression=None)
```

List the account usage for one or all RSE expressions of this account.

**Arguments**:

- `account`: The account name.
- `rse_expression`: The rse expression.

<a name="accountclient.AccountClient.get_account_usage_history"></a>
#### get\_account\_usage\_history

```python
 | get_account_usage_history(account, rse)
```

List the account usage history of this account on rse.

**Arguments**:

- `account`: The account name.
- `rse`: The rse name.

<a name="accountclient.AccountClient.list_account_attributes"></a>
#### list\_account\_attributes

```python
 | list_account_attributes(account)
```

List the attributes for an account.

**Arguments**:

- `account`: The account name.

<a name="accountclient.AccountClient.add_account_attribute"></a>
#### add\_account\_attribute

```python
 | add_account_attribute(account, key, value)
```

Adds an attribute to an account.

**Arguments**:

- `account`: The account name.
- `key`: The attribute key.
- `value`: The attribute value.

<a name="accountclient.AccountClient.delete_account_attribute"></a>
#### delete\_account\_attribute

```python
 | delete_account_attribute(account, key)
```

Delete an attribute for an account.

**Arguments**:

- `account`: The account name.
- `key`: The attribute key.

<a name="accountlimitclient"></a>
# accountlimitclient

<a name="accountlimitclient.AccountLimitClient"></a>
## AccountLimitClient Objects

```python
class AccountLimitClient(BaseClient)
```

Account limit client class for working with account limits

<a name="accountlimitclient.AccountLimitClient.set_account_limit"></a>
#### set\_account\_limit

```python
 | set_account_limit(account, rse, bytes, locality)
```

Sets an account limit for a given limit scope.

**Arguments**:

- `account`: The name of the account.
- `rse`: The rse name.
- `bytes`: An integer with the limit in bytes.
- `locality`: The scope of the account limit. 'local' or 'global'.

**Returns**:

True if quota was created successfully else False.

<a name="accountlimitclient.AccountLimitClient.delete_account_limit"></a>
#### delete\_account\_limit

```python
 | delete_account_limit(account, rse, locality)
```

Deletes an account limit for a given limit scope.

**Arguments**:

- `account`: The name of the account.
- `rse`: The rse name.
- `locality`: The scope of the account limit. 'local' or 'global'.

**Returns**:

True if quota was created successfully else False.

<a name="accountlimitclient.AccountLimitClient.set_local_account_limit"></a>
#### set\_local\_account\_limit

```python
 | set_local_account_limit(account, rse, bytes)
```

Sends the request to set an account limit for an account.

**Arguments**:

- `account`: The name of the account.
- `rse`: The rse name.
- `bytes`: An integer with the limit in bytes.

**Returns**:

True if quota was created successfully else False.

<a name="accountlimitclient.AccountLimitClient.delete_local_account_limit"></a>
#### delete\_local\_account\_limit

```python
 | delete_local_account_limit(account, rse)
```

Sends the request to remove an account limit.

**Arguments**:

- `account`: The name of the account.
- `rse`: The rse name.

**Returns**:

True if quota was removed successfully. False otherwise.

**Raises**:

- `AccountNotFound`: if account doesn't exist.

<a name="accountlimitclient.AccountLimitClient.set_global_account_limit"></a>
#### set\_global\_account\_limit

```python
 | set_global_account_limit(account, rse_expression, bytes)
```

Sends the request to set a global account limit for an account.

**Arguments**:

- `account`: The name of the account.
- `rse_expression`: The rse expression.
- `bytes`: An integer with the limit in bytes.

**Returns**:

True if quota was created successfully else False.

<a name="accountlimitclient.AccountLimitClient.delete_global_account_limit"></a>
#### delete\_global\_account\_limit

```python
 | delete_global_account_limit(account, rse_expression)
```

Sends the request to remove a global account limit.

**Arguments**:

- `account`: The name of the account.
- `rse_expression`: The rse expression.

**Returns**:

True if quota was removed successfully. False otherwise.

**Raises**:

- `AccountNotFound`: if account doesn't exist.

<a name="client"></a>
# client

Client class for callers of the Rucio system

<a name="client.Client"></a>
## Client Objects

```python
class Client(AccountClient, 
             AccountLimitClient, 
             MetaClient, 
             PingClient, 
             ReplicaClient, 
             RequestClient, 
             RSEClient, 
             ScopeClient, 
             DIDClient, 
             RuleClient, 
             SubscriptionClient, 
             LockClient, 
             ConfigClient, 
             TouchClient, 
             ImportClient, 
             ExportClient, 
             CredentialClient, 
             DiracClient)
```

Main client class for accessing Rucio resources. Handles the authentication.

<a name="client.Client.__init__"></a>
#### \_\_init\_\_

```python
 | __init__(rucio_host=None, auth_host=None, account=None, ca_cert=None, auth_type=None, creds=None, timeout=600, user_agent='rucio-clients', vo=None)
```

Constructor for the Rucio main client class.

**Arguments**:

- `rucio_host`: the host of the rucio system.
- `auth_host`: the host of the rucio authentication server.
- `account`: the rucio account that should be used to interact with the rucio system.
- `ca_cert`: the certificate to verify the server.
- `auth_type`: the type of authentication to use (e.g. userpass, x509 ...)
- `creds`: credentials needed for authentication.
- `timeout`: Float describes the timeout of the request (in seconds).
- `vo`: The vo that the client will interact with.

<a name="configclient"></a>
# configclient

<a name="configclient.ConfigClient"></a>
## ConfigClient Objects

```python
class ConfigClient(BaseClient)
```

Client class for working with the configuration

<a name="configclient.ConfigClient.get_config"></a>
#### get\_config

```python
 | get_config(section=None, option=None)
```

Sends the request to get the matching configuration.

**Arguments**:

- `section`: the optional name of the section.
- `option`: the optional option within the section.

**Returns**:

dictionary containing the configuration.

<a name="configclient.ConfigClient.set_config_option"></a>
#### set\_config\_option

```python
 | set_config_option(section, option, value)
```

Sends the request to create or set an option within a section. Missing sections will be created.

**Arguments**:

- `section`: the name of the section.
- `option`: the name of the option.

**Returns**:

True if option was removed successfully. False otherwise.

<a name="configclient.ConfigClient.delete_config_option"></a>
#### delete\_config\_option

```python
 | delete_config_option(section, option)
```

Sends the request to remove an option from a section

**Arguments**:

- `section`: the name of the section.
- `option`: the name of the option.

**Returns**:

True if option was removed successfully. False otherwise.

<a name="credentialclient"></a>
# credentialclient

<a name="credentialclient.CredentialClient"></a>
## CredentialClient Objects

```python
class CredentialClient(BaseClient)
```

Credential client class for working with URL signing

<a name="credentialclient.CredentialClient.get_signed_url"></a>
#### get\_signed\_url

```python
 | get_signed_url(rse, service, operation, url, lifetime=3600)
```

Return a signed version of the given URL for the given operation.

**Arguments**:

- `rse`: The name of the RSE the URL points to.
- `service`: The service the URL points to (gcs, s3, swift)
- `operation`: The desired operation (read, write, delete)
- `url`: The URL to sign
- `lifetime`: The desired lifetime of the URL in seconds

**Returns**:

The signed URL string

<a name="exportclient"></a>
# exportclient

<a name="exportclient.ExportClient"></a>
## ExportClient Objects

```python
class ExportClient(BaseClient)
```

RSE client class for exporting data from Rucio

<a name="exportclient.ExportClient.export_data"></a>
#### export\_data

```python
 | export_data()
```

Export data.

**Returns**:

A dict containing data

<a name="fileclient"></a>
# fileclient

<a name="fileclient.FileClient"></a>
## FileClient Objects

```python
class FileClient(BaseClient)
```

Dataset client class for working with dataset

<a name="fileclient.FileClient.__init__"></a>
#### \_\_init\_\_

```python
 | __init__(rucio_host=None, auth_host=None, account=None, ca_cert=None, auth_type=None, creds=None, timeout=600, user_agent='rucio-clients', vo=None)
```

Constructor

<a name="fileclient.FileClient.list_file_replicas"></a>
#### list\_file\_replicas

```python
 | list_file_replicas(scope, lfn)
```

List file replicas.

**Arguments**:

- `scope`: the scope.
- `lfn`: the lfn.

**Returns**:

List of replicas.

<a name="importclient"></a>
# importclient

<a name="importclient.ImportClient"></a>
## ImportClient Objects

```python
class ImportClient(BaseClient)
```

RSE client class for importing data into Rucio

<a name="importclient.ImportClient.import_data"></a>
#### import\_data

```python
 | import_data(data)
```

Imports data into Rucio.

**Arguments**:

- `data`: a dict containing data to be imported into Rucio.

<a name="lifetimeclient"></a>
# lifetimeclient

<a name="lifetimeclient.LifetimeClient"></a>
## LifetimeClient Objects

```python
class LifetimeClient(BaseClient)
```

Lifetime client class for working with Lifetime Model exceptions

<a name="lifetimeclient.LifetimeClient.list_exceptions"></a>
#### list\_exceptions

```python
 | list_exceptions(exception_id=None, states=None)
```

List exceptions to Lifetime Model.

**Arguments**:

- `id`: The id of the exception
- `states`: The states to filter

<a name="lifetimeclient.LifetimeClient.add_exception"></a>
#### add\_exception

```python
 | add_exception(dids, account, pattern, comments, expires_at)
```

Add exceptions to Lifetime Model.

**Arguments**:

- `dids`: The list of dids
- `account`: The account of the requester.
- `pattern`: The account.
- `comments`: The comments associated to the exception.
- `expires_at`: The expiration date of the exception.

returns:            The id of the exception.

<a name="lockclient"></a>
# lockclient

<a name="lockclient.LockClient"></a>
## LockClient Objects

```python
class LockClient(BaseClient)
```

Lock client class for working with rucio locks

<a name="lockclient.LockClient.get_dataset_locks"></a>
#### get\_dataset\_locks

```python
 | get_dataset_locks(scope, name)
```

Get a dataset locks of the specified dataset.

**Arguments**:

- `scope`: the scope of the did of the locks to list.
- `name`: the name of the did of the locks to list.

<a name="lockclient.LockClient.get_dataset_locks_by_rse"></a>
#### get\_dataset\_locks\_by\_rse

```python
 | get_dataset_locks_by_rse(rse)
```

Get all dataset locks of the specified rse.

**Arguments**:

- `rse`: the rse of the locks to list.

<a name="metaclient"></a>
# metaclient

<a name="metaclient.MetaClient"></a>
## MetaClient Objects

```python
class MetaClient(BaseClient)
```

Meta client class for working with data identifier attributes

<a name="metaclient.MetaClient.add_key"></a>
#### add\_key

```python
 | add_key(key, key_type, value_type=None, value_regexp=None)
```

Sends the request to add a new key.

**Arguments**:

- `key`: the name for the new key.
- `key_type`: the type of the key: all(container, dataset, file), collection(dataset or container), file, derived(compute from file for collection).
- `value_type`: the type of the value, if defined.
- `value_regexp`: the regular expression that values should match, if defined.

**Returns**:

True if key was created successfully.

**Raises**:

- `Duplicate`: if key already exists.

<a name="metaclient.MetaClient.list_keys"></a>
#### list\_keys

```python
 | list_keys()
```

Sends the request to list all keys.

**Returns**:

a list containing the names of all keys.

<a name="metaclient.MetaClient.list_values"></a>
#### list\_values

```python
 | list_values(key)
```

Sends the request to list all values for a key.

**Returns**:

a list containing the names of all values for a key.

<a name="metaclient.MetaClient.add_value"></a>
#### add\_value

```python
 | add_value(key, value)
```

Sends the request to add a value to a key.

**Arguments**:

- `key`: the name for key.
- `value`: the value.

**Returns**:

True if value was created successfully.

**Raises**:

- `Duplicate`: if valid already exists.

<a name="metaclient.MetaClient.del_value"></a>
#### del\_value

```python
 | del_value(key, value)
```

Delete a value for a key.

**Arguments**:

- `key`: the name for key.
- `value`: the value.

<a name="metaclient.MetaClient.del_key"></a>
#### del\_key

```python
 | del_key(key)
```

Delete an allowed key.

**Arguments**:

- `key`: the name for key.

<a name="metaclient.MetaClient.update_key"></a>
#### update\_key

```python
 | update_key(key, type=None, regepx=None)
```

Update a key.

**Arguments**:

- `key`: the name for key.
- `type`: the type of the value, if defined.
- `regexp`: the regular expression that values should match, if defined.

<a name="pingclient"></a>
# pingclient

<a name="pingclient.PingClient"></a>
## PingClient Objects

```python
class PingClient(BaseClient)
```

Ping client class

<a name="pingclient.PingClient.ping"></a>
#### ping

```python
 | ping()
```

Sends a ping request to the rucio server.

**Returns**:

Dictonnary with server information

<a name="requestclient"></a>
# requestclient

<a name="requestclient.RequestClient"></a>
## RequestClient Objects

```python
class RequestClient(BaseClient)
```

<a name="requestclient.RequestClient.list_request_by_did"></a>
#### list\_request\_by\_did

```python
 | list_request_by_did(name, rse, scope=None)
```

Return latest request details for a DID

**Arguments**:

- `name`: DID
:type name: str
- `rse`: Destination RSE name
:type rse: str
- `scope`: rucio scope, defaults to None
- `scope`: str, optional

**Raises**:

- `exc_cls`: from BaseClient._get_exception

**Returns**:

request information
:rtype: dict

<a name="ruleclient"></a>
# ruleclient

<a name="ruleclient.RuleClient"></a>
## RuleClient Objects

```python
class RuleClient(BaseClient)
```

RuleClient class for working with replication rules

<a name="ruleclient.RuleClient.add_replication_rule"></a>
#### add\_replication\_rule

```python
 | add_replication_rule(dids, copies, rse_expression, weight=None, lifetime=None, grouping='DATASET', account=None, locked=False, source_replica_expression=None, activity=None, notify='N', purge_replicas=False, ignore_availability=False, comment=None, ask_approval=False, asynchronous=False, priority=3, meta=None)
```

**Arguments**:

- `dids`: The data identifier set.
- `copies`: The number of replicas.
- `rse_expression`: Boolean string expression to give the list of RSEs.
- `weight`: If the weighting option of the replication rule is used, the choice of RSEs takes their weight into account.
- `lifetime`: The lifetime of the replication rules (in seconds).
- `grouping`: ALL -  All files will be replicated to the same RSE.
DATASET - All files in the same dataset will be replicated to the same RSE.
NONE - Files will be completely spread over all allowed RSEs without any grouping considerations at all.
- `account`: The account owning the rule.
- `locked`: If the rule is locked, it cannot be deleted.
- `source_replica_expression`: RSE Expression for RSEs to be considered for source replicas.
- `activity`: Transfer Activity to be passed to FTS.
- `notify`: Notification setting for the rule (Y, N, C).
- `purge_replicas`: When the rule gets deleted purge the associated replicas immediately.
- `ignore_availability`: Option to ignore the availability of RSEs.
- `ask_approval`: Ask for approval of this replication rule.
- `asynchronous`: Create rule asynchronously by judge-injector.
- `priority`: Priority of the transfers.
- `comment`: Comment about the rule.
- `meta`: Metadata, as dictionary.

<a name="ruleclient.RuleClient.delete_replication_rule"></a>
#### delete\_replication\_rule

```python
 | delete_replication_rule(rule_id, purge_replicas=None)
```

Deletes a replication rule and all associated locks.

**Arguments**:

- `rule_id`: The id of the rule to be deleted
- `purge_replicas`: Immediately delete the replicas.
:raises:                RuleNotFound, AccessDenied

<a name="ruleclient.RuleClient.get_replication_rule"></a>
#### get\_replication\_rule

```python
 | get_replication_rule(rule_id, estimate_ttc=False)
```

Get a replication rule.

**Arguments**:

- `rule_id`: The id of the rule to be retrieved.
- `estimate_ttc`: bool, if rule_info should return ttc information
:raises:         RuleNotFound

<a name="ruleclient.RuleClient.update_replication_rule"></a>
#### update\_replication\_rule

```python
 | update_replication_rule(rule_id, options)
```

**Arguments**:

- `rule_id`: The id of the rule to be retrieved.
- `options`: Options dictionary.
:raises:          RuleNotFound

<a name="ruleclient.RuleClient.reduce_replication_rule"></a>
#### reduce\_replication\_rule

```python
 | reduce_replication_rule(rule_id, copies, exclude_expression=None)
```

**Arguments**:

- `rule_id`: Rule to be reduced.
- `copies`: Number of copies of the new rule.
- `exclude_expression`: RSE Expression of RSEs to exclude.
:raises:                    RuleReplaceFailed, RuleNotFound

<a name="ruleclient.RuleClient.move_replication_rule"></a>
#### move\_replication\_rule

```python
 | move_replication_rule(rule_id, rse_expression)
```

Move a replication rule to another RSE and, once done, delete the original one.

**Arguments**:

- `rule_id`: Rule to be moved.
- `rse_expression`: RSE expression of the new rule.
:raises:                    RuleNotFound, RuleReplaceFailed

<a name="ruleclient.RuleClient.approve_replication_rule"></a>
#### approve\_replication\_rule

```python
 | approve_replication_rule(rule_id)
```

**Arguments**:

- `rule_id`: Rule to be approved.
:raises:                    RuleNotFound

<a name="ruleclient.RuleClient.deny_replication_rule"></a>
#### deny\_replication\_rule

```python
 | deny_replication_rule(rule_id)
```

**Arguments**:

- `rule_id`: Rule to be denied.
:raises:                    RuleNotFound

<a name="ruleclient.RuleClient.list_replication_rule_full_history"></a>
#### list\_replication\_rule\_full\_history

```python
 | list_replication_rule_full_history(scope, name)
```

List the rule history of a DID.

**Arguments**:

- `scope`: The scope of the DID.
- `name`: The name of the DID.

<a name="ruleclient.RuleClient.examine_replication_rule"></a>
#### examine\_replication\_rule

```python
 | examine_replication_rule(rule_id)
```

Examine a replication rule for errors during transfer.

**Arguments**:

- `rule_id`: Rule to be denied.
:raises:                    RuleNotFound

<a name="ruleclient.RuleClient.list_replica_locks"></a>
#### list\_replica\_locks

```python
 | list_replica_locks(rule_id)
```

List details of all replica locks for a rule.

**Arguments**:

- `rule_id`: Rule to be denied.
:raises:                    RuleNotFound

<a name="ruleclient.RuleClient.list_replication_rules"></a>
#### list\_replication\_rules

```python
 | list_replication_rules(filters=None)
```

List all replication rules which match a filter

**Arguments**:

- `filters`: dictionary of attributes by which the rules should be filtered

**Returns**:

True if successful, otherwise false.

<a name="scopeclient"></a>
# scopeclient

<a name="scopeclient.ScopeClient"></a>
## ScopeClient Objects

```python
class ScopeClient(BaseClient)
```

Scope client class for working with rucio scopes

<a name="scopeclient.ScopeClient.add_scope"></a>
#### add\_scope

```python
 | add_scope(account, scope)
```

Sends the request to add a new scope.

**Arguments**:

- `account`: the name of the account to add the scope to.
- `scope`: the name of the new scope.

**Returns**:

True if scope was created successfully.

**Raises**:

- `Duplicate`: if scope already exists.
- `AccountNotFound`: if account doesn't exist.

<a name="scopeclient.ScopeClient.list_scopes"></a>
#### list\_scopes

```python
 | list_scopes()
```

Sends the request to list all scopes.

**Returns**:

a list containing the names of all scopes.

<a name="scopeclient.ScopeClient.list_scopes_for_account"></a>
#### list\_scopes\_for\_account

```python
 | list_scopes_for_account(account)
```

Sends the request to list all scopes for a rucio account.

**Arguments**:

- `account`: the rucio account to list scopes for.

**Returns**:

a list containing the names of all scopes for a rucio account.

**Raises**:

- `AccountNotFound`: if account doesn't exist.
- `ScopeNotFound`: if no scopes exist for account.

<a name="subscriptionclient"></a>
# subscriptionclient

<a name="subscriptionclient.SubscriptionClient"></a>
## SubscriptionClient Objects

```python
class SubscriptionClient(BaseClient)
```

SubscriptionClient class for working with subscriptions

<a name="subscriptionclient.SubscriptionClient.add_subscription"></a>
#### add\_subscription

```python
 | add_subscription(name, account, filter, replication_rules, comments, lifetime, retroactive, dry_run, priority=3)
```

Adds a new subscription which will be verified against every new added file and dataset

**Arguments**:

- `name`: Name of the subscription
:type:  String
- `account`: Account identifier
:type account:  String
- `filter`: Dictionary of attributes by which the input data should be filtered
**Example**: ``{'dsn': 'data11_hi*.express_express.*,data11_hi*physics_MinBiasOverlay*', 'account': 'tzero'}``
:type filter:  Dict
- `replication_rules`: Replication rules to be set : Dictionary with keys copies, rse_expression, weight, rse_expression
:type replication_rules:  Dict
- `comments`: Comments for the subscription
:type comments:  String
- `lifetime`: Subscription's lifetime (days); False if subscription has no lifetime
:type lifetime:  Integer or False
- `retroactive`: Flag to know if the subscription should be applied on previous data
:type retroactive:  Boolean
- `dry_run`: Just print the subscriptions actions without actually executing them (Useful if retroactive flag is set)
:type dry_run:  Boolean
- `priority`: The priority of the subscription (3 by default)
:type priority: Integer

<a name="subscriptionclient.SubscriptionClient.list_subscriptions"></a>
#### list\_subscriptions

```python
 | list_subscriptions(name=None, account=None)
```

Returns a dictionary with the subscription information :
Examples: ``{'status': 'INACTIVE/ACTIVE/BROKEN', 'last_modified_date': ...}``

**Arguments**:

- `name`: Name of the subscription
:type:  String
- `account`: Account identifier
:type account:  String

**Returns**:

Dictionary containing subscription parameter
:rtype:   Dict
:raises: exception.NotFound if subscription is not found

<a name="subscriptionclient.SubscriptionClient.update_subscription"></a>
#### update\_subscription

```python
 | update_subscription(name, account=None, filter=None, replication_rules=None, comments=None, lifetime=None, retroactive=None, dry_run=None, priority=None)
```

Updates a subscription

**Arguments**:

- `name`: Name of the subscription
:type:  String
- `account`: Account identifier
:type account:  String
- `filter`: Dictionary of attributes by which the input data should be filtered
**Example**: ``{'dsn': 'data11_hi*.express_express.*,data11_hi*physics_MinBiasOverlay*', 'account': 'tzero'}``
:type filter:  Dict
- `replication_rules`: Replication rules to be set : Dictionary with keys copies, rse_expression, weight, rse_expression
:type replication_rules:  Dict
- `comments`: Comments for the subscription
:type comments:  String
- `lifetime`: Subscription's lifetime (days); False if subscription has no lifetime
:type lifetime:  Integer or False
- `retroactive`: Flag to know if the subscription should be applied on previous data
:type retroactive:  Boolean
- `dry_run`: Just print the subscriptions actions without actually executing them (Useful if retroactive flag is set)
:type dry_run:  Boolean
- `priority`: The priority of the subscription
:type priority: Integer
:raises: exception.NotFound if subscription is not found

<a name="subscriptionclient.SubscriptionClient.list_subscription_rules"></a>
#### list\_subscription\_rules

```python
 | list_subscription_rules(account, name)
```

List the associated rules of a subscription.

**Arguments**:

- `account`: Account of the subscription.
- `name`: Name of the subscription.

<a name="touchclient"></a>
# touchclient

<a name="touchclient.TouchClient"></a>
## TouchClient Objects

```python
class TouchClient(BaseClient)
```

Touch client class to send a trace that can be used to
update accessed_at for file or dataset DIDs

<a name="touchclient.TouchClient.touch"></a>
#### touch

```python
 | touch(scope, name, rse=None)
```

Sends a touch trace for a given file or dataset.

**Arguments**:

- `scope`: the scope of the file/dataset to update.
- `name`: the name of file/dataset to update.
- `rse`: optional parameter if a specific replica should be touched.

**Raises**:

- `DataIdentifierNotFound`: if given dids does not exist.
- `RSENotFound`: if rse is not None and given rse does not exist.
- `UnsupportedDIDType`: if type of the given DID is not FILE or DATASET.
- `RucioException`: if trace could not be sent successfully.

<a name="__init__"></a>
# \_\_init\_\_

<a name="dq2client"></a>
# dq2client

Compatibility Wrapper for DQ2 and Rucio.
     http://svnweb.cern.ch/world/wsvn/dq2/trunk/dq2.clients/lib/dq2/clientapi/DQ2.py

<a name="dq2client.DQ2Client"></a>
## DQ2Client Objects

```python
class DQ2Client()
```

<a name="dq2client.DQ2Client.finger"></a>
#### finger

```python
 | finger(userId=None)
```

User information lookup program.

**Arguments**:

- `userId`: The userId (Distinguished Name or account/nickname).

**Returns**:

A dictionary with the name nickname, email, dn.

B{Exceptions:}
- AccountNotFound is raised in case the account doesn't exist.

<a name="dq2client.DQ2Client.bulkDeleteDatasetReplicas"></a>
#### bulkDeleteDatasetReplicas

```python
 | bulkDeleteDatasetReplicas()
```

ToDo MARTIN

<a name="dq2client.DQ2Client.cancelReplicaDeletions"></a>
#### cancelReplicaDeletions

```python
 | cancelReplicaDeletions(dsn, locations, scope=None)
```

Cancel deletion request for a replica. In Rucio does nothing.

@param dsn: is the dataset.
@param locations: is a list with the dataset replica locations.
@param scope: is the dataset scope.

B{Exceptions:}
    - DataIdentifierNotFound is raised in case the dataset name doesn't exist.

<a name="dq2client.DQ2Client.checkDatasetConsistency"></a>
#### checkDatasetConsistency

```python
 | checkDatasetConsistency(location, dsn, version=0, threshold=None, scope=None)
```

This method does nothing in Rucio since there is no tracker. We just check if the dataset exist (by running a get metadata).

B{Exceptions:}
    - DataIdentifierNotFound is raised in case the dataset name doesn't exist.

<a name="dq2client.DQ2Client.closeDataset"></a>
#### closeDataset

```python
 | closeDataset(scope, dsn)
```

Closes the latest dataset version.

@since: 0.2.0

@param dsn: is the dataset name.
@param scope: is the dataset scope.

B{Exceptions:}
    - DataIdentifierNotFound is raised in case the dataset name doesn't exist.
    - UnsupportedOperation is raised in case the dataset is already closed.

@return True

<a name="dq2client.DQ2Client.declareBadFiles"></a>
#### declareBadFiles

```python
 | declareBadFiles()
```

ToDo Cedric

<a name="dq2client.DQ2Client.declareSuspiciousFiles"></a>
#### declareSuspiciousFiles

```python
 | declareSuspiciousFiles()
```

ToDo Cedric

<a name="dq2client.DQ2Client.deleteDatasetReplicas"></a>
#### deleteDatasetReplicas

```python
 | deleteDatasetReplicas(dsn, locations, version=0, force=False, deep=False, logical=False, ignore_lifetime=False, all=False, grace_period=None, ignore_pin=False, scope=None)
```

Delete the dataset replica from the given site.

@param dsn: is the dataset name.
@param locations: is a list with the dataset replica locations.
@param version: is the dataset version number.
@param ignore_pin: is an option to ignore the replica pin.
@param scope: is the dataset scope.

B{Exceptions:}
    - DataIdentifierNotFound is raised in case the dataset name doesn't exist.
    - AccessDenied in case the account cannot delete the rule.

<a name="dq2client.DQ2Client.deleteDatasetSubscription"></a>
#### deleteDatasetSubscription

```python
 | deleteDatasetSubscription(dsn, site, version=None, scope=None)
```

Removes the dataset/dataset version subscription of the given dataset name from the given site. In Rucio does nothing.

@param dsn: is the dataset name.
@param site: is the subscription dq2.location.
@param version: is the dataset version number (None is passed the duid will be used).
@param scope: is the dataset scope.

B{Exceptions}
    - DataIdentifierNotFound is raised in case the dataset name doesn't exist.

<a name="dq2client.DQ2Client.deleteDatasetSubscriptions"></a>
#### deleteDatasetSubscriptions

```python
 | deleteDatasetSubscriptions(dsn, scope=None)
```

Marks all dataset/dataset version subscriptions of the given dataset. In Rucio does nothing.

@param dsn: is the dataset name.
@param scope: is the dataset scope.

B{Exceptions}
    - DataIdentifierNotFound is raised in case the dataset name doesn't exist.

<a name="dq2client.DQ2Client.deleteDatasetVersionSubscriptions"></a>
#### deleteDatasetVersionSubscriptions

```python
 | deleteDatasetVersionSubscriptions(dsn, version, scope=None)
```

Removes all subscriptions of the given dataset version. In Rucio does nothing

@param dsn: is the dataset name.
@param version: is the dataset version number
@param scope: is the dataset scope.

B{Exceptions:}
    - DataIdentifierNotFound is raised in case the dataset name doesn't exist.

<a name="dq2client.DQ2Client.deleteDatasetsFromContainer"></a>
#### deleteDatasetsFromContainer

```python
 | deleteDatasetsFromContainer(name, datasets, scope)
```

Remove datasets from a container.

@param name: name of the container.
@type name: str
@param datasets: list of datasets to be registered.
    [dataset_name1, ..., dataset_nameN]
@type datasets: list

B{Exceptions:}
    - DataIdentifierNotFound is raised in case the container or dataset name doesn't exist.

@see: https://twiki.cern.ch/twiki/bin/view/Atlas/DonQuijote2ContainerCatalogUC0004

<a name="dq2client.DQ2Client.deleteFilesFromDataset"></a>
#### deleteFilesFromDataset

```python
 | deleteFilesFromDataset(dsn, guids=[], scope=None)
```

Removes files from an existing dataset. Files are
removed from the latest open version only.

@param dsn: is the dataset name.
@param guids: is a list of file unique identifiers (GUID).
Note: the GUID is typically assigned by external tools
(e.g. POOL) and must be passed along as is.
@param scope: is the dataset scope.

B{Exceptions:}
- DataIdentifierNotFound is raised in case the dataset name doesn't exist.

@return: List of lfns that failed to be added since they are duplicates?

<a name="dq2client.DQ2Client.eraseDataset"></a>
#### eraseDataset

```python
 | eraseDataset(dsn, scope)
```

Deletes the subscriptions and the locations

@param dsn: is the dataset name
@param scope: is the dataset scope.

B{Exceptions:}
    - DataIdentifierNotFound is raised in case the dataset name doesn't exist.

@return: List of statuses for subscription and deletion deletions

<a name="dq2client.DQ2Client.freezeDataset"></a>
#### freezeDataset

```python
 | freezeDataset(dsn, scope)
```

Freezes a dataset.

@param dsn: is the dataset name.
@param scope: is the dataset scope.

B{Exceptions:}
    - DataIdentifierNotFound is raised in case the dataset name doesn't exist.
    - UnsupportedOperation is raised in case the dataset is already closed.

@return True

<a name="dq2client.DQ2Client.getDatasetSize"></a>
#### getDatasetSize

```python
 | getDatasetSize(dsn, scope)
```

Used to get the dataset size

@param dsn: is the dataset name.
@param scope: is the dataset scope.

B{Exceptions:}
    - DataIdentifierNotFound is raised in case the dataset name doesn't exist.

@return: Size as integer

<a name="dq2client.DQ2Client.getMasterReplicaLocation"></a>
#### getMasterReplicaLocation

```python
 | getMasterReplicaLocation(dsn, version=0, scope=None)
```

Returns the master replicas location, in Rucio, this is the oldest rule.

@param dsn: is the dataset name.
@param version: the version (not used in Rucio.
@param scope: is the dataset scope.

B{Exceptions:}
    - DataIdentifierNotFound is raised in case the dataset name doesn't exist.

<a name="dq2client.DQ2Client.getMetaDataAttribute"></a>
#### getMetaDataAttribute

```python
 | getMetaDataAttribute(dsn, attributes, version=0, scope=None)
```

Get the metadata information for the given dataset/dataset version. In Rucio the version is ignored.

@param dsn: is the dataset name.
@param attributes: is a list of dataset metadata attributes.
@param version: is the dataset version (0 is the latest).
@param scope: is the dataset scope.

B{Exceptions:}
    - DataIdentifierNotFound is raised in case the dataset name doesn't exist.
    - InvalidMetadata is raised in case the metadata doesn't exist.

@return Dictionary in the following format:
    {'attribute_1': value_1, ..., 'attribute_N': value_N}

<a name="dq2client.DQ2Client.getNumberOfFiles"></a>
#### getNumberOfFiles

```python
 | getNumberOfFiles(dsn, version, scope)
```

Returns the number of files in the given dataset (or dataversion). In Rucio the version is ignored.

@param dsn: is the dataset name.
@param version: is the dataset version number. Ignored in Rucio.
@param scope: is the dataset scope.

B{Exceptions:}
    - DataIdentifierNotFound is raised in case the dataset name doesn't exist.

@return: Number of files (integer)

<a name="dq2client.DQ2Client.getState"></a>
#### getState

```python
 | getState(dsn, scope)
```

Returns the dataset state.

@param dsn: is the dataset name.
@param scope: is the dataset scope.

B{Exceptions:}
    - DataIdentifierNotFound is raised in case the dataset name doesn't exist.

@return: The dataset state (check L{dq2.common.DQConstants.DatasetState<common.DQConstants.DatasetState>}).

<a name="dq2client.DQ2Client.getVersionMetadata"></a>
#### getVersionMetadata

```python
 | getVersionMetadata(dsn, version=0, scope=None)
```

Retrieve data set version metadata.

@param dsn: is the dataset name.
@param version: is the dataset version number. Ignored in Rucio.
@param scope: is the dataset scope.


B{Exceptions:}
    - DataIdentifierNotFound is raised in case the dataset name doesn't exist.

@return: duid_10, vuid_10, version, versioncreationdate, tier0state, tier0type, numberfiles, size
@rtype: tuple

<a name="dq2client.DQ2Client.listDatasetReplicas"></a>
#### listDatasetReplicas

```python
 | listDatasetReplicas(dsn, version=0, complete=None, old=True, scope=None)
```

List the dataset replicas.

@param dsn
@param version: 0, no version in Rucio
@param complete:
@param old: if old=True, call list_data_locks(), otherwise call list_replicas()
@param scope:

B{Exceptions:}
    - DataIdentifierNotFound is raised in case the dataset name doesn't exist.
    - InvalidMetadata is raised in case the metadata doesn't exist.
@return Dictionary in the following format:
    {'rse_1':[{'attribute_1': value_1, ..., 'attribute_N': value_N}],'rse_2':[{...}]}

@Rucio
@pdn: always be ''
@archived: should be 'primary' or 'custodial' for replicas without lifetime and 'secondary' for replicas with lifetime.
@version: always be 0
@transferState: If one the files is replicating, transferState=1, otherwise 0
@chekState: always be 6
@immutable: should be 0 for open datasets and 1 for closed datasets.

@get_dataset_locks will help when option old=True is used

<a name="dq2client.DQ2Client.listDatasetReplicasInContainer"></a>
#### listDatasetReplicasInContainer

```python
 | listDatasetReplicasInContainer(cn, scope=None)
```

ToDo -> Jingya You

@return: a dictionary containing all dataset replicas for the container.
{ <dataset_1>:
           {<vuid>: {0: [<site_1>], 1: [<site_2>,<site_3>]}},
<dataset_2>:
          {<vuid>: {0: [<site_1>], 1: [<site_2>,<site_3>]}},
...}
@0:Incomplete, 1:Complete

({'rse_id': row.rse_id,
  'scope': row.scope,
  'name': row.name,
  'rule_id': row.rule_id,
  'account': row.account,
  'state': row.state})

<a name="dq2client.DQ2Client.listDatasets"></a>
#### listDatasets

```python
 | listDatasets(dsn, version=0, onlyNames=False, p=None, rpp=None, scope=None)
```

ToDo -> Jingya You

Used to return a list of datasets matching the given
pattern and version.

@param dsn: is the dataset name.
@param version: is the dataset version number.
@param onlyNames: Option to return only the dataset names.
@param rpp: Print rrp first results.
@param p: Specify page to print.
@param scope: is the dataset scope.

@DQ2
B{Exceptions:}
    - DQDaoException is raised,
        in case there is a python or database error in the central catalogs.

usage::
    listDatasets('myname') - returns all versions of the given dataset
    listDatasets('myname*') - returns all versions of the datasets that start by 'myname'.
    listDatasets('*myname') - returns all versions of the datasets that end by 'myname'. -> this should be avoid

    listDatasets('myname', 2) - returns the version 2 of dataset 'myname'.
    listDatasets('myname', 0) - returns the latest version of the dataset 'myname'.
    listDatasets('myname', <0) - returns all the versions of the dataset 'myname'.
    listDatasets('myname', ]-infinite, 0[) - returns all the versions of the dataset 'myname'.

    listDatasets('myname*', 2) - returns the version 2 of the datasets that start by 'myname'.
    listDatasets('*myname', None) - returns all the versions of the datasets that end with 'myname'.

@return: Dictionary containing the dataset versions information.
    {
        'dataset_nameA': {'duid': duid, 'vuids': ['A_vuid_for_version1+X', ..., 'A_vuid_for_version1']}
        'dataset_nameB': {'duid': duid, 'vuids': ['B_vuid_for_version1']}
    }, where X > 0

@Rucio
@return: No version in Rucio
   {
        'dataset_nameA': {'duid': rucio_did, 'vuids': [rucio_did]},
        'dataset_nameB': {'duid': rucio_did, 'vuids': [rucio_did]}...
   }

<a name="dq2client.DQ2Client.listDatasets2"></a>
#### listDatasets2

```python
 | listDatasets2(metaDataAttributes, long=False, all=False, p=None, rpp=None, scope=None)
```

ToDo -> Jingya You

Used to return a list of datasets matching the given
pattern and version.
In DQ2 the autorized metadata are :
state, type, name, duid, duid_10, vuid, version, creationdate, closeddate, deleteddate, frozendate,
modifieddate, tier0state, origin, tier0state, tier0type, physicsgroup
In Rucio the authorized metadata are :
state, type, name

@param metaDataAttributes: metadata attibutes for the sorting
@param long: List dataset in long format (total sum for all the file sizes + total num of files).
@param all: List all datasets, including the hidden ones.
@param rpp: Print rrp first results.
@param p: Specify page to print.

B{Exceptions:}
- InvalidMetadata is raised in case the metadata doesn't exist.

usage::
listDatasets(metaDataAttributes={name:'myname'}) - returns all datasets matching the pattern

@return: Dictionary containing the dataset information.
{
'dataset_nameA': {}
'dataset_nameB': {}
}

<a name="dq2client.DQ2Client.listDatasetsByCreationDate"></a>
#### listDatasetsByCreationDate

```python
 | listDatasetsByCreationDate()
```

ToDo

<a name="dq2client.DQ2Client.listDatasetsByGUIDs"></a>
#### listDatasetsByGUIDs

```python
 | listDatasetsByGUIDs(guids)
```

Returns a dictionary mapping guid to dataset names.
@since: 0.3.1

@param guids: a list of guids

B{Exceptions:}
    - RucioException is raised in case of exception.

@return: Returns the guid->dataset names mapping.::
    {'guid': [dsnX, dsnY]}
    or
    {}

<a name="dq2client.DQ2Client.listDatasetsByMetaData"></a>
#### listDatasetsByMetaData

```python
 | listDatasetsByMetaData(filter)
```

List the dataset versions that match the given criteria.
In DQ2 the autorized metadata are :
state, type, name, duid, duid_10, vuid, version, creationdate, closeddate, deleteddate, frozendate,
modifieddate, tier0state, origin, tier0state, tier0type, physicsgroup
In Rucio the authorized metadata are :
state, type, name

@param filter: list containing dictionaries of metadata attributes and values
    ({'attrname_0': attrvalue_0, ..., 'attrname_N': attrvalue_N}).

B{Exceptions:}
    - InvalidMetadata is raised in case the metadata doesn't exist.

@return: List of tuples with (dataset name, version).
    [
        ('dataset_name_1', 'vuid_1'),
        (...),
        ('dataset_name_N', 'vuid_N')
    ]

<a name="dq2client.DQ2Client.listDatasetsByNameInSite"></a>
#### listDatasetsByNameInSite

```python
 | listDatasetsByNameInSite(site, complete=None, name=None, p=None, rpp=None, group=None)
```

List datasets at site

@param site: is the location to be searched for.
@param complete: is the location state of the dataset at a site and may have
    the following values: None: in which case the
    location state is ignore; LocationState.COMPLETE: lists only datasets
    fully present at the site (no files missing);
    LocationState.INCOMPLETE: lists only datasets partially present at the
    site (some files missing).
@param page: is the page to be displayed.
@param rpp: are the results per page.
@param group: Not used

B{Exceptions:}
    - RSENotFound is raised in case the site doesn't exist.

@return: Tuple of dataset.
    ('dsn1', 'dsn2'... )

<a name="dq2client.DQ2Client.listDatasetsInContainer"></a>
#### listDatasetsInContainer

```python
 | listDatasetsInContainer(cn, scope)
```

ToDo -> Jingya You
@param cn: container name
@return: Not found in DQ2
@Rucio's return
[{u'adler32': None, u'name': u'2013-12-30_11', u'bytes': None, u'scope': u'ams-2014-ISS.B700-pass5', u'type': u'DATASET', u'md5': None}, \
{u'adler32': None, u'name': u'2013-12-30_12', u'bytes': None, u'scope': u'ams-2014-ISS.B700-pass5', u'type': u'DATASET', u'md5': None}, ....]

<a name="dq2client.DQ2Client.listDatasetsInSite"></a>
#### listDatasetsInSite

```python
 | listDatasetsInSite(site, complete=None, page=1, rpp=100)
```

List all the datasets and their versions available on
the given site.

@param site: is the location to be searched for.
@param complete: is the location state of the dataset at a site and may have
    the following values: None: in which case the
    location state is ignore; LocationState.COMPLETE: lists only datasets
    fully present at the site (no files missing);
    LocationState.INCOMPLETE: lists only datasets partially present at the
    site (some files missing).
@param page: is the page to be displayed.
@param rpp: are the results per page.

B{Exceptions:}
    - RSENotFound is raised in case the site doesn't exist.

@return: List of dataset versions.
    {'dsn': [version_numberX,... version_numberY]}

<a name="dq2client.DQ2Client.listFileReplicas"></a>
#### listFileReplicas

```python
 | listFileReplicas(location, dsn, version=0, scope=None)
```

@param dsn is the dataset name.
@param version is the dataset version number.
@param scope: is the dataset scope.
@param location is the location place of the dataset
B{Exceptions:}
    - DataIdentifierNotFound is raised in case the dataset name doesn't exist.
@ return dictionnary e.g.:
{'content': [guid1,...], 'transferState': 1, 'length': 46018142, 'checkstate': 6, 'found': 200, 'total': 200, 'immutable': 1}]

<a name="dq2client.DQ2Client.listFileReplicasBySites"></a>
#### listFileReplicasBySites

```python
 | listFileReplicasBySites(dsn, version=0, locations=[], threshold=None, timeout=None, scope=None)
```

Iterator to list file replica with info refresh if needed.

@param dsn: String - Dataset name to check.
@param version: Number - Dataset version to check, don't need to be implanted in Rucio.
@param locations: List of locations. Restrict result to a subset of locations.
@param threshold:  in seconds. Refresh info if checkdate < sysdate - threshold. `not` implanted
@param timeout:  in seconds. `neccessary`? There's no timeout exception in rucio.common.exception
@param scope: is the dataset scope.

@raise No replicas found, timeout

@Rucio
@version: always be 0
@transferState: If the files are replicating, transferState=1, otherwise 0
@checkState: always be 6
@immutable: should be 0 for open datasets and 1 for closed datasets.
@get_dataset_locks will help when option old=True is used

<a name="dq2client.DQ2Client.listFilesInDataset"></a>
#### listFilesInDataset

```python
 | listFilesInDataset(dsn, version=None, scope=None, long=False)
```

Given a dataset name, and optional version, the guids
and lfns of the files in the dataset are returned.

@param dsn: is the dataset name.
@param version: is the dataset version number (0 => the latest version). not in Rucio
@param scope: is the dataset scope.

B{Exceptions}:
    - DQDaoException is raised,
        in case there is a python or database error in the central catalogs.
    - DQUnknownDatasetException is raised,
        in case there is no dataset with the given name.

<a name="dq2client.DQ2Client.listMetaDataAttributes"></a>
#### listMetaDataAttributes

```python
 | listMetaDataAttributes()
```

ToDo

<a name="dq2client.DQ2Client.listMetaDataReplica"></a>
#### listMetaDataReplica

```python
 | listMetaDataReplica(location, dsn, version=0, scope=None)
```

Returns a list containing all metadata attributes for dataset replicas.

@param scope: is the dataset scope.

@since: 0.4.0

<a name="dq2client.DQ2Client.listSubscriptionInfo"></a>
#### listSubscriptionInfo

```python
 | listSubscriptionInfo(dsn, location, version, scope=None)
```

@param dsn: the dataset name.
@version: the dataset version. Ignored in Rucio.
@param scope: is the dataset scope.

B{Exceptions:}
    - DataIdentifierNotFound is raised in case the dataset name doesn't exist.

@return: tuple containing the dataset subscription information is returned.::
    (uid, owner, location, destination, creationdate, modifieddate, callbacks, archived, sources_policy, wait_for_sources, sources, query_more_sources, share)

<a name="dq2client.DQ2Client.listSubscriptions"></a>
#### listSubscriptions

```python
 | listSubscriptions(dsn, version=None, archived=None, scope=None)
```

Return a list of sites that have subscribed the given dataset.

@param dsn: is the dataset name.
@param version: is the dataset version number (0 is the latest).
@param archived: is the dataset subscription state.
@param scope: is the dataset scope.

B{Exceptions:}
    - DataIdentifierNotFound is raised in case the dataset name doesn't exist.

@return: List containing the sites that subscribed, at least, a version of the dataset.

<a name="dq2client.DQ2Client.listSubscriptionsInSite"></a>
#### listSubscriptionsInSite

```python
 | listSubscriptionsInSite(site, long=False)
```

Returns a dict of all subscribed uids in a site containing all attributes.

@param site: is the dataset subscription dq2.location.
@param long: List dataset in long format (total sum for all the file sizes + total num of files).

B{Exceptions:}
    - RSENotFound is raised in case the site doesn't exist.

@return: Returns a list of all subscribed uids in a site containing all attributes.
    {'dsn': [versionX, versionY]}

<a name="dq2client.DQ2Client.listSuspiciousFiles"></a>
#### listSuspiciousFiles

```python
 | listSuspiciousFiles()
```

ToDo

<a name="dq2client.DQ2Client.ping"></a>
#### ping

```python
 | ping()
```

Checks if the Rucio clients are well configured.

@return: dictionary containing the client's configuration settings.::
    {
        'rucio'      : (url_insecure, url_secure, alive),
    }

<a name="dq2client.DQ2Client.queryReplicaHistory"></a>
#### queryReplicaHistory

```python
 | queryReplicaHistory()
```

ToDo

<a name="dq2client.DQ2Client.queryStorageUsage"></a>
#### queryStorageUsage

```python
 | queryStorageUsage(key=None, value=None, site=None, metaDataAttributes={}, locations=[])
```

Returns a tuple containing storage usage infos .

@since: 0.4.6

<a name="dq2client.DQ2Client.queryStorageUsageHistory"></a>
#### queryStorageUsageHistory

```python
 | queryStorageUsageHistory(site, key='GRID', value='total')
```

Returns a tuple containing storage usage evolution.
@since: 0.4.*

<a name="dq2client.DQ2Client.registerContainer"></a>
#### registerContainer

```python
 | registerContainer(name, datasets=[], scope=None)
```

Creates a container.

@since: 1.0

@param name: name of the container.
@type name: str
@param datasets: list of datasets to be registered.
    [dataset_name1, ..., dataset_nameN]
@type datasets: list

@see: https://twiki.cern.ch/twiki/bin/view/Atlas/DonQuijote2ContainerCatalogUC0001

@raise DQContainerExistsException:
    in case a container with the same name already exists.

@return: None
@rtype: NoneType

<a name="dq2client.DQ2Client.registerDatasetLocation"></a>
#### registerDatasetLocation

```python
 | registerDatasetLocation(dsn, location, version=0, complete=0, group=None, archived=None, acl_alias=None, lifetime=None, pin_lifetime=None, activity=None, scope=None)
```

Register new replica of a dataset(which must already defined in the repository)

@param dsn: is the dataset name.
@param location: is the dataset dq2.location.(map to rucio RSE?)
@param version: is the dataset version number.
@param complete: is the location state of the dataset at a site and may have the following values:
    None: in which case the location state is ignore;
    LocationState.COMPLETE: lists only datasets fully present at the site (no files missing);
    LocationState.INCOMPLETE: lists only datasets partially present at the site (some files missing).
@param acl_alias: is the  acl_alias, e.g. custodial which will be assocaited with the replica.
@param archived: Obsolete argument (still here to maintain backward compatibility).
@param lifetime: Dataset replica lifetime. Acceptable formats are: "X days" or "X days, HH:MM:SS" or "HH:MM:SS".
@param pin_lifetime: Pin replica lifetime. Acceptable formats are: "X days" or "X days, HH:MM:SS" or "HH:MM:SS".
@param activity: is the activity.
@param scope: is the dataset scope.

B{Exceptions:}
    - DataIdentifierNotFound is raised in case the dataset name doesn't exist.
    - UnsupportedOperation is raised in case the location does not exist.

<a name="dq2client.DQ2Client.registerDatasetSubscription"></a>
#### registerDatasetSubscription

```python
 | registerDatasetSubscription(dsn, location, version=0, archived=None, callbacks={}, sources={}, sources_policy=None, wait_for_sources=0, destination=None, query_more_sources=0, sshare=None, group=None, owner=None, activity=None, acl_alias=None, replica_lifetime=None, check_destination=False, parentId=None, pin_lifetime=None, scope=None)
```

Register a new subscription in the location catalog. If the
version is not specified a duid is used.

@since: 0.2.0

@param dsn: is the dataset name.
@param location: is the location where the dataset should be subscribed.
@param version: not used.
@param archived: to define rule type.
@param callbacks: is a dictionary which specifies, per subscription callback.
@sources: not used.
@destination: not used.
@query_more_sources: not used.
@sshare: not used yet.
@group: not used.
@owner: not used yet.
@activity: is the activity.
@acl_alias: not used.
@replica_lifetime: is the replica lifetime.
@check_destination: not used.
@parentId: not used.
@pin_lifetime: not used.
@param scope: is the dataset scope.

<a name="dq2client.DQ2Client.registerDatasetsInContainer"></a>
#### registerDatasetsInContainer

```python
 | registerDatasetsInContainer(name, datasets, scope=None)
```

ToDo Ookey
Register datasets into a container.

@param name: name of the container.
@type name: str
@param datasets: list of datasets to be registered.
    [dataset_name1, ..., dataset_nameN]
@type datasets: list
@param scope: is the dataset scope.

@since: 1.0

@raise DQContainerIsInStateException:
    in case the container is closed or archived.
@raise DQContainerNotOwner:
    in case the user is not the owner of the container.
@raise DQContainerUnknownException:
    in case the container does not exist.

@see: https://twiki.cern.ch/twiki/bin/view/Atlas/DonQuijote2ContainerCatalogUC0003
@see: https://twiki.cern.ch/twiki/bin/view/Atlas/DonQuijote2ContainerCatalogUC0010
@see: https://twiki.cern.ch/twiki/bin/view/Atlas/DonQuijote2ContainerCatalogUC0011

<a name="dq2client.DQ2Client.registerFilesInDataset"></a>
#### registerFilesInDataset

```python
 | registerFilesInDataset(dsn, lfns=[], guids=[], sizes=[], checksums=[], ignore=False, scope=None, rse=None, pfns=[], events=[], lumiblocknrs=[])
```

Add existing files to an existing dataset.(attach file to dataset)

@param dsn: is the dataset name.
@param lfns: is a list of logical filenames (LFN).
@param guids: is a list of file unique identifiers (GUID).
@param sizes: is a list of the file sizes.
@param checksums: is a list of the file checksums.
    [md5:<md5_32_character_string>, ...]
@param ignore: is a boolean to ignore errors.
@param scope: is the dataset scope.
@param rse: is the rse.
@param pfns: is a list of PFN.
@param events: is a list of number of events.
@param lumiblocknrs: is a list of lumiblocks.

<a name="dq2client.DQ2Client.registerFilesInDatasets"></a>
#### registerFilesInDatasets

```python
 | registerFilesInDatasets(datasets, rse=None)
```

Add existing files to an existing dataset.(attach file to dataset)

@param dataset: is a dictionary containing the dataset name and a list of its files.
    {'dsn': [{'guid', 'vuid', 'lfn', 'size', 'checksum', 'scope'}]}
    where checksum is 'md5:<md5_32_character_string>'

<a name="dq2client.DQ2Client.registerNewDataset"></a>
#### registerNewDataset

```python
 | registerNewDataset(dsn, lfns=[], guids=[], sizes=[], checksums=[], cooldown=None, provenance=None, group=None, hidden=False, scope=None, rse=None, pfns=[], events=[], lumiblocknrs=[], activity=None)
```

Register a brand new dataset and associated files (lists of lfns and guids).
@since: 0.2.0

@param dsn: is the dataset name.
@param lfns: is a list of logical filenames (LFN).
@param guids: is a list of file unique identifiers (GUID).
Note: the GUID is typically assigned by external tools
(e.g. POOL) and must be passed along as is.
@param sizes: is a list of the file sizes.
@param checksums: is a list of the file checksums.
[md5:<md5_32_character_string>, ...]
@param cooldown: is a time delta after which the dataset will be automaticaly frozen.
Acceptable formats are: "X days" or "X days, HH:MM:SS" or "HH:MM:SS".
@param provenance: is the dataset provenance, e.g. TO.
@param group: is the delegated owning group.
@param hidden: hidden dataset.
@param scope: is the dataset scope.
@param rse: is the location of the files if lfns is not empty.
@param pfns: is a list of PFN.
@param events: is a list of number of events.
@param lumiblocknrs: is a list of lumiblocks.
@param activity: is the activity


B{Exceptions:}
- DQDaoException is raised,
in case there is a python or database error in the central catalogs.
- DQDatasetExistsException is raised,
in case there is a dataset with the given name.

@return: Dictionary containing the dataset duid, vuid and version information.::
{'duid': '...', 'vuid': '...', 'version': ...}

<a name="dq2client.DQ2Client.registerNewDataset2"></a>
#### registerNewDataset2

```python
 | registerNewDataset2(dsn, lfns=[], guids=[], sizes=[], checksums=[], cooldown=None, provenance=None, group=None, hidden=False, ignore=False, scope=None, rse=None)
```

Register a brand new dataset and associated files (lists of lfns and guids).

@since: 0.2.0

@param dsn: is the dataset name.
@param lfns: is a list of logical filenames (LFN).
@param guids: is a list of file unique identifiers (GUID).
Note: the GUID is typically assigned by external tools
(e.g. POOL) and must be passed along as is.
@param sizes: is a list of the file sizes.
@param checksums: is a list of the file checksums.
[md5:<md5_32_character_string>, ...]
@param cooldown: is a time delta after which the dataset will be automaticaly frozen.
Acceptable formats are: "X days" or "X days, HH:MM:SS" or "HH:MM:SS".
@param provenance: is the dataset provenance, e.g. TO.
@param group: is the delegated owning group.
@param hidden: hidden dataset.
@param scope: is the dataset scope.
@param rse: is the location of the files if lfns is not empty.


B{Exceptions:}
- DQDaoException is raised,
in case there is a python or database error in the central catalogs.
- DQDatasetExistsException is raised,
in case there is a dataset with the given name.

@return: Dictionary containing the dataset duid, vuid and version information.::
{'duid': '...', 'vuid': '...', 'version': ...}

<a name="dq2client.DQ2Client.registerNewVersion"></a>
#### registerNewVersion

```python
 | registerNewVersion(dsn, lfns=[], guids=[], sizes=[], checksums=[], ignore=False, scope=None)
```

Register a new version of the dataset with the
given additional files (lists of lfns and guids).
Plus, it notifies the subscription catalog for changes
on the dataset and on dataset previous version.

@since: 0.2.0

@param dsn: is the dataset name.
@param lfns: is a list of logical filenames (LFN).
@param guids: is a list of file unique identifiers (GUID).
Note: the GUID is typically assigned by external tools
(e.g. POOL) and must be passed along as is.
@param sizes: is a list of the file sizes.
@param checksums: is a list of the file checksums.
[md5:<md5_32_character_string>, ...]
@param scope: is the dataset scope.

B{Exceptions:}
- DataIdentifierNotFound is raised in case the dataset name doesn't exist.
- UnsupportedOperation otherwise.

<a name="dq2client.DQ2Client.registerNewVersion2"></a>
#### registerNewVersion2

```python
 | registerNewVersion2(dsn, lfns=[], guids=[], sizes=[], checksums=[], ignore=False, scope=None)
```

Register a new version of the dataset with the
given additional files (lists of lfns and guids).
Plus, it notifies the subscription catalog for changes
on the dataset and on dataset previous version.

@since: 0.2.0

@param dsn: is the dataset name.
@param lfns: is a list of logical filenames (LFN).
@param guids: is a list of file unique identifiers (GUID).
Note: the GUID is typically assigned by external tools
(e.g. POOL) and must be passed along as is.
@param sizes: is a list of the file sizes.
@param checksums: is a list of the file checksums.
[md5:<md5_32_character_string>, ...]
@param scope: is the dataset scope.

B{Exceptions:}
- DataIdentifierNotFound is raised in case the dataset name doesn't exist.
- UnsupportedOperation otherwise.

<a name="dq2client.DQ2Client.resetSubscription"></a>
#### resetSubscription

```python
 | resetSubscription(dsn, location, version=0, scope=None)
```

Reset the dataset subscription registered at the given dq2.location. In Rucio does nothing.

@since: 0.3.0

@param dsn: is the dataset name.
@param location: is the location where the dataset is subscribed.
@param version: is the dataset version number.
@param scope: is the dataset scope.

<a name="dq2client.DQ2Client.resetSubscriptionsInSite"></a>
#### resetSubscriptionsInSite

```python
 | resetSubscriptionsInSite(site)
```

Resets the subscriptions registered in the given site. In Rucio does nothing.

@since: 0.3.0

@param site: is the dataset subscription dq2.location.

B{Exceptions:}
    - DQDaoException is raised,
        in case there is a python or database error in the central catalogs.
    - DQUnknownSubscriptionException is raised,
        in case there are no subscriptions at the given site.

<a name="dq2client.DQ2Client.searchDatasets"></a>
#### searchDatasets

```python
 | searchDatasets()
```

ToDo

<a name="dq2client.DQ2Client.setDatasetReplicaToDeleted"></a>
#### setDatasetReplicaToDeleted

```python
 | setDatasetReplicaToDeleted()
```

ToDo

<a name="dq2client.DQ2Client.setMetaDataAttribute"></a>
#### setMetaDataAttribute

```python
 | setMetaDataAttribute(dsn, attrname, attrvalue, scope=None)
```

ToDo Ookey

Set the value of the given attribute to the given
value for the given dataset. Operates on the current version.

@since: 0.2.0

@param dsn: is the dataset name.
@param attrname: is the metadata dataset attribute name.
@param attrvalue: is the metadata dataset attribute value.
@param scope: is the dataset scope.

B{Exceptions:}
    - DQDaoException is raised,
        in case there is a python or database error in the central catalogs.
    - DQInvalidRequest is raised,
        in case the given parameters aren't valid.
    - DQSecurityException is raised,
        in case the user has no permissions to set metadata attributes on the dataset.
    - DQInvalidRequestException is raised,
        in case of an invalid attribute name.
    - DQUnknownDatasetException is raised,
        in case there is no dataset with the given name.

<a name="dq2client.DQ2Client.setReplicaMetaDataAttribute"></a>
#### setReplicaMetaDataAttribute

```python
 | setReplicaMetaDataAttribute(dsn, location, attrname, attrvalue, scope=None)
```

Set the value of the given attribute to the given
value for the given dataset replica. Operates on the current version.

@param dsn: is the dataset name.
@param location: is the location name.
@param attrname: is the metadata dataset attribute name.
@param attrvalue: is the metadata dataset attribute value.
@param scope: is dataset scope.

B{Exceptions:}
    - DataIdentifierNotFound is raised in case the dataset name doesn't exist.
    - InvalidMetadata is is raised in case of non valid attrname
    - InputValidationError is case of non valid attrvalue
    - UnsupportedOperation if the replica doesn't exist.

<a name="dq2client.DQ2Client.verifyFilesInDataset"></a>
#### verifyFilesInDataset

```python
 | verifyFilesInDataset(dsn, guids, version=None, scope=None)
```

Verifies if the given files' global unique identifiers (GUIDS) are registered on the dataset.

(since 0.4.0)

@param dsn: is the dataset name.
@param guids: is a list of file unique identifiers (GUID).
Note: the GUID is typically assigned by external tools
(e.g. POOL) and must be passed along as is.
@param version: is the dataset version number (0 => the latest version).
@param scope: is the dataset scope.

B{Exceptions}:
- DQDaoException is raised,
in case there is a python or database error in the central catalogs.
- DQUnknownDatasetException is raised,
in case there is no dataset with the given name.

@return: Dictionary with the following format:
{
GUIDX: True, # exist
(...)
GUIDY: False # don't exist
}

<a name="baseclient"></a>
# baseclient

Client class for callers of the Rucio system

<a name="baseclient.choice"></a>
#### choice

```python
@REGION.cache_on_arguments(namespace='host_to_choose')
choice(hosts)
```

Select randomly a host

**Arguments**:

- `hosts`: Lost of hosts

**Returns**:

A randomly selected host.

<a name="baseclient.BaseClient"></a>
## BaseClient Objects

```python
class BaseClient(object)
```

Main client class for accessing Rucio resources. Handles the authentication.

<a name="baseclient.BaseClient.__init__"></a>
#### \_\_init\_\_

```python
 | __init__(rucio_host=None, auth_host=None, account=None, ca_cert=None, auth_type=None, creds=None, timeout=600, user_agent='rucio-clients', vo=None)
```

Constructor of the BaseClient.

**Arguments**:

- `rucio_host`: The address of the rucio server, if None it is read from the config file.
- `rucio_port`: The port of the rucio server, if None it is read from the config file.
- `auth_host`: The address of the rucio authentication server, if None it is read from the config file.
- `auth_port`: The port of the rucio authentication server, if None it is read from the config file.
- `account`: The account to authenticate to rucio.
- `use_ssl`: Enable or disable ssl for commucation. Default is enabled.
- `ca_cert`: The path to the rucio server certificate.
- `auth_type`: The type of authentication (e.g.: 'userpass', 'kerberos' ...)
- `creds`: Dictionary with credentials needed for authentication.
- `user_agent`: Indicates the client.
- `vo`: The VO to authenticate into.

<a name="replicaclient"></a>
# replicaclient

<a name="replicaclient.ReplicaClient"></a>
## ReplicaClient Objects

```python
class ReplicaClient(BaseClient)
```

Replica client class for working with replicas

<a name="replicaclient.ReplicaClient.declare_bad_file_replicas"></a>
#### declare\_bad\_file\_replicas

```python
 | declare_bad_file_replicas(pfns, reason)
```

Declare a list of bad replicas.

**Arguments**:

- `pfns`: The list of PFNs.
- `reason`: The reason of the loss.

<a name="replicaclient.ReplicaClient.declare_bad_did_replicas"></a>
#### declare\_bad\_did\_replicas

```python
 | declare_bad_did_replicas(rse, dids, reason)
```

Declare a list of bad replicas.

**Arguments**:

- `rse`: The RSE where the bad replicas reside
- `dids`: The DIDs of the bad replicas
- `reason`: The reason of the loss.

<a name="replicaclient.ReplicaClient.declare_suspicious_file_replicas"></a>
#### declare\_suspicious\_file\_replicas

```python
 | declare_suspicious_file_replicas(pfns, reason)
```

Declare a list of bad replicas.

**Arguments**:

- `pfns`: The list of PFNs.
- `reason`: The reason of the loss.

<a name="replicaclient.ReplicaClient.get_did_from_pfns"></a>
#### get\_did\_from\_pfns

```python
 | get_did_from_pfns(pfns, rse=None)
```

Get the DIDs associated to a PFN on one given RSE

**Arguments**:

- `pfns`: The list of PFNs.
- `rse`: The RSE name.

**Returns**:

A list of dictionaries {pfn: {'scope': scope, 'name': name}}

<a name="replicaclient.ReplicaClient.list_replicas"></a>
#### list\_replicas

```python
 | list_replicas(dids, schemes=None, unavailable=False, all_states=False, metalink=False, rse_expression=None, client_location=None, sort=None, domain=None, resolve_archives=True, resolve_parents=False, updated_after=None)
```

List file replicas for a list of data identifiers (DIDs).

**Arguments**:

- `dids`: The list of data identifiers (DIDs) like :
[{'scope': <scope1>, 'name': <name1>}, {'scope': <scope2>, 'name': <name2>}, ...]
- `schemes`: A list of schemes to filter the replicas. (e.g. file, http, ...)
- `unavailable`: Also include unavailable replicas in the list.
- `metalink`: ``False`` (default) retrieves as JSON,
``True`` retrieves as metalink4+xml.
- `rse_expression`: The RSE expression to restrict replicas on a set of RSEs.
- `client_location`: Client location dictionary for PFN modification {'ip', 'fqdn', 'site'}
- `sort`: Sort the replicas: ``geoip`` - based on src/dst IP topographical distance
``closeness`` - based on src/dst closeness
``dynamic`` - Rucio Dynamic Smart Sort (tm)
- `domain`: Define the domain. None is fallback to 'wan', otherwise 'wan, 'lan', or 'all'
- `resolve_archives`: When set to True, find archives which contain the replicas.
- `resolve_parents`: When set to True, find all parent datasets which contain the replicas.
- `updated_after`: epoch timestamp or datetime object (UTC time), only return replicas updated after this time

**Returns**:

A list of dictionaries with replica information.

<a name="replicaclient.ReplicaClient.add_replica"></a>
#### add\_replica

```python
 | add_replica(rse, scope, name, bytes, adler32, pfn=None, md5=None, meta={})
```

Add file replicas to a RSE.

**Arguments**:

- `rse`: the RSE name.
- `scope`: The scope of the file.
- `name`: The name of the file.
- `bytes`: The size in bytes.
- `adler32`: adler32 checksum.
- `pfn`: PFN of the file for non deterministic RSE.
- `md5`: md5 checksum.
- `meta`: Metadata attributes.

**Returns**:

True if files were created successfully.

<a name="replicaclient.ReplicaClient.add_replicas"></a>
#### add\_replicas

```python
 | add_replicas(rse, files, ignore_availability=True)
```

Bulk add file replicas to a RSE.

**Arguments**:

- `rse`: the RSE name.
- `files`: The list of files. This is a list of DIDs like :
[{'scope': <scope1>, 'name': <name1>}, {'scope': <scope2>, 'name': <name2>}, ...]
- `ignore_availability`: Ignore the RSE blacklisting.

**Returns**:

True if files were created successfully.

<a name="replicaclient.ReplicaClient.delete_replicas"></a>
#### delete\_replicas

```python
 | delete_replicas(rse, files, ignore_availability=True)
```

Bulk delete file replicas from a RSE.

**Arguments**:

- `rse`: the RSE name.
- `files`: The list of files. This is a list of DIDs like :
[{'scope': <scope1>, 'name': <name1>}, {'scope': <scope2>, 'name': <name2>}, ...]
- `ignore_availability`: Ignore the RSE blacklisting.

**Returns**:

True if files have been deleted successfully.

<a name="replicaclient.ReplicaClient.update_replicas_states"></a>
#### update\_replicas\_states

```python
 | update_replicas_states(rse, files)
```

Bulk update the file replicas states from a RSE.

**Arguments**:

- `rse`: the RSE name.
- `files`: The list of files. This is a list of DIDs like :
[{'scope': <scope1>, 'name': <name1>, 'state': <state1>}, {'scope': <scope2>, 'name': <name2>, 'state': <state2>}, ...],
where a state value can be either of:
'A' (available)
'S' (suspicious)
'U' (unavailable)
'R' (recovered)
'B' (bad)
'L' (lost)
'D' (deleted)

**Returns**:

True if replica states have been updated successfully, otherwise an exception is raised.

<a name="replicaclient.ReplicaClient.list_dataset_replicas"></a>
#### list\_dataset\_replicas

```python
 | list_dataset_replicas(scope, name, deep=False)
```

List dataset replicas for a did (scope:name).

**Arguments**:

- `scope`: The scope of the dataset.
- `name`: The name of the dataset.
- `deep`: Lookup at the file level.

**Returns**:

A list of dict dataset replicas.

<a name="replicaclient.ReplicaClient.list_dataset_replicas_bulk"></a>
#### list\_dataset\_replicas\_bulk

```python
 | list_dataset_replicas_bulk(dids)
```

List dataset replicas for a did (scope:name).

**Arguments**:

- `dids`: The list of DIDs of the datasets.

**Returns**:

A list of dict dataset replicas.

<a name="replicaclient.ReplicaClient.list_dataset_replicas_vp"></a>
#### list\_dataset\_replicas\_vp

```python
 | list_dataset_replicas_vp(scope, name, deep=False)
```

List dataset replicas for a DID (scope:name) using the
Virtual Placement service.

NOTICE: This is an RnD function and might change or go away at any time.

**Arguments**:

- `scope`: The scope of the dataset.
- `name`: The name of the dataset.
- `deep`: Lookup at the file level.

**Returns**:

If VP exists a list of dicts of sites

<a name="replicaclient.ReplicaClient.list_datasets_per_rse"></a>
#### list\_datasets\_per\_rse

```python
 | list_datasets_per_rse(rse, filters=None, limit=None)
```

List datasets at a RSE.

**Arguments**:

- `rse`: the rse name.
- `filters`: dictionary of attributes by which the results should be filtered.
- `limit`: limit number.

**Returns**:

A list of dict dataset replicas.

<a name="replicaclient.ReplicaClient.add_bad_pfns"></a>
#### add\_bad\_pfns

```python
 | add_bad_pfns(pfns, reason, state, expires_at)
```

Declare a list of bad replicas.

**Arguments**:

- `pfns`: The list of PFNs.
- `reason`: The reason of the loss.
- `state`: The state of the replica. Either BAD, SUSPICIOUS, TEMPORARY_UNAVAILABLE
- `expires_at`: Specify a timeout for the TEMPORARY_UNAVAILABLE replicas. None for BAD files.

**Returns**:

True if PFNs were created successfully.

<a name="replicaclient.ReplicaClient.set_tombstone"></a>
#### set\_tombstone

```python
 | set_tombstone(replicas)
```

Set a tombstone on a list of replicas.

**Arguments**:

- `replicas`: list of replicas.

<a name="didclient"></a>
# didclient

<a name="didclient.DIDClient"></a>
## DIDClient Objects

```python
class DIDClient(BaseClient)
```

DataIdentifier client class for working with data identifiers

<a name="didclient.DIDClient.list_dids"></a>
#### list\_dids

```python
 | list_dids(scope, filters, type='collection', long=False, recursive=False)
```

List all data identifiers in a scope which match a given pattern.

**Arguments**:

- `scope`: The scope name.
- `filters`: A dictionary of key/value pairs like {'type': 'dataset', 'scope': 'test'}.
- `type`: The type of the did: 'all'(container, dataset or file)|'collection'(dataset or container)|'dataset'|'container'|'file'
- `long`: Long format option to display more information for each DID.
- `recursive`: Recursively list DIDs content.

<a name="didclient.DIDClient.list_dids_extended"></a>
#### list\_dids\_extended

```python
 | list_dids_extended(scope, filters, type='collection', long=False, recursive=False)
```

List all data identifiers in a scope which match a given pattern. Extended version that goes through plugin mechanism.

**Arguments**:

- `scope`: The scope name.
- `filters`: A dictionary of key/value pairs like {'type': 'dataset', 'scope': 'test'}.
- `type`: The type of the did: 'all'(container, dataset or file)|'collection'(dataset or container)|'dataset'|'container'|'file'
- `long`: Long format option to display more information for each DID.
- `recursive`: Recursively list DIDs content.

<a name="didclient.DIDClient.add_did"></a>
#### add\_did

```python
 | add_did(scope, name, type, statuses=None, meta=None, rules=None, lifetime=None, dids=None, rse=None)
```

Add data identifier for a dataset or container.

**Arguments**:

- `scope`: The scope name.
- `name`: The data identifier name.
:paran type: The data identifier type (file|dataset|container).
- `statuses`: Dictionary with statuses, e.g.g {'monotonic':True}.
:meta: Meta-data associated with the data identifier is represented using key/value pairs in a dictionary.
:rules: Replication rules associated with the data identifier. A list of dictionaries, e.g., [{'copies': 2, 'rse_expression': 'TIERS1'}, ].
- `lifetime`: DID's lifetime (in seconds).
- `dids`: The content.
- `rse`: The RSE name when registering replicas.

<a name="didclient.DIDClient.add_dids"></a>
#### add\_dids

```python
 | add_dids(dids)
```

Bulk add datasets/containers.

<a name="didclient.DIDClient.add_dataset"></a>
#### add\_dataset

```python
 | add_dataset(scope, name, statuses=None, meta=None, rules=None, lifetime=None, files=None, rse=None)
```

Add data identifier for a dataset.

**Arguments**:

- `scope`: The scope name.
- `name`: The data identifier name.
- `statuses`: Dictionary with statuses, e.g.g {'monotonic':True}.
:meta: Meta-data associated with the data identifier is represented using key/value pairs in a dictionary.
:rules: Replication rules associated with the data identifier. A list of dictionaries, e.g., [{'copies': 2, 'rse_expression': 'TIERS1'}, ].
- `lifetime`: DID's lifetime (in seconds).
- `files`: The content.
- `rse`: The RSE name when registering replicas.

<a name="didclient.DIDClient.add_datasets"></a>
#### add\_datasets

```python
 | add_datasets(dsns)
```

Bulk add datasets.

**Arguments**:

- `dsns`: A list of datasets.

<a name="didclient.DIDClient.add_container"></a>
#### add\_container

```python
 | add_container(scope, name, statuses=None, meta=None, rules=None, lifetime=None)
```

Add data identifier for a container.

**Arguments**:

- `scope`: The scope name.
- `name`: The data identifier name.
- `statuses`: Dictionary with statuses, e.g.g {'monotonic':True}.
- `meta`: Meta-data associated with the data identifier is represented using key/value pairs in a dictionary.
- `rules`: Replication rules associated with the data identifier. A list of dictionaries, e.g., [{'copies': 2, 'rse_expression': 'TIERS1'}, ].
- `lifetime`: DID's lifetime (in seconds).

<a name="didclient.DIDClient.add_containers"></a>
#### add\_containers

```python
 | add_containers(cnts)
```

Bulk add containers.

**Arguments**:

- `cnts`: A list of containers.

<a name="didclient.DIDClient.attach_dids"></a>
#### attach\_dids

```python
 | attach_dids(scope, name, dids, rse=None)
```

Attach data identifier.

**Arguments**:

- `scope`: The scope name.
- `name`: The data identifier name.
- `dids`: The content.
- `rse`: The RSE name when registering replicas.

<a name="didclient.DIDClient.detach_dids"></a>
#### detach\_dids

```python
 | detach_dids(scope, name, dids)
```

Detach data identifier

**Arguments**:

- `scope`: The scope name.
- `name`: The data identifier name.
- `dids`: The content.

<a name="didclient.DIDClient.attach_dids_to_dids"></a>
#### attach\_dids\_to\_dids

```python
 | attach_dids_to_dids(attachments, ignore_duplicate=False)
```

Add dids to dids.

**Arguments**:

- `attachments`: The attachments.
attachments is: [attachment, attachment, ...]
attachment is: {'scope': scope, 'name': name, 'dids': dids}
dids is: [{'scope': scope, 'name': name}, ...]
- `ignore_duplicate`: If True, ignore duplicate entries.

<a name="didclient.DIDClient.add_files_to_datasets"></a>
#### add\_files\_to\_datasets

```python
 | add_files_to_datasets(attachments, ignore_duplicate=False)
```

Add files to datasets.

**Arguments**:

- `attachments`: The attachments.
attachments is: [attachment, attachment, ...]
attachment is: {'scope': scope, 'name': name, 'dids': dids}
dids is: [{'scope': scope, 'name': name}, ...]
- `ignore_duplicate`: If True, ignore duplicate entries.

<a name="didclient.DIDClient.add_datasets_to_containers"></a>
#### add\_datasets\_to\_containers

```python
 | add_datasets_to_containers(attachments)
```

Add datasets_to_containers.

**Arguments**:

- `attachments`: The attachments.
attachments is: [attachment, attachment, ...]
attachment is: {'scope': scope, 'name': name, 'dids': dids}
dids is: [{'scope': scope, 'name': name}, ...]

<a name="didclient.DIDClient.add_containers_to_containers"></a>
#### add\_containers\_to\_containers

```python
 | add_containers_to_containers(attachments)
```

Add containers_to_containers.

**Arguments**:

- `attachments`: The attachments.
attachments is: [attachment, attachment, ...]
attachment is: {'scope': scope, 'name': name, 'dids': dids}
dids is: [{'scope': scope, 'name': name}, ...]

<a name="didclient.DIDClient.add_files_to_dataset"></a>
#### add\_files\_to\_dataset

```python
 | add_files_to_dataset(scope, name, files, rse=None)
```

Add files to datasets.

**Arguments**:

- `scope`: The scope name.
- `name`: The dataset name.
- `files`: The content.
- `rse`: The RSE name when registering replicas.

<a name="didclient.DIDClient.add_files_to_archive"></a>
#### add\_files\_to\_archive

```python
 | add_files_to_archive(scope, name, files)
```

Add files to archive.

**Arguments**:

- `scope`: The scope name.
- `name`: The dataset name.
- `files`: The content.

<a name="didclient.DIDClient.add_datasets_to_container"></a>
#### add\_datasets\_to\_container

```python
 | add_datasets_to_container(scope, name, dsns)
```

Add datasets to container.

**Arguments**:

- `scope`: The scope name.
- `name`: The dataset name.
- `dsns`: The content.

<a name="didclient.DIDClient.add_containers_to_container"></a>
#### add\_containers\_to\_container

```python
 | add_containers_to_container(scope, name, cnts)
```

Add containers to container.

**Arguments**:

- `scope`: The scope name.
- `name`: The dataset name.
- `dsns`: The content.

<a name="didclient.DIDClient.list_content"></a>
#### list\_content

```python
 | list_content(scope, name)
```

List data identifier contents.

**Arguments**:

- `scope`: The scope name.
- `name`: The data identifier name.

<a name="didclient.DIDClient.list_content_history"></a>
#### list\_content\_history

```python
 | list_content_history(scope, name)
```

List data identifier contents history.

**Arguments**:

- `scope`: The scope name.
- `name`: The data identifier name.

<a name="didclient.DIDClient.list_files"></a>
#### list\_files

```python
 | list_files(scope, name, long=None)
```

List data identifier file contents.

**Arguments**:

- `scope`: The scope name.
- `name`: The data identifier name.
- `long`: A boolean to choose if GUID is returned or not.

<a name="didclient.DIDClient.get_did"></a>
#### get\_did

```python
 | get_did(scope, name, dynamic=False)
```

Retrieve a single data identifier.

**Arguments**:

- `scope`: The scope name.
- `name`: The data identifier name.
- `dynamic`: Calculate sizes dynamically when True

<a name="didclient.DIDClient.get_metadata"></a>
#### get\_metadata

```python
 | get_metadata(scope, name, plugin='DID_COLUMN')
```

Get data identifier metadata

**Arguments**:

- `scope`: The scope name.
- `name`: The data identifier name.

<a name="didclient.DIDClient.get_metadata_bulk"></a>
#### get\_metadata\_bulk

```python
 | get_metadata_bulk(dids)
```

Bulk get data identifier metadata

**Arguments**:

- `dids`: A list of dids.

<a name="didclient.DIDClient.set_metadata"></a>
#### set\_metadata

```python
 | set_metadata(scope, name, key, value, recursive=False)
```

Set data identifier metadata

**Arguments**:

- `scope`: The scope name.
- `name`: The data identifier name.
- `key`: the key.
- `value`: the value.
- `recursive`: Option to propagate the metadata change to content.

<a name="didclient.DIDClient.set_metadata_bulk"></a>
#### set\_metadata\_bulk

```python
 | set_metadata_bulk(scope, name, meta, recursive=False)
```

Set data identifier metadata in bulk.

**Arguments**:

- `scope`: The scope name.
- `name`: The data identifier name.
- `meta`: the metadata key-values.
:type meta: dict
- `recursive`: Option to propagate the metadata change to content.

<a name="didclient.DIDClient.set_status"></a>
#### set\_status

```python
 | set_status(scope, name, **kwargs)
```

Set data identifier status

**Arguments**:

- `scope`: The scope name.
- `name`: The data identifier name.
- `kwargs`: Keyword arguments of the form status_name=value.

<a name="didclient.DIDClient.close"></a>
#### close

```python
 | close(scope, name)
```

close dataset/container

**Arguments**:

- `scope`: The scope name.
- `name`: The dataset/container name.

<a name="didclient.DIDClient.delete_metadata"></a>
#### delete\_metadata

```python
 | delete_metadata(scope, name, key)
```

Delete data identifier metadata

**Arguments**:

- `scope`: The scope name.
- `name`: The data identifier.
- `key`: the key.

<a name="didclient.DIDClient.list_did_rules"></a>
#### list\_did\_rules

```python
 | list_did_rules(scope, name)
```

List the associated rules of a data identifier.

**Arguments**:

- `scope`: The scope name.
- `name`: The data identifier name.

<a name="didclient.DIDClient.list_associated_rules_for_file"></a>
#### list\_associated\_rules\_for\_file

```python
 | list_associated_rules_for_file(scope, name)
```

List the associated rules a file is affected from..

**Arguments**:

- `scope`: The scope name.
- `name`: The file name.

<a name="didclient.DIDClient.get_dataset_by_guid"></a>
#### get\_dataset\_by\_guid

```python
 | get_dataset_by_guid(guid)
```

Get the parent datasets for a given GUID.

**Arguments**:

- `guid`: The GUID.

**Returns**:

A did

<a name="didclient.DIDClient.scope_list"></a>
#### scope\_list

```python
 | scope_list(scope, name=None, recursive=False)
```

List data identifiers in a scope.

**Arguments**:

- `scope`: The scope name.
- `name`: The data identifier name.
- `recursive`: boolean, True or False.

<a name="didclient.DIDClient.list_parent_dids"></a>
#### list\_parent\_dids

```python
 | list_parent_dids(scope, name)
```

List parent dataset/containers of a did.

**Arguments**:

- `scope`: The scope.
- `name`: The name.

<a name="didclient.DIDClient.create_did_sample"></a>
#### create\_did\_sample

```python
 | create_did_sample(input_scope, input_name, output_scope, output_name, nbfiles)
```

Create a sample from an input collection.

**Arguments**:

- `input_scope`: The scope of the input DID.
- `input_name`: The name of the input DID.
- `output_scope`: The scope of the output dataset.
- `output_name`: The name of the output dataset.
- `account`: The account.
- `nbfiles`: The number of files to register in the output dataset.

<a name="didclient.DIDClient.resurrect"></a>
#### resurrect

```python
 | resurrect(dids)
```

Resurrect a list of dids.

**Arguments**:

- `dids`: A list of dids [{'scope': scope, 'name': name}, ...]

<a name="didclient.DIDClient.add_temporary_dids"></a>
#### add\_temporary\_dids

```python
 | add_temporary_dids(dids)
```

Bulk add temporary data identifiers.

**Arguments**:

- `dids`: A list of dids.

<a name="didclient.DIDClient.list_archive_content"></a>
#### list\_archive\_content

```python
 | list_archive_content(scope, name)
```

List archive contents.

**Arguments**:

- `scope`: The scope name.
- `name`: The data identifier name.

<a name="didclient.DIDClient.list_dids_by_meta"></a>
#### list\_dids\_by\_meta

```python
 | list_dids_by_meta(scope=None, select={})
```

Gets all dids matching the values of the provided metadata keys

**Arguments**:

- `scope`: the scope of the search
- `select`: the key value pairs to search with(query in json format)

<a name="rseclient"></a>
# rseclient

<a name="rseclient.RSEClient"></a>
## RSEClient Objects

```python
class RSEClient(BaseClient)
```

RSE client class for working with rucio RSEs

<a name="rseclient.RSEClient.get_rse"></a>
#### get\_rse

```python
 | get_rse(rse)
```

Returns details about the referred RSE.

**Arguments**:

- `rse`: Name of the referred RSE

**Returns**:

A dict containing all attributes of the referred RSE

**Raises**:

- `RSENotFound`: if the referred RSE was not found in the database

<a name="rseclient.RSEClient.add_rse"></a>
#### add\_rse

```python
 | add_rse(rse, **kwargs)
```

Sends the request to create a new RSE.

**Arguments**:

- `rse`: the name of the rse.
- `deterministic`: Boolean to know if the pfn is generated deterministically.
- `volatile`: Boolean for RSE cache.
- `city`: City for the RSE.
- `region_code`: The region code for the RSE.
- `country_name`: The country.
- `continent`: The continent.
- `time_zone`: Timezone.
- `staging_area`: Staging area.
- `ISP`: Internet service provider.
- `rse_type`: RSE type.
- `latitude`: Latitude coordinate of RSE.
- `longitude`: Longitude coordinate of RSE.
- `ASN`: Access service network.
- `availability`: Availability.

**Returns**:

True if location was created successfully else False.

**Raises**:

- `Duplicate`: if rse already exists.

<a name="rseclient.RSEClient.update_rse"></a>
#### update\_rse

```python
 | update_rse(rse, parameters)
```

Update RSE properties like availability or name.

**Arguments**:

- `rse`: the name of the new rse.
- `parameters`: A dictionnary with property (name, read, write, delete as keys).

<a name="rseclient.RSEClient.delete_rse"></a>
#### delete\_rse

```python
 | delete_rse(rse)
```

Sends the request to delete a rse.

**Arguments**:

- `rse`: the name of the rse.

**Returns**:

True if location was created successfully else False.

<a name="rseclient.RSEClient.list_rses"></a>
#### list\_rses

```python
 | list_rses(rse_expression=None)
```

Sends the request to list all rucio locations(RSEs).

:rse_expression: RSE Expression to use as filter.

**Returns**:

a list containing the names of all rucio locations.

<a name="rseclient.RSEClient.add_rse_attribute"></a>
#### add\_rse\_attribute

```python
 | add_rse_attribute(rse, key, value)
```

Sends the request to add a RSE attribute.

**Arguments**:

- `rse`: the name of the rse.
- `key`: the attribute key.
- `value`: the attribute value.

**Returns**:

True if RSE attribute was created successfully else False.

**Raises**:

- `Duplicate`: if RSE attribute already exists.

<a name="rseclient.RSEClient.delete_rse_attribute"></a>
#### delete\_rse\_attribute

```python
 | delete_rse_attribute(rse, key)
```

Sends the request to delete a RSE attribute.

**Arguments**:

- `rse`: the RSE name.
- `key`: the attribute key.

**Returns**:

True if RSE attribute was deleted successfully else False.

<a name="rseclient.RSEClient.list_rse_attributes"></a>
#### list\_rse\_attributes

```python
 | list_rse_attributes(rse)
```

Sends the request to get RSE attributes.

**Arguments**:

- `rse`: The RSE name.

**Returns**:

A ``dict`` with the RSE attribute name/value pairs.

<a name="rseclient.RSEClient.add_protocol"></a>
#### add\_protocol

```python
 | add_protocol(rse, params)
```

Sends the request to create a new protocol for the given RSE.

**Arguments**:

- `rse`: the name of the  rse.
- `scheme`: identifier of this protocol
- `params`: Attributes of the protocol. Supported are:
hostname:       hostname for this protocol (default = localhost)
port:           port for this protocol (default = 0)
prefix:         string used as a prfeix for this protocol when generating the PFN (default = None)
impl:           qualified name of the implementation class for this protocol (mandatory)
read:           integer representing the priority of this procotol for read operations (default = -1)
write:          integer representing the priority of this procotol for write operations (default = -1)
delete:         integer representing the priority of this procotol for delete operations (default = -1)
extended_attributes:  miscellaneous protocol specific information e.g. spacetoken for SRM (default = None)

**Returns**:

True if protocol was created successfully else False.

**Raises**:

- `Duplicate`: if protocol with same hostname, port and protocol identifier
already exists for the given RSE.
- `RSENotFound`: if the RSE doesn't exist.
- `KeyNotFound`: if params is missing manadtory attributes to create the
protocol.
- `AccessDenied`: if not authorized.

<a name="rseclient.RSEClient.get_protocols"></a>
#### get\_protocols

```python
 | get_protocols(rse, protocol_domain='ALL', operation=None, default=False, scheme=None)
```

Returns protocol information. Parameter comibantions are:
(operation OR default) XOR protocol.

**Arguments**:

- `rse`: the RSE name.
- `protocol_domain`: The scope of the protocol. Supported are 'LAN', 'WAN', and 'ALL' (as default).
- `operation`: The name of the requested operation (read, write, or delete).
If None, all operations are queried.
- `default`: Indicates if only the default operations should be returned.
- `scheme`: The identifier of the requested protocol.

**Returns**:

A list with details about each matching protocol.

**Raises**:

- `RSENotFound`: if the RSE doesn't exist.
- `RSEProtocolNotSupported`: if no matching protocol entry could be found.
- `RSEOperationNotSupported`: if no matching protocol entry for the requested
operation could be found.

<a name="rseclient.RSEClient.lfns2pfns"></a>
#### lfns2pfns

```python
 | lfns2pfns(rse, lfns, protocol_domain='ALL', operation=None, scheme=None)
```

Returns PFNs that should be used at a RSE, corresponding to requested LFNs.
The PFNs are generated for the RSE *regardless* of whether a replica exists for the LFN.

**Arguments**:

- `rse`: the RSE name
- `lfns`: A list of LFN strings to translate to PFNs.
- `protocol_domain`: The scope of the protocol. Supported are 'LAN', 'WAN', and 'ALL' (as default).
- `operation`: The name of the requested operation (read, write, or delete).
If None, all operations are queried.
- `scheme`: The identifier of the requested protocol (gsiftp, https, davs, etc).

**Returns**:

A dictionary of LFN / PFN pairs.

**Raises**:

- `RSENotFound`: if the RSE doesn't exist.
- `RSEProtocolNotSupported`: if no matching protocol entry could be found.
- `RSEOperationNotSupported`: if no matching protocol entry for the requested
operation could be found.

<a name="rseclient.RSEClient.delete_protocols"></a>
#### delete\_protocols

```python
 | delete_protocols(rse, scheme, hostname=None, port=None)
```

Deletes matching protocols from RSE. Protocols using the same identifier can be
distinguished by hostname and port.

**Arguments**:

- `rse`: the RSE name.
- `scheme`: identifier of the protocol.
- `hostname`: hostname of the protocol.
- `port`: port of the protocol.

**Returns**:

True if success.

**Raises**:

- `RSEProtocolNotSupported`: if no matching protocol entry could be found.
- `RSENotFound`: if the RSE doesn't exist.
- `AccessDenied`: if not authorized.

<a name="rseclient.RSEClient.update_protocols"></a>
#### update\_protocols

```python
 | update_protocols(rse, scheme, data, hostname=None, port=None)
```

Updates matching protocols from RSE. Protocol using the same identifier can be
distinguished by hostname and port.

**Arguments**:

- `rse`: the RSE name.
- `scheme`: identifier of the protocol.
- `data`: A dict providing the new values of the protocol attibutes.
Keys must match column names in database.
- `hostname`: hostname of the protocol.
- `port`: port of the protocol.

**Returns**:

True if success.

**Raises**:

- `RSEProtocolNotSupported`: if no matching protocol entry could be found.
- `RSENotFound`: if the RSE doesn't exist.
- `KeyNotFound`: if invalid data was provided for update.
- `AccessDenied`: if not authorized.

<a name="rseclient.RSEClient.swap_protocols"></a>
#### swap\_protocols

```python
 | swap_protocols(rse, domain, operation, scheme_a, scheme_b)
```

Swaps the priorities of the provided operation.

**Arguments**:

- `rse`: the RSE name.
- `domain`: the domain in which priorities should be swapped i.e. wan or lan.
- `operation`: the operation that should be swapped i.e. read, write, or delete.
- `scheme_a`: the scheme of one of the two protocols to be swapped, e.g. srm.
- `scheme_b`: the scheme of the other of the two protocols to be swapped, e.g. http.

**Returns**:

True if success.

**Raises**:

- `RSEProtocolNotSupported`: if no matching protocol entry could be found.
- `RSENotFound`: if the RSE doesn't exist.
- `KeyNotFound`: if invalid data was provided for update.
- `AccessDenied`: if not authorized.

<a name="rseclient.RSEClient.add_qos_policy"></a>
#### add\_qos\_policy

```python
 | add_qos_policy(rse, qos_policy)
```

Add a QoS policy from an RSE.

**Arguments**:

- `rse_id`: The id of the RSE.
- `qos_policy`: The QoS policy to add.
- `session`: The database session in use.

**Raises**:

- `Duplicate`: If the QoS policy already exists.

**Returns**:

True if successful, except otherwise.

<a name="rseclient.RSEClient.delete_qos_policy"></a>
#### delete\_qos\_policy

```python
 | delete_qos_policy(rse, qos_policy)
```

Delete a QoS policy from an RSE.

**Arguments**:

- `rse_id`: The id of the RSE.
- `qos_policy`: The QoS policy to delete.
- `session`: The database session in use.

**Returns**:

True if successful, silent failure if QoS policy does not exist.

<a name="rseclient.RSEClient.list_qos_policies"></a>
#### list\_qos\_policies

```python
 | list_qos_policies(rse)
```

List all QoS policies of an RSE.

**Arguments**:

- `rse_id`: The id of the RSE.
- `session`: The database session in use.

**Returns**:

List containing all QoS policies.

<a name="rseclient.RSEClient.set_rse_usage"></a>
#### set\_rse\_usage

```python
 | set_rse_usage(rse, source, used, free)
```

Set RSE usage information.

**Arguments**:

- `rse`: the RSE name.
- `source`: the information source, e.g. srm.
- `used`: the used space in bytes.
- `free`: the free in bytes.

**Returns**:

True if successful, otherwise false.

<a name="rseclient.RSEClient.get_rse_usage"></a>
#### get\_rse\_usage

```python
 | get_rse_usage(rse, filters=None)
```

Get RSE usage information.

**Arguments**:

- `rse`: the RSE name.
- `filters`: dictionary of attributes by which the results should be filtered

**Returns**:

True if successful, otherwise false.

<a name="rseclient.RSEClient.list_rse_usage_history"></a>
#### list\_rse\_usage\_history

```python
 | list_rse_usage_history(rse, filters=None)
```

List RSE usage history information.

**Arguments**:

- `rse`: The RSE name.
- `filters`: dictionary of attributes by which the results should be filtered.

**Returns**:

list of dictionnaries.

<a name="rseclient.RSEClient.set_rse_limits"></a>
#### set\_rse\_limits

```python
 | set_rse_limits(rse, name, value)
```

Set RSE limit information.

**Arguments**:

- `rse`: The RSE name.
- `name`: The name of the limit.
- `value`: The feature value.

**Returns**:

True if successful, otherwise false.

<a name="rseclient.RSEClient.get_rse_limits"></a>
#### get\_rse\_limits

```python
 | get_rse_limits(rse)
```

Get RSE limits.

**Arguments**:

- `rse`: The RSE name.

**Returns**:

True if successful, otherwise false.

<a name="rseclient.RSEClient.delete_rse_limits"></a>
#### delete\_rse\_limits

```python
 | delete_rse_limits(rse, name)
```

Delete RSE limit information.

**Arguments**:

- `rse`: The RSE name.
- `name`: The name of the limit.

**Returns**:

True if successful, otherwise false.

<a name="rseclient.RSEClient.add_distance"></a>
#### add\_distance

```python
 | add_distance(source, destination, parameters)
```

Add a src-dest distance.

**Arguments**:

- `source`: The source.
- `destination`: The destination.
- `parameters`: A dictionnary with property.

<a name="rseclient.RSEClient.update_distance"></a>
#### update\_distance

```python
 | update_distance(source, destination, parameters)
```

Update distances with the given RSE ids.

**Arguments**:

- `source`: The source.
- `destination`: The destination.
- `parameters`: A dictionnary with property.

<a name="rseclient.RSEClient.get_distance"></a>
#### get\_distance

```python
 | get_distance(source, destination)
```

Get distances between rses.

**Arguments**:

- `source`: The source RSE.
- `destination`: The destination RSE.

:returns distance: List of dictionaries.

<a name="diracclient"></a>
# diracclient

<a name="diracclient.DiracClient"></a>
## DiracClient Objects

```python
class DiracClient(BaseClient)
```

DataIdentifier client class for working with data identifiers

<a name="diracclient.DiracClient.add_files"></a>
#### add\_files

```python
 | add_files(lfns, ignore_availability=False)
```

Bulk add files :
- Create the file and replica.
- If doesn't exist create the dataset containing the file as well as a rule on the dataset on ANY sites.
- Create all the ascendants of the dataset if they do not exist

**Arguments**:

- `lfns`: List of lfn (dictionary {'lfn': <lfn>, 'rse': <rse>, 'bytes': <bytes>, 'adler32': <adler32>, 'guid': <guid>, 'pfn': <pfn>}
- `ignore_availability`: A boolean to ignore blacklisted sites.

<a name="uploadclient"></a>
# uploadclient

<a name="uploadclient.UploadClient"></a>
## UploadClient Objects

```python
class UploadClient()
```

<a name="uploadclient.UploadClient.__init__"></a>
#### \_\_init\_\_

```python
 | __init__(_client=None, logger=None, tracing=True)
```

Initialises the basic settings for an UploadClient object

**Arguments**:

- `_client`: - Optional: rucio.client.client.Client object. If None, a new object will be created.
- `logger`: - logging.Logger object to use for uploads. If None nothing will be logged.

<a name="uploadclient.UploadClient.upload"></a>
#### upload

```python
 | upload(items, summary_file_path=None, traces_copy_out=None)
```

**Arguments**:

- `items`: List of dictionaries. Each dictionary describing a file to upload. Keys:
path                  - path of the file that will be uploaded
rse                   - rse expression/name (e.g. 'CERN-PROD_DATADISK') where to upload the file
did_scope             - Optional: custom did scope (Default: user.<account>)
did_name              - Optional: custom did name (Default: name of the file)
dataset_scope         - Optional: custom dataset scope
dataset_name          - Optional: custom dataset name
force_scheme          - Optional: force a specific scheme (if PFN upload this will be overwritten) (Default: None)
pfn                   - Optional: use a given PFN (this sets no_register to True, and no_register becomes mandatory)
no_register           - Optional: if True, the file will not be registered in the rucio catalogue
register_after_upload - Optional: if True, the file will be registered after successful upload
lifetime              - Optional: the lifetime of the file after it was uploaded
transfer_timeout      - Optional: time after the upload will be aborted
guid                  - Optional: guid of the file
- `summary_file_path`: Optional: a path where a summary in form of a json file will be stored
- `traces_copy_out`: reference to an external list, where the traces should be uploaded

**Returns**:

0 on success

**Raises**:

- `InputValidationError`: if any input arguments are in a wrong format
- `RSEBlacklisted`: if a given RSE is not available for writing
- `NoFilesUploaded`: if no files were successfully uploaded
- `NotAllFilesUploaded`: if not all files were successfully uploaded

