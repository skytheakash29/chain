import {Container,Row,Col} from 'react-bootstrap'
import {Link} from "react-router-dom"

import indexImg from "../assets/index_img.png"
import logo from "../assets/Logo.png"


const Home = () =>{
    return(
        <Container className="index">
            <Row className="rowVH">
                <Col md={6}>
                    <img src={indexImg} alt="" width="80%" className="heroImg"/>
                </Col>
                <Col md={6}>
                    <img src={logo} alt="" className="logo"/>
                    <h4>Is an ai tool..!</h4>
                    <p>Chain : creating entertaining and interactive virtual companions for you.</p>
                    <Link to="/generate">                    <button className="buttonPrimary">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-lightbulb-fill" viewBox="0 0 16 16">
  <path d="M2 6a6 6 0 1 1 10.174 4.31c-.203.196-.359.4-.453.619l-.762 1.769A.5.5 0 0 1 10.5 13h-5a.5.5 0 0 1-.46-.302l-.761-1.77a1.964 1.964 0 0 0-.453-.618A5.984 5.984 0 0 1 2 6zm3 8.5a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1l-.224.447a1 1 0 0 1-.894.553H6.618a1 1 0 0 1-.894-.553L5.5 15a.5.5 0 0 1-.5-.5z"/>
</svg>
                     Generate image
                    </button>
                </Link>
                    <br/>
                    <Link to="/consult"><button className="buttonSecondary"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-chat-right-dots-fill" viewBox="0 0 16 16">
  <path d="M16 2a2 2 0 0 0-2-2H2a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h9.586a1 1 0 0 1 .707.293l2.853 2.853a.5.5 0 0 0 .854-.353V2zM5 6a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm4 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm3 1a1 1 0 1 1 0-2 1 1 0 0 1 0 2z"/>
</svg> Consult with</button>
</Link>


<p className='mt-4'>Coded by <b><a href="https://www.facebook.com/emadulislam2004">Emadul islam</a></b></p>



                </Col>
            </Row>
        </Container>
    )
}
export default Home;
