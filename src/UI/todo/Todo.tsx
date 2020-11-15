import React, {Component, useContext, useState, useEffect} from 'react';
// import { AuthContext } from '../Context/auth';
import { Table, FormGroup, Form, Label, Input , Button, Toast, ToastHeader, ToastBody, ButtonDropdown, UncontrolledButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem, ButtonGroup, UncontrolledDropdown, NavLink} from 'reactstrap';
import * as mocker from './TODOsMocker';
// import store from './../store/store';
import { connect } from 'react-redux';
import { addTODO, clearFlags, filterByPriority, filterByStatus, prioritiseTODO, markTODO } from '../store/Actions/actionCreator';
import { TODO as TODODEF, TODOPRIORITY, TODOSTATUS  } from '../store/core/defs'
import * as icons from './../icons';
import {convertToStatus, convertToPriority} from '../store/Actions/converters';




const filterByPriorityAction  = (state) => 
{
    // console.log(state)
    return state.todos.filter (
        todo  => {
            // console.log(state.priorities );
            var p = convertToPriority(todo.priority);
            if ( state.priorities.includes(p) || state.priorities.includes(TODOPRIORITY[TODOPRIORITY.ALL]))
            {
                return todo;
            }
        }
    )
}
const filterByStatusAction = (state) => 
{
    return state.todos.filter (
        todo  => {
            var p = convertToStatus(todo.status);
            if ( state.status.includes(p ) || state.status.includes(TODOSTATUS[TODOSTATUS.ANY]))
            {
                return todo;
            }
        }
    )
}

const mapStateToProps = (state) => {
    return { 
        todos :  filterByStatusAction(state.rootReducer).filter(obj => (filterByPriorityAction(state.rootReducer)).includes(obj)),
        forbiddenFlag : state.rootReducer.forbiddenWordsFlag,
        theme : state.sessionReducer.theme,
    }
}
    
const mapDispatchToProps = dispatch => (
    {
        addTODOR : (TODO_) => dispatch(addTODO(TODO_)),
        clearFlags : () => dispatch(clearFlags()),
        fltPriorities : (priorities) => dispatch(filterByPriority(priorities)),
        fltStatus : (status) => dispatch(filterByStatus(status)),
        chgPriority : (id, priority) => dispatch(prioritiseTODO(id, priority)),
        chgStatus : (id, status) => dispatch(markTODO(id, status)),
    }
)

