import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import * as yup from "yup"
import {yupResolver} from "@hookform/resolvers/yup"
import CardInfo from "../CardInfo"
import "./style.css"

const CardSearch=()=>{
    const [urlFetch, setUrlFetch]=useState("")
    const [repo, setRepo]= useState("")
    const [msgErro, setMsgErro]=useState(false)
    const [typeErro, setTypeErro]=useState("c")
   
    const formSchema = yup.object().shape({
        url:yup.string().required("Deve digitar um caminho")
    })
    const {register, handleSubmit, formState:{errors}}=useForm({
        resolver: yupResolver(formSchema)
    })
    
    const handleSubmitFunction=(data)=>{

        if(data.url.includes("/")){
            setMsgErro(false)
            setTypeErro("c")
            setUrlFetch(`https://api.github.com/repos/${data.url}`)
        }else{
            setTypeErro("b")
            setMsgErro(true)
        }
        
    }
    
    useEffect(()=>{
        if(urlFetch!==""){
        fetch(urlFetch)
        .then((response)=>response.json())
        .then((response)=> { if(response.message === undefined){
            setRepo([...repo,response])}else{setTypeErro("a"); setMsgErro(true)}}) 
        .catch((e)=>setTypeErro("a"))}
        
    },[urlFetch])
  
    return(
        <form onSubmit={handleSubmit(handleSubmitFunction)}>
            <div className="search">
                <input className="inputRepo"  placeholder="Digite o nome do repositório" {...register("url")}/>
                <button className="btnRepo" type="submit">Pesquisar</button>
            </div>
                {msgErro && typeErro === "a" && <p>Repositório não encontrado</p>}
                {msgErro && typeErro === "b" && <p>Repositório incompleto</p>}
                {errors.url?.message}
            {repo && <CardInfo repo={repo}/>}
        </form>
    )
}
export default CardSearch