import React, { Component } from "react";
import styled from "styled-components";

const DivContainer = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;
`;

const ReadmoreButton = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 20px;
  margin-bottom: 20px;
  width: 100px;
  padding: 10px;
  background-color: ${props =>
    props.next_page === "nomore" ? "#CCC" : "#fdc02f"};
  border-radius: 5px;
  cursor: pointer;
  &:hover {
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
  }
`;

class Readmore extends Component {
  render() {
    return (
      <DivContainer>
        <ReadmoreButton
          next_page={this.props.next_page}
          onClick={this.props.onLoadMore}
        >
          READ MORE
        </ReadmoreButton>
      </DivContainer>
    );
  }
}

export default Readmore;
