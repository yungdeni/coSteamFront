import React from "react";
import {IFriend as Props} from '../interfaces/friend.interface'; 

interface Iprops {
    friends: Props["friends"]
    selectedFriends: string[]
    setSelectedFriends: React.Dispatch<React.SetStateAction<string[]>>
}


const FriendList: React.FC<Iprops> = ({friends,selectedFriends,setSelectedFriends}) => {
    

    const handleClick = (id:string) => {
        
        if (selectedFriends.includes(id)){
            return selectedFriends.filter(item => item !== id)
        }
        return [...selectedFriends, id]
    }


    const renderList = () => {
        return friends.map((f) => {
            const date = new Date(f.lastlogoff * 1000)
            
            return (
                <li key={f.steamid}  >
                    <div className={f.communityvisibilitystate !== 3 ? "FriendList-Item-Disabled" : (selectedFriends.includes(f.steamid) ? "FriendList-Item-Selected" : "FriendList-Item")}  onClick={() => setSelectedFriends(handleClick(f.steamid))}>
                    <img alt="" src={f.avatarmedium}/>

                    <p>{f.personaname} &nbsp; </p>
                    
                    </div>
                    <p>Last seen online: {date.toLocaleString("sv-SE")}</p>
                </li>
                

            )
        })
    }

    return (
        <ul >
            {renderList()}
        </ul>
    )
}

export default FriendList