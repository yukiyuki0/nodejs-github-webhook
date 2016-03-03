#nodejs-github-webhook

## How to use

##### 1. Specify port and secret key from **index.js**

```javascript
var secret  = 'amazingkey';
var port    = 8081;
```

##### 2. Specify the git repository from **hook.sh**

```shell
#DIRECTORY TO THE REPOSITORY
REPOSITORY="./myrepository"
```

##### 3. Run the server

```
$ npm start
```
