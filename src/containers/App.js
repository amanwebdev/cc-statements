import React from 'react'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'

import {logoutAndRedirect} from '../actions'
import { loginUser, resizeApp } from '../actions'
import { Nav } from '../components/Nav'

import './App.css'
import 'bulma/css/bulma.css'
import 'loaders.css/loaders.min.css'
import 'font-awesome/css/font-awesome.min.css'

export class App extends React.Component {

    static propTypes = {
        logoutAndRedirect: PropTypes.func.isRequired,
        children: PropTypes.node
    }

    handleLogoutClick = e=>{
        this.props.logoutAndRedirect()
        e.preventDefault();
    }

    componentWillMount(){
        window.addEventListener('resize', this.handleWindowSizeChange)
    }

    componentDidMount(){
       
    }

    componentWillUnmount() {
      window.removeEventListener('resize', this.handleWindowSizeChange);
    }

    handleWindowSizeChange = () => {
        this.props.resizeApp();
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
const mapStateToProps = (state) => ({
  width: state.app.width
});
export default connect(mapStateToProps,{
    logoutAndRedirect, loginUser, resizeApp
})(App)