import React, { Component } from 'react';
import './App.css';
import SelectBar from './select_bar';
import Collage from './collage';
import axios from 'axios';
import './style/style.css';

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
    //after original API response from this.getImages do this.processResults
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
                for (let j = 0; j < (sizeVal * sizeVal); j++) {
                    pixArray.push(pix.hits[randNum]);
                }
            }
        }

        this.setState({
            pix: pixArray,
            size: sizeVal,
        });

        //if stop is false and there is resp data, check if total hits are lower than size value and do another request
        // to get more images
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
                    //create a list of promises to keep API requests from editing same data at same time
                    var p = axios.get(`${base}${color}+${catVal}${page}&category=${catVal}${orientation}`);
                    plist.push(p);
                }

                /* ***FUTURE BUG FIX:send something out to process results that can be a token to say hey make an array
                 of this array with right # of objects***  */

                //Each API request gets data via 'res' and passes it along with other parameters to this.processResults,
                // and true sets flag to stop from running from line 81 again
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
    }
    getImages(colorVal, catVal, sizeVal, schemeVal) {
        console.log('SIZEVAL', sizeVal);
        //color scheme algorithm changes what gets queried in API request
        let colQuery = getScheme(colorVal, schemeVal);
        console.log(`color query: ${colQuery}`);
        const getReq = `${base}${colQuery}+${catVal}${page}&category=${catVal}${orientation}`
        //send API request and when it returns do processResults (see line +/- 57)
        axios.get(getReq)
            .then((res) => {
                this.processResults([], res, colorVal, catVal, sizeVal, schemeVal);
            })
            .catch((err) => {
                console.error(err);
            })
    };

    render() {
        return (
            <div className="App">
                <div className="Header">
                    <h2>Pixalage</h2>
                </div>
                <div>
                    <SelectBar className="SelectBar"
                        onSelectChange={(colorVal, catVal, sizeVal, schemeVal) => this.getImages(colorVal, catVal, sizeVal, schemeVal)}
                    />
                </div>
                <br /><br />
                <div className="Collage">
                    <Collage pix={this.state.pix} size={this.state.size}/>
                </div>
                <div className="Footer">
                    <label>Powered by</label>
                    <a href="https://pixabay.com" target="_blank" rel="noopener noreferrer">
                        <img src="https://pixabay.com/static/img/logo_square.svg" alt="pixabay logo" width="50"/>
                    </a>
                </div>
            </div>

        );
    }
}

export default App;
