import React, { Component } from 'react';
import axios from 'axios';
import Default from '../Default';
import { Link } from 'react-router-dom';
import * as Headings from '../style/type';
import { Button } from '../style/buttons';
import { HeaderContent } from '../style/header';
import { FlexContainer } from '../style/default';
import { COLORS } from '../style/constants';

export default class Home extends Component {
  constructor(props) {
    super(props);
    
  }







  render() {
    return (
      <div className='home'>

       

        {/* Header */}
        <Default bg="url(https://raw.githubusercontent.com/gumtow/fosterconnect-client/master/static/assets/img/header-bg-edit%201header.png)" height="700px">
          <HeaderContent>
            <Headings.H1>Parenting is hard.</Headings.H1>
            <Headings.P>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sit ut amet rhoncus, nunc ullamcorper proin cras. Vel integer euismod nisl venenatis commodo maecenas pellentesque. Euismod commodo et nibh pulvinar lobortis consectetur dictum. Sit risus fusce ullamcorper cursus ut sed felis mi habitant.</Headings.P>
            <Link to="/register"><Button>Sign up</Button></Link>
          </HeaderContent>
        </Default>


        {/* Body content */}
        <Default bg="#fff" padding="2rem 8rem">
          <Headings.H1 darkBlue center>Why We Exist</Headings.H1>
          <FlexContainer>
            <div>
              <img src="https://raw.githubusercontent.com/gumtow/fosterconnect-client/master/static/assets/img/circle.png" alt="placeholder" />
            </div>
            <div>
              <Headings.H2>Connect</Headings.H2>
              <Headings.P color={COLORS.darkBlue}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sit ut amet rhoncus, nunc ullamcorper proin cras. Vel integer euismod nisl venenatis commodo maecenas pellentesque. Euismod commodo et nibh pulvinar lobortis consectetur dictum. Sit risus fusce ullamcorper cursus ut sed felis mi habitant.
            </Headings.P>
            </div>
          </FlexContainer>
          <FlexContainer reverse="row-reverse">
            <div>
              <img src="https://raw.githubusercontent.com/gumtow/fosterconnect-client/master/static/assets/img/circle.png" alt="placeholder" />
            </div>
            <div>
              <Headings.H2>Stay Organized</Headings.H2>
              <Headings.P color={COLORS.darkBlue}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sit ut amet rhoncus, nunc ullamcorper proin cras. Vel integer euismod nisl venenatis commodo maecenas pellentesque. Euismod commodo et nibh pulvinar lobortis consectetur dictum. Sit risus fusce ullamcorper cursus ut sed felis mi habitant.
            </Headings.P>
            </div>
          </FlexContainer>
          <FlexContainer>
            <div>
              <img src="https://raw.githubusercontent.com/gumtow/fosterconnect-client/master/static/assets/img/circle.png" alt="placeholder" />
            </div>
            <div>
              <Headings.H2>Find Resources</Headings.H2>
              <Headings.P color={COLORS.darkBlue}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sit ut amet rhoncus, nunc ullamcorper proin cras. Vel integer euismod nisl venenatis commodo maecenas pellentesque. Euismod commodo et nibh pulvinar lobortis consectetur dictum. Sit risus fusce ullamcorper cursus ut sed felis mi habitant.
            </Headings.P>
            </div>
          </FlexContainer>
          <FlexContainer>
            <Link to="/register"><Button>Sign up</Button></Link>
          </FlexContainer>

        </Default>


       
      </div>
    );
  }
}
