import React, { Component } from 'react';
import Axios from 'axios';
import { Link } from 'react-router-dom';
import LinkAPI from './../supports/constants/LinkAPI.js';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRocket, faDatabase, faUserAlt } from '@fortawesome/free-solid-svg-icons';
import HeaderLogo from './../supports/images/MyAdminFootballStoreId Header Logo.png';

export class Sidebar extends Component{
    render(){
        return(
            <div>
                {/* SIDEBAR SECTION */}
                <div className="mx-0 mt-0">
                    <div className="myfsid-sidebar">
                        <div className="py-4 text-center">
                            <img src={HeaderLogo} alt="Header Logo" width="195px" />
                        </div>
                        <div>
                            <a className="active" href="#home"><FontAwesomeIcon icon={faRocket} /><span className="ml-3 mr-0">My Dashboard</span></a>
                        </div>
                        <div>
                            <a href="#home"><FontAwesomeIcon icon={faDatabase} /><span className="ml-3 mr-0">My Products</span></a>
                        </div>
                        <div>
                            <a href="#home"><FontAwesomeIcon icon={faUserAlt} /><span className="ml-3 mr-0">My Users</span></a>
                        </div>
                        <div className="px-5 py-5">
                            <input type="button" value="Logout" className="btn rounded-0 w-100 h-100 myfsid-bg-secondary myfsid-light" />
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Sidebar