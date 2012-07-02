/*
 * Copyright (c) 2010 the original author or authors.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

define([
	"dojo/json",  // JSON.stringify
	"dojo/topic",
	"./js/org/cometd/cometd-namespace.js",
	"./Cometd",
	"./js/org/cometd/cometd-json.js"
], function(JSON, topic, cometd_namespace, Cometd){

	// Remap cometd JSON functions to dojo JSON functions
	org.cometd.JSON.toJSON = JSON.stringify;
	org.cometd.JSON.fromJSON = JSON.parse;

	// The default cometd instance
	var cometd = new Cometd();

	// Create a compatibility API for Dojo cometd instance with the original API.
	cometd._init = cometd.init;
	cometd._unsubscribe = cometd.unsubscribe;
	cometd.unsubscribe = function(channelOrToken, objOrFunc, funcName){
		if (typeof channelOrToken === 'string'){
			throw 'Deprecated function unsubscribe(string). Use unsubscribe(object) passing as argument the return value of subscribe()';
		}
		cometd._unsubscribe(channelOrToken);
	};

	cometd._metaHandshakeEvent = function(event){
		event.action = "handshake";
		topic.publish("/cometd/meta", [event]);
	};

	cometd._metaConnectEvent = function(event){
		event.action = "connect";
		topic.publish("/cometd/meta", [event]);
	};

	cometd.addListener('/meta/handshake', cometd, cometd._metaHandshakeEvent);
	cometd.addListener('/meta/connect', cometd, cometd._metaConnectEvent);

	return cometd;
});
