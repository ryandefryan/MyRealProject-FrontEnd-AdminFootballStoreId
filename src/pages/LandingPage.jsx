import React, { Component } from 'react';
import Axios from 'axios';
import { Modal, ModalBody } from 'reactstrap';
import LinkAPI from './../supports/constants/LinkAPI.js';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faReceipt, faCube, faUsers, faWallet } from '@fortawesome/free-solid-svg-icons';
import AddDataModal from './../components/AddDataModal.jsx';
import Swal from 'sweetalert2';

export class LandingPage extends Component{

    state = {
        data : null, 
        dataSelected : null,
        modalOpen : false,
        editImageId : null,
        editImage : null,
        imagesPreviewURL : '',
        editImagesErrorMessage : ''
    }
    componentDidMount(){
        this.getData()
    }

    getData = () => {
        Axios.get(LinkAPI + 'products')
        .then((res) => {
            console.log(res.data.data)

            let dataSelected = []
            res.data.data.forEach((value, index) => {
                dataSelected[index] = value.images[0]
            })
            console.log(dataSelected)

            this.setState({data : res.data.data, dataSelected : dataSelected})
        })
        .catch((err) => {
            console.log(err)
        })
    }

    onImagesValidation = (element) => {
        const file = element.target.files
        console.log(file)
        try {
            if(element.target.files.length > 1) throw new Error('Select 1 Image Only')

            if(file[0].size > 1000000) throw new Error('"' + file[0].name + '" More Than ' + Math.round(file[0].size / 1000000) + 'Mb')

            this.setState({editImage : file})
            const reader = new FileReader();
            reader.readAsDataURL(file[0])

            reader.onload = () => {
            if(reader.readyState === 2){
                this.setState({imagesPreviewURL: reader.result})
            }
        }
        } catch (error) {
            this.setState({editImagesErrorMessage : error.message})
        }
    }

    sendImageUpdate = () => {
        try {
            if(this.state.editImage === null || this.state.editImage.length === 0) throw new Error('You Has Not Been Select Image Files')
            
            let fd = new FormData()
            fd.append('image',this.state.editImage[0])

            Axios.patch( LinkAPI + 'edit-image/' + this.state.editImageId, fd)
            .then((res) => { 
                console.log(res)

                if(res.request.status === 200){
                    Swal.fire('Success',res.data.message,'success')
                    setTimeout(function(){window.location = '/'}, 3000)
                }
            })
            .catch((err) => {
                console.log(err)
            })
        } catch (error) {
            Swal.fire('Error',error.message,'error')
        }
    }

