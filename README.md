### vue-cache

#### A library made to sync the routes with Vue store and fetch the data from any rest api.

#### It caches the data and it uses the data through out the app runtime.

### Install

#### npm install vuex weex-cache weex-axios --save

### Usage:

import cache from 'vue-cache'

Vue.use(cache, {baseUrl: 'Your main route',
				validateUrl: 'Your token validation route if any else just pass and empty string',
				authUrl: 'Your authentication route if any else just pass and empty string',
				authHeaders: ['authentication headers for the api token csrf and jwt, etc ... if any', 'epiry date etc ...'] // else don't pass anything,
				logoutUrl: 'Your logout url if any'
				})

### Usage through out the app:

#### Login:
this.$data.login(YourAuthParams).then(() => {// do whatever})

#### Logout:
this.$data.logout().then(() => {// do whatever})

#### Fetching data from api:
this.$data.fetchList('path to the api', 'what do you want to name that list', ['any sub routes']).then(val => {})

##### You can fetch n routes.

#### Ensuring that data of a specific type exists:

this.$data.ensureType('path to that entry', id).then(val => {})

#### Create, delete and update and sync data:
this.$data.addData('path to that entry', 'name of the list', data).then(() => {})
this.$data.updateData('path to that entry', 'name of the list', id, data).then(() => {})
this.$data.deleteData('path to that entry', 'name of the list', id).then(() => {})

#### Check if the user is authenticated:

this.$data.isAuthenticated() // returns a boolean

#### Setting current type to be fetched or manipulated:
this.$data.setActiveType('Your list type/name')

#### Loading more of the current type if there are any:

this.$data.loadMore().then(val => {})
