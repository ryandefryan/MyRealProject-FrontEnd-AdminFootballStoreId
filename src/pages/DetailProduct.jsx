import React, { Component } from 'react';
import Axios from 'axios';
import LinkAPI from './../supports/constants/LinkAPI.js';

export class LandingPage extends Component{

    state ={
        data : null,
        onClickImage : ''
    }
    componentDidMount(){
        this.getDataProductById()
    }

    getDataProductById = () => {
        const idProduct = this.props.match.params.idProduct
        
        Axios.get(LinkAPI + 'detail-product/' + idProduct)
        .then((res) => {
            console.log(res.data)
            if(typeof(res.data) === 'string'){
                alert(res.data)
            }else{
                this.setState({data:  res.data[0]})
            }
        })
        .catch((err) => {
            console.log(err)
        })
    }

    deleteProduct = (idProduct) => {
        var idProduct = Number(idProduct)

        if(window.confirm('Are You Sure Want To Delete This Item?')){
            Axios.delete(LinkAPI + 'product/' + idProduct)
            .then((res) => {
                console.log(res)
                if(res.status === 200){
                    window.location = '/'
                    alert('( ! ) Data Deleted')
                }
            })
            .catch((err) => {
                console.log(err)
            })
        }
    }

    render(){
        if(this.state.data === null){
            return <div>Loading</div>
        }

        var {id, name, brand, category, price, discount, stock, sold, image1, image2, image3, status} = this.state.data
        return(
            <div>
                {/* DETAIL PRODUCT SECTION */}
                <div className="container-fluid px-5 pt-5 pb-0">
                    <div className="px-3">
                        <h5 className="">Detail Product</h5>
                        <hr />
                    </div>
                </div>

                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-md-6">
                            <div className="row justify-content-center px-3 py-3">
                                <div className="col-12 py-3 text-center">
                                    {/* {
                                        this.state.data.stock?
                                            this.state.data.discount?
                                                <h6 className="py-2 font-weight-normal myfsid-detail-product-discount-badge myfsid-bg-secondary myfsid-light">Save <span className="font-weight-bold">{this.state.data.discount}%</span></h6>
                                            :
                                                null
                                        :
                                            <h6 className="py-2 font-weight-bold myfsid-detail-product-discount-badge myfsid-bg-secondary myfsid-light">SOLD <span className="font-weight-bold">OUT!</span></h6>
                                    } */}
                                    <img src={this.state.onClickImage? this.state.onClickImage : image1} alt={"Photo product of " + this.state.data.name} width="75%" />
                                </div>
                                <div onClick={() => this.setState({onClickImage : image1})} className="col-3 w-100 text-center myfsid-clickable-element">
                                    <img src={image1} alt={"Photo product of " + this.state.data.name} width="100%" className={this.state.onClickImage===image1? "p-2 border border-dark" : "p-2 border"} />
                                </div>
                                <div onClick={() => this.setState({onClickImage : image2})} className="col-3 w-100 text-center myfsid-clickable-element">
                                    <img src={image2} alt={"Photo product of " + this.state.data.name} width="100%" className={this.state.onClickImage===image2? "p-2 border border-dark" : "p-2 border"} />
                                </div>
                                <div onClick={() => this.setState({onClickImage : image3})} className="col-3 w-100 text-center myfsid-clickable-element">
                                    <img src={image3} alt={"Photo product of " + this.state.data.name} width="100%" className={this.state.onClickImage===image3? "p-2 border border-dark" : "p-2 border"} />
                                </div>
                            </div>
                        </div>
                        <div className="col-md-6 pt-4">
                            <div>
                                <h4>{name}</h4>
                                <span>Sold : {sold} Products</span>
                                {
                                    stock?
                                        discount?
                                            <span>
                                                <h3 className="pt-3 myfsid-font-size-20 myfsid-secondary">Rp.{(price - (price * (discount/100))).toLocaleString('id-ID')} <span className="myfsid-font-size-14 myfsid-dark"><del>{price.toLocaleString('id-ID')}</del></span></h3>
                                            </span>
                                        :
                                            <h3 className="pt-3 myfsid-font-size-20">Rp.{price.toLocaleString('id-ID')}</h3>
                                    :
                                        <h4 className="pt-3 myfsid-secondary">Out Of Stock!</h4>
                                }
                            </div>
                            <hr className="mt-3" />
                            <div>
                                <h6 className="font-weight-bold">Stock</h6>
                                <h6 className="font-weight-light">{stock} Pcs</h6>
                                <h6 className="font-weight-bold">Weight</h6>
                                <h6 className="font-weight-light">200 Gram</h6>
                                {/* {
                                    this.state.data.category === 'Football Boots' || this.state.data.category === 'Futsal Boots'?
                                        <div className="row px-1 py-3">
                                            <div onClick={() => this.setState({onClickSize : '41'})} className={this.state.onClickSize === '41'?"col-1 mx-2 px-1 py-2 text-center font-weight-bold myfsid-clickable-element myfsid-bg-main-light myfsid-light" : "col-1 mx-2 px-1 py-2 text-center border myfsid-clickable-element"}>
                                                41
                                            </div>
                                            <div onClick={() => this.setState({onClickSize : '42'})} className={this.state.onClickSize === '42'?"col-1 mx-2 px-1 py-2 text-center font-weight-bold myfsid-clickable-element myfsid-bg-main-light myfsid-light" : "col-1 mx-2 px-1 py-2 text-center border myfsid-clickable-element"}>
                                                42
                                            </div>
                                            <div onClick={() => this.setState({onClickSize : '43'})} className={this.state.onClickSize === '43'?"col-1 mx-2 px-1 py-2 text-center font-weight-bold myfsid-clickable-element myfsid-bg-main-light myfsid-light" : "col-1 mx-2 px-1 py-2 text-center border myfsid-clickable-element"}>
                                                43
                                            </div>
                                        </div>
                                    :
                                        this.state.data.category === 'Jersey Shirts'?
                                            <div className="row px-1 py-3">
                                                <div onClick={() => this.setState({onClickSize : 'S'})} className={this.state.onClickSize === 'S'?"col-1 mx-2 px-1 py-2 text-center font-weight-bold myfsid-clickable-element myfsid-bg-main-light myfsid-light" : "col-1 mx-2 px-1 py-2 text-center border myfsid-clickable-element"}>
                                                    S
                                                </div>
                                                <div onClick={() => this.setState({onClickSize : 'M'})} className={this.state.onClickSize === 'M'?"col-1 mx-2 px-1 py-2 text-center font-weight-bold myfsid-clickable-element myfsid-bg-main-light myfsid-light" : "col-1 mx-2 px-1 py-2 text-center border myfsid-clickable-element"}>
                                                    M
                                                </div>
                                                <div onClick={() => this.setState({onClickSize : 'L'})} className={this.state.onClickSize === 'L'?"col-1 mx-2 px-1 py-2 text-center font-weight-bold myfsid-clickable-element myfsid-bg-main-light myfsid-light" : "col-1 mx-2 px-1 py-2 text-center border myfsid-clickable-element"}>
                                                    L
                                                </div>
                                            </div>
                                        :
                                        <div className="row px-1 py-3">
                                            <div onClick={() => this.setState({onClickSize : '8'})} className={this.state.onClickSize === '8'?"col-1 mx-2 px-1 py-2 text-center font-weight-bold myfsid-clickable-element myfsid-bg-main-light myfsid-light" : "col-1 mx-2 px-1 py-2 text-center border myfsid-clickable-element"}>
                                                8
                                            </div>
                                            <div onClick={() => this.setState({onClickSize : '9'})} className={this.state.onClickSize === '9'?"col-1 mx-2 px-1 py-2 text-center font-weight-bold myfsid-clickable-element myfsid-bg-main-light myfsid-light" : "col-1 mx-2 px-1 py-2 text-center border myfsid-clickable-element"}>
                                                9
                                            </div>
                                            <div onClick={() => this.setState({onClickSize : '10'})} className={this.state.onClickSize === '10'?"col-1 mx-2 px-1 py-2 text-center font-weight-bold myfsid-clickable-element myfsid-bg-main-light myfsid-light" : "col-1 mx-2 px-1 py-2 text-center border myfsid-clickable-element"}>
                                                10
                                            </div>
                                        </div>
                                } */}
                                {/* <span className="myfsid-secondary">{this.state.errorMessage}</span> */}
                            </div>
                            <hr className="mt-3" />
                            <div>
                                <h6 className="font-weight-bold">Deskripsi : </h6>
                                <h6 className="font-weight-light">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Reiciendis, vero ipsum fuga delectus quasi, voluptates eos aut fugiat impedit praesentium rerum exercitationem eaque quidem? Ipsam fuga similique magnam blanditiis est?</h6>
                            </div>
                            <div className="py-3">
                                <input type="button" value="Edit Product" className="btn rounded-0 w-100 py-2 myfsid-bg-main-light myfsid-light"/>
                            </div>
                            <div className="py-0">
                                <input type="button" value="Delete Product" onClick = {() => this.deleteProduct(id)} className="btn rounded-0 w-100 py-2 myfsid-bg-secondary myfsid-light"/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default LandingPage