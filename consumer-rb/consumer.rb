require 'net/http'
DEFAULT_APP_URL = 'http://localhost:3000/flip'
APP_URL = URI(ENV['APP_URL'] || DEFAULT_APP_URL)
$stdout.sync = true

def make_call
  res = Net::HTTP::get(APP_URL)
  puts res
end

while true
  sleep 2
  make_call()
end
