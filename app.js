const btnAgregar = document.querySelector('button')
const input = document.querySelector('#item')
const lista = document.querySelector('ul')


//FUNCIONES
const agregarItemUI = (item) => {
    if(item == ''){
        window.alert('Agregue un item')
    } else{
    const elementoLista = document.createElement('li')
    const botonEliminar = document.createElement('button')
    elementoLista.textContent = item
    botonEliminar.textContent = "X"
    elementoLista.appendChild(botonEliminar)
    lista.appendChild(elementoLista)
    input.value = ''
    }
}

const eliminarItemUI = (e) => {
    if(e.target.tagName === 'BUTTON'){
        if(window.confirm('¿Esta seguro que desea eliminar el item?')){
            e.target.parentElement.remove()
        }
    }
}

const obtenerItemsStorage = () => {
    let items
    if(localStorage.getItem('items') === null){
        items = []
    } else{
        items = JSON.parse(localStorage.getItem('items'))
    }
    return items
}

const almacenarItemsStorage = (item) => {
    if(item != ''){
    const items = obtenerItemsStorage()
    items.push(item)
    localStorage.setItem('items',JSON.stringify(items))
    }
}

const mostrarItemsStorage = () => {
    const items = obtenerItemsStorage()
    items.forEach( (item) => {
        agregarItemUI(item)
    })
}

const eliminarItemStorage = (e) => {
    const items = obtenerItemsStorage()
    let itemEliminar = e.target.parentElement.textContent
    itemEliminar = itemEliminar.substring(0, itemEliminar.length -1)
    items.forEach((item, index) => {
        if( item == itemEliminar){
            items.splice(index,1)
        }
    })
    localStorage.setItem('items',JSON.stringify(items))
    
}

//EVENTOS
//Agregar Items
btnAgregar.addEventListener('click', () =>{
    const item = input.value
    agregarItemUI(item)
    almacenarItemsStorage(item)
})

input.addEventListener('keyup', (e) =>{
    if(e.keyCode === 13){
    const item = input.value
    agregarItemUI(item)
    almacenarItemsStorage(item)
    }
})

//Eliminar Items
lista.addEventListener('click', (e) =>{
    eliminarItemUI(e)
    eliminarItemStorage(e)
})

//Cargar Items
document.addEventListener('DOMContentLoaded',mostrarItemsStorage())


