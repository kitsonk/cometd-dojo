/*
 * Copyright (c) 2010 the original author or authors.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

define([
	"dojo/request",
	"dojo/request/script",
	"./js/org/cometd/cometd-namespace.js",
	"./js/org/cometd/Cometd.js",
	"./js/org/cometd/LongPollingTransport.js",
	"./js/org/cometd/CallbackPollingTransport.js",
	"./js/org/cometd/Transport.js"
], function(request, script){

	var Cometd = function(name){
		var cometd = new org.cometd.Cometd(name);

		function LongPollingTransport(){
			var _super = new org.cometd.LongPollingTransport();
			var that = org.cometd.Transport.derive(_super);

			that.xhrSend = function(packet){
				var deferred = request.post(packet.url, {
					sync: packet.sync === true,
					contentType: 'application/json;charset=UTF-8',
					headers: packet.headers,
					postData: packet.body,
					withCredentials: true,
					handleAs: 'json'
				}).then(packet.onSuccess, function(err){
					packet.onError(err.message, deferred ? deferred.ioArgs.error : error);
				});
				return deferred.ioArgs.xhr;
			};

			return that;
		}

		function CallbackPollingTransport(){
			var _super = new org.cometd.CallbackPollingTransport();
			var that = org_cometd.Transport.derive(_super);

			that.jsonpSend = function(packet){
				var deferred = script.get(packet.url, {
					callback: 'jsonp',
					content: {
						// In callback-polling, the content must be sent via the 'message' parameter
						message: packet.body
					}
				}).then(packet.onSuccess, function(err){
					packet.onError(error.message, deferred ? deferred.ioArgs.error : error);
				});
				return undefined;
			};

			return that;
		}

		// Registration order is important
		if (org.cometd.WebSocket){
			cometd.registerTransport('websocket', new org.cometd.WebSocketTransport());
		}
		cometd.registerTransport('long-polling', new LongPollingTransport());
		cometd.registerTransport('callback-polling', new CallbackPollingTransport());

		return cometd;
	};

	return Cometd;

});