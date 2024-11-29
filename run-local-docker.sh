
cd src
npm install -g nx
npm i
nx build retail-usa
nx build-docker retail-usa --docker-registry=customer-docker-registry.com/backbase --image-tag=1.0.0
docker run -p4200:4200 -e API_ROOT="https://edge_host:edge_port/api" -e AUTH_URL="https://authserver_host:authserver_port/auth" -e CSP="default-src \'self\'; img-src \'self\'; script-src \'self\'; style-src \'self\' \'unsafe-inline\'" -e PORT=4200 customer-docker-registry.com/backbase/retail-usa:1.0.0


#Open the web app in the browser: http://localhost:4200/.