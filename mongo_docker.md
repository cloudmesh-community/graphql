# Use MongoDB Docker image with Auth

## Pull desired mongodb image from DockerHUB

```bash
docker pull mongo:4.0-xenial
```

## Create data directory on host system

```bash
mkdir MongoTest
```

## Spawn docker container using following command

```bash
docker run -d -p 127.0.0.1:27017:27017 --mount type=bind,src=<absolute path to host dir MongoTest>,dst=/data/db -e MONGO_INITDB_ROOT_USERNAME=mongoadmin -e MONGO_INITDB_ROOT_PASSWORD=secret mongo:4.0-xenial mongod --auth
```

### In future we can read `username` and `password` from cloudmesh.yaml file. Here is the sample output of `docker ps`, we can see its already bind to localhost.

```bash
$ docker ps
CONTAINER ID        IMAGE               COMMAND                  CREATED             STATUS              PORTS                        NAMES
62b93f055248        mongo:4.0-xenial    "docker-entrypoint.s…"   2 seconds ago       Up 1 second         127.0.0.1:27017->27017/tcp   gallant_almeida
```

## Check logs to see auth is enabled

```bash
$ docker logs 62b93f055248
2019-10-08T09:30:58.153+0000 I STORAGE  [main] Max cache overflow file size custom option: 0
2019-10-08T09:30:58.154+0000 I CONTROL  [main] Automatically disabling TLS 1.0, to force-enable TLS 1.0 specify --sslDisabledProtocols 'none'
2019-10-08T09:30:58.156+0000 I CONTROL  [initandlisten] MongoDB starting : pid=1 port=27017 dbpath=/data/db 64-bit host=62b93f055248
2019-10-08T09:30:58.156+0000 I CONTROL  [initandlisten] db version v4.0.12
2019-10-08T09:30:58.156+0000 I CONTROL  [initandlisten] git version: 5776e3cbf9e7afe86e6b29e22520ffb6766e95d4
2019-10-08T09:30:58.156+0000 I CONTROL  [initandlisten] OpenSSL version: OpenSSL 1.0.2g  1 Mar 2016
2019-10-08T09:30:58.156+0000 I CONTROL  [initandlisten] allocator: tcmalloc
2019-10-08T09:30:58.156+0000 I CONTROL  [initandlisten] modules: none
2019-10-08T09:30:58.156+0000 I CONTROL  [initandlisten] build environment:
2019-10-08T09:30:58.156+0000 I CONTROL  [initandlisten]     distmod: ubuntu1604
2019-10-08T09:30:58.156+0000 I CONTROL  [initandlisten]     distarch: x86_64
2019-10-08T09:30:58.156+0000 I CONTROL  [initandlisten]     target_arch: x86_64
2019-10-08T09:30:58.156+0000 I CONTROL  [initandlisten] options: { net: { bindIpAll: true }, security: { authorization: "enabled" } }
2019-10-08T09:30:58.159+0000 W STORAGE  [initandlisten] Detected unclean shutdown - /data/db/mongod.lock is not empty.
2019-10-08T09:30:58.163+0000 I STORAGE  [initandlisten] Detected data files in /data/db created by the 'wiredTiger' storage engine, so setting the active storage engine to 'wiredTiger'.
2019-10-08T09:31:08.212+0000 I FTDC     [initandlisten] Initializing full-time diagnostic data capture with directory '/data/db/diagnostic.data'
2019-10-08T09:31:08.216+0000 I NETWORK  [initandlisten] waiting for connections on port 27017
2019-10-08T09:31:09.020+0000 I FTDC     [ftdc] Unclean full-time diagnostic data capture shutdown detected, found interim file, some metrics may have been lost. OK
2019-10-08T09:31:11.249+0000 I NETWORK  [listener] connection accepted from 172.17.0.1:33318 #1 (1 connection now open)
2019-10-08T09:31:11.250+0000 I NETWORK  [conn1] received client metadata from 172.17.0.1:33318 conn1: { application: { name: "robo3t" }, driver: { name: "MongoDB Internal Client", version: "4.0.5-18-g7e327a9" }, os: { type: "Darwin", name: "Mac OS X", architecture: "x86_64", version: "18.7.0" } }
2019-10-08T09:31:11.272+0000 I ACCESS   [conn1] Successfully authenticated as principal mongoadmin on admin from client 172.17.0.1:33318
2019-10-08T09:31:11.313+0000 I NETWORK  [listener] connection accepted from 172.17.0.1:33320 #2 (2 connections now open)
2019-10-08T09:31:11.314+0000 I NETWORK  [conn2] received client metadata from 172.17.0.1:33320 conn2: { application: { name: "MongoDB Shell" }, driver: { name: "MongoDB Internal Client", version: "4.0.5-18-g7e327a9" }, os: { type: "Darwin", name: "Mac OS X", architecture: "x86_64", version: "18.7.0" } }
2019-10-08T09:31:11.340+0000 I ACCESS   [conn2] Successfully authenticated as principal mongoadmin on admin from client 172.17.0.1:33320
2019-10-08T09:31:12.864+0000 I NETWORK  [conn1] end connection 172.17.0.1:33318 (1 connection now open)
2019-10-08T09:31:12.866+0000 I NETWORK  [conn2] end connection 172.17.0.1:33320 (0 connections now open)
2019-10-08T09:31:18.396+0000 I NETWORK  [listener] connection accepted from 172.17.0.1:33322 #3 (1 connection now open)
2019-10-08T09:31:18.396+0000 I NETWORK  [conn3] received client metadata from 172.17.0.1:33322 conn3: { application: { name: "robo3t" }, driver: { name: "MongoDB Internal Client", version: "4.0.5-18-g7e327a9" }, os: { type: "Darwin", name: "Mac OS X", architecture: "x86_64", version: "18.7.0" } }
2019-10-08T09:31:18.421+0000 I NETWORK  [conn3] end connection 172.17.0.1:33322 (0 connections now open)
```

## Check connection from robo3T with and without passing credentials and confirm if it authorization is enabled
