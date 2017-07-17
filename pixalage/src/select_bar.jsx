import React, { Component } from 'react';

export default class SelectBar extends Component {
    constructor(props) {
        super(props);

        this.state = {
            colorVal: 'Red',
            catVal: 'All',
            schemeVal: '',
            sizeVal: '',
        }
    }
    render() {
        return (
        <div>
            <div>
                <label>Color: {this.state.colorVal}</label>
                <select onChange={(event) => this.onColorInputChange(event.target.value, this.state.catVal, this.state.sizeVal)}>
                    <option>Red</option>
                    <option>Orange</option>
                    <option>Yellow</option>
                    <option>Green</option>
                    <option>Blue</option>
                    <option>Purple</option>
                </select>
            </div>
            <div>
                <label>Category: {this.state.catVal}</label>
                <select onChange={(event) => this.onColorInputChange(this.state.colorVal, event.target.value, this.state.sizeVal)}>
                    <option>All</option>
                    <option>Fashion</option>
                    <option>Nature</option>
                    <option>Backgrounds</option>
                    <option>Science</option>
                    <option>Education</option>
                    <option>People</option>
                    <option>Feelings</option>
                    <option>Religion</option>
                    <option>Health</option>
                    <option>Places</option>
                    <option>Animals</option>
                    <option>Industry</option>
                    <option>Food</option>
                    <option>Computer</option>
                    <option>Sports</option>
                    <option>Transportation</option>
                    <option>Travel</option>
                    <option>Buildings</option>
                    <option>Business</option>
                    <option>Music</option>
                </select>
            </div>
            <div>
                <label>Size: {this.state.sizeVal}</label>
                <select onChange={(event) => this.onColorInputChange(this.state.colorVal, this.state.catVal, event.target.value)}>
                    <option>1</option>
                    <option>2</option>
                    <option>3</option>
                    <option>4</option>
                    <option>5</option>
                    <option>6</option>
                    <option>7</option>
                    <option>8</option>
                    <option>9</option>
                    <option>10</option>
                </select>
            </div>
            <div>
                <label>Scheme: {this.state.schemeVal}</label>
                <select onChange={(scheme) => this.setState({schemeVal: scheme.target.value})}>
                    <option>Mono</option>
                    <option>Analog</option>
                    <option>Comp</option>
                </select>
            </div>
        </div>
        );
    }

    onColorInputChange(color, category, size) {
        this.setState({
            colorVal: color,
            catVal: category,
            sizeVal: size,
        });
        console.log(`onColorInputChange: ${this.state.colorVal},${this.state.catVal}, ${this.state.sizeVal}`)
        this.props.onColorChange(color, category, size);
    }
}