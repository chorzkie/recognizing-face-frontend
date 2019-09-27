import React, { Component } from 'react'
import { writeNameACT, writeEmailACT, writePasswordACT, submitRegisterACT } from './Actions'
import { connect } from 'react-redux'

const mapDispatchToProps = (dispatch) => {
    return {
        nameChange: (event) => dispatch(writeNameACT(event.target.value)),
        emailChange: (event) => dispatch(writeEmailACT(event.target.value)),
        passwordChange: (event) => dispatch(writePasswordACT(event.target.value)),
        submitRegister: (name, email, password) => dispatch(submitRegisterACT(name, email, password)),
    }
}

const mapStateToProps = (state) => {
    return {
        name: state.registerRED.name,
        email: state.registerRED.email,
        password: state.registerRED.password,
        registeringMessage: state.registerRED.registeringMessage,
        isPending: state.registerRED.isPending,
    }
}

export class Register extends Component {

    onSubmitRegister = (event) => {
        event.preventDefault()
        this.props.submitRegister(this.props.name, this.props.email, this.props.password)
    }

    render() {
        return (
            <div className="mt1">
                <article className="br3 ba dark-gray b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-5 center">
                    <main className="pa4 black-80">
                        <form className="measure">
                            <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
                                <legend className="f1 fw6 ph0 mh0">Register</legend>
                                <div className="mt3">
                                    <label className="db fw6 lh-copy f6" htmlFor="name">Name</label>
                                    <input onChange={this.props.nameChange} className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="text" name="name" id="name" />
                                </div>
                                <div className="mt3">
                                    <label className="db fw6 lh-copy f6" htmlFor="email-address">Email</label>
                                    <input onChange={this.props.emailChange} className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="email" name="email-address" id="email-address" />
                                </div>
                                <div className="mv3">
                                    <label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
                                    <input onChange={this.props.passwordChange} className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="password" name="password" id="password" />
                                </div>
                            </fieldset>
                            <div className="">
                                <input
                                    onClick={this.onSubmitRegister}
                                    className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib"
                                    type="submit"
                                    value="Register"
                                />
                            </div>
                        </form>
                    </main>
                </article>
                <div className="lh-copy mt3">
                    <p>
                        {this.props.registeringMessage}
                    </p>
                </div>
            </div>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Register)
