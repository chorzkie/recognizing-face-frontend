import React, { Component } from 'react'
import { writeEmailACT, writePasswordACT, submitSignInACT } from './Actions'
import { connect } from 'react-redux'

const mapDispatchToProps = (dispatch) => {
    return {
        emailChange: (event) => dispatch(writeEmailACT(event.target.value)),
        passwordChange: (event) => dispatch(writePasswordACT(event.target.value)),
        submitSignIn: (email, password) => dispatch(submitSignInACT(email, password)),
    }
}

const mapStateToProps = (state) => {
    return {
        email: state.signInRED.email,
        password: state.signInRED.password,
        signingInMessage: state.signInRED.signingInMessage,
        isPending: state.signInRED.isPending,
        registeredMessage: state.signInRED.registeredMessage,
    }
}

export class SignIn extends Component {

    onSubmitSignIn = (event) => {
        event.preventDefault()
        this.props.submitSignIn(this.props.email, this.props.password)
    }

    render() {
        return (
            <div className="mt5">
                <article className="br3 ba dark-gray b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-5 center">
                    <main className="pa4 black-80">
                        <form className="measure">
                            <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
                                <legend className="f1 fw6 ph0 mh0">Sign In</legend>
                                <div className="mt3">
                                    <label className="db fw6 lh-copy f6" htmlFor="email-address">Email</label>
                                    <input onChange={this.props.emailChange} className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="email" name="email-address" id="email-address" placeholder="test@mail.com" />
                                </div>
                                <div className="mv3">
                                    <label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
                                    <input onChange={this.props.passwordChange} className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="password" name="password" id="password" />
                                </div>
                            </fieldset>
                            <div className="">
                                <input
                                    onClick={this.onSubmitSignIn}
                                    className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib"
                                    type="submit"
                                    value="Sign in"
                                />
                            </div>
                            <div className="lh-copy mt3">
                                <p
                                    onClick={() => { this.props.onRouteChange('register') }}
                                    className="f5 link dim black db pointer">
                                    Register
                                </p>
                            </div>
                        </form>
                    </main>
                </article>
                <div className="lh-copy mt3 f4">
                    <p>
                        {this.props.signingInMessage}
                        {this.props.registeredMessage}
                    </p>
                </div>
                <div className='f4 mt3 white'>
                    <div>For new user, you can register. Just use DUMMY email, no verification here. </div>
                    <div className='f4 mt2'>Don't want to register? Sign in with dummy user: test@mail.com / test123</div>
                </div>

            </div>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SignIn)
