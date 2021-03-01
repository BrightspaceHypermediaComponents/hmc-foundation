/* eslint-env node */
const { createDefaultConfig } = require('@open-wc/testing-karma');
const merge = require('deepmerge');

module.exports = config => {
	config.set(
		merge(createDefaultConfig(config), {
			client: {
				mocha: {
					timeout : 6000 // 6 seconds - upped from 2 seconds
				}
			},
			files: [
				// runs all files ending with .test in the test folder,
				// can be overwritten by passing a --grep flag. examples:
				//
				// npm run test -- --grep test/foo/bar.test.js
				// npm run test -- --grep test/bar/*
				{ pattern: config.grep ? config.grep : 'components/**/*.test.js', type: 'module' },
			],
			// see the karma-esm docs for all options
			esm: {
				// if you are using 'bare module imports' you will need this option
				nodeResolve: true,
			},
			coverageIstanbulReporter: {
				thresholds: {
					// don't prevent tests from failing if we have bad coverage
					global: {
						statements: 0,
						lines: 0,
						branches: 0,
						functions: 0,
					},
				},
			},
		}),
	);
	return config;
};
