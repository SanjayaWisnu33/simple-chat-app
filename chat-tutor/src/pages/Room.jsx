import React,{useState, useEffect} from 'react'
import client, { databases,DATABASES_ID, COLLECTION_ID_MESSAGES } from '../appwriteConfig'
import { ID, Query, Role, Permission} from 'appwrite'
import { Trash2 } from 'react-feather'
import Header  from '../components/Header'
import { useAuth } from '../utils/AuthContext'

const Room = () => {

    const {user} = useAuth()

    const [messages, setMessage] = useState([])
    const [messageBody, setMessageBody] = useState('')

    useEffect(()=>{
        getMessages()

        const unsubscribe = client.subscribe(`databases.${DATABASES_ID}.collections.${COLLECTION_ID_MESSAGES}.documents`, response => {
            // Callback will be executed on changes for documents A and all files.
            // console.log('REAL TIME:', response);
      
            if(response.events.includes("databases.*.collections.*.documents.*.create")){
                console.log('Pesan telah dibuat')
                setMessage(prevState => [response.payload, ...prevState])
            }

            if(response.events.includes("databases.*.collections.*.documents.*.delete")){
                console.log('Pesan telah dihapus')
                setMessage(prevState => prevState.filter(message => message.$id !== response.payload.$id)) //menampilkan kembali data
            }
        });
        return() =>{
            unsubscribe() 
        }
    },[])

    const handleSubmit = async (e) =>{
        e.preventDefault()
        
        let payload={
            user_id:user.$id,
            username:user.name,
            body:messageBody
        }

        // untuk permission, biar ga bisa menghapus pesan orang lain
        let permissions = [
            Permission.write(Role.user(user.$id))
        ]

        let response = await databases.createDocument(
            DATABASES_ID,
            COLLECTION_ID_MESSAGES,
            ID.unique(),
            payload,
            permissions
        )

        console.log('Created! ')
        // setMessage(prevState => [response, ...messages])
        setMessageBody('')
    }

    const getMessages = async () =>{
        const response = await databases.listDocuments(
            DATABASES_ID, 
            COLLECTION_ID_MESSAGES,
            [
                Query.orderDesc('$createdAt'), //mengurutkan pesan agar yang terbaru diatas
                Query.limit(20) //untuk membatasi tes yang akan tampil
            ]
            )
        console.log('RESPONSE:', response)
        setMessage(response.documents)
    }

    const deleteMessage = async (message_id) => {
        databases.deleteDocument(DATABASES_ID, COLLECTION_ID_MESSAGES, message_id); //menghapus
        // setMessage(prevState => messages.filter(message => message.$id !== message_id)) //menampilkan kembali data
    }

  return (
    <main className='container'>
        <Header/>
        <div className='room--container'>

            <form onSubmit={handleSubmit} id="message--form">
                <div>
                    <textarea 
                    required
                    maxLength='1000' 
                    placeholder='Masukan pesan anda' 
                    onChange={(e) => {setMessageBody(e.target.value)}}
                    value={messageBody}>

                    </textarea>
                </div>

                <div className='send-btn--wrapper'>
                    <input className="btn btn-secondary" type="submit" value="Send"/>
                </div>
            </form>

            <div>
                <div>
                    {messages.map(message=>(
                    <div key={message.$id} className='message--wrapper'>

                        <div className='message--header'>

                            <p>
                                    {message?.username ? (
                                    <span>
                                        {message.username}
                                    </span> 
                                    ):(
                                        <span>Anonymous</span>
                                    )}
                                <small className='message-timestamp'>
                                    {new Date(message.$createdAt).toLocaleString( )}
                                </small>
                            </p>

                            {message.$permissions.includes(`delete(\"user:${user.$id}\")`) && (
                                <Trash2 
                                className='delete--btn'
                                onClick={() =>{deleteMessage(message.$id)}}>
                                </Trash2>
                            )}
                           
                        </div>
                        <div className='message--body'>
                            <span>
                                {message.body}
                            </span>
                        </div>

                    </div> 
                    ))}
                </div>
            </div>
        </div>

    </main>
  )
}

export default Room