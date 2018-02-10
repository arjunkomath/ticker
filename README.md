# Ticker
[![All Contributors](https://img.shields.io/badge/all_contributors-1-orange.svg?style=flat-square)](#contributors)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](http://makeapullrequest.com)
[![MIT License](https://img.shields.io/github/license/arjunkomath/ticker.svg)](https://github.com/arjunkomath/ticker/blob/master/LICENSE)

![Screenshot](https://github.com/arjunkomath/ticker/blob/master/images/ticker.png?raw=true)

## What does this do?

What if you want a live view of the Bitcoin price to be shown on a big screen? Use Ticker! All you need is a json api that we can poll every x milliseconds to get the data you want to see.

## How?

You need to configure the following in the settings panel:

- `Label` Text that is shown above the live value
- `JSON API` An HTTPS api url that return a valid json with a number in it
- `Poll Interval` Interval (in ms) at which we should call the json api
- `Value Path` The path in json at which we can get the value to be shown

Here is an example where I'm getting the live price of Bitcoin in USD, I'll be using coindesk api.

```json
{
	"time": {
		"updated": "Feb 10, 2018 16:09:00 UTC",
		"updatedISO": "2018-02-10T16:09:00+00:00",
		"updateduk": "Feb 10, 2018 at 16:09 GMT"
	},
	"disclaimer": "This data was produced from the CoinDesk Bitcoin Price Index (USD). Non-USD currency data converted using hourly conversion rate from openexchangerates.org",
	"chartName": "Bitcoin",
	"bpi": {
		"USD": {
			"code": "USD",
			"symbol": "&#36;",
			"rate": "8,412.0838",
			"description": "United States Dollar",
			"rate_float": 8412.0838
		},
		"GBP": {
			"code": "GBP",
			"symbol": "&pound;",
			"rate": "6,082.4833",
			"description": "British Pound Sterling",
			"rate_float": 6082.4833
		},
		"EUR": {
			"code": "EUR",
			"symbol": "&euro;",
			"rate": "6,869.5600",
			"description": "Euro",
			"rate_float": 6869.56
		}
	}
}
```

- Label: Bitcoin Price (USD)
- JSON API: https://api.coindesk.com/v1/bpi/currentprice.json
- Poll Interval: 2500
- Value Path: bpi.USD.rate_float

![Settings](https://github.com/arjunkomath/ticker/blob/master/images/settings.png?raw=true)

## Contribute

If you have discovered a bug or have a feature suggestion, feel free to create an issue on Github.

If you'd like to make some changes yourself, see the following:
1. [Fork](https://help.github.com/articles/fork-a-repo/) this repository to your own GitHub account and then [clone](https://help.github.com/articles/cloning-a-repository/) it to your local device
2. Make sure yarn is globally installed (`npm install -g yarn`)
3. Run `yarn` to download required packages.
4. Build and start the application: `yarn start`
5. If you contributed something new, run `yarn contrib:add <your GitHub username>` to add yourself [below](#contributors)
6. Finally, submit a [pull request](https://help.github.com/articles/creating-a-pull-request-from-a-fork/) with your changes!

## Contributors

Thanks goes to these wonderful people ([emoji key](https://github.com/kentcdodds/all-contributors#emoji-key)):

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore -->
| [<img src="https://avatars2.githubusercontent.com/u/2260996?v=4" width="100px;"/><br /><sub><b>Sirajul Muneer</b></sub>](https://github.com/sirajulm)<br />[🎨](#design-sirajulm "Design") |
| :---: |
<!-- ALL-CONTRIBUTORS-LIST:END -->

This project follows the [all-contributors](https://github.com/kentcdodds/all-contributors) specification. Contributions of any kind welcome!