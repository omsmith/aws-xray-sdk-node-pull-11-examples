#!/bin/sh

curl http://localhost:3000/foo &
curl http://localhost:3000/bar &

curl http://localhost:3001/foo &
curl http://localhost:3001/bar &

curl http://localhost:3002/foo
curl http://localhost:3002/bar

curl http://localhost:3003/foo
curl http://localhost:3003/bar

curl http://localhost:3004/foo &
curl http://localhost:3004/bar &

curl http://localhost:3005/foo &
curl http://localhost:3005/bar &
