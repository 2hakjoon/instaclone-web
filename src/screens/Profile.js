import { useQuery } from "@apollo/client";
import gql from "graphql-tag";
import { useLocation, useParams } from "react-router";

const SEE_PROFILE_QUERY  = gql`
    query seeProfile($username: String!){
        seeProfile(username: $username){
            firstName
            lastName
            username
            bio
            avatar
            photos{
                file
                likes
                totalComments
                isLiked
            }
            totalFollowings
            totalFollowers
            isMe
            isFollowing
        }
    }
`

export const Profile = () => {
    const {username} = useParams();
    const {data} = useQuery(SEE_PROFILE_QUERY,{
        variables:{
            username,
        }
    })
    console.log(data)
    return "Profile";
}