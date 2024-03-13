import * as React from "react"
import { graphql } from "gatsby"

const Wine = ({ data }) => {
    console.log(data);
    return (
      <main>
         <h1>Test</h1>
      </main>
)}  

export default Wine

export const Head = () => <title>Wine Page</title>

// export const query = graphql`
//   query($slug: String!) {
    
//   }
// `