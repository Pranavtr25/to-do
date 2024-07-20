import React,{useEffect, useRef, useState} from "react";
import {toast, ToastContainer} from 'react-toastify'
import 'react-toastify/ReactToastify.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons';
import EditModal from "./EditModal";

function ToDoList(){


    const displayVal = JSON.parse(localStorage.getItem("items"))
    const [list,setList] = useState(displayVal || ["eat breakfast","take a shower","take dog for a walk"])
    const [newList,setNewList] = useState("")
    const [searchItems,setSearchItems] = useState([])
    const [search,setSearch] = useState(false)
    const [editValue,setEditValue] = useState("")
    const [editIndex, setEditIndex] = useState(null)
    // const [isModalOpen, setIsModalOpen] = useState(false)

    function updateNewList(e){
        console.log(`newList : ${newList}`)
        const value = e.target.value
        setNewList(value)
        if(!value){
            setSearch(false)
        }
    }


    function addList(){
        if(newList.trim() !== ""){
            console.log("workingg")
            const updatedList = [...list,newList]
            setList(updatedList)
            localStorage.setItem("items",JSON.stringify(updatedList))
            setNewList("")
            toast.success('Successfully Added')
        }else{
            console.log("error")
            toast.error('empty list cannot be added')
        }
    }

    function openModal(index, value){
        setEditIndex(index)
        setEditValue(list[index])
        console.log(editIndex,editValue)
    }

    function saveEdit(index){
        let updatedList = [...list]
        updatedList[index] = editValue
        setList(updatedList)
        localStorage.setItem("items", JSON.stringify(updatedList))
        setEditIndex(null)
        setEditValue('')
    }

    function removeList(i){
        const updatedList = list.filter((_,index) => index !== i)
        setList(updatedList)
        localStorage.setItem("items",JSON.stringify(updatedList))
    }

    function moveListUp(index){
        if(index>0){
            let updateLists = [...list]
            let temp = updateLists[index-1]
            updateLists[index-1] = updateLists[index]
            updateLists[index] = temp 
            setList(updateLists)
            localStorage.setItem("items",JSON.stringify(updateLists))
        }
    }

    function moveListDown(index){
        if(index<list.length-1){
            let updateLists = [...list]
            let temp = updateLists[index+1]
            updateLists[index+1] = updateLists[index]
            updateLists[index] = temp
            setList(updateLists)
            localStorage.setItem("items",JSON.stringify(updateLists))
        }
    }

    function searchedItems(){
        console.log(newList)
        let res = []
        for(let i=0;i<list.length;i++){
            if(list[i].includes(newList)){
                res.push(list[i])
            }
        }
        console.log(res)
        setSearchItems(res)
        setSearch(true)
    }

        

    return (
        <>
            <div className="to-do-container">
                <h1 className="to-do-heading">To - Do List</h1>
                <div style={{"display":"flex","flexDirection":"center"}}>
                    <input className="to-do-input" type="text" id="listInput" onChange={updateNewList} value={newList}  placeholder="Enter a list to add"/>
                    <button className="to-do-sumbit" onClick={addList}>Add</button>
                    <button className="to-do-search" onClick={searchedItems}>search</button>
                    <ToastContainer className={'toast-container'}/>
                </div>

                <ol>
                    {search ? (searchItems.map((val,index) => (
                        <li className="to-do-value" key={index}>
                        {val} 
                        <FontAwesomeIcon icon={faPenToSquare} className="icon-edit"/>
                        <button className="to-d0-delete" onClick={()=>removeList(index)}>Delete</button>
                        <button className="to-do-up" onClick={() => moveListUp(index)}>☝️</button>
                        <button className="to-do-down"  onClick={() => moveListDown(index)}>👇</button>
                    </li>
                    ))) :
                    (list.map((val,index)=> (
                        
                        <li className="to-do-value" key={index}>
                            {val} 
                            <FontAwesomeIcon icon={faPenToSquare} className="icon-edit" onClick={() => openModal(index,val)}/>
                            <button className="to-d0-delete" onClick={()=>removeList(index)}>Delete</button>
                            <button className="to-do-up" onClick={() => moveListUp(index)}>☝️</button>
                            <button className="to-do-down"  onClick={() => moveListDown(index)}>👇</button>
                        </li>

                    )))
                }    
                </ol>
            </div>

            <EditModal isModalOpen = {editIndex !== null} value = {editValue} setEditIndex = {setEditIndex} setEditValue = {setEditValue} saveEdit = {() => saveEdit(editIndex)}/>
        </>
    )
}

export default ToDoList;