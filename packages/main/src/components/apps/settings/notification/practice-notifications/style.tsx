import styled, { themeGet, device } from "@doar/shared/styled";

export const StyledTitlePlan = styled.div`
    font-size: 25px;
    color: ${themeGet("colors.primary")};
    font-weight: 500;
`;
export const StyledActionWrap = styled.div`
    display: flex;
`;

export const StyledPlanInfo = styled.div`
    color: ${themeGet("colors.gray600")};
    margin-bottom: 10px;
    margin-top: 10px;
    font-size: 14px;
`;

export const StyledTitleWrap = styled.div`
    display: flex;
    margin-top: 30px;
`;

export const StyledLabelCheck = styled.div`
    display: flex;
    gap: 16px 32px;
    margin-bottom: 16px;
    // display: grid;
    // margin-bottom: 20px;
    // grid-row-gap: 16px;
    // grid-column-gap: 32px;
    // grid-auto-flow: row;
    // grid-template-columns: 210px repeat(2,var(--itemSizeColums));
    // grid-template-rows: repeat(1,var(--itemSize));
    // --itemSize: none;
    // --itemSizeColums: none;
    // .region { grid-area: auto}
    // width: 70%;
    // ${device.medium}{
    //   --itemSize: 1fr;
    //   --itemSizeColums: 120px;
    //   .region { grid-area: 2 / 2 /2 / 4 };
    // }

    // & .button {
    //   background-color: white;
    //   border: 0;
    //   border-radius: 50px;
    //   cursor: pointer;
    //   height: 100px;
    //   position: relative;
    //   width: 200px;
    //   -webkit-appearance: none;
    //   -moz-appearance: none;
    // }
    // & .pin {
    //   background-color: white;
    //   border-radius: 20px;
    //   height: 20px;
    //   left: 20px;
    //   position: absolute;
    //   width: 20px;
    //   transition: left ease .5s;
    //   ${device.medium}{
    //     left: 27px;
    //   }
    // }
    // button:hover { background-color: lightgray; }
    // button:focus,
    // button:active { outline: none; }
    // button::-moz-focus-inner { border: 0; }

    // button.on {
    //   background-color: #0168fa;
    // }

    // button.on .pin {
    //   left: 50px;
    //   ${device.medium}{
    //     left: 61px;
    //   }
    // }
`;
