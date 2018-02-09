import React, { Component } from 'react';
import './App.css';
import './odometer.css';

import axios from 'axios';
import Odometer from 'react-odometerjs';
import { ToastContainer, toast } from 'react-toastify';

import Settings from './components/settings';

let CONFIG = {
    alertAutoClose: 5000,
    config: {
        label: 'Bitcoin Price (USD)',
        url: 'https://api.coindesk.com/v1/bpi/currentprice.json',
        valuePath: 'bpi.USD.rate_float',
        pollInterval: 2500,
    }
};

class App extends Component {

    constructor() {
        super();
        this.state = {
            value: 0,
            style: {
                tickerTop: '50%',
                settingsBottom: -300
            },
            interval: null
        };
        if (localStorage.getItem('config')) {
            try {
                this.state.config = JSON.parse(localStorage.getItem('config'));
            } catch (e) {
                this.state.config = CONFIG.config;
            }
        } else {
            this.state.config = CONFIG.config;
        }
    }

    componentDidMount() {
        this.getData();
        var interval = setInterval(() => {
            this.getData();
        }, this.state.config.pollInterval);
        this.setState({
            interval: interval
        });
    }

    getData = async () => {
        var response = null, value = 0;
        try {
            response = await axios.get(this.state.config.url);
        } catch (e) {
            clearInterval(this.state.interval);
            this.toggleSettings();
            this.notifyError("Oops! We're unable to fetch data, please update JSON API url");
        }

        value = window._.get(response.data, this.state.config.valuePath);

        if (!value || isNaN(value)) {
            clearInterval(this.state.interval);
            this.toggleSettings();
            return this.notifyError("The value from path doesn't seem to work!");
        }

        this.setState({
            value: value
        });
    }

    notifyError = (message) => toast.error(message, {
        position: toast.POSITION.TOP_CENTER,
        autoClose: CONFIG.alertAutoClose
    });

    updateConfig = async (config) => {
        // check if any fields are empty
        if (!config.label || !config.url || !config.valuePath) {
            return this.notifyError("Please enter values for all fields");
        }

        // Validate poll interval
        if (isNaN(config.pollInterval) || config.pollInterval < 500) {
            return this.notifyError("Please enter a valid number greater than 500");
        }

        localStorage.setItem('config', JSON.stringify(config));

        // update data
        this.getData();

        // Restart our api call
        this.setState({
            config: config,
        }, () => {
            clearInterval(this.state.interval);
            var interval = setInterval(() => {
                this.getData();
            }, this.state.config.pollInterval);
            this.setState({
                interval: interval
            });
            this.toggleSettings();
        });
    }

    toggleSettings = () => {
        this.setState({
            showSettings: !this.state.showSettings,
            style: {
                tickerTop: !this.state.showSettings ? '32%' : '50%',
                settingsBottom: !this.state.showSettings ? -20 : -300
            }
        })
    }

    render() {
        return (
            <div className="Container">
                <ToastContainer />
                <div className="ticker">
                    <h2 style={{ top: this.state.style.tickerTop }} className="label">{this.state.config.label}</h2>
                    <div style={{ top: this.state.style.tickerTop }} className="value">
                        <Odometer value={this.state.value} />
                    </div>
                </div>
                <Settings
                    config={this.state.config}
                    style={{ bottom: this.state.style.settingsBottom }}
                    toggleSettings={this.toggleSettings}
                    updateConfig={this.updateConfig} />
            </div>
        );
    }
}

export default App;
