export const cardStyle = `
:host {
  float: left;
  padding: 24px;
  width: 100%;
  position: absolute;
  left: 0;
  z-index: 1000;
}

.inner-wrapper {
  width: 100%;
  background-color: var(--clr-1);
  border-radius: 15px;
  box-shadow: 0px 50px 50px -25px rgba(0, 0, 0, 0.10);
  padding: 28px 0 0;
}

.item {
  text-align: center;
}

.item:last-child {
  padding-bottom: 24px;
}

.item:last-child .sub-title {
  margin-bottom: 0;
}

.item .title {
  color: var(--clr-4);
  opacity: 0.5;
  font-size: 10px;
  font-weight: 700;
  line-height: normal;
  letter-spacing: 1.458px;
  text-transform: uppercase;
  margin-bottom: 7px;
}

.item .sub-title {
  color: var(--clr-4);
  font-size: 20px;
  font-style: normal;
  font-weight: 500;
  line-height: 24px; /* 120% */
  letter-spacing: -0.179px; 
  margin-bottom: 24px;
}

@media screen and (min-width: 1110px) {
  :host{
    float: left;
    padding: 0;
    width: 100%;
    position: absolute;
    z-index: 1000;
  }

  .inner-wrapper {
    max-width: 1110px;
    margin: 0 auto;
    padding: 43px 32px;
  }

  .inner-wrapper-2 {
    display: flex;
    justify-content: space-evenly;
    gap: 32px;
    padding-top: 0;
  }

  .wrapper {
    width: 100%;
  }

  .item {
    text-align: left;
    border-right: 1px solid #ccc;
    padding-right: 32px;
  }

  .item:last-child {
    border-right: 0;
  }

  .item .title {
    margin-bottom: 13px;
    font-size: 12px;
  }

  .item .sub-title {
    font-size: 26px;
  }
}
`;
