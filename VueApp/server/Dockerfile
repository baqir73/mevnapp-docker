FROM ubuntu:focal

RUN	apt update && \
	apt install -y curl && \
	curl -sL https://deb.nodesource.com/setup_12.x -o nodesource_setup.sh && \
	bash nodesource_setup.sh && \
	apt install -y nodejs

WORKDIR	/usr/app

COPY	package*.json ./

RUN	npm install

RUN 	npm install --save axios

COPY . .

EXPOSE 3080

CMD	npm run serve