import React, { Component } from 'react';
import './settings.css';

class Settings extends Component {

    constructor(props) {
        super();
        this.state = props.config;
    }

    onChangeUrl = (event) => {
        this.setState({
            url: event.target.value
        })
    }

    onChange = (event, key) => {
        var data = {};
        data[key] = event.target.value;
        this.setState(data);
    }

    saveSettings = () => {
        this.props.updateConfig(this.state);
    }

    render() {
        return (
            <div style={this.props.style} className="settings">
                <p style={{ cursor: 'pointer' }} onClick={this.props.toggleSettings}>Settings</p>

                <div style={{ marginTop: 20 }} className="input-group mb-3">
                    <div className="input-group-prepend">
                        <span className="input-group-text">Label</span>
                    </div>
                    <input type="text" className="form-control" onChange={(e) => this.onChange(e, 'label')} value={this.state.label} />
                </div>
                <div style={{ marginTop: 7 }} className="input-group mb-3">
                    <div className="input-group-prepend">
                        <span className="input-group-text">JSON API</span>
                    </div>
                    <input type="text" className="form-control" onChange={(e) => this.onChange(e, 'url')} value={this.state.url} />
                </div>
                <div style={{ marginTop: 7 }} className="input-group mb-3">
                    <div className="input-group-prepend">
                        <span className="input-group-text">Poll Interval</span>
                    </div>
                    <input type="text" className="form-control" onChange={(e) => this.onChange(e, 'pollInterval')} value={this.state.pollInterval} />
                </div>
                <div style={{ marginTop: 7 }} className="input-group mb-3">
                    <div className="input-group-prepend">
                        <span className="input-group-text">Value Path</span>
                    </div>
                    <input type="text" className="form-control" onChange={(e) => this.onChange(e, 'valuePath')} value={this.state.valuePath} />
                </div>

                <button type="button" className="btn btn-secondary" onClick={this.saveSettings}>Update</button>
            </div>
        );
    }
}

export default Settings;
