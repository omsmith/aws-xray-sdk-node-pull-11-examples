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

// I explicitly wrote this _not_ to also dedupe, so it looks a little weird.
const workB = (function () {
	let cachedPromise = null;

	return function() {
		if (cachedPromise) {
			return cachedPromise;
		}

		const promise = new Promise((resolve, reject) => {
			http
				.get({ protocol: 'http:', hostname: 'example.com', path: 'b' }, res => {
					res.resume();
					resolve(res.statusCode);
				})
				.on('error', reject);
		}).then(result => {
			cachedPromise = promise;
			// clear the cache value later
			setTimeout(() => cachedPromise = null, 60 * 60 * 1000).unref();

			return result;
		});

		return promise;
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
