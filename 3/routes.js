'use strict';

const express = require('express');
const http = require('http');

module.exports = express
	.Router()
	.get('/foo', (req, res) => {
		workA()
			.then(workB)
			.then(workFoo)
			.then(() => res.status(200).end());

	})
	.get('/bar', (req, res) => {
		workA()
			.then(workB)
			.then(workBar)
			.then(() => res.status(200).end());

	});

function workA() {
	return new Promise((resolve, reject) => {
		http
			.get({ protocol: 'http:', hostname: 'example.com', path: 'a' }, res => {
				res.resume();
				resolve();
			})
			.on('error', reject);
	});
}

const workB = (function () {
	let inflightRequest = null;

	return function() {
		if (!inflightRequest) {
			inflightRequest = new Promise((resolve, reject) => {
				http
					.get({ protocol: 'http:', hostname: 'example.com', path: 'b' }, res => {
						res.resume();
						resolve();
					})
					.on('error', reject);
			}).then(result => {
				inflightRequest = null;
				return result;
			}, error => {
				inflightRequest = null;
				throw error;
			});
		}

		return inflightRequest;
	};
})();

function workFoo() {
	return new Promise((resolve, reject) => {
		http
			.get({ protocol: 'http:', hostname: 'example.com', path: 'foo' }, res => {
				res.resume();
				resolve();
			})
			.on('error', reject);
	});
}

function workBar() {
	return new Promise((resolve, reject) => {
		http
			.get({ protocol: 'http:', hostname: 'example.com', path: 'bar' }, res => {
				res.resume();
				resolve();
			})
			.on('error', reject);
	});
}
