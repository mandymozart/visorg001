import styled from "@emotion/styled";
import clsx from "clsx";
import React, { useState } from "react";
import { GiToken } from "react-icons/gi";
import moreImage from "../../images/more-48.png";
import { WalletStatus } from "../../Pages/Wallet/Wallet";

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  &&& .cc {
    font-family: "Urbanist", sans-serif !important;
    height: 220px;
    width: 386px;
    position: relative;

    background: var(--card-foreground);
    border-radius: 30px;
    color: #fff !important;

    &__front {
      display: flex;
      flex-direction: column;
      align-items: left;
      padding: 24px 38px 38px;
    }

    &__brand {
      display: flex;
      align-items: center;
      margin-bottom: 40px;
    }

    &__brand-logo {
      display: flex;
    }

    &__logo-circle {
      width: 30px;
      height: 30px;
      background: #fff;
      display: block;
      border-radius: 50%;
      position: relative;

      &--left {
        opacity: 0.5;
      }

      &--right {
        left: -10px;
        opacity: 0.3;
      }
    }

    &__brand-text {
      font-size: 17px;
      margin-left: 5px;
      font-family: "Urbanist", sans-serif !important;
      color: white;
    }

    &__number {
      display: flex;
      align-items: center;
      margin-bottom: 20px;
    }

    &__number-dot {
      width: 5px;
      height: 5px;
      border-radius: 50%;
      background: #fff;
      display: inline-block;
      margin-right: 4px;
    }

    &__digits {
      font-size: 20px;
      margin-left: 10px;
      font-family: "Urbanist", sans-serif !important;
      color: white;
    }

    &__balance-text {
      font-weight: 600;
      font-size: 36px;
      font-family: "Urbanist", sans-serif !important;
      color: white;
      display: flex;
      align-items: center;
      gap: 0.5rem;
    }

    &__settings {
      width: 100%;
      height: 100%;

      background: var(--card-background);
      border-radius: 30px;
      position: absolute;
      padding: 0;
      top: 0;
      display: flex;
      justify-content: space-between;
      clip-path: path(
        "M387.118151,-12.6493894 L387.118151,228.834835 L320.261415,228.834835 C320.261415,219.284137 320.261415,209.299312 320.261415,198.880359 C320.261415,186.645109 320.261415,149.508543 320.261415,110 C320.261415,70.4914571 320.261415,43.8454079 320.261415,21.9752985 C320.261415,3.85122438 320.261415,-7.69033824 320.261415,-12.6493894 L387.118151,-12.6493894 Z"
      );

      &--active {
        animation: showSettings 2s ease-in-out forwards;
      }

      &--hidden {
        clip-path: path(
          "M387.118151,0.160365095 L387.118151,221.215264 L316.529346,221.215264 C117.007895,237.0198 17.2471697,237.0198 17.2471697,221.215264 C17.2471697,181.988409 17.2471697,133.22115 17.2471697,110 C17.2471697,86.7788496 17.2471697,27.7576259 17.2471697,-6.39488462e-14 C17.2471697,-16.3318577 117.007895,-16.2784027 316.529346,0.160365095 L387.118151,0.160365095 Z"
        );
        animation: hideSettings 2s ease-in-out forwards;
      }
    }

    &__settings-menu {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      padding: 1rem;
      padding-left: 2rem;
    }

    &__settings-menu-item {
      display: flex;
      align-items: center;
      font-family: "Urbanist", sans-serif !important;
      color: white;
    }

    &__settings-menu-item-icon {
      display: flex;
      padding: 4px 6px;
      background: var(--card-action);
      border-radius: 7px;
      margin-right: 15px;
    }

    &__settings-bar {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      align-items: center;
      padding: 1.25rem 1.5rem;
    }
  }

  .icon {
    fill: #fff;
  }

  .apple-pay-icon {
    transform: rotate(-90deg);
  }

  .gear-icon {
    cursor: pointer;
    opacity: 0.5;

    transition: opacity 1.5s;

    &.active {
      opacity: 1;
    }
  }

  @keyframes showSettings {
    25% {
      clip-path: path(
        "M387.118151,-12.6493894 L387.118151,228.834835 L326.156587,228.834835 C316.225565,222.276395 309.894513,217.352564 307.16343,214.063341 C298.576801,203.721899 122.1888,208.462135 122.1888,108.204535 C122.1888,7.94693437 294.206316,25.6769042 315.855488,6.20473783 C320.120314,2.36877547 323.554014,-3.91593359 326.156587,-12.6493894 L387.118151,-12.6493894 Z"
      );
    }

    50% {
      clip-path: path(
        "M387.118151,-12.6493894 L387.118151,228.834835 L48.4642624,238.145348 C18.8858367,241.43457 2.73108257,241.43457 6.66133815e-15,238.145348 C-8.58662882,227.803906 18.4317885,204.651574 18.4317885,104.393974 C18.4317885,4.13637332 -13.6376238,0.776583538 8.01154821,-18.6955828 C12.2763746,-22.5315451 25.7606127,-20.5161473 48.4642624,-12.6493894 L387.118151,-12.6493894 Z"
      );
    }

    65%,
    100% {
      clip-path: path(
        "M387.118151,0.160365095 L387.118151,221.215264 L316.529346,221.215264 C117.007895,237.0198 17.2471697,237.0198 17.2471697,221.215264 C17.2471697,181.988409 17.2471697,133.22115 17.2471697,110 C17.2471697,86.7788496 17.2471697,27.7576259 17.2471697,-6.39488462e-14 C17.2471697,-16.3318577 117.007895,-16.2784027 316.529346,0.160365095 L387.118151,0.160365095 Z"
      );
    }
  }

  @keyframes hideSettings {
    25% {
      clip-path: path(
        "M387.118151,0.160365095 L387.118151,221.215264 L316.529346,221.215264 C100.704923,235.24635 -4.80485907,234.841262 1.15518706e-13,220 C12.4189217,181.640401 18.8873389,174.136909 17.2471697,110 C15.6070006,45.8630911 13.7675117,26.4098973 1.04860565e-13,0.160365095 C-6.27713368,-11.8077978 99.2326483,-11.8077978 316.529346,0.160365095 L387.118151,0.160365095 Z"
      );
    }

    55% {
      clip-path: path(
        "M387.118151,-12.6493894 L387.118151,228.834835 L243.77087,228.834835 C216.843505,221.535077 202.014282,216.240588 199.283199,212.951365 C190.69657,202.609923 14.0082036,210.2576 14.0082036,110 C14.0082036,9.74239964 184.417555,28.4484097 208.443623,13.7028253 C213.730293,10.4582224 224.482747,1.6741509 240.700984,-12.6493894 L387.118151,-12.6493894 Z"
      );
    }

    80% {
      clip-path: path(
        "M387.118151,-12.6493894 L387.118151,228.834835 L315.554768,228.834835 C317.523992,218.414953 319.092875,208.430128 320.261415,198.880359 C321.744382,186.760968 330.890906,150.167879 333.898886,110 C336.906867,69.8321206 320.261415,43.8454079 320.261415,21.9752985 C320.261415,3.85122438 318.692532,-7.69033824 315.554768,-12.6493894 L387.118151,-12.6493894 Z"
      );
    }

    100% {
      clip-path: path(
        "M387.118151,-12.6493894 L387.118151,228.834835 L320.261415,228.834835 C320.261415,219.284137 320.261415,209.299312 320.261415,198.880359 C320.261415,186.645109 320.261415,149.508543 320.261415,110 C320.261415,70.4914571 320.261415,43.8454079 320.261415,21.9752985 C320.261415,3.85122438 320.261415,-7.69033824 320.261415,-12.6493894 L387.118151,-12.6493894 Z"
      );
    }
  }
