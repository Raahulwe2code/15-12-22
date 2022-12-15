import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Button, Col, Container, Form, Row, Table } from 'react-bootstrap'

import{Link,  useNavigate} from 'react-router-dom'

import Modal from 'react-bootstrap/Modal';


export const Home = () => {

  const [getUser,setGetuser]=useState([]);
  const [deleteId,setdeleteId]=useState('');
  const [city,setcity]=useState('');
  const [name,setName]=useState('');
  const [gender,setGender]=useState('');
  const [hobbies,setHobbies]=useState('');
  const [apicall,setapicall]=useState(false);
  const [sortBy,setSortBy]=useState("name")
    
  const [Searchpage ,setSearchpage ]= useState(1)
  const [Searchlimit ,setSearchlimit]= useState(5)
  const [total, setTotal]= useState(0)

const navigate=useNavigate();

  // delete aler-------------------------------------------

  const [show, setShow] = useState(false);
 

  const handleShow = (id) =>{ 
    
    setdeleteId(id)
    setShow(true)
  }
  // console.log("--deleteId-"+deleteId)

  const OnSearch = () => {
    setapicall(true)
  }

  const OnReset =()=>{
      setName('')
      setGender('')
      setHobbies('')
      setcity('')
      setSearchpage(1)
      setSearchlimit(5)
    setapicall(true)
      
     
      console.log(name, gender, hobbies, city)
  }
    const handleClose = () => {
    setShow(false)};
    // delete aler-------------------------------------------
  // const Navigation=useNavigate("")
    
  // const fetchUser= async()=>{
  //   const result=await axios.get('http://localhost:1000/user')
  //    setGetuser(result.data)
  // }
  useEffect(()=>{
    searchHendler()
  },[apicall,sortBy,Searchpage,Searchlimit])


  const deleteUser=async()=>{
    // console.log("-apiu--"+deleteId)
    const result= await axios.delete(`http://localhost:1000/user/${deleteId}`)
    if(result.status===204){
      setapicall(true)
      setShow(false);
    }
    else{
      alert("not delete")
    }
  }
  const onButtonClick=(id)=>{
localStorage.setItem("userid", id)
navigate(`/adduser/${id}`)
  }
  const AddUserItem=()=>{
    localStorage.removeItem("userid")
    navigate(`/adduser/:userid`)
      }


      const searchHendler =async (e)=>{
    
       let result;
     
        //  console.log("---name---"+name)
        // console.log("---city---"+city)
        console.log("if page"+Searchpage)
        console.log("if limit"+Searchlimit)
       
       
       
           console.log("---name---"+name)
        console.log("---city---"+city)
        console.log("++++"+sortBy)
        console.log("else page"+Searchpage)
        console.log("else limit"+Searchlimit)
    
      //  const  sortDAta= {"name":"rrrrr"}
    
        result= await axios.get(`http://localhost:1000/search`,{params:{
          "name":name,"city":city,"hobbies":hobbies, "gender":gender, "sortBy":sortBy,"page":Searchpage,"limit":Searchlimit
          
        }})

       

       
     
           setGetuser(result.data.data)
           setTotal(result.data.totalCount)
           setapicall(false)

      
      }

 const totalPagesCalculator=( total, Searchlimit)=>{
  const pages=[];
  for(let x=1;x<=parseInt(total)/Searchlimit; x++){
pages.push(x)
  }
  return pages;
 }
     
  return (
    <>
    <h1 className='py-3 my-3 bg-success text-center text-white'>User Management System</h1>

     <Button onClick={()=>AddUserItem()} className='btn btn-primary' >Add user</Button>
   




      <Container>
        <Row className='justify-content-center'>
          <Col lg={12}>
          <Form className="d-flex">
            <Form.Control
              type="search"
              placeholder="Search"
              className="me-2"
              aria-label="Search"
              onChange={(e)=>{setName(e.target.value)   }}
              // onKeyUp={alert("kk")}
             
            />
         

               


            <Form.Select aria-label="Default select example" className='ms-4' onChange={(e)=>{setcity(e.target.value)}}>
            <option value={''}>City wise</option>
            <option value={'indore'}>Indore</option>
            <option value={'bhopal'}>Bhopal</option>
            <option value={'gwalior'}>Gwalior</option>

    </Form.Select>
            <Form.Select aria-label="Default select example" className='ms-4' onChange={(e)=>{setHobbies(e.target.value)}}>
            <option value={''}>Hobbies wise</option>
            <option value={'Cricket'}>Cricket</option>
            <option value={'Hockey'}>Hockey</option>
            <option value={'Football'}>Football</option>
    </Form.Select>
            <Form.Select aria-label="Default select example" className='ms-4' onChange={(e)=>{setGender(e.target.value)}}>
            <option value={''}>Gender wise</option>
            <option value={'male'}>Male</option>
            <option value={'female'}>Female</option>
         
    </Form.Select>

            <Button variant="outline-success" className='ms-2' onClick={OnSearch}>Search</Button>
            <Button variant="outline-danger" className='ms-2' type='reset' onClick={OnReset}>Clear</Button>
          </Form>
          </Col>
        </Row>
      </Container>

     <Table striped bordered hover className='mt-3'>
      <thead className='table-dark'>
        <tr>
          <th>ID</th>
          <th 
          onClick={()=> setSortBy("name")}
          >NAME</th>
          <th onClick={()=>setSortBy("gender") }>GENDER</th>
          <th  onClick={()=>setSortBy("city")}>CITY</th>
          <th onClick={()=> setSortBy("hobbies") }>Hobbies</th>
          <th>OPERATIONS</th>

        </tr>
      </thead>
      <tbody>
        {  
        
       getUser.length>0 ? getUser.map((item, id)=>{
          return(
            <>
             <tr>
          <td>{id+1}</td>
          <td>{item.name}</td>
          <td>{item.gender}</td>
          <td>{item.city}</td>
          <td>{item.hobbies}</td>
         
          {/* {console.log(item.dob)} */}
          <td>
           <div className='justify-content-between d-flex button_box' style={{width:50}}>
           <Link to={`/view/${item._id}`}><Button>Views</Button></Link>
     
            <Button className='mx-2' onClick={(e)=>{onButtonClick(item._id)}} >Edit </Button>
            {/* </Link> */}
      
           <Link ><Button onClick={()=>{handleShow(item._id) }}>Delete</Button></Link>


       
        
           </div>
          </td>
        </tr>
            </>
          )
        })
        :
         
          <h1 className='text-center ' style={{marginLeft:400 ,marginTop:100}}>No Result Found</h1>
     
        }
        
       
      </tbody>
    </Table>

    <Container>
      <Row className='justify-content center'>
        <Col lg={4} style={{marginLeft:450}}>
        <nav aria-label="Page navigation example" >
  <ul className="pagination">

   {Searchpage!==1 &&  <li className="page-item"onClick={()=>{ setSearchpage(Searchpage-1)}} ><a className="page-link" >Previous</a></li>}

    {totalPagesCalculator(total, Searchlimit).map(pageNo=>  <li className={` ${pageNo===Searchpage?  'page-item active':''}`} key={pageNo}><a className="page-link"  onClick={()=>{setSearchpage(pageNo)}}  >{pageNo}</a></li>)}

   {Searchpage !==parseInt(total/Searchlimit)&& <li className="page-item" onClick={()=>{ setSearchpage(Searchpage+1)}}><a className="page-link"  >Next</a></li>}

    <Form.Select  onChange={(e)=>{setSearchlimit(e.target.value)}} className="ms-2">
            <option>Page Limit</option>
            <option value={'5'}>5</option>
            <option value={'10'}>10</option>
            <option value={'15'}>15</option>
    </Form.Select>
  </ul>

</nav>
        </Col>
      </Row>
    </Container>
    

{/* 
    <Button variant="primary" onClick={handleShow}>
        Launch demo modal
      </Button> */}

<Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Delete Alert</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you Sure Delete  You Data!</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={deleteUser}>
            Yes
          </Button>
          <Button variant="primary" onClick={handleClose}>
            No
          </Button>
        </Modal.Footer>
      </Modal>

    </>
  )
}
