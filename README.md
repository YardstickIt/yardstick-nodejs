# Yardstick NodeJS Library - Metrics Made Easy

Track metrics with the greatest ease. Your node.js application can track anything you wish for. We even integrate as node middleware which makes it super easy to get started.

# Getting Started

Getting started is super easy. The sample below describes what code you need to start tracking your HTTP requests. To install the Yardstick library type

    npm install yardstick-client

# Sample

    var express = require('express'),
    yardstick = require('yardstick-client'),
	app = express();

	app.use(yardstick("<YARDSTICK-API-KEY>"));

	app.get('/', function(req, res) {
		res.send('hello world');
	});

	console.log("Listening on port ", 3000);
	app.listen(3000);

This will ensure every http request will be tracked in Yardstick.