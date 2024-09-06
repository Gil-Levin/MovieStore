import React, { Component } from 'react'

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
                <h2>Hello, my name is Gil. </h2>
                <h2>I am a software developer.</h2> 

                Welcome to my first, so unique site.
                <br></br>Maybe it took me a while, but this site was made from all my heart. <br></br>
                <br></br>
                This site will find you every movie you want to watch (that exists in my json file),<br></br> 
                With every keyword you can think of. <br></br>
                <br></br>

                Enjoy this site,<br></br>
                And of course-<br></br>
                Enjoy the movies. 
                <br></br>
                <br></br>
            <div>
            <img src="https://preview.redd.it/7qalrjf53th51.png?auto=webp&s=5394748cc864bcb0d0dd4b1809e17a3ef296e437" alt ="funny" width="500" height="600"></img>
            </div>
            </div>
        )
    }
}
export default About
