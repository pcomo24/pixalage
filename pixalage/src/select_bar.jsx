import React, { Component } from 'react';



export default class SelectBar extends Component {
    constructor(props) {
        super(props);

        this.state = {
            colorVal: '',
            catVal: 'All',
            sizeVal: '2',
            schemeVal: 'Mono',
        }
    }
    render() {
        return (
        <div className="selectBar">
            <div className="selectBar">
                <label>Color</label>
                <select defaultValue="Choose a Color" onChange={(event) => this.onSelectInputChange(
                    event.target.value,
                    this.state.catVal,
                    this.state.sizeVal,
                    this.state.schemeVal)}>
                    <option disabled>Choose a Color</option>
                    <option>Red</option>
                    <option>Orange</option>
                    <option>Yellow</option>
                    <option>Green</option>
                    <option>Blue</option>
                    <option>Purple</option>
                </select>
            </div>
            <div className="selectBar">
                <label>Category</label>
                <select defaultValue="Choose Category" onChange={(event) => this.onSelectInputChange(
                    this.state.colorVal,
                    event.target.value,
                    this.state.sizeVal,
                    this.state.schemeVal)}>
                    <option disabled>Choose Category</option>
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
            <div className="selectBar">
                <label>Pixalage Size</label>
                <select defaultValue="Choose Pixalage Size" onChange={(event) => this.onSelectInputChange(
                    this.state.colorVal,
                    this.state.catVal,
                    event.target.value,
                    this.state.schemeVal)}>
                    <option disabled>Choose Pixalage Size</option>
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
            <div className="selectBar">
                <label>Color Scheme</label>
                <select defaultValue="Choose Color Scheme" onChange={(event) => this.onSelectInputChange(
                    this.state.colorVal,
                    this.state.catVal,
                    this.state.sizeVal,
                    event.target.value)}>
                    <option disabled>Choose Color Scheme</option>
                    <option>Mono</option>
                    <option>Analog</option>
                    <option>Comp</option>
                </select>
            </div>
        </div>
        );
    }
    //function called whenever a select option is changed, passes state to app.js to be used for API query building
    //sizeVal is passed up to app.js, then back down to collage.js to build collage size
    onSelectInputChange(color, category, size, scheme) {
        this.setState({
            colorVal: color,
            catVal: category,
            sizeVal: size,
            schemeVal: scheme
        });
        this.props.onSelectChange(color, category, size, scheme);
    }
}