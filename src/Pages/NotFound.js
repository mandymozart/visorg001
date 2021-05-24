import { useAuth0 } from '@auth0/auth0-react'
import styled from '@emotion/styled'
import React from 'react'
import { Link } from 'react-router-dom'
import icon from "./../images/middle-finger.png"

const Container = styled.section`
display: flex;
align-items: center;
flex-direction: column;
justify-content: center;
height: 100vh;
`

const NotFound = () => {
  const { isLoading } = useAuth0();
  if(isLoading) return <></>
  return (
    <Container>
      <h1>404</h1>
      <h2>Document not found</h2>
      <img src={icon} alt="Not found"/>
      <p><Link to="/">Return to homepage</Link></p>
    </Container>
  )
}

export default NotFound
