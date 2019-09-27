import React, { Component } from 'react'
import Tilt from 'react-tilt'
import './Logo.css'
import Robot from './Robot.svg'


export class Logo extends Component {
    render() {
        return (
            <div className='ma4 mt0'>
                <Tilt   className='Tilt br2 shadow-2'
                        options={{ max: 55 }}
                        style={{ height: 90, width: 90 }}>
                        <div className="Tilt-inner">
                            <img alt='logo' style={{paddingTop: '15px', height: 60, width: 60 }} src={Robot}/>
                        </div>
                </Tilt>
            </div>
                )
            }
        }
        
        export default Logo
