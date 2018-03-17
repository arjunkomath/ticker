/**
 * @summary App home page file
 * @author Arjun Komath <arjunkomath@gmail.com>
 *
 * Created at     : 2018-02-25 15:47:50
 * Last modified  : 2018-03-17 14:02:00
 */

import React, { Component } from "react";
import "./App.css";
import "./odometer.css";

import axios from "axios";
import Odometer from "react-odometerjs";
import { ToastContainer, toast } from "react-toastify";

import Settings from "./components/settings";

let CONFIG = {
    alertAutoClose: 5000,
    autoHideTime: 15000,
    config: {
        label: "Bitcoin Price (USD)",
        url: "https://api.coindesk.com/v1/bpi/currentprice.json",
        valuePath: "bpi.USD.rate_float",
        pollInterval: 2500,
        backgroundColor: "#282b30",
        textColor: "#e3e3e3"
    }
};

class App extends Component {
    constructor() {
        super();
        this.state = {
            value: 0,
            style: {
                tickerTop: "50%",
                settingsBottom: -360
            },
            interval: null,
            hideControls: false
        };
        if (localStorage.getItem("config")) {
            try {
                this.state.config = JSON.parse(localStorage.getItem("config"));
            } catch (e) {
                this.state.config = CONFIG.config;
            }
            // restore default if missing
            this.state.config = Object.assign(
                {},
                CONFIG.config,
                this.state.config
            );
        } else {
            this.state.config = CONFIG.config;
        }

        this.controlsTimeout = null;
    }

    componentDidMount() {
        this.getData();
        var interval = setInterval(() => {
            this.getData();
        }, this.state.config.pollInterval);
        this.setState({
            interval: interval
        });
        this.showControls();
    }

    getData = async () => {
        var response = null,
            value = 0;
        try {
            response = await axios.get(this.state.config.url);
        } catch (e) {
            clearInterval(this.state.interval);
            this.toggleSettings();
            this.notifyError(
                "Oops! We're unable to fetch data, please update JSON API url"
            );
        }

        value = window._.get(response.data, this.state.config.valuePath);

        if (!value || isNaN(value)) {
            clearInterval(this.state.interval);
            this.toggleSettings();
            return this.notifyError(
                "The value from path doesn't seem to work!"
            );
        }

        this.setState({
            value: value
        });
    };

    notifyError = message =>
        toast.error(message, {
            position: toast.POSITION.TOP_CENTER,
            autoClose: CONFIG.alertAutoClose
        });

    updateConfig = async (config, reloadData) => {
        if (!reloadData) {
            this.setState({
                config: config
            });
            localStorage.setItem("config", JSON.stringify(config));
            return;
        }

        // check if any fields are empty
        if (!config.label || !config.url || !config.valuePath) {
            return this.notifyError("Please enter values for all fields");
        }

        // Validate poll interval
        if (isNaN(config.pollInterval) || config.pollInterval < 500) {
            return this.notifyError(
                "Please enter a valid number greater than 500"
            );
        }

        localStorage.setItem("config", JSON.stringify(config));

        // Restart our api call
        this.setState(
            {
                config: config
            },
            () => {
                // update data
                this.getData();

                clearInterval(this.state.interval);
                var interval = setInterval(() => {
                    this.getData();
                }, this.state.config.pollInterval);
                this.setState({
                    interval: interval
                });
                this.toggleSettings();
            }
        );
    };

    toggleSettings = () => {
        this.setState({
            showSettings: !this.state.showSettings,
            style: {
                tickerTop: !this.state.showSettings ? "32%" : "50%",
                settingsBottom: !this.state.showSettings ? -20 : -360
            }
        });
    };

    showControls = () => {
        console.log("showControls");
        if (this.state.hideControls) {
            this.setState({ hideControls: false });
        }
        if(this.controlsTimeout) {
            clearTimeout(this.controlsTimeout);
        }
        // autohide controls
        this.controlsTimeout = setTimeout(() => {
            this.setState({
                hideControls: true
            });
            if(this.state.showSettings) {
                this.toggleSettings();
            }
        }, CONFIG.autoHideTime);
    };

    render() {
        return (
            <div className="Container" onMouseMove={this.showControls}>
                <ToastContainer />
                <div className="header auto-hide">
                    <a
                        href="https://github.com/arjunkomath/ticker"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        about{" "}
                    </a>{" "}
                    <a
                        href="https://github.com/arjunkomath/ticker/issues"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        feedback{" "}
                    </a>{" "}
                    <a
                        href="https://github.com/arjunkomath/ticker"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        source{" "}
                    </a>{" "}
                </div>{" "}
                <div className="ticker">
                    <h2
                        style={{
                            top: this.state.style.tickerTop
                        }}
                        className="label"
                    >
                        {this.state.config.label}{" "}
                    </h2>{" "}
                    <div
                        style={{
                            top: this.state.style.tickerTop
                        }}
                        className="value"
                    >
                        <Odometer value={this.state.value} />{" "}
                    </div>{" "}
                </div>{" "}
                <Settings
                    config={this.state.config}
                    style={{
                        bottom: this.state.style.settingsBottom
                    }}
                    toggleSettings={this.toggleSettings}
                    updateConfig={this.updateConfig}
                />
                <style>
                    {" "}
                    {`body {
    margin: 0;
    padding: 0;
    font-family: 'Nunito', serif;
    overflow: hidden;
    background: ${this.state.config.backgroundColor};
    color: ${this.state.config.textColor};
}

.auto-hide {
    opacity: ${this.state.hideControls ? 0 : 1} !important;
}

.header a,
.input-group>.form-control,
.input-group>.input-group-prepend>.input-group-text {
    color: ${this.state.config.textColor};
}

.react-tabs__tab-list {
    border-bottom: 1px solid ${this.state.config.textColor};
}

.react-tabs__tab--selected,
.form-control,
.input-group-text {
    border-color: ${this.state.config.textColor};
}

.btn-secondary {
    color: ${this.state.config.backgroundColor};
    background-color: ${this.state.config.textColor};
    border-color: ${this.state.config.textColor};
}
`}{" "}
                </style>{" "}
            </div>
        );
    }
}

export default App;
