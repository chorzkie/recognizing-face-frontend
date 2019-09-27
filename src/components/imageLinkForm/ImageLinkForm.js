import React, { Component } from 'react'

export class ImageLinkForm extends Component {
    constructor() {
        super()
        this.state = {
            url: ''
        }
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    handleChange(event) {
        this.setState({ url: event.target.value })
    }

    handleSubmit(event) {
        event.preventDefault()
        this.props.toPredictFace(this.state.url)
        this.setState({ url: '' })
    }

    render() {
        return (
            <div>
                <div className='f4 mt5 white'>
                    <div>This will detect all faces in a picture you submit via a URL. Try it!</div>
                    <div>For example, copy and paste URL below, then click Detect!</div>
                </div>
                <p className='f3 white'>
                    http://www.icone-group.com/img/equipe.jpg
                </p>
                <div className='mh7 pa2 br1 shadow-5 bg-light-purple'>
                    <form className='center' onSubmit={this.handleSubmit}>
                        <input
                            className="fl f4 pa w-80"
                            type="text"
                            placeholder="Input the URL to your image here.."
                            onChange={this.handleChange}
                            value={this.state.url}
                        />
                        <input
                            className="fl ml2 btn w-15 grow f4 link ph3 pv2 dib pointer"
                            type="submit"
                            value="Detect!"
                        />
                    </form>
                </div>
            </div>
        )
    }
}

export default ImageLinkForm
