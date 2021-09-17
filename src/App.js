import { useMoralis } from "react-moralis";
import { Button } from '@chakra-ui/button'
import { Container,Heading,Stack,Box} from '@chakra-ui/layout'
import { useState,useEffect } from "react";

function App() {
  const [auth, isAuth] = useState(false);
  // const [imageUrl,setImageUrl] = useState()
  let [name,setName] = useState('')
  let[files,setFile]=useState()
  let [email, setEmail] = useState('')
  let [isRegistered, setisRegistered] = useState(false)

  let [sub, setSub] = useState();
  const {setUserData,isUserUpdating,File,Query,authenticate ,isAuthenticated,isAuthenticating,isAuthUndefined,user,authError,userError, logout,isLoggingOut} = useMoralis();
  // const uploadImage = async () => {
  //   const imageData = imageUrl.files[0]
  //   const file = new File(imageData.name, imageData);
  //   await file.saveIPFS();
  //   console.log(file.ipfs(), file.hash());
  //   return file.ipfs();
  // }
 
const HandleSave=()=>{
setUserData({
  name,
  email
  }).then(()=>{
    setisRegistered(true)
  })
  
}
const onNewAccount = (account)=>{
console.log("new account made",account)
}
  const init = async () => {
    let query = Query('User')
    setSub(await query.subscribe());
    return sub.on("create", onNewAccount)
  }
useEffect(() => {
  isAuth(isAuthenticated)
}, [isAuthenticated,user])
  return (
    <div className="App">
      <h1>DAPP</h1>
      {isAuthenticated && isRegistered ?<h1>{user.attributes.name}</h1>:null}
      {!auth ? <Button isLoading={isAuthenticating} onClick={() => {authenticate()
      }}>Authenticate</Button> : !isRegistered? (
        <div>
          <Stack spacing={3}>
            <Box>
              <input type='text' style={{color:'black'}} onChange={(e) => setName(name =e.currentTarget.value)} placeholder='name' />
            </Box>
            <Box>
              <input type='email' style={{ color: 'black' }} onChange={(e) => setEmail(email = e.currentTarget.value)} placeholder='email' />
            </Box>
          </Stack>

          <Button isLoading={isUserUpdating} onClick={() => HandleSave()}>Submit</Button>
          {userError && (<h1>
            "User details cant be changed"
          </h1>)}
        <Button isLoading={isLoggingOut}onClick={() => logout()}>LogOut</Button>
        </div>   
        ):null}
      {auth && !isAuthenticating?(
     <Container>
        <h1>You are loggedIn</h1>
        </Container>): (<h1>Please LogIn</h1>)
     }
     {authError && (
       <div>
          <h1>AuthenticationError</h1>
          <h3>{authError.message}</h3>
       </div>
     )}

   
       </div>
)
}
  


export default App;
