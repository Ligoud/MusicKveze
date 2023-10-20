import React from "react";

import "./slime.scss";

const ButtonStyle2: React.FC = ({ onClick, disabled }) => {
  console.log(disabled);
  //   constructor(props) {
  //     super(props);
  //     this.handleClick = this.handleClick.bind(this);
  //   }
  //   handleClick(e) {
  //     if (this.props.onButtonClick !== undefined) this.props.onButtonClick(e);
  //     else
  //       console.log(
  //         "No handlers detected for Slime Button. Pass your handler from the parent component through the props."
  //       );
  //   }
  console.log(`fl1 ${disabled ? "dis" : ""}`);
  return (
    <div
      className="buttonStyle2"
      onClick={() => {
        console.log("clicked");
        onClick();
      }}
    >
      <div className={`fl1 ${disabled ? "dis" : ""}`}></div>
      {/* <div className='fl2'></div> */}
      <span style={{ color: "white" }}>Answer</span>
    </div>
  );
};

export default ButtonStyle2;
