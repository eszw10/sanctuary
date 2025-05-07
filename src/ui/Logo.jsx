import styled from "styled-components";

const StyledLogo = styled.div`
  text-align: center;
`;

const Img = styled.img`
  height: 9.6rem;
  width: auto;
`;

const LogoText = styled.p`
  text-transform: uppercase;
  font-weight: 500;
  letter-spacing: 3px;
`;

function Logo() {
  const imgSrc = "/logo1.png";

  return (
    <StyledLogo>
      <Img src={imgSrc} alt="Logo" />
      <LogoText>Sanctuary</LogoText>
    </StyledLogo>
  );
}

export default Logo;
