FoonWiki
====
[![wercker status](https://app.wercker.com/status/bc898b19b3b38ec14fb9319ea3ab8cc7/s "wercker status")](https://app.wercker.com/project/bykey/bc898b19b3b38ec14fb9319ea3ab8cc7)

Build
-----
```
$ go build
```

Usage
-----
```
$ ./foon
```
add `-logstderr` option to output logs to console.

Development
-----
using [gin](https://github.com/codegangsta/gin) for live-reloading.  
`.env` file is necessary for local environment variables.
```
$ gin run main.go
```

About
---
Heavily inspired by [gyazz](http://gyazz.com).
