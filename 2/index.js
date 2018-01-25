'use strict';

const AWSXRay = require('aws-xray-sdk')
const express = require('express');

AWSXRay.config([
	AWSXRay.plugins.EC2Plugin
]);
AWSXRay.captureHTTPsGlobal(require('http'));
AWSXRay.middleware.setSamplingRules({
	rules: [],
	default: {
		fixed_target: 1,
		rate: 1.0
	},
	version: 1
});

if (+(process.env.USE_PATCH)) {
	require('./patch')(Promise);
}

const app = express()
	.use(AWSXRay.express.openSegment(process.env.NAME))
	.use('/', require('./routes'))
	.use(AWSXRay.express.closeSegment())
	.listen(+(process.env.PORT));
