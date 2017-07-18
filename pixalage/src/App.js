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
const order = 'order=new';
const page = `&page=${pageNum}&per_page=${perPage}&${imgType}&${order}`;

//color scheme algorithm
function getScheme(colorVal, schemeVal) {
    const colors = ['Red', 'Orange', 'Yellow', 'Green', 'Blue', 'Purple'];
    const colorIndex = colors.indexOf(colorVal);
    let colorQ;

    if (schemeVal === 'Comp') {
        let compIndex = colorIndex - 3;
        if (compIndex < 0) {
            compIndex = colors.length + compIndex;
        }
        let compCol = colors[compIndex];
        colorQ = `${colors[colorIndex]}+${compCol}`
    } else if (schemeVal === 'Analog') {
        let anIndexUp = colorIndex + 1;
        let anIndexDn = colorIndex - 1;
        if (anIndexUp > colors.length - 1) {
            anIndexUp = 0 + anIndexUp - colors.length;
        } else if (anIndexDn < 0) {
           anIndexDn = colors.length + anIndexDn;
        };
        colorQ = `${colors[colorIndex]}+${colors[anIndexUp]}+${colors[anIndexDn]}`
    } else {
        colorQ = `${colors[colorIndex]}`
    }
    return colorQ;
};

//build parent component
class App extends Component {
    constructor(props) {
       super(props);

       this.state = {
           pix: [],
           size: '',
        }
    }

    processResults (pixArray, res, colorVal, catVal, sizeVal, schemeVal, stop) {
        console.log(`hits: ${res.data.totalHits}`);
        console.log(res.data.totalHits < sizeVal * sizeVal && schemeVal !== 'Mono');


        let pix = res.data;
        for (let i = 0; i < (sizeVal * sizeVal); i++) {
            let randNum = Math.floor(Math.random() * pix.hits.length);
            if (pix.hits[randNum]) {
                pixArray.push(pix.hits[randNum]);
                pix.hits.splice(randNum, 1);
            } else {
                //randNum = Math.floor(Math.random() * pixArray.length);
                //pixArray.push(pixArray[randNum]);
            }

            // console.log(`pixArray: ${pixArray}`);

            // console.log(`pixLen: ${pix.hits.length}`);
            // console.log(`pixArray: ${pixArray}`);

        }

        this.setState({
            pix: pixArray,
            size: sizeVal,
        });

        //if number of responses is less than required to build collage do...something
        if (!stop && res.data.totalHits) {
            if (res.data.totalHits < sizeVal * sizeVal && schemeVal !== 'Mono') {
                let colQuery = getScheme(colorVal, schemeVal);
                const colors = colQuery.split("+");
                console.log(colors);
                console.log(`color array: ${colors}`);
                var plist = [];
                for (var i=0; i < colors.length; i++) {
                    let color = colors[i];
                    console.log(color);
                    var p = axios.get(`${base}${color}+${catVal}${page}&category=${catVal}${orientation}`);
                    plist.push(p);
                }

                Promise.all(plist)
                    .then((results) => {
                        results.forEach((res) => {
                            this.processResults(pixArray, res, colorVal, catVal, sizeVal, schemeVal, true);
                        });
                    })
                    .catch((e) => {

                    })
            }
        }

        // console.log(`pixArray: ${pixArray}`);
        // console.log(`size: ${sizeVal}`);
        // console.log(`color: ${colorVal}`);
        // console.log(`category: ${catVal}`);
        // console.log(`get: ${this.state.pix}`);
    }
    getImages(colorVal, catVal, sizeVal, schemeVal) {
        console.log('SIZEVAL', sizeVal);
        //color scheme algorithm changes what gets queried
        let colQuery = getScheme(colorVal, schemeVal);
        console.log(`color query: ${colQuery}`);
        //change request based on scheme selection
        const getReq = `${base}${colQuery}+${catVal}${page}&category=${catVal}${orientation}`
        axios.get(getReq)
            .then((res) => {
                this.processResults([], res, colorVal, catVal, sizeVal, schemeVal);
            })
            .catch((err) => {
                console.error(err);
            })
    };

    render() {
        //console.log(`render: ${this.state.pix}`);
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
