import React from 'react'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'

import { Nav } from '../components/Nav'

import './App.css'
import 'bulma/css/bulma.css'
import 'loaders.css/loaders.min.css'
import 'font-awesome/css/font-awesome.min.css'

export class App extends React.Component {

    static propTypes = {
        children: PropTypes.node
    }

   

    componentWillMount(){
    }

    componentDidMount(){
       
    }

    componentWillUnmount() {
    }


    render () {
        return (
            <div>            
                <div className="container">
                    <Nav
                        discoverQuery={() => { return [] }}
                        discoveries={[]}
                        isMobile={this.props.isMobile}
                    />
                    <span>{this.props.children}</span>
                </div>
                <div className="footer">
                    <div className="columns">
                        <div className="column txt-center">
                            <div id="zt-footer-copy">
							© 2017 CC Statements. All rights reserved.
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default (App)