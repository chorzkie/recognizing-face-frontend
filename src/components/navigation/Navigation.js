import React, { Component } from 'react'

export class Navigation extends Component {
    render() {
        return (
            <div>
                <nav style={{ display: 'flex', justifyContent: 'flex-end' }}>
                    <p
                        onClick={() => {this.props.onRouteChange('signin')}}
                        className='f4 link dim black underline pa3 pointer'>
                        { this.props.isSignedIn === true ?
                            'Sign Out' : 'Sign In'
                        }  
                    </p>
                </nav>
            </div >
        )
    }
}

export default Navigation
