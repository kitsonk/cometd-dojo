.. _README:

===========
cometd-dojo
===========

``cometd-dojo`` is a package that "wraps" the common JavaScript client libraries for `CometD <http://cometd.org/>`_ as AMD modules with associated `CommonJS Package Manager <https://github.com/kriszyp/cpm>`_ packaging.

To load the client library, you would need to do something like this in your code::

  require(["cometd-dojo/main"], function(cometd){
    // cometd will create a singleton instance of the client library
  });

