import React from 'react'
import { FallingLines } from 'react-loader-spinner'

export default function Loader() {
  return <>
  <div className="d-flex vh-100 bg-primary bg-opacity-50 justify-content-center align-items-center">
 
  <FallingLines
  color="#fff"
  width="100"
  visible={true}
  ariaLabel="falling-circles-loading"
  />

  </div>
  
  
  
  
  </>
}
