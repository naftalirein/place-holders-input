import React, { useEffect, useRef, useState } from "react";
import ContentEditable from "react-contenteditable";
import PropTypes from "prop-types";
import _map from "lodash/map";

import "./index.scss";

const buildPlaceHolder = (text) =>
  `<div class="place-holder" contentEditable=false>${text}</div>`;
const buildPlaceHolderXButton = () =>
  `<div class="place-holder-x" contentEditable=false> x </div>`;

const TextAreaPlaceHolders = ({ placeHolders, text }) => {
  const textAreaContentRef = useRef({});
  const [range, setRange] = useState("");
  const [html, setHtml] = useState(text);

  useEffect(() => {
    textAreaContentRef.current.focus();
  }, []);


  return (
    <div className="textarea-place-holders-container">
      <ContentEditable
        innerRef={textAreaContentRef}
        onChange={(e) => {
            setHtml(textAreaContentRef.current.innerHTML);
        }}
        className="textarea-content"
        onBlur={() => {
          try {
            const selection = window.getSelection();
            const currRange = selection.getRangeAt(0);
            setRange(currRange);
          } catch (error) {
            console.log(error);
          }
        }}
        html={html}
      />
      <div className="place-holders-list-container">
        <div className="place-holders-line-separate" />
        <div>
          {_map(placeHolders, (placeHolder) => (
            <div className="place-holder-title"
              onClick={(e) => {
                const placeHolderNode = document.createElement("div");
                const placeHolderNodeText = document.createElement("div");
                const placeHolderNodeX = document.createElement("div");
                placeHolderNode.className = "place-holder-container";
                placeHolderNodeText.innerHTML = buildPlaceHolder(placeHolder);
                placeHolderNodeX.innerHTML = buildPlaceHolderXButton();
                placeHolderNode.appendChild(placeHolderNodeText);
                placeHolderNode.appendChild(placeHolderNodeX);
                placeHolderNodeX.addEventListener("click", () => {
                  placeHolderNodeText.remove();
                  placeHolderNodeX.remove();
                  placeHolderNode.remove();
                  setHtml(textAreaContentRef.current.innerHTML);
                });
                const space = document.createTextNode("\u00A0");
                if (!range) {
                  return;
                }
                range.insertNode(space);
                range.insertNode(placeHolderNode);
                const selection = window.getSelection();
                selection.removeAllRanges();
                range.setEnd(space, 1);
                range.setStart(space, 1);
                selection.addRange(range);
                setHtml(textAreaContentRef.current.innerHTML);
              }}
            >
              {placeHolder}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

TextAreaPlaceHolders.propTypes = {
  placeHolders: PropTypes.array,
  placeholder: PropTypes.string,
  placeHoldersOptions: PropTypes.array,
  text: PropTypes.string,
  isMinified: PropTypes.bool,
  handleValueChange: PropTypes.func,
  children: PropTypes.oneOfType([PropTypes.element, PropTypes.element]),
};

export default TextAreaPlaceHolders;
