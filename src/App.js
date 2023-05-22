import './App.css'
import React, {useState} from 'react'
import {useEffect} from 'react'

function App() {
  const [toDo,setToDo]=useState('');
  const [toDos,setToDos]=useState(()=>{
    const saved=localStorage.getItem("Storage");
    const initialValue=JSON.parse(saved);
    return(initialValue || "");
  });

  const index=toDos && toDos.findIndex(obj=>obj.statusRemove===true)
  if(index>-1) toDos && toDos.splice((index),1);


  const dayNames=['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday']
  const date=new Date()
  const day=dayNames[date.getDay()]

  const dayNamesShort=['Sun','Mon','Tue','Wed','Thu','Fri','Sat']
  const curDate=new Date();
  const hours=curDate.getHours()
  const AMorPM=hours>=12 ? 'PM':'AM';
  var hour=hours % 12;
  const hour12=()=>{
    if(hour===0) hour=12;
      return hour;
  };

  const toDoDate=curDate.getDate()+'.'+(curDate.getMonth()+1)+'.'+curDate.getFullYear();
  const toDoDay=dayNamesShort[curDate.getDay()];
  const toDoTime=hour12()+':'+curDate.getMinutes()+':'+curDate.getSeconds()+''+AMorPM;
  const toDoTimeDateDay=toDoTime+''+toDoDay+''+toDoDate;

  const userInput=(e)=>{
    setToDo(e.target.value);
  };
  
  const inputSubmit=(e)=>{
    e.preventDefault();
    if(toDo){
      setToDos([...toDos, {
        id:Date.now(),
        text:toDo,
        toDoTime:toDoTimeDateDay,
        statusErase:false,
        statusDone:false,
        statusDrop:false,
        statusRetrive:false,
        statusRemove:false
      }]);
      setToDo('');
    }
  };

  // const resetInput=()=>{
  //   setToDo('');
  // };

  useEffect(() => {
    localStorage.setItem("Storage", JSON.stringify(toDos));
 }, [toDos]);


  return (
    <div className="app">
      <div className='headings'>
        <div className="mainHeading" style={{paddingBottom:'10px'}}>
          <h1 className='gradient-text'>ToDo List</h1>
        </div>
        <div className="subHeading" style={{paddingTop:'10px', paddingBottom:'10px'}}>
          <h2 className='gradient-text2'>Whoop, it's {day} !!! </h2>
        </div>      
      </div>
      <form onSubmit={inputSubmit}>
            <div className="toDoInput">
               <div className="left">
                  <input value={toDo} onChange={userInput} type="text" placeholder=" Add Task . . ." />
               </div>
               {/* <div className="right erase">
                  <i onClick={resetInput} className="fas fa-eraser" title="Clear"></i>
               </div> */}
               <div className="rightEnd  add">
                  <button style={{ border: 'none', outline: 'none', backgroundColor: '#fff' }} type="submit"><i className="fas fa-plus" title="Add"></i></button>
               </div>
            </div>
         </form>

         <div className="container done" style={{ textAlign: "center", background: 'none', color: 'white' }}>
  <h3>Completed tasks</h3>
  <div className="row-container">
    {toDos &&
      toDos.map((obj) => {
        if (obj.statusDone && !obj.statusRemove) {
          return (
            <div key={obj.id} className="toDo">
              <div className="top">
                <p className="textCross">{obj.text}</p>
              </div>
              <div className="bottom">
                <p>{obj.toDoTime}</p>
              </div>
              <div className="right bin" style={{ fontSize: '13px' }}>
                <i
                  onClick={(e) => {
                    let isdelete = window.confirm("Deleting ToDo permanently!");
                    if (isdelete) {
                      e.target.value = true;
                    }
                    setToDos((toDos) =>
                      toDos.map((obj2) => {
                        if (obj2.id === obj.id) {
                          obj2.statusRemove = e.target.value;
                        }
                        return obj2;
                      })
                    );
                  }}
                  value={obj.statusRemove}
                  className="fas fa-trash-alt"
                  title="Remove"
                ></i>
              </div>
            </div>
          );
        }
      })}
  </div>
</div>

         <div className='container onGoing' style={{textAlign: "center", background:'none', color:'white'}}>
          <h3>Task Ongoing</h3>
          {
            toDos && toDos.map((obj)=>{
              if(!obj.statusDone && !obj.statusDrop){
                return(
                  <div key={obj.id} className="toDo">
                    <div className='left tick'>
                      <i onClick={(e)=>{
                        e.target.value=true;
                        setToDos(toDos.filter((obj2)=>{
                          if(obj2.id===obj.id){
                            obj2.statusDone=e.target.value;
                          }
                          return obj2;
                        }));
                      }} value={obj.statusDone} className="fas fa-check" title='Done'></i>
                    </div>
                    <div className='top'>
                      <p>{obj.text}</p>
                    </div>
                    <div className='bottom'>
                      <p>{obj.toDoTime}</p>
                    </div>
                    <div className='right close'>
                      <i onClick={(e)=>{
                        e.target.value=true;
                        setToDos(toDos.filter((obj2)=>{
                          if(obj2.id===obj.id){
                            obj2.statusDrop=e.target.value;
                          }
                          return obj2;
                        }));
                      }} value={obj.statusDrop} className="fas fa-times" title='Drop'></i>
                    </div>
                  </div>
                );
              }else if(obj.statusRetrive && !obj.statusDone){
                return(
                  <div key={obj.id} className="toDo">
                    <div className='left tick'>
                      <i onClick={(e)=>{
                        e.target.value=true;
                        setToDos(toDos.filter((obj2)=>{
                          if(obj2.id===obj.id){
                            obj2.statusDone=e.target.value;
                          }
                          return obj2;
                        }));
                      }} value={obj.statusDone} className="fas fa-check" title='Done'></i>
                    </div>
                    <div className='top'>
                      <p>{obj.text}</p>
                    </div>
                    <div className='bottom'>
                      <p>{obj.toDoTime}</p>
                    </div>
                    <div className='right close'>
                      <i onClick={(e)=>{
                        e.target.value=true;
                        setToDos(toDos.filter((obj2)=>{
                          if(obj2.id===obj.id){
                            obj2.statusDrop=e.target.value;
                            obj.statusRetrive=!e.target.value;
                          }
                          return obj2;
                        }));
                      }} value={obj.statusDrop} className="fas fa-times" title='Drop'></i>
                    </div>
                  </div>
                );
              }
            })
          }
         </div>

         <div className='container dropped' style={{textAlign: "center", background:'none', color:'white'}}> 
         <h3>Deleted Task</h3>
         {
          toDos && toDos.map((obj)=>{
            if(obj.statusDrop && !obj.statusRetrive && !obj.statusRemove){
              return(
                <div key={obj.id} className="toDo">
                  <div className='left recycle'>
                    <i onClick={(e)=>{
                      let isdelete=window.confirm("Retriving dropped ToDo");
                      if(isdelete){
                        e.target.value=true;
                      }
                      setToDos(toDos.filter((obj2)=>{
                        if(obj2.id===obj.id){
                          obj2.statusRetrive=e.target.value;
                        }
                        return obj2;
                      }));
                    }} value={obj.statusRetrive} className="fas fa-redo-alt" title='Retrive'></i>
                  </div>
                  <div className='top'>
                    <p className='textCross'>{obj.text}</p>
                  </div>
                  <div className='bottom'>
                    <p>{obj.toDoTime}</p>
                  </div>
                  <div className='rigth bin'>
                    <i onClick={(e)=>{
                      let isdelete=window.confirm("Deleting ToDo permanently!");
                      if(isdelete){
                        e.target.value=true;
                      }
                      setToDos(toDos.filter((obj2)=>{
                        if(obj2.id===obj.id){
                          (obj2.statusRemove=e.target.value);
                        }
                        return obj2;
                      }));
                    }} value={obj.statusRemove} className="fas fa-trash-alt" title='Remove'></i>
                  </div>
                </div>
              );
            }
          })
         }
        </div>
    </div>
)}

export default App;


  
