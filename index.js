// MIT License
// Copyright (c) 2026 Open2b
// See the LICENSE file for full text.

import { EndpointURLError, Krenalis } from './krenalis.js'
import { uuid } from './utils.js'

function loadSDK() {
	// Do nothing if the browser is not supported.
	if (!uuid) {
		return
	}

	const krenalis = globalThis.krenalis

	let e
	try {
		e = new Krenalis(krenalis.key, krenalis.url, krenalis.options, (sdk) => {
			// Apply the leading setup calls so events generated from the query
			// string use the initial consent, identity, and session state. Keep
			// later state changes in their original positions relative to
			// enqueued events.
			const methods = ['setConsents', 'setAnonymousId', 'startSession', 'endSession', 'reset']
			while (krenalis.length > 0) {
				const call = krenalis[0]
				const methodName = call[0]
				if (methods.indexOf(methodName) === -1) {
					break
				}
				// Remove the call before executing it, and report any error
				// without rethrowing it, so that an invalid call does not
				// prevent the SDK from becoming ready.
				krenalis.shift()
				try {
					sdk[methodName](...call.slice(1))
				} catch (error) {
					console.error(error)
				}
			}
		})
	} catch (error) {
		if (error instanceof EndpointURLError) {
			console.error(error.message)
			return
		}
		throw error
	}

	void e.ready(function () {
		const methods = [
			'alias',
			'close',
			'debug',
			'endSession',
			'getAnonymousId',
			'getSessionId',
			'group',
			'identify',
			'page',
			'ready',
			'reset',
			'screen',
			'setAnonymousId',
			'setConsents',
			'startSession',
			'track',
			'user',
		]
		for (let i = 0; i < methods.length; i++) {
			const method = methods[i]
			krenalis[method] = e[method].bind(e)
		}

		for (let i = 0; i < krenalis.length; i++) {
			const event = krenalis[i]
			krenalis[event[0]](...event.splice(1))
		}

		// empty the array.
		krenalis.length = 0

		globalThis.krenalis = e
	})
}

loadSDK()