const TODO = ({todos, forbiddenFlag, addTODOR, theme,
        clearFlags, fltPriorities, fltStatus, chgPriority, chgStatus}) => {

    // const authc = useContext(AuthContext);
    const [title, setTitle ] = useState('');
    const [contents, setContents ] = useState('');
    const [ itemStatus, setItemStatus ] = useState(convertToStatus(TODOSTATUS.ACTIVE));
    const [ itemPriority , setItemPriority ] = useState(convertToPriority(TODOPRIORITY.CASUAL));
    const [priorities, setPriorities] = useState([TODOPRIORITY[TODOPRIORITY.ALL] ]);
    const [status, setStatus ] = useState([TODOSTATUS[TODOSTATUS.ANY] ]);
    const [todoSelection, setTodoSelection] = useState<TODODEF>();

    useEffect(() => {
        fltPriorities(priorities);
    }, [priorities]);
    
    useEffect(() => {
        fltStatus(status);
    }, [status]);

    let dateC = (c : number) => {
        var b = new Date(c);
        return b.toString()
    }
    
    const handleSubmit = (event) => {
        // event.preventDefault();
        addTODOR({title : title, content : contents, priority : itemPriority, status : itemStatus, id : '122'} as TODODEF);
        setTitle('');
        setContents('');
    };

    const getClass = (todo : TODODEF) => {
        let s = [' mb-5'];
        if (theme === 'dark')
        {
            if (todo === undefined || todo === null)
            {
                return 'text-light bg-dark p-3'
            }
            var p = convertToPriority(todo.priority);
            if (p === TODOPRIORITY[ TODOPRIORITY.URGENT])
            {
                s.push('bg-dark text-warning bg-light p-3 border border-danger');
            }
            else {
                s.push('text-light bg-dark p-3')
            }
            if (todo.status === 0)
            {
                s.push('');
            }
        }
        else{

            if (todo === undefined || todo === null)
            {
                return 'text-primary bg-light p-3 border border-muted'
            }
            let s = [' mb-5'];
            var p = convertToPriority(todo.priority);
            if (p === TODOPRIORITY[ TODOPRIORITY.URGENT])
            {
                s.push('text-danger bg-light p-3 border border-danger');
            }
            else {
                s.push('text-primary bg-light p-3 border border-muted')
            }
            if (todo.status === 0)
            {
                s.push('');
            }
        }

        return s.join(' ');
    }

    const clearToast = () => {
        // removes the toast
        clearFlags();
    }
    const forbiddenToast = () => {
        setTimeout(() => clearToast(), 5000);
        return (
            <>
                <hr />
                <Toast>
                    <ToastHeader icon="danger">
                        Message was blocked
                    </ToastHeader>
                    <ToastBody>
                        Messages was forbidden due to classified genre policy. Please recheck your message and try again.
                    </ToastBody>
                </Toast>
            </>
        );  
    }
    
    const getFilterPriorities = () => {
        // if we select ALL, then really just remove all else
        // remove duplicate keys

        return (
            Object.values(TODOPRIORITY).map( priority =>
            {
                // console.log(priority.toString(s));
                return (
                    isNaN(
                        Number(priority)) ?  
                            <DropdownItem onClick={
                                () =>   {
                                    
                                        
                                        if (priority === TODOPRIORITY[TODOPRIORITY.ALL])
                                        {
                                            setPriorities([TODOPRIORITY[TODOPRIORITY.ALL]]);
                                        }    
                                        else {
                                            setPriorities(
                                                    priorities
                                                        .filter(p => 
                                                            ( 
                                                                p !== TODOPRIORITY[TODOPRIORITY.ALL]) 
                                                                && p !== priority
                                                            )
                                                        .concat(priority.toString())
                                                )
                                        }
                                }}>
                                            
                                            {priority}
                            </DropdownItem> 
                        : null
                )                        
            })
        );
    }

    const getSelectedPriorities = () => {
        return (
            <>
                {
                    priorities.map(priority => 
                            <Button onClick={
                                () => { 
                                    const filteredStatus =  priorities.filter(p => p !== priority);
                                    if (filteredStatus.length == 0)
                                    {
                                        filteredStatus.push(TODOPRIORITY[TODOPRIORITY.ALL]);
                                    }
                                    setPriorities( filteredStatus);
                                }
                            }>{priority} <span >&times;</span></Button>
                    )
                }
            </>
        );  
    }


    const getFilterStatus = () => {
        // if we select ALL, then really just remove all else
        // remove duplicate keys

        return (
            Object.values(TODOSTATUS).map( priority =>
            {
                // console.log(priority.toString(s));
                return (
                    isNaN(
                        Number(priority)) ?  
                            <DropdownItem onClick={
                                () =>   {
                                        if (priority === TODOSTATUS[TODOSTATUS.ANY] || priority === undefined)
                                        {
                                            setStatus([TODOSTATUS[TODOSTATUS.ANY]]);
                                        }    
                                        else {
                                            setStatus(
                                                    status
                                                        .filter(p => 
                                                            ( 
                                                                p !== TODOSTATUS[TODOSTATUS.ANY]) 
                                                                && p !== priority
                                                            )
                                                        .concat(priority.toString())
                                                )
                                        }
                                }}>
                                            
                                            {priority}
                            </DropdownItem> 
                        : null
                )                        
            })
        );
    }

    const getSelectedStatus = () => {
        return (
            <>
                {
                    status.map(priority => 
                        <Button onClick={
                            () => { 
                                    // console.log(priority);
                                    const filteredStatus =  status.filter(p => p !== priority);
                                    if (filteredStatus.length == 0)
                                    {
                                        filteredStatus.push(TODOSTATUS[TODOSTATUS.ANY]);
                                    }
                                    setStatus(filteredStatus)
                                }
                            }>{priority} <span >&times;</span></Button>
                    )
                }
            </>
        );  
    }

    const getStatusButtonItem = (id, itemPriority) => {
        itemPriority = convertToPriority(itemPriority);
        return (
            <div className="d-inline mx-2 float-right">
                <UncontrolledDropdown className="d-inline" setActiveFromChild>
                    <DropdownToggle tag="a" className="nav-link d-inline" caret>
                        { itemPriority }
                    </DropdownToggle>
                    <DropdownMenu>
                        {
                            Object.values(TODOPRIORITY).map(priority => {
                                return (
                                    isNaN(Number(priority)) ? 
                                        <DropdownItem onClick={
                                            () => {
                                                chgPriority(id, priority)
                                            }
                                            }>{
                                             itemPriority === priority ?
                                                makeIcon(1.5, icons.checkIcon)
                                                :
                                                makeIcon(0.75, icons.asterixIcon)
                                            } {priority}
                                        </DropdownItem>
                                    : null
                                );
                            })
                        }
                    </DropdownMenu>
                </UncontrolledDropdown>
            </div>

        );
    };

    const getStatusStatusButtonItem = (id, itemStatus) => {
        itemStatus = convertToStatus(itemStatus);
        return (
            <div className="d-inline mx-2 float-right">
                <UncontrolledDropdown className="d-inline" setActiveFromChild>
                    <DropdownToggle tag="a" className="nav-link d-inline" caret>
                        { itemStatus }
                    </DropdownToggle>
                    <DropdownMenu>
                        {
                            Object.values(TODOSTATUS).map(priority => {
                                return (
                                    isNaN(Number(priority)) ? 
                                        <DropdownItem onClick={
                                            () => {
                                                chgStatus(id, priority)
                                            }
                                            }>{
                                                itemStatus === priority ?
                                                makeIcon(1.5, icons.checkIcon)
                                                :
                                                makeIcon(0.75, icons.asterixIcon)
                                            } {priority}
                                        </DropdownItem>
                                    : null
                                );
                            })
                        }
                    </DropdownMenu>
                </UncontrolledDropdown>
            </div>

        );
    };

    const makeIcon = (size : number , icon : JSX.Element) => {
        return (
            <div className=" w-auto my-auto d-inline mx-4 ">
                <svg width= {size + "em"} height= {size + "em"}  viewBox="0 0 16 16" className="bi bi-calendar4" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                    {icon}
                </svg>
            </div>
        );
    }



    return (
        <div>
            <div className="d-none d-sm-none d-md-block w-100 text-white bg-dark m-0 ">
                <div className="container row w-100 m-0 p-2">
                    <div className="col-md-auto my-auto">
                        <svg width="4em" height="4em" viewBox="0 0 16 16" className="bi bi-alarm" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                            <path fill-rule="evenodd" d="M6.5 0a.5.5 0 0 0 0 1H7v1.07a7.001 7.001 0 0 0-3.273 12.474l-.602.602a.5.5 0 0 0 .707.708l.746-.746A6.97 6.97 0 0 0 8 16a6.97 6.97 0 0 0 3.422-.892l.746.746a.5.5 0 0 0 .707-.708l-.601-.602A7.001 7.001 0 0 0 9 2.07V1h.5a.5.5 0 0 0 0-1h-3zm1.038 3.018a6.093 6.093 0 0 1 .924 0 6 6 0 1 1-.924 0zM8.5 5.5a.5.5 0 0 0-1 0v3.362l-1.429 2.38a.5.5 0 1 0 .858.515l1.5-2.5A.5.5 0 0 0 8.5 9V5.5zM0 3.5c0 .753.333 1.429.86 1.887A8.035 8.035 0 0 1 4.387 1.86 2.5 2.5 0 0 0 0 3.5zM13.5 1c-.753 0-1.429.333-1.887.86a8.035 8.035 0 0 1 3.527 3.527A2.5 2.5 0 0 0 13.5 1z"/>
                        </svg>         
                    </div>       
                    <div className="col-md-9">
                        <h1>My TODOs</h1>
                        <h3>TODOs LIST (CLICK ON ITEM TO VIEW)</h3>
                    </div>
                </div>
                
                {
                    // to filter out elements based on specific filters
                }
                <div className='w-100 m-2 p-3 d-inline ml-5'>
                    <h4 className="d-inline my-auto align-baseline"> Available filters :</h4>
                    <ButtonGroup className="d-inline my-auto mx-2 align-baseline">
                        {getSelectedPriorities()}
                        <UncontrolledButtonDropdown>
                            <DropdownToggle caret>
                                Priorities
                            </DropdownToggle>
                            <DropdownMenu>
                                {
                                    getFilterPriorities()
                                }
                            </DropdownMenu>
                        </UncontrolledButtonDropdown>
                    </ButtonGroup>
                    <ButtonGroup className="ml-2 d-inline my-auto mx-2 align-baseline"> 
                        {getSelectedStatus()}
                        <UncontrolledButtonDropdown>
                            <DropdownToggle caret>
                                Status
                            </DropdownToggle>
                            <DropdownMenu>
                                {
                                    getFilterStatus()
                                }
                            </DropdownMenu>
                        </UncontrolledButtonDropdown>
                    </ButtonGroup>
                </div>

                <div className='w-100'>
                        <div className="w-75 border  p-3 mx-auto mt-4 float-left">
                            {
                                todos.map(
                                    todo => todo !== undefined ? 
                                    <div className={getClass(todo)}>
                                            {TODOSTATUS[TODOSTATUS.ACTIVE].toString() === convertToStatus(todo.status).toString() 
                                                ? makeIcon(2, icons.hammerIcon) : null}
                                            {TODOSTATUS[TODOSTATUS.CANCELLED].toString() === convertToStatus(todo.status).toString() 
                                                ? makeIcon(2, icons.noIcon) : null}
                                            {TODOSTATUS[TODOSTATUS.DONE].toString() === convertToStatus(todo.status).toString() 
                                                ? makeIcon(2, icons.checkIcon) : null}
                                            {TODOSTATUS[TODOSTATUS.REPORTED].toString() === convertToStatus(todo.status).toString() 
                                                ? makeIcon(2, icons.reportedIcon) : null}
                                            {TODOSTATUS[TODOSTATUS.ANY].toString() === convertToStatus(todo.status).toString() 
                                                ? makeIcon(2, icons.questionIcon) : null}
                                            <h4 className="d-inline w-50 float-left" >{todo.title} | 
                                                        <h6 className='d-inline'><Button color="link" onClick={() => {setTodoSelection(todo)}}>{todo.content.substring(0,30)}</Button>  ...</h6></h4>
                                            {getStatusButtonItem(todo.id, todo.priority)}
                                            {getStatusStatusButtonItem(todo.id, todo.status)}
                                    </div> 
                                    :
                                    <></>
                                    )
                            }
                            {todoSelection ? (<hr/>) : null}
                            {
                                
                                (todoSelection) ?
                                    (<div className={getClass(todoSelection)}>
                                        {makeIcon(2, icons.reportedIcon)}
                                        <h4 className="w-100" >{todoSelection.title}
                                        </h4>
                                        <h6 className=''>{todoSelection.content}.</h6>
                                        <h6>
                                            Status : {convertToStatus( todoSelection.status)}
                                        </h6>
                                        <h6>
                                            Priority : {convertToPriority( todoSelection.priority )}
                                        </h6>
                                        {getStatusButtonItem(todoSelection.id, todoSelection.priority)}
                                        {getStatusStatusButtonItem(todoSelection.id, todoSelection.status)}
                                    </div>) : null
                            }
                        </div>
                        
                        <Form className="w-25 border border-muted text-white p-5 mx-auto mt-4 float-right">
                            <FormGroup row>
                                <Label size='lg' xs={12} sm={12} for='title'>Title</Label>
                                <Input xs={12} sm={12} bsSize='lg'
                                    type='text' name='title' id='title'
                                    value={title}
                                    onChange={v => setTitle(v.target.value)}
                                    />
                            </FormGroup>
                            <FormGroup row>
                                <Label size='lg' xs={12} sm={12} for='content'> Contents </Label>
                                <Input xs={12} sm={12} bsSize='lg'
                                    type='textarea' name='content' id='content'
                                    value={contents}
                                    onChange={v => setContents(v.target.value)}
                                    />
                            </FormGroup>
                            <FormGroup row>
                                <Label size='lg' xs={12} sm={12} for='status'>Todo status </Label>
                                <Input type='select' xs={12} sm={12} name='status'
                                    value={itemStatus}
                                    onChange={(c) => setItemStatus(convertToStatus(c.target.value))}
                                >
                                    {Object.keys(TODOSTATUS).filter(t => isNaN(Number(t))).map(
                                        t => <option>{t}</option>
                                    ) }
                                </Input>
                            </FormGroup>
                            <FormGroup row>
                                <Label size='lg' xs={12} sm={12} for='priority'>Todo priority </Label>
                                <Input type='select' xs={12} sm={12} name='priority'
                                    value={itemPriority}
                                    onChange={(c) => setItemPriority(convertToPriority(c.target.value))}
                                >
                                    {Object.keys(TODOPRIORITY).filter(t => isNaN(Number(t))).map(
                                        t => <option>{t}</option>
                                    ) }
                                </Input>
                            </FormGroup>
                            <Button onClick={(event) =>handleSubmit(event)}>
                                Create TODO
                            </Button>
                            {forbiddenFlag ? forbiddenToast() : null} 
                        </Form>
                </div>
            </div>
            <div className="d-sm-block d-md-none container h-100">
                {/* <div className="col-sm"></div> */}
                <div className="row align-items-center">
                    <h2 className="text-center mx-auto">
                        Not optimized for mobile. 
                        <br/>We're working on that !
                    </h2>
                </div>
                {/* <div className="col"></div> */}
            </div>
        </div>
    );

}

export default connect(
                    mapStateToProps, mapDispatchToProps
                    )( TODO ); 