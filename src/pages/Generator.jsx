import {Container,Row,Col,Toast } from 'react-bootstrap'
import { useState} from 'react'
import front_img from '../assets/front_img.jpg'


const Generator = () =>{
    const [text,setText] = useState();
    const [type,setType] = useState('');
    const [loading,setLoading] = useState(false);
    const [ error,setError] = useState();
    const [url,setUrl] = useState(front_img);

    const generate= async(e)=>{

        e.preventDefault()
        const prompt = `${text} in ${type}`;

        

        if(text){
            setLoading(true);
            try {
                const response = await fetch("http://localhost:4000/generate", {
                  method: "POST",
                  headers: {
                    "Content-Type": "application/json"
                  },
                  body: JSON.stringify({ prompt: prompt,size:"512x512"})
                });
        
                if (!response.ok) {
                  // Handle non-successful response, e.g., by displaying an error message.
                  throw new Error(`HTTP error! Status: ${response.status}`);
                }
        
                const data = await response.json();
                setUrl(data.data); 
              } catch (err) {
                setError("There is an issue with the API request.");
              }
              setLoading(false);

        }else{
            setError("please enter a propmt");

        }


    }


    // image orientation change

    return(
        <Container className="index">
            <Row className="rowVH">
                <Col md={8} >
                    <div className="generatedImageBox">
                        <div className="generatedImgItem">
                            {url === " " && <label>*Generate image to show below</label>}
                            <img src={ loading ? "https://i.gifer.com/VjWP.gif": url} alt="" height="400" width="400"/><br/>
                            <p>Note : To download generated image "Long press on image". Then click save image</p>
                        </div>
                    </div>
                    
                </Col>
                <Col md={4}>  
                
                <p className='text-danger'>{error}</p>
                <form action='#' onSubmit={generate} method='POST'>
                <label htmlFor="">*Write down what type of image you want</label>
                <textarea id="" placeholder='Write here.....' onChange={(txt)=>setText(txt.target.value)}></textarea>
                    <label htmlFor="">Type</label>
                    <select className="imgStyle" onChange={(e)=>setType(e.target.value)}>
                       <option value="nbatural">Normal</option>
                       <option value="Sketch">Sketch</option>
                       <option value="Anime">Anime</option>
                    </select>
                    <div className="inputGroup">
        <div className="imgSize">
        <label htmlFor="">Ratio</label>
            <select name="" id="" onChange={ (e)=>setSize(e.target.value)}>
                <option value="1024x1024">1024x1024</option>              
            </select>
        </div>
        <div className="imgNum">
            <label htmlFor="">NO.</label>
            <select name="" id="">
                <option value="1">1</option>
            </select>
        </div>
    </div>

    <button className="buttonPrimary generateBtn"  type='submit'>
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-lightbulb-fill" viewBox="0 0 16 16">
  <path d="M2 6a6 6 0 1 1 10.174 4.31c-.203.196-.359.4-.453.619l-.762 1.769A.5.5 0 0 1 10.5 13h-5a.5.5 0 0 1-.46-.302l-.761-1.77a1.964 1.964 0 0 0-.453-.618A5.984 5.984 0 0 1 2 6zm3 8.5a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1l-.224.447a1 1 0 0 1-.894.553H6.618a1 1 0 0 1-.894-.553L5.5 15a.5.5 0 0 1-.5-.5z"/>
</svg> {loading?"Generating.....":"Generate"}
                    </button>
                </form>          
                </Col>
            </Row>
        </Container>
    )
}
export default Generator;
