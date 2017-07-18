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
const orientation = '&orientation=horizontal';
const order = 'order=popular';
const page = `&page=${pageNum}&per_page=${perPage}&${imgType}&${order}`;

//build array for color scheme algorithm

var colorQ;

/*function getScheme(colorVal, schemeVal, colorQ) {
    const colors = ['Red', 'Orange', 'Yellow', 'Green', 'Blue', 'Purple'];
    var compIndex;
    var anIndexUp;
    var anIndexDn;
    let colorIndex = colors.indexOf(colorVal);
    if (schemeVal === 'Comp') {
        compIndex = colors[colorIndex - 2]
        if (compIndex < 0) {
            compIndex = colors.length - compIndex;
        } else {
            return;
        }
        colorQ = `${colors[colorIndex]}+${compIndex}`
    } else if (schemeVal === 'Analog') {
        anIndexUp = colors[colorIndex + 1];
        anIndexDn = colors[colorIndex - 1];
        if (anIndexUp > colors.length - 1) {
            anIndexUp = 0 + anIndexUp - colors.length-1;
        } else if (anIndexDn < 0) {
           anIndexDn = colors.length - anIndexDn;
        } else {
            return;
        }
        colorQ = `${colors[colorIndex]}+${colors[anIndexUp]}+${colors[anIndexDn]}`
    } else {
        colorQ = `${colors[colorIndex]}`
    }
    console.log(`colorQ: ${colorQ}`);
};*/

//build parent component
class App extends Component {
    constructor(props) {
       super(props);

       this.state = {
           pix: [],
           size: '',
        }
    }

    getImages(colorVal, catVal, sizeVal, schemeVal) {
        const pixArray = [];
        //color scheme algorithm changes what gets queried
        //var theColors = getScheme(colorVal, schemeVal, colorQ);
        //console.log(theColors);
        //change request based on scheme selection
        const getReq = `${base}${colorVal}+${catVal}${page}&category=${catVal}${orientation}`
        axios.get(getReq)
            .then((res) => {
                console.log(`query: ${getReq}`)
                var pix = res.data;
                //push to new array then delete from old array so it doesnt get used again
                for (let i = 0; i < (sizeVal * sizeVal); i++) {
                    let randNum = Math.floor(Math.random() * pix.hits.length);
                    pixArray.push(pix.hits[randNum]);
                    pix.hits.splice(randNum, 1);
                    console.log(`added: ${pixArray[pixArray.length - 1].id}`)
                    console.log(`deleted: ${pix.hits[randNum].id}`)
                    console.log(`pixLen: ${pix.hits.length}`);
                    console.log(`pixArray: ${pixArray}`);

                }
                this.setState({
                    pix: pixArray,
                    size: sizeVal,
                });
                console.log(`pixArray: ${pixArray}`);
                console.log(`size: ${sizeVal}`);
                console.log(`color: ${colorVal}`);
                console.log(`category: ${catVal}`);
                console.log(`get: ${this.state.pix}`);
            })
            .catch((err) => {
                console.error(err);
            })
    };

    render() {
        console.log(`render: ${this.state.pix}`);
        return (
            <div className="App">
            <div className="App-header">
                <h2>Pixalage</h2>
                <label>Powered by</label>
                <a href="https://pixabay.com" target="_blank" rel="noopener noreferrer">
                    <img src="https://pixabay.com/static/img/logo_square.svg" alt="pixabay logo" width="50"/>
                </a>
            </div>
            <div>
                <SelectBar
                    onSelectChange={(colorVal, catVal, sizeVal, schemeVal) => this.getImages(colorVal, catVal, sizeVal, schemeVal)}
                />
            </div>
            <div>
                <Collage pix={this.state.pix} size={this.state.size}/>
            </div>
            </div>
        );
    }
}

export default App;
