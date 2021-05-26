import { gql, useQuery, useReactiveVar } from "@apollo/client"
import { useEffect } from "react";
import { isLoggedInVar, logUserOut } from "../apollo"

const ME_QUERY = gql`
    query me{
        me{
            username
            avatar
        }
    }
`

export const useUser= () => {
    const hasToken = useReactiveVar(isLoggedInVar);
    const {data, error} = useQuery(ME_QUERY,{
        skip: !hasToken
    })
    
    useEffect(() => {
        if(data?.me === null){
            logUserOut()
        }
        else{
            console.log(data)
        }
    }, [data])
    return {data};
}