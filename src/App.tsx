import { useState } from 'react'
import './App.css'

type ItemId = `${string}-${string}-${string}-${string}-${string}`

interface Item {
  id: ItemId
  timestamp: number
  text: string
}

const INITIAL_ITEMS: Item[ ] = []

/**
 * Renderiza el componente principal de la aplicación React.
 *
 * @param {React.FormEvent<HTMLFormElement>} event - El evento de formulario que activa la función.
 * @return {void} Esta función no devuelve nada.
 */
function App() {
  const [items, setItems] = useState(INITIAL_ITEMS)
  const [showEmptyAlert, setShowEmptyAlert] = useState(items.length === 0);


    /**
   * Maneja el evento de envío del formulario.
   *
   * @param {React.FormEvent<HTMLFormElement>} event - El evento de envío del formulario.
   * @return {void} Esta función no devuelve nada.
   */
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const { elements } = event.currentTarget

    const input = elements.namedItem('item')
    const isInput = input instanceof HTMLInputElement
    if (!isInput || input == null) return

    const newItem: Item = {
      id: crypto.randomUUID(),
      timestamp: Date.now(),
      text: input.value
    }

    setItems((prevItems) => {
      return [...prevItems, newItem]
    })

    input.value = ''
    setShowEmptyAlert(false);
  }

    /**
   * Crea una función que maneja la eliminación de un elemento.
   *
   * @param {ItemId} id - El ID del elemento a eliminar.
   * @return {Function} Una función que elimina el elemento de la lista.
   */
  const createHandleRemoveItem = (id: ItemId) => () => {
    
    setItems((prevItems) => {
      const updatedItems = prevItems.filter((item) => item.id !== id);
      setShowEmptyAlert(updatedItems.length === 0); //con esto actualizamos el estado de la alerta y volvemos a mostrar el mensaje de alerta
      return updatedItems;
        // return prevItems.filter(currentItem => currentItem.id !== id)
      })   
  }

  return (
    <>
      <main>
          <aside>
            <h1>Lista de elementos React</h1>
            <h2>Añadir y eliminar elementos de una lista</h2>
            <form onSubmit={handleSubmit}>
              <label htmlFor="">
                Elemento a introducir:
                <input type="text" 
                name='item'
                required
                typeof='text'
                placeholder='Elemento'
                />
              </label>
              <button>Añadir Elemento a la lista</button>
            </form>
          </aside>
          <section>
            <h2>Elementos de la lista</h2>
            {showEmptyAlert && (
              <div className="empty-alert">
              <span>
                Lista de elementos vacía
                </span>
            </div>
            )}
            <ul>
              {
                items.map(item =>{
                  return (
                  <li key={item.id}>{item.text}
                  <button onClick={createHandleRemoveItem(item.id)}>
                    Eliminar elemento
                  </button>
                  </li>)
                })
              }
            </ul>
          </section>
      </main>
      
    </>
  )
}

export default App
