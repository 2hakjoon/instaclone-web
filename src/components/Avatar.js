import styled from "styled-components"

const SAvatar = styled.div`
    width:18px;
    height:18px;
    border-radius: 15px;
    background-color: #2c2c2c;
    overflow: hidden;
`

const Img = styled.img`
    max-width: 300%;
`


export const Avatar = ({url =""}) => {
    return<SAvatar>
        {url !== ""? <Img src={url}/> : null}
    </SAvatar>
}

export default Avatar;