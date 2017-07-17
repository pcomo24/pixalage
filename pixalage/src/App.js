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
const imgType = 'image_type=photo';
var colorChoice = 'blue';
const page = `&page=${pageNum}&per_page=${perPage}&${imgType}`;


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
                this.setState({pix: [pix.hits[132].userImageURL]});
                console.log(`mount: ${this.state.pix}`);
            })
            .catch((err) => {
                console.error(err);
            })
    }

    getImages(colorVal,catVal,sizeVal) {
        const pixArray = [];
        axios.get(`${base}${colorVal}${page}&category=${catVal}`)
            .then((res) => {

                var pix = res.data;
                //push to new array then delete from old array so it doesnt get used again
                console.log('pix: ${')
                for (let i = 0; i < (sizeVal * sizeVal); i++) {
                    let randNum = Math.floor(Math.random() * 200);
                    pixArray.push(pix.hits[randNum].userImageURL);

                }
                this.setState({
                    pix: pixArray
                });
                console.log(`pixArray: ${pixArray}`);
                console.log(`size: ${sizeVal}`);
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
                    onColorChange={(colorVal, catVal, sizeVal) => this.getImages(colorVal, catVal, sizeVal)}
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
