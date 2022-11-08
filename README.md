# Coinflip Busybox

Tinkering with Docker Compose, Prometheus and Grafana for learning purposes ✌️

## Project setup

A single webserver built with Node, Typescript and Express listening on port 3000. Multiple (at the time of writing two) consumers written in Ruby and Go that periodically ping the server to generate some traffic through Caddy (listening on port 8080).

Prometheus is setup to scrape both the application servers and Caddy. Grafana is setup to visualize Prometheus data.

## Quick start

**Note**: Assuming you have Docker and Docker Compose installed and setup.

```console
git clone git@github.com:Tmw/coinflip-busybox.git
cd coinflip-busybox
docker compose up
```

Observe the Grafana dashboard at http://localhost:9091

## Grafana Dashboards

The project contains three dashboards:

- NodeJS (Community ID: 11159)
- Caddy Exporter (Community ID: 14280)
- Coin Flip (custom)

All of these are managed through Grafana's provisioning feature. Their declaration files are located in `grafana/dashboards` which is mounted as a volume in the Grafana container.

## License

[MIT](./LICENSE)
