export interface IFriend {
friends: {
        steamid: string;
        communityvisibilitystate: number;
        personaname: string;
        avatarmedium: string;
        lastlogoff: number;
        currentTime?: number;
 }[]      
}