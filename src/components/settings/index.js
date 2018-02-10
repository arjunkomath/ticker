import React, { Component } from 'react';
import './settings.css';

import { BlockPicker } from 'react-color';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';

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

    handleBgColorChangeComplete = (color, event) => {
        this.setState({ backgroundColor: color.hex });
    };

    handleTextColorChangeComplete = (color, event) => {
        this.setState({ textColor: color.hex });
    };

    saveSettings = (reload) => {
        this.props.updateConfig(this.state, reload);
    }

    render() {
        return (
            <div style={this.props.style} className="settings">
                <p style={{ cursor: 'pointer' }} onClick={this.props.toggleSettings}>Settings</p>

                <Tabs>
                    <TabList>
                        <Tab>API</Tab>
                        <Tab>Colors</Tab>
                    </TabList>

                    <TabPanel>
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
                    </TabPanel>
                    <TabPanel>
                        <BlockPicker
                            color={this.state.backgroundColor}
                            onChange={this.handleBgColorChangeComplete}
                            onChangeComplete={() => { this.saveSettings(false) }}
                            className="colorpicker" />
                        <BlockPicker
                            color={this.state.textColor}
                            onChange={this.handleTextColorChangeComplete}
                            onChangeComplete={() => { this.saveSettings(false) }}
                            className="colorpicker" />
                    </TabPanel>
                </Tabs>

            </div>
        );
    }
}

export default Settings;
