import React, { Component } from 'react';
import './App.css';
import SelectBar from './select_bar';
import Collage from './collage';
import axios from 'axios';

//build query
const API_KEY = '5609851-9683e4fd6f9edd344e14eb70b';
const root = 'https://pixabay.com/api/';
const base = `${root}?key=${API_KEY}&q=`;
const perPage = 200;
const pageNum = 1;
var colorChoice = 'blue';
const page = `&page=${pageNum}&per_page=${perPage}`;


class App extends Component {
    constructor(props) {
       super(props);

       this.state = {
           pix: [],
        }
    }

    componentDidMount() {
        axios.get(`${base}${colorChoice}${page}`)
            .then((res) => {
                const pix = res.data;
                this.setState({pix: pix.hits[132].userImageURL});
                console.log(`mount: ${this.state.pix}`);
            })
            .catch((err) => {
                console.error(err);
            })
    }

    getImages(colorVal,catVal) {
        axios.get(`${base}${colorVal}${page}&category=${catVal}`)
            .then((res) => {
                const pix = res.data;
                this.setState({
                    pix: pix.hits[132].userImageURL
                });
                console.log(`color: ${colorVal}`);
                console.log(`category: ${catVal}`);
                console.log(`get: ${this.state.pix}`);
            })
    };

    render() {
        console.log(`render: ${this.state.pix}`);
        return (
            <div className="App">
            <div className="App-header">
                <h2>Pixalage</h2>
            </div>
            <div>
                <SelectBar
                    onColorChange={(colorVal, catVal) => this.getImages(colorVal, catVal)}
                />
            </div>
            <div>
                <Collage pix={this.state.pix} />
            </div>
            </div>
        );
    }
}

export default App;
