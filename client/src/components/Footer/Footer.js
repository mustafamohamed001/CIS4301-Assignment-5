import React from "react";
import { MDBCol, MDBContainer, MDBRow, MDBFooter } from "mdbreact";

const FooterPage = () => {
  return (
    <MDBFooter color="blue" className="font-small pt-4 mt-4">
      <MDBContainer fluid className="text-center text-md-center">
        <MDBRow>
          <MDBCol>
            <h5 className="title">CIS4301 Assignment 5</h5>
            <div>
              Mustafa Mohamed and Pedro Sicilia
            </div>
            <br/>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
      <div className="footer-copyright text-center py-3">
        <MDBContainer fluid>
            Southern Sierra Wildflower Club
        </MDBContainer>
      </div>
    </MDBFooter>
  );
}

export default FooterPage;