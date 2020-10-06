import React, { Component } from 'react';
import Axios from 'axios';
import LinkAPI from '../supports/constants/LinkAPI';
import { Modal, ModalBody } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimesCircle } from '@fortawesome/free-solid-svg-icons';
import Swal from 'sweetalert2';

export class AddDataModal extends Component {
    state = {
        modalOpen : false,
        images : null,
        imagesErrorMessage : ''
    }

    onImagesValidation = (element) => {
        const files = element.target.files
        console.log(files)
        try {
            if(element.target.files.length > 5) throw new Error("Select 5 Images Only")

            for(var i = 0; i < files.length; i++){
                if(files[i].size > 1000000) throw new Error('"' + files[i].name + '" More Than ' + Math.round(files[i].size / 1000000) + 'Mb')
            }

            this.setState({images : files})

        } catch (error) {
            this.setState({imagesErrorMessage : error.message})
        }
    }

    sendData = () => {
        var name = this.name.value
        var brand = this.brand.value
        var category = this.category.value
        var price = this.price.value
        var discount = this.discount.value
        var stock = this.stock.value
        var sold = this.sold.value

        var data = {name, brand, category, price, discount, stock, sold}

        try {
            if(!data.name || !data.brand || !data.category || !data.price || !data.discount || !data.stock || !data.sold) throw new Error('Data Must Be Filled')
            if(this.state.images === null || this.state.images.length === 0) throw new Error('You Has Not Been Select Image Files')

            let fd = new FormData()
            data = JSON.stringify(data)

            fd.append('data', data)
            for(var i = 0 ; i < this.state.images.length ; i ++){
                fd.append('image',this.state.images[i])
            }

            Axios.post( LinkAPI + 'multiple-upload-product', fd)
            .then((res) => { 
                console.log(res)
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
            <span>
                {/* 
                    ############### Props ###############
                    Transfer Data dari Parent ke Child
                    Parentnya di Halaman Pages, Childnya LoginModal.jsx
                */}
                <span onClick={() => this.setState({modalOpen : true})} className={this.props.className}>{this.props.text}</span> 
                {/* Login Modal */}
                <Modal toggle={() => this.setState({modalOpen : false})} isOpen={this.state.modalOpen}>
                    <ModalBody className="border border-white">
                        <div onClick={() => this.setState({modalOpen : false})} className="myfsid-clickable-element text-right">
                            <FontAwesomeIcon icon={faTimesCircle} className="fa-lg" />
                        </div>
                        <div className="px-5 py-0">
                            <div className="pt-1 pb-3 text-center myfsid-main-light">
                                <h3>Add Data Product</h3>
                            </div>
                            <div className="pt-2 pb-2">
                                <h6>Name</h6>
                                <input type="text" ref={(el) => this.name = el} className="form-control rounded-0" />
                            </div>
                            <div className="pt-2 pb-2">
                                <h6>Brand</h6>
                                <input type="text" ref={(el) => this.brand = el} className="form-control rounded-0" />
                            </div>
                            <div className="pt-2 pb-2">
                                <h6>Category</h6>
                                <input type="text" ref={(el) => this.category = el} className="form-control rounded-0" />
                            </div>
                            <div className="pt-2 pb-2">
                                <h6>Price</h6>
                                <input type="text" ref={(el) => this.price = el} className="form-control rounded-0" />
                            </div>
                            <div className="pt-2 pb-2">
                                <h6>Discount</h6>
                                <input type="text" ref={(el) => this.discount = el} className="form-control rounded-0" />
                            </div>
                            <div className="pt-2 pb-2">
                                <h6>Stock</h6>
                                <input type="text" ref={(el) => this.stock = el} className="form-control rounded-0" />
                            </div>
                            <div className="pt-2 pb-2">
                                <h6>Sold</h6>
                                <input type="text" ref={(el) => this.sold = el} className="form-control rounded-0" />
                            </div>
                            <div className="mt-4 mb-0 px-2 pt-2 pb-2 border">
                                <div className="row justify-content-center align-items-center">
                                    <div className="col-5 text-center">
                                        <input type="file" ref={(element) => this.file = element} onChange={this.onImagesValidation} multiple="multiple" accept="image/*" style={{display : "none"}} />
                                        <input type="button" value="Choose File" onClick={() => this.file.click()} className="btn rounded-0 w-100 mt-0 mb-0 myfsid-bg-secondary myfsid-light" />
                                    </div>
                                    <div className="col-7 text-center">
                                        <h6>{this.state.images === null ? "Images (Max 1Mb)" : this.state.images.length + " Images Selected"}</h6>
                                    </div>
                                </div>
                            </div>
                            <div className="pt-2 pb-2 text-center myfsid-font-size-14 myfsid-secondary">
                                {this.state.imagesErrorMessage? this.state.imagesErrorMessage : null}
                            </div>
                            <div className="pt-3 pb-3">
                                <input type="button" value="Submit Data" onClick={this.sendData} className="btn rounded-0 w-100 mx-0 my-3 myfsid-bg-main-light myfsid-light" />
                            </div>
                        </div>
                    </ModalBody>
                </Modal>
            </span>
        )
    }
}

export default AddDataModal