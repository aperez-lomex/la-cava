import * as React from "react"
import { graphql } from "gatsby"
import Footer from "../components/footer";
import Navbar from "../components/navbar";

const Wine = (props) => {
   console.log(props.pageContext);
   const mainContainerStyles = {
      fontFamily: "-apple-system, Roboto, sans-serif, serif", 
      margin: '-8px',
    }

    return (
      <main style={mainContainerStyles}>
         <Navbar></Navbar>
         <div>

         </div>
         <Footer></Footer>
      </main>
)}  

export default Wine

export const Head = () => <title>Wine Page</title>