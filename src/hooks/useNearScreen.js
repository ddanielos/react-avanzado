import { useState, useEffect, useRef } from 'react'

export function useNearScreen(){
  const element = useRef(null)
  const [show, setShow] = useState(false)

  useEffect(function () {
    Promise.resolve(
      typeof window.IntersectionObserver !== 'undefined'
      ? window.IntersectionObserver
      : import('intersection-observer')
      ).then(() => {
        // intersectioin observer devuelve una función que recibe todas las entradas(entries) que están en el viewport
      const observer = new window.IntersectionObserver(function (entries) {
        const { isIntersecting } = entries[0]
        if (isIntersecting) {
          setShow(true)
          observer.disconnect() // si el elemento ya es true que el observer no siga escuchando
        }
      })
      observer.observe(element.current)
    })
  }, [element]) // Este efecto se ejecuta solo cuando cambia la referencia element

  return [show, element]
}
