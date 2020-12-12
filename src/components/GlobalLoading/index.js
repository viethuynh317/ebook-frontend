import React, { Component } from 'react';
import Loading from "../../assets/images/loading.gif"
import { connect } from 'react-redux';
export class GlobalLoading extends Component {
    render() {

        var xhtml = <div></div>;
        var { showLoading } = this.props;
      
        if (showLoading) {
            xhtml = <div style={{
                        background: 'rgba(0,0,0,0.4)',
                        zIndex: 99
                    }} className="w-100 h-100 position-fixed d-flex justify-content-center align-items-center ">
                        <div>
                            <img className="float-none" width={50} height={40} src={Loading} alt="Loading..." />
                        </div>
        
                    </div>
                
            
        }

        return xhtml;
           
    
    }
}
const mapStateToProps = state => {
    return {
        showLoading: state.ui.showLoading
    }
}
export default connect(mapStateToProps, null)(GlobalLoading);
