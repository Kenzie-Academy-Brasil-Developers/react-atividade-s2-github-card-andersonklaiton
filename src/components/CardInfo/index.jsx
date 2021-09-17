import "./style.css"
const CardInfo=({repo})=>{
    return(
        <>
            {repo.map((item, index)=>
            <div key={index} className="container">
                <img className="img_repo" src={item.owner.avatar_url} alt={item.full_name}/>
                
                <div className="container_description">
                    <h3>{item.full_name}</h3>
                    <h5>{item.description}</h5>
                    
                </div>
                <a href={item.html_url}>{">"}</a>
            </div>)}
        </>
    )

}
export default CardInfo