`;
type WalletCardProps = {
  status: WalletStatus;
  address: string;
  balance: number;
  lastUpdate: string;
};
const WalletCard = ({
  status,
  balance,
  address,
  lastUpdate,
}: WalletCardProps) => {
  const [showSettings, setShowSettings] = useState(false);

  return (
    <Container>
      <div className="cc">
        <div className="cc__front">
          <div className="cc__brand">
            <div className="cc__brand-logo">
              <span className="cc__logo-circle cc__logo-circle--left"></span>
              <span className="cc__logo-circle cc__logo-circle--right"></span>
            </div>
            <span className="cc__brand-text">StruggleCard</span>
          </div>
          <div className="cc__number">
            <span className="cc__number-dot"></span>
            <span className="cc__number-dot"></span>
            <span className="cc__digits">
              {address.substring(address.length - 23)}
            </span>
          </div>
          <div className="cc__balance-text">
            <GiToken /> {balance}
          </div>
        </div>
        <div
          className={clsx(
            "cc__settings",
            showSettings ? "cc__settings--active" : "cc__settings--hidden"
          )}
        >
          <div className="cc__settings-menu">
            <div className="cc__settings-menu-item">
              <div className="cc__settings-menu-item-icon">
                <svg
                  className="icon"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  width="20"
                  height="20"
                >
                  <path d="M12 1C8.676 1 6 3.676 6 7v1c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2V7c0-3.324-2.676-6-6-6zm0 2c2.276 0 4 1.724 4 4v1H8V7c0-2.276 1.724-4 4-4zm0 10c1.1 0 2 .9 2 2s-.9 2-2 2-2-.9-2-2 .9-2 2-2z" />
                </svg>
              </div>
              Lock wallet
            </div>
            <div className="cc__settings-menu-item">
              {" "}
              <div className="cc__settings-menu-item-icon">
                <svg
                  fill="#fff"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 32 32"
                  width="24px"
                  height="24px"
                >
                  <path d="M 16 4 C 10.886719 4 6.617188 7.160156 4.875 11.625 L 6.71875 12.375 C 8.175781 8.640625 11.710938 6 16 6 C 19.242188 6 22.132813 7.589844 23.9375 10 L 20 10 L 20 12 L 27 12 L 27 5 L 25 5 L 25 8.09375 C 22.808594 5.582031 19.570313 4 16 4 Z M 25.28125 19.625 C 23.824219 23.359375 20.289063 26 16 26 C 12.722656 26 9.84375 24.386719 8.03125 22 L 12 22 L 12 20 L 5 20 L 5 27 L 7 27 L 7 23.90625 C 9.1875 26.386719 12.394531 28 16 28 C 21.113281 28 25.382813 24.839844 27.125 20.375 Z" />
                </svg>
              </div>
              Replace wallet
            </div>
            <div className="cc__settings-menu-item">
              <div className="cc__settings-menu-item-icon">
                <img src={moreImage} style={{ width: "24px" }} alt="more" />
              </div>
              More
            </div>
          </div>
          <div className="cc__settings-bar">
            <svg
              className={clsx("gear-icon", "icon", { active: showSettings })}
              onClick={() => setShowSettings(!showSettings)}
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              width="24"
              height="24"
            >
              <path d="M9.668 2l-.492 2.523c-.821.31-1.58.744-2.246 1.291L4.506 4.98 2.174 9.02l1.94 1.686A8.012 8.012 0 004 12c0 .441.045.871.113 1.293l-1.94 1.686 2.333 4.042 2.424-.835c.666.547 1.425.98 2.246 1.29L9.668 22h4.664l.492-2.523c.821-.31 1.58-.744 2.246-1.291l2.424.835 2.332-4.042-1.94-1.686c.07-.422.114-.852.114-1.293 0-.441-.045-.871-.113-1.293l1.94-1.686-2.333-4.042-2.424.835a7.983 7.983 0 00-2.246-1.29L14.332 2H9.668zM12 8a4 4 0 110 8 4 4 0 010-8z" />
            </svg>
            {/* <svg
              className="apple-pay-icon icon"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 50 50"
              width="48"
              height="48"
            >
              <path d="M9.984 15.002c-.835.04-1.866.571-2.455 1.318-.54.644-1.001 1.69-.884 2.672.943.082 1.885-.492 2.474-1.219.58-.747.963-1.748.865-2.771zM18 17v15h2.375v-5h3.25c2.983 0 5.125-2.075 5.125-5s-2.103-5-5.047-5H18zm-8.266 2c-.8 0-1.465.214-1.95.395-.487.18-.855.27-.745.27.099 0-.241-.083-.678-.259-.436-.176-1.021-.402-1.738-.402-1.625 0-3.087.966-3.88 2.371-.799 1.383-.869 2.992-.61 4.467.259 1.474.845 2.844 1.556 3.879.317.465.684.983 1.176 1.43.492.445 1.167.841 1.979.841H4.88c.638-.024 1.12-.237 1.424-.361.304-.124.456-.19.845-.19.383 0 .54.07.873.205.334.136.86.354 1.541.354.803 0 1.478-.405 1.938-.854.46-.447.782-.948 1.082-1.388l.002-.002a8.858 8.858 0 001.127-2.37l.248-.882-.86-.322s-1.27-.372-1.283-1.989v-.002a2.087 2.087 0 01.512-1.412 2.689 2.689 0 01.518-.478c.033-.023-.04.04.12-.084l.749-.572-.526-.782C12.088 19.224 10.405 19 9.734 19zm10.641 0h2.75c2.047 0 3.25 1.105 3.25 3s-1.193 3-3.25 3h-2.75v-6zm-10.64 2c.133 0 .62.143 1.115.443-.023.026-.04.035-.063.063a4.184 4.184 0 00-.969 2.705c.015 1.805.928 2.69 1.686 3.227-.123.338-.18.62-.57 1.19l-.002.003c-.307.45-.586.852-.825 1.084-.238.232-.357.285-.543.285-.305 0-.435-.062-.787-.205-.351-.143-.907-.354-1.627-.354-.703 0-1.252.196-1.601.338-.338.138-.468.194-.719.207-.173-.003-.354-.074-.621-.316-.273-.247-.577-.648-.867-1.074v-.002l-.002-.002c-.527-.766-1.032-1.932-1.236-3.096-.205-1.164-.11-2.296.37-3.125l.005-.006.001-.004c.455-.806 1.354-1.357 2.143-1.357.271 0 .609.104.99.258.382.154.755.402 1.426.402.674 0 1.033-.243 1.441-.394.41-.152.81-.27 1.254-.27zm24.464 0c-2.489 0-4.328 1.395-4.396 3.314h2.11c.173-.912 1.036-1.51 2.218-1.51 1.433 0 2.242.657 2.242 1.864l.002.832-2.932.154c-2.72.161-4.193 1.255-4.193 3.155 0 1.919 1.52 3.193 3.7 3.193 1.471 0 2.837-.732 3.456-1.89h.05v1.775h2.167v-7.371c.001-2.14-1.74-3.516-4.424-3.516zm5.301 0l4.008 10.95-.215.665c-.362 1.13-.948 1.563-1.994 1.563-.18 0-.518-.018-.674-.037v1.804c.158.035.708.055.879.055 2.307 0 3.393-.868 4.342-3.502L50 21h-2.404l-2.787 8.885h-.05L41.974 21H39.5zm-3.125 6l-.008.867c0 1.387-1.2 2.375-2.789 2.375-1.249 0-2.043-.588-2.043-1.49 0-.931.766-1.473 2.229-1.559L36.375 27z" />
            </svg> */}
          </div>
        </div>
      </div>
    </Container>
  );
};

export default WalletCard;
