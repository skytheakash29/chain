import logo from '../assets/Logo.png';
import { Link } from 'react-router-dom';
import { useMutation } from 'react-query';
import {useState} from 'react'


const Chat = () => {
  const [prompt, setPrompt] = useState('');
  const [chat, setChat] = useState([]);
  const [loading, setLoading] = useState(false); // Add loading state
  const [error, setError] = useState('');





    //   fetch dta
    const fetechData = async (chat)=>{
        try{
            const response = await fetch("https://chainback.onrender.com/chat",{
                method:"POST",
                headers:{
                    "content-type":"application/json"
                },
                body:JSON.stringify({
                    message:chat.map(data=>data.message).join('\n')
                })
            });
            const data = response.json();
            return data
        }catch(err){
            alert("There is a issue in Api request. Please refresh the page.")
        }
    }
    // mutation
    const mutation = useMutation({
        mutationFn: () => {
        return fetechData(chat);
        },
        onSuccess: (data) => {
        setChat((prev) => [
            ...prev,
            { sender: 'ai', message: data.message.split(/\r?\n/)}
        ])
        },
        onSettled: ()=>{
          setLoading(false)
        }
    });

    // handling prompt submit
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (prompt) {
        setError('');
        setLoading(true); // Turn on loading state
        await Promise.resolve(
            setChat((prev) => [...prev, { sender: 'user', message: prompt }])
        );
        setPrompt('');
        mutation.mutate();
        } else {
            alert("Please enter a message")
            setError('Please enter a message');
        }
    };


  return (
    <>
      <div className="chat">
        <div className="header d-flex justify-content-between">
          <img src={logo} alt="" width={75} /> 
          <div className="info">
            <Link to="/">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                fill="currentColor"
                className="bi bi-arrow-left-circle-fill"
                viewBox="0 0 16 16"
              >
                <path
                  d="M8 0a8 8 0 1 0 0 16A8 8 0 0 0 8 0zm3.5 7.5a.5.5 0 0 1 0 1H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5H11.5z"
                />
              </svg>
            </Link>
          </div>
        </div>
        <div className="chatArea">
          <div className="disclaimer">
            <p>
              Disclaimer: Once you refresh the page ,you won't able to see previous chat.
            </p>
          </div>
          {/* loading chat */}
         
          {chat.map((data, key) => {
            return (
              <div
                key={key}
                className={`msg ${data.sender === 'user' ? 'clientMsg' : 'serverRes'}`}
              >
                
                  { !Array.isArray(data.message) && <p>{ data.message }</p> }
                  {
                  Array.isArray(data.message) && (
                   <p>
                    {data.message.map((line, index) => (
                    <>
                     {line}
                     {index < data.message.length - 1 && <br />}
                     </>
                     ))}
                   </p>)
                   }
                
              </div>)
            })}

            {loading && <div className={`msg serverRes`}>
            <p>Typing.....</p>
             </div>}



        </div>
        <div className="footer ">
          <div className="d-flex justify-content-between">
            {/* prompt */}
            <form action="#" onSubmit={handleSubmit} className="prompt">
              <input 
                type="text"
                placeholder={ error ? `${error}` :  "Type your text here..."}
                onChange={(e) => setPrompt(e.target.value)}
                value={prompt}
               />
              {!loading && <button type="submit">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="30"
                  height="20"
                  fill="currentColor"
                  className="bi bi-send-arrow-up"
                  viewBox="0 0 16 16"
                >
                  <path
                    fillRule="evenodd"
                    d="M15.854.146a.5.5 0 0 1 .11.54l-2.8 7a.5.5 0 1 1-.928-.372l1.895-4.738-7.494 7.494 1.376 2.162a.5.5 0 1 1-.844.537l-1.531-2.407L.643 7.184a.75.75 0 0 1 .124-1.33L15.314.037a.5.5 0 0 1 .54.11ZM5.93 9.363l7.494-7.494L1.591 6.602l4.339 2.76Z"
                  />
                  <path
                    fillRule="evenodd"
                    d="M12.5 16a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7Zm.354-5.354a.5.5 0 0 0-.722.016l-1.149 1.25a.5.5 0 1 0 .737.676l.28-.305V14a.5.5 0 0 0 1 0v-1.793l.396.397a.5.5 0 0 0 .708-.708l-1.25-1.25Z"
                  />
                </svg>
              </button>}
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Chat;
