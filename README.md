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

These are the dashboards used if you want to import them.

<table>
<tr>
<th>Dashboard</th>
<th>File/ID</th>
</tr>
<tr>
<td>Coin-flip</td>
<td>./dashboard-model.json</td>
</tr>
<tr>
<td>NodeJS</td>
<td>grafana: 11159</td>
</tr>
<tr>
<td>Caddy Exporter</td>
<td>grafana: 14280</td>
</tr>
</table>

## License

[MIT](./LICENSE)
