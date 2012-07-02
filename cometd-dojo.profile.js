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

var profile = (function(){
	var copyOnly = function(filename, mid){
		var list = {
			"cometd-dojo/cometd-dojo.profile": 1,
			"cometd-dojo/package.json": 1
		};
		return (mid in list) || (/^js\/org\/cometd\//.test(mid) && !/\.(css|html)$/.test(filename)) || /(png|jpg|jpeg|gif|tiff)$/.test(filename);
	};
	
	return {
		resourceTags: {
			copyOnly: function(filename, mid){
				return copyOnly(filename, mid);
			},
			
			amd: function(filename, mid){
				return !copyOnly(filename, mid) && /\.js$/.test(filename);
			}
		}
	};
});