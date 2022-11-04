# Coinflip Busybox

Tinkering with Docker Compose, Prometheus and Grafana for learning purposes ✌️

## Project setup

A single webserver built with Node, Typescript and Express listening on port 3000. Multiple (at the time of writing two) consumers written in Ruby and Go that periodically ping the server to generate some traffic.

## Quick start

**Note**: Assuming you have Docker and Docker Compose installed and setup.

```console
git clone git@github.com:Tmw/coinflip-busybox.git
cd coinflip-busybox
docker-compose up
```

Observe the Grafana dashboard at http://localhost:9091

## License

[MIT](./LICENSE)