    render(){
        return(
            <div>
                {/* STATISTIC SECTION */}
                <div className="container-fluid px-5 pt-5 pb-3">
                    <div className="px-3 pb-3">
                        <h3 className="text-center text-md-left font-weight-bold">Dashboard</h3>
                    </div>
                    <div className="row py-3">
                        <div className="col-12 col-md-3 px-5 py-0">
                            <div className="row justify-content-center align-items-center py-4 border border-primary myfsid-main-light">
                                <div className="col-6">
                                    <h3><FontAwesomeIcon icon={faUsers} /></h3>
                                    <h5>Total Users</h5>
                                </div>
                                <div className="col-6 text-center">
                                    <h1>100</h1>
                                </div>
                            </div>
                        </div>
                        <div className="col-12 col-md-3 px-5 py-0">
                            <div className="row justify-content-center align-items-center py-4 myfsid-bg-main-light myfsid-light">
                                <div className="col-6">
                                    <h3><FontAwesomeIcon icon={faCube} /></h3>
                                    <h5>Our Products</h5>
                                </div>
                                <div className="col-6 text-center">
                                    <h1>300</h1>
                                </div>
                            </div>
                        </div>
                        <div className="col-12 col-md-3 px-5 py-0">
                            <div className="row justify-content-center align-items-center py-4 border border-primary myfsid-main-light">
                                <div className="col-6">
                                    <h3><FontAwesomeIcon icon={faReceipt} /></h3>
                                    <h5>Transaction Success</h5>
                                </div>
                                <div className="col-6 text-center">
                                    <h1>10000</h1>
                                </div>
                            </div>
                        </div>
                        <div className="col-12 col-md-3 px-5 py-0">
                            <div className="row justify-content-center align-items-center py-4 myfsid-bg-main-light myfsid-light">
                                <div className="col-6">
                                    <h3><FontAwesomeIcon icon={faWallet} /></h3>
                                    <h5>Total Income</h5>
                                </div>
                                <div className="col-6 text-center">
                                    <h1>100</h1>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* DATA PRODUCTS SECTION */}
                <div className="container-fluid px-5 py-5">
                    <div className="row justify-content-center align-items-center px-3 py-0">
                        <div className="col-6 py-0">
                            <h5 className="">Data Products</h5>
                        </div>
                        <div className="col-6 text-right">
                            <AddDataModal text="Add Data" className="px-3 py-2 myfsid-clickable-element myfsid-bg-secondary myfsid-light" /> 
                        </div>
                    </div>
                    <div className="px-3">
                        <hr />
                    </div>
                    <div className="row justify-content-left">
                        {/* <div className="col-12 col-md-12 px-5">
                            <div className="row pt-1">
                                <div className="col-6 col-md-4 py-2 border border-right-0 text-center font-weight-bold myfsid-bg-light-grey">
                                    Name
                                </div>
                                <div className="col-md-2 d-none d-md-block py-2 border border-right-0 text-center font-weight-bold myfsid-bg-light-grey">
                                    Category
                                </div>
                                <div className="col-md-2 d-none d-md-block py-2 border border-right-0 text-center font-weight-bold myfsid-bg-light-grey">
                                    Price
                                </div>
                                <div className="col-6 col-md-4 py-2 border text-center font-weight-bold myfsid-bg-light-grey">
                                    
                                </div>
                            </div>
                        </div> */}
                        {
                            this.state.data?
                                this.state.data.map((value, index) => {
                                    return(
                                        <div className="col-10 col-md-3 px-5 py-2 my-card">
                                            <div className="row justify-content-center mb-2 border">
                                                <div className="col-12 col-md-12 py-3 px-md-4 py-md-4" style={{position : "relative"}}>
                                                    <img src={this.state.dataSelected[index].url} alt={this.state.dataSelected[index].url} width="100%" />
                                                    <div className="w-100 text-center" style={{position : "absolute", left :"0px", bottom : "50px" }}>
                                                        <input type="button" value="Edit Image" onClick={() => this.setState({modalOpen : true, editImageId : this.state.dataSelected[index].id})} className="btn btn-warning rounded-0 font-weight-bold"  style={{fontSize : "10px", opacity : "0.9"}} />
                                                    </div>
                                                </div>
                                                <div className="col-12 col-md-12 py-3 px-md-4 py-md-0">
                                                    <div className="row">
                                                        {
                                                            value.images.map((val, ind) => {
                                                                if(this.state.dataSelected[index].id === val.id){
                                                                    return(
                                                                        <div className="col-4">
                                                                            <img src={val.url} alt={val.url} width="100%" className="border border-dark-grey" style={{cursor : "pointer"}} />
                                                                        </div>
                                                                    )
                                                                }
                                                                return(
                                                                    <div className="col-4">
                                                                        <img src={val.url} alt={val.url} width="100%" style={{cursor : "pointer"}}
                                                                        onClick={() => {
                                                                            let dataSelected = this.state.dataSelected;
                                                                            dataSelected[index] = val;
                                                                            this.setState({dataSelected : dataSelected})
                                                                        }} />
                                                                    </div>
                                                                )
                                                            })
                                                        }
                                                    </div>
                                                </div>
                                                <div className="col-12 col-md-12 px-4 pt-2">
                                                    <h6 className="font-weight-normal">{value.name.slice(0, 45) + '...'}</h6>
                                                </div>
                                                <div className="col-12 col-md-12 px-4 py-0">
                                                    <h6>Rp.{value.price.toLocaleString('id-ID')}</h6>
                                                </div>
                                                <div className="col-12 col-md-12 px-2 pt-2">
                                                    <input type="button" value="Edit Data" onClick={() => this.setState({selectedId : value.id})} className="btn btn-primary w-100 py-1 mb-2 rounded-0"/>
                                                    <input type="button" value="Delete Data" onClick={() => this.onDeleteClick(value.id)} className="btn btn-dark w-100 py-1 mb-2 rounded-0"/>
                                                </div>
                                            </div>
                                        </div>
                                        // <div className="col-12 col-md-12 px-5">
                                        //     <div className="row">
                                        //         <div className="col-6 col-md-4 py-2 border border-top-0 border-right-0 text-left font-weight-bold myfsid-bg-light">
                                        //             {value.name}
                                        //         </div>
                                        //         <div className="col-md-2 d-none d-md-block py-2 border border-top-0 border-right-0 text-center myfsid-bg-light">
                                        //             {value.category}
                                        //         </div>
                                        //         <div className="col-md-2 d-none d-md-block py-2 border border-top-0 border-right-0 text-center myfsid-bg-light">
                                        //             Rp.{value.price.toLocaleString('id-ID')}
                                        //         </div>
                                        //         <div className="col-6 col-md-4 py-2 border text-center border-top-0 myfsid-bg-light">
                                        //             <span className="font-weight-bold myfsid-clickable-element myfsid-secondary">
                                        //                 <Link to={'detail-product/' + value.id}>
                                        //                     Details    
                                        //                 </Link>
                                        //             </span>
                                        //         </div>
                                        //     </div>
                                        // </div>
                                    )
                                })
                            :
                                null
                        }
                    </div>
                    <Modal toggle={() => this.setState({modalOpen : false})} isOpen={this.state.modalOpen}>
                        <ModalBody className="border border-white">
                            <div className="mt-4 mb-0 px-2 pt-2 pb-2 border">
                                <div className="row justify-content-center align-items-center">
                                    <div className="col-12 px-3 pt-0 pb-3 text-center">
                                        <div className="px-0 py-5 border">
                                            {
                                                this.state.imagesPreviewURL?
                                                    <img src={this.state.imagesPreviewURL} alt="Image Preview" width="100%" />
                                                :
                                                    'Image Preview'
                                            }
                                        </div>
                                    </div>
                                    <div className="col-5 text-center">
                                        <input type="file" ref={(element) => this.file = element} onChange={this.onImagesValidation} accept="image/*" style={{display : "none"}} />
                                        <input type="button" value="Choose File" onClick={() => this.file.click()} className="btn rounded-0 w-100 mt-0 mb-0 myfsid-bg-secondary myfsid-light" />
                                    </div>
                                    <div className="col-7 text-center">
                                        <h6>{this.state.editImage === null ? "Images (Max 1Mb)" : this.state.editImage.length + " Images Selected"}</h6>
                                    </div>
                                </div>
                            </div>
                            <div className="pt-2 pb-2 text-center myfsid-font-size-14 myfsid-secondary">
                                {this.state.editImagesErrorMessage? this.state.editImagesErrorMessage : null}
                            </div>
                            <div className="pt-3 pb-3">
                                <input type="button" value="Submit Data" onClick={this.sendImageUpdate} className="btn rounded-0 w-100 mx-0 my-3 myfsid-bg-main-light myfsid-light" />
                            </div>
                        </ModalBody>
                </Modal>
                </div>
            </div>
        )
    }
}

export default LandingPage