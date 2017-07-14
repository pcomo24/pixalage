import React, { Component } from 'react';
import './App.css';
import SelectBar from './select_bar';
import Collage from './collage';
import axios from 'axios';

const API_KEY = '5609851-9683e4fd6f9edd344e14eb70b';
const root = 'https://pixabay.com/api/';
const base = `${root}?key=${API_KEY}&q=`;
const page = `&page=5`;

class App extends Component {
    constructor(props) {
       super(props);

       this.state = {
           pix: [],
        }
    }

    componentDidMount() {
        axios.get(`${base}purple${page}`)
            .then((res) => {
            const pix = res.data;
            this.setState({pix});
            console.log(pix);
            console.log(this.state.pix.hits[0]);
            })
    }

    render() {
        return (
            <div className="App">
            <div className="App-header">
                <h2>Pixalage</h2>
            </div>
            <div>
                <SelectBar />
            </div>
            <div>
                <Collage />
            </div>
            </div>
        );
    }
}

export default App;
