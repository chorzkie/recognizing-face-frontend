import React, { Component } from 'react'
import './FaceRecognition.css'

export class FaceRecognition extends Component {
    render() {
        return (
            <div className='center'>
                <div className='f3 white mt3'>
                    {this.props.status}
                </div>

                <div className='absolute mt5 mb5'>
                    <img id='inputImage' alt='' src={this.props.imageUrl} width='400px' height='auto' />

                    {this.props.boxCoordinates.map((boxCoordinate, index) => {
                        return (
                            <div className='bounding-box'
                                key={index}
                                style={{
                                    top: boxCoordinate.topRow,
                                    right: boxCoordinate.rightCol,
                                    bottom: boxCoordinate.bottomRow,
                                    left: boxCoordinate.leftCol
                                }}>
                            </div>
                        )
                    })}
                </div>
            </div>
        )
    }
}

export default FaceRecognition
