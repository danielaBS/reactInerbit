import React from "react";
import { API } from '../../config/api.common'

import { updateProduct } from '../../app/producstAPI';
import getPager from "../../services/pager.service";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDoubleLeft, faAngleDoubleRight, faEdit, faTrashAlt, faSearch } from "@fortawesome/free-solid-svg-icons";

import Modal from 'react-bootstrap/Modal';
import 'react-responsive-modal/styles.css';

import './Dashboard.css';

async function addItem(obj) {  
  return fetch(API.PRODUCTS.ALL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(obj),
  }).then((data) => data.json())    
}

async function updateItem(obj) {  
  return fetch(API.PRODUCTS.ALL + '/'+obj.id, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(obj),
  }).then((data) => data.json())    
}

async function deleteItem(obj) {
  return fetch(API.PRODUCTS.ALL + '/'+obj.id, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  }).then((data) => data.json())    
}

class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      items: [],  
      itemsForSearch: [], 
      pager: {},
      pagedItems: [],
      itemObj: {},
      openModal : false,
      modalType: '',
      inputData: {}
    };
  }

  inputFields =[
    ["serial",[]],
    ["connection_type", [
      "directa",
      "semi-directa",
      "indirecta"]],
    ["storage_system", [
      "interno",
      "externo"
    ]],
    ["condition",[]],
    ["owner", [
      "RF",
      "OR"
    ]],
    ["location",[]],
    ["manufacturer",[]],
    ["purchase",[]],
    ["i_max",[]],
    ["i_b",[]],
    ["i_n",[]],
    ["seals",[]]
  ]

  setPage = async (page) => {  
    // obtener el objeto pager desde el servicio
    const pagerObj = await getPager(this.state.itemsForSearch.length, page,9);    
    const itemsObj = await this.state.itemsForSearch.slice(pagerObj.startIndex, pagerObj.endIndex + 1);
    this.setState({
      pager :pagerObj,
      pagedItems: itemsObj
    })
    // obtener la página de items actual
  }

  componentDidMount() {
    fetch(API.PRODUCTS.ALL +'?page=0&size=50', {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then(res => res.json())
      .then(
        (result) => {
          this.setPage(1)
          this.setState({
            isLoaded: true,
            items: result.items,
            itemsForSearch: result.items
          });
        },
        // Nota: es importante manejar errores aquí y no en 
        // un bloque catch() para que no interceptemos errores
        // de errores reales en los componentes.
        (error) => {
          this.setState({
            isLoaded: true,
            error
          });
        }
      )
  }

  searchData= async(e) => { 
    let aux = this.state.items;
    if(e.target.value===''){
      this.setState({itemsForSearch:aux})
    }
    const res = await this.state.items.filter((item) => {
      return item.serial.includes(e.target.value)
    });
    await this.setState({itemsForSearch:res});
    this.setPage(1)     
  }

  handleFormChange = async (e, index) =>{  
    let data = this.state.inputData;
    data['0'][e.target.name] = e.target.value;
    this.setState({inputData: data})
  }

  handleSubmit = async (e) =>{    
    e.preventDefault()
    if(e.currentTarget.name==='editItem'){
      this.editItem();
    } else if(e.currentTarget.name==='delConfirmation'){
      this.deleteItem();
    } else if(e.currentTarget.name==='add'){
      this.newItem(e.target)
    }
  }

  onClickButton = async (e, modal) =>{    
    if (modal==='default') {
      var obj = await this.state.items.filter((item)=>{
        return item.id === Number(e.currentTarget.id)
      })      
      this.setState({itemObj:obj[0], modalType: 'default'})      
    
    } else if(modal==='edit'){
      var obj = await this.state.items.filter((item)=>{
        return item.id === Number(e.currentTarget.id)
      })      
      this.setState({itemObj:obj[0]});
      
      Object.keys(obj).map((key, index) =>{    
        this.setState({
          inputData:{[key]:obj[key]}
        });                  
      })      
      this.setState({modalType:'edit'})

    } else if (modal==='del'){      
      var obj = await this.state.items.filter((item)=>{
        return item.id === Number(e.currentTarget.id)
      })      
      
      this.setState({itemObj:obj[0]});
      this.setState({modalType:'del'})

    } else if (modal==='add'){ 
      this.setState({modalType:'add'})
    }
    
    e.preventDefault()
    this.setState({openModal : true})
  }

  newItem = async (fields) =>{  
    var obj={}    
    for(var i=0; i<fields.length -2; i++){    
      obj[fields[i].name]=fields[i].value
    }
    const newProduct = await addItem(obj);
    if(newProduct) {      
      this.setState({openModal : false})
      window.location.reload(false)
    }    
  }

  editItem = async () =>{      
    const updatedItem = await updateItem(this.state.inputData['0']);
    if(updatedItem) {
      this.setState({openModal : false})
    }
  }
  
  deleteItem = async () =>{
    const deletedItem = await deleteItem(this.state.itemObj);
    if(deletedItem) {
      this.setState({openModal : false})
      window.location.reload(false)
    }
  }

  onCloseModal = ()=>{
      this.setState({openModal : false})
  }

  render () {
    const { items, pagedItems, pager, itemObj, modalType, inputData } = this.state;
    return(
      <div className="comp-container d-flex justify-content-center align-items-center flex-column">
        <div className="well d-flex justify-content-between">
          <div>
            <button className="btn-default" onClick={(e)=>this.onClickButton(e, 'add')}>Agregar producto </button>
          </div>
          <form className="nosubmit">
            <input onChange={(e) => this.searchData(e)} className="nosubmit" type="search" placeholder="Buscar..."/>
          </form>         
        </div>                    
        
        <Modal 
        backdrop="static"         
        keyboard={false}
        className="modal-data" 
        show={this.state.openModal} 
        onHide={this.onCloseModal}>  
          <Modal.Header closeButton>
          </Modal.Header>  
          <div>    
            {
              modalType==='default'? (  
                <div style={{padding:'2rem'}}>
                  {
                    Object.keys(itemObj).map(function (key, index) {                      
                      return(     
                        <div>
                          <span>{key } : {itemObj[key]}</span>   
                          <break/>
                        </div>                                                        
                      )                                        
                    }) 
                  }
                  <div className="btns-utils d-flex justify-content-around">
                  <button id={itemObj.id} onClick={(e)=>this.onClickButton(e, 'edit')}>Editar </button>
                    <button id={itemObj.id} onClick={(e)=>this.onClickButton(e, 'del')}>Eliminar</button>
                  </div>
                </div>                               
              ):(<></>) 
            }       
          </div>
          <div>    
            {
              modalType==='edit'? (  
                <form name="editItem" onSubmit={(e)=>this.handleSubmit(e)}>
                  {
                    Object.keys(itemObj).map(function (key, index) {                      
                      return( 
                          <div key={index} className="d-flex justify-content-around input-div">
                            <div className="col-md-4"><label>{key} : </label> </div>  
                            <input 
                            className="col-md-8"
                            name={key}
                            type="text" 
                            value={inputData['0'][key]} 
                            onChange={(e) => this.handleFormChange(e, index)}/>
                          </div>  
                      )                                        
                    }.bind(this)) 
                  }
                  <div className="btns-utils d-flex justify-content-around">
                    <input type="submit" value="Guardar"/>
                    <input id={itemObj.id} onClick={this.onCloseModal} type="button" value="Cancelar"/>
                  </div>
                </form>                                                                                                  
              ):(<></>) 
            }       
          </div>  
          <div>    
            {
              modalType==='del'? (  
                <form name="delConfirmation" style={{textAlign:'center'}} onSubmit={(e)=>this.handleSubmit(e)}>
                  {
                    Object.keys(itemObj).map(function (key, index) {                      
                      return( 
                          <div key={index} className="d-flex justify-content-around input-div">
                            <div className="col-md-4"><label>{key} : </label> </div>  
                            <input 
                            className="col-md-8"
                            name={key}
                            type="text" 
                            value={inputData['0'][key]} 
                            onChange={(e) => this.handleFormChange(e, index)}/>
                          </div>  
                      )                                        
                    }.bind(this)) 
                  }
                  <div className="btns-utils d-flex justify-content-around">
                    <input type="submit" value="Eliminar"/>
                    <input id={itemObj.id} onClick={this.onCloseModal} type="button" value="Cancelar"/>
                  </div>
                </form>                                                                                                  
              ):(<></>) 
            }       
          </div> 
          <div>    
            {
              modalType==='add'? (  
                <form name="add" style={{textAlign:'center'}} onSubmit={(e)=>this.handleSubmit(e)}>
                  {
                    this.inputFields.map(function (field, index) {
                      var hint ="";
                      var show=false
                      if(field[1].length>0){
                        field[1].map(function (val) {
                          hint+=val+ ", "
                        })
                        show=true
                      }
                      return (
                        <div key={index} className="d-flex justify-content-around input-div">
                          <div className="col-md-4" style={{textAlign:'left'}}><label>{field[0]} : </label> 
                          {
                            show?(
                              <span>(Valores aceptados: {hint})</span>
                            ):(<></>)
                          }  
                          </div>  
                          <input required type="text"className="col-md-8" name={field[0]}/>                                            
                        </div>
                      )                                           
                    }.bind(this))
                  }
                  <div className="btns-utils d-flex justify-content-around">
                    <input type="submit" value="Guardar"/>
                    <input onClick={this.onCloseModal} type="button" value="Cancelar"/>
                  </div>
                </form>                               
              ):(<></>) 
            }       
          </div>                                                              
        </Modal> 
        <div className="col-md-10 justify-content-center align-items-center table-container">
          <table className="dataTable">   
            <tbody>
            {
              pagedItems.map(function (item, index) {
                return (
                  <tr key={item.id}>
                    <td style={{width: '80%'}} id={item.id} onClick={(e)=>this.onClickButton(e, 'default')}>Item # {item.id }</td>
                    <td style={{width: '10%'}}><button id={item.id} onClick={(e)=>this.onClickButton(e, 'edit')}>Editar <FontAwesomeIcon icon={faEdit} /> </button></td>
                    <td style={{width: '10%'}}><button id={item.id} onClick={(e)=>this.onClickButton(e, 'del')}>Eliminar <FontAwesomeIcon icon={faTrashAlt} /></button></td>
                  </tr>              
                );
              }.bind(this))
            }
            </tbody>                                  
          </table>   
          <div className="col-sm-12 text-center" style={{color: 'rgb(7, 71, 166)!important', backgroundColor: 'RGBA(0,0,0,0.2)'}}>
            <div className="btn-group pagination pagination-data">
                <p style={{width: 'auto !important', margin: '0 !important'}}>Total registros: {items.length}</p>
                <button className={(pager.currentPage===1)? (`btn btn-default disabled`):(`btn btn-default`)} onClick={()=>this.setPage(1)}>Primero</button>
                <button type="button" className={(pager.currentPage===1)? (`btn btn-default disabled`):(`btn btn-default`)} onClick={()=>this.setPage(pager.currentPage-1)}><FontAwesomeIcon icon={faAngleDoubleLeft} /></button>
                {
                  pager.pages?.map(function (page,index) {                      
                    return(
                    <button key={index} onClick={()=>this.setPage(page)} className={(pager.currentPage===page)? (`btn btn-default active`):(`btn btn-default`)} style={{marginLeft: '2px', marginRight: '2px', padding: '5px'}}> {page} </button>
                    )                      
                  }.bind(this))                                                                                                          
                }    
                <button className={(pager.currentPage === pager.totalPages)? (`btn btn-default disabled`):(`btn btn-default`)} onClick={()=>this.setPage(pager.currentPage+1)}><FontAwesomeIcon icon={faAngleDoubleRight} /></button>
                <button className={(pager.currentPage === pager.totalPages)? (`btn btn-default disabled`):(`btn btn-default`)} onClick={()=>this.setPage(pager.totalPages)}>Último</button>
            </div>
          </div>
        </div>
      </div>   
    )
  }
}

export default Dashboard
