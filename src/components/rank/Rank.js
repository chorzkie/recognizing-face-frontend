import React, { Component } from 'react'

export class Rank extends Component {
    render() {
        return (
            <div>
                <div className='white f3'>
                    {this.props.name}, your total image submissions so far is...
                </div>
                <div className='white f1'>
                {this.props.entries}
            </div>
            </div>
        )
    }
}

export default Rank
