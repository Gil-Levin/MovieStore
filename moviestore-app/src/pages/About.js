import React, { Component } from 'react';
import '../css/About.css';

class About extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
            title: 'About Page'            
        }
    }
    
    render() {
        return (
            <div className='paragraph'>
                <h1>{this.state.title}</h1>
                <h2>Hello, my name is Gil.</h2>
                <h2>I am a software developer.</h2> 

                <p>Welcome to my first, so unique site.</p>
                <p>Maybe it took me a while, but this site was made from all my heart.</p>
                <p>This site will find you every movie you want to watch (that exists in my JSON file), with every keyword you can think of.</p>

                <p>Enjoy this site, and of course, enjoy the movies.</p>

                <div>
                    <img src="https://preview.redd.it/7qalrjf53th51.png?auto=webp&s=5394748cc864bcb0d0dd4b1809e17a3ef296e437" alt="funny" width="500" height="600" />
                </div>
            </div>
        )
    }
}

export default About;
