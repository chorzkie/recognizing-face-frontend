import React, { Component } from 'react'
import SignIn from './components/signIn/SignIn'
import Register from './components/register/Register'
import Navigation from './components/navigation/Navigation'
import Logo from './components/logo/Logo'
import Rank from './components/rank/Rank'
import ImageLinkForm from './components/imageLinkForm/ImageLinkForm'
import FaceRecognition from './components/faceRecognition/FaceRecognition'
import Particles from 'react-particles-js'
import { theParticles } from './components/particles/TheParticles'
import { writeImageUrlACT, changeRouteACT, signInLoadUserACT, predictFaceACT } from './stateManager/Actions'
import { connect } from 'react-redux'
import './App.css'


const mapDispatchToProps = (dispatch) => {
    return {
        writeImageUrl: (event) => dispatch(writeImageUrlACT(event.target.value)),
        changeRoute: (theRoute) => dispatch(changeRouteACT(theRoute)),
        signInLoadUser: (user) => dispatch(signInLoadUserACT(user)),
        predictFace: (url) => dispatch(predictFaceACT(url)),
    }
}

const mapStateToProps = (state) => {
    return {
        route: state.mainAppRED.route,
        isSignedIn: state.mainAppRED.isSignedIn,
        imageUrl: state.mainAppRED.imageUrl,
        box: state.mainAppRED.box,
        predictionStatus: state.mainAppRED.predictionStatus,
        user: state.mainAppRED.user
    }
}

export class App extends Component {

    render() {

        return (
            <div className="App">
                <Particles className='particles' params={theParticles} />
                {this.props.route === 'home' ?
                    <div>
                        <Navigation isSignedIn={this.props.isSignedIn} onRouteChange={this.props.changeRoute} />
                        <Logo />
                        <Rank name={this.props.user.name} entries={this.props.user.entries} />
                        <ImageLinkForm toPredictFace={this.props.predictFace} />
                        <FaceRecognition boxCoordinates={this.props.box} status={this.props.predictionStatus} imageUrl={this.props.imageUrl} />
                    </div>
                    :
                    (this.props.route === 'signin' ?
                        <div>
                            <SignIn onRouteChange={this.props.changeRoute} />
                        </div>
                        :
                        <div>
                            <Navigation isSignedIn={this.props.isSignedIn} onRouteChange={this.props.changeRoute} />
                            <Register onRouteChange={this.props.changeRoute} />
                        </div>
                    )
                }
            </div>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
