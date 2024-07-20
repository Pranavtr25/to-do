import React from 'react'

const EditModal = ({isModalOpen, value, setEditIndex, setEditValue, saveEdit}) => {

    if(!isModalOpen){
        return null;
    }

  return (
    <div className="modal-overlay">
        <div className="modal">
            <h2>Edit Item</h2>
            <input
                type='text'
                value={value}   
                onChange={(e) => setEditValue(e.target.value)}    
            />
            <button className='to-do-search' onClick={saveEdit}>Save</button>
            <button className='to-d0-delete' style={{padding: '10px 15px', marginLeft: '5px',height: '36px'}} onClick={() => setEditIndex(null)}>Close</button>
        </div>
    </div>
  )
}

export default EditModal