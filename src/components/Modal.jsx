import { Children } from 'react'
import ReactDom from 'react-dom'

export function Modal({children,handleclosemodal})
{
    return (

        ReactDom.createPortal(

            <div className='modal-container'>
                <button onClick={handleclosemodal} className='modal-underlay'>
                </button>
                <div className='modal-content'>
                    {children}
                </div>
            </div>,document.getElementById('portal')

        )
    )
 }