import * as React from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSortDown } from "@fortawesome/free-solid-svg-icons";

const IconListWrap = styled.div`
  position: relative;
  top: 10px;
  left: 0;
  z-index: 9999;
  &:before,
  &:after {
    bottom: calc(100% - 1px);
    left: 210px;
    border: solid transparent;
    content: " ";
    height: 0;
    width: 0;
    position: absolute;
    pointer-events: none;
  }
  &:after {
    border-color: rgba(255, 255, 255, 0);
    border-bottom-color: #fff;
    border-width: 10px;
    margin-left: -10px;
  }
  &:before {
    border-color: rgba(204, 204, 204, 0);
    border-bottom-color: #ccc;
    border-width: 11px;
    margin-left: -11px;
  }
`;

const IconListInner = styled.div`
  border: 1px solid #ccc;
  overflow-y: scroll;
  max-height: 200px;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
`;

const IconList = styled.ul`
  list-style: none;
  margin: 0;
  padding: 10px;
  background: #fff;
  white-space: normal;
  li {
    margin: 0;
    display: inline-block;
  }
`;

const IconItem = styled.li`
  padding: 8px;
  color: #4db6ac;
  font-size: 18px;
  border: 1px solid #fff;
  border-radius: 4px;
  transition: background-color linear 0.15s;
  cursor: pointer;
  &:hover {
    text-decoration: none;
    background: #bae2f3;
  }
`;

const BtnGroup = styled.div`
  margin-top: 30px;
  border-bottom: 0.7px solid rgba(0, 0, 0, 0.5);
  border-collapse: separate;
  display: inline-table;
  padding: 7px 10px;
  padding-left: 0;
  padding: 0;

  background: none;
  &:hover {
    border-bottom: 1.5px solid rgba(0, 0, 0, 0.9);
  }
`;

const Btn = styled.button`
  border: none;
  border-bottom: 0.7px solid rgba(0, 0, 0, 0.5);
  background-color: #fff;
  text-decoration: none;
  text-align: center;
  font-size: 15px;
  line-height: 1;
  vertical-align: middle;
  font-size: 12px;
  padding: 0px 0px;
  display: table-cell;
  height: 36px;
  margin: 0;
  cursor: pointer;

  &:first-child {
    border-top-right-radius: 0;
    border-bottom-right-radius: 0;
    border-right: none;
  }
  &:last-child {
    border-top-left-radius: 0;
    border-bottom-left-radius: 0;
  }
`;

export default class IconPicker extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      icons: [
        "fas fa-rocket",
        "fas fa-flag",
        "fas fa-bullhorn",
        "far fa-bell",
        "fab fa-twitter",
        "fab fa-facebook",
        "fab fa-linkedin-in",
        "fas fa-anchor",
        "fas fa-asterisk",
        "fas fa-award",
        "fas fa-band-aid",
        "fas fa-binoculars",
        "fas fa-bookmark",
        "fas fa-broadcast-tower",
        "fas fa-burn",
        "fas fa-certificate",
        "fas fa-cogs",
        "fas fa-drum",
        "fas fa-exclamation",
        "fas fa-feather-alt",
        "fas fa-fist-raised",
        "fas fa-gem"
      ],
      top: 0,
      left: 0
    };
  }
  handleSelectIcon = icon => {
    this.setState({
      icon: icon
    });
  };
  render() {
    return (
      <>
        <BtnGroup
          style={{ padding: "0" }}
          onClick={this.props.handleOpenIconPicker}
        >
          <Btn type="button">
            {this.props.selectedIcon ? (
              <span
                className={this.props.selectedIcon}
                style={{ color: "#4db6ac", fontSize: "18px" }}
              ></span>
            ) : (
              <span
                style={{
                  fontSize: "1rem",
                  color: "rgba(0, 0, 0, 0.54)"
                }}
              >
                Choose icon for campaign
              </span>
            )}
          </Btn>
          <Btn
            style={{
              fontSize: "1rem",
              color: "rgba(0, 0, 0, 0.54)",
              textAlign: "right",
              float: "right"
            }}
          >
            <FontAwesomeIcon icon={faSortDown} />
          </Btn>
        </BtnGroup>
        <div style={{ position: "relative" }}>
          {this.props.iconPickerModal && (
            <IconListWrap
              style={{
                top: `${this.state.top + 10}px`,
                left: `${this.state.left}px`
              }}
            >
              <IconListInner>
                <IconList>
                  {this.state.icons.map((icon, index) => {
                    return (
                      <IconItem
                        key={index}
                        onClick={() => {
                          this.props.handleChangeIcon(icon);
                        }}
                      >
                        <span className={icon}></span>
                      </IconItem>
                    );
                  })}
                </IconList>
              </IconListInner>
            </IconListWrap>
          )}
        </div>
      </>
    );
  }
}
