'use strict';

app.service('personServices',[ '$q', '$http' , function($q, $http) {
    var service = {
        'request': function (args) {
            var API_URL = '/person';

            args = args || {};
            var deferred = $q.defer(),
                url = API_URL + args.url,
                method = args.method || "GET",
                params = args.params || {},
                data = args.data || {};

            $http({
                url: url,
                method: method.toUpperCase(),
                params: params,
                data: data
            })
            .success(angular.bind(this, function (data, status, headers, config) {
                    deferred.resolve(data, status);
            }))
            .error(angular.bind(this, function (data, status, headers, config) {
                console.log("error syncing with: " + url);
                // Set request status
                deferred.reject(data, status, headers, config);
            }));
            return deferred.promise;
        },

        'getPerson': function() {
            return this.request({
                'method':"GET",
                'url':'/'
            })
        },

        'addPerson': function(args) {
            return this.request({
                'method': "POST",
                'url': '/',
                'data': args
            })
        },

        'editPerson': function(args) {
            return this.request({
				'method': "PUT",
				'url': "/"+args.id+"/",
                'data': args
			});
        },

        'deletePerson': function(id) {
            return this.request({
				'method': "DELETE",
				'url': "/"+id+"/"
			});
        },

        'seachPerson': function() {

        },
    };

    return service;
}]);