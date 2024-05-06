export const cardStyle = `
:host {
  float: left;
  width: 100%;
  padding: 0;
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
`;